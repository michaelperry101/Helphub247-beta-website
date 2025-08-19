export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { messages } = req.body || {};
  try {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'Missing OPENAI_API_KEY env var on server.' });
    }
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are Carys, a warm, concise, practical AI helpline for a UK audience. Keep replies short and helpful.' },
          ...(Array.isArray(messages) ? messages : [])
        ]
      })
    });
    const data = await response.json();
    if (data?.choices?.[0]?.message?.content) {
      return res.status(200).json({ reply: data.choices[0].message.content });
    } else {
      return res.status(500).json({ error: 'Unexpected response from AI provider', raw: data });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
