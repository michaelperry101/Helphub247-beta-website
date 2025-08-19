import { useState } from 'react'
import axios from 'axios'

export default function Home() {
  const [chat, setChat] = useState([{ role: 'assistant', content: '👋 Hi, I’m Carys. How can I help today?' }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const send = async () => {
    const text = input.trim();
    if (!text) return;
    const next = [...chat, { role: 'user', content: text }];
    setChat(next);
    setInput('');
    setLoading(true);
    try {
      const res = await axios.post('/api/chat', { messages: next.slice(-12) });
      setChat([...next, { role: 'assistant', content: res.data.reply }]);
    } catch (e) {
      setChat([...next, { role: 'assistant', content: 'Sorry — the chat backend is not configured yet. Add OPENAI_API_KEY in Vercel → Settings → Environment Variables to enable Carys.' }]);
    } finally {
      setLoading(false);
    }
  };

  const subscribe = () => {
    window.location.href = 'https://buy.stripe.com/test_aEUeXgcOz0s6dOceUU';
  };

  return (
    <div className="container">
      <header className="header">
        <span className="badge">HelpHub24/7</span>
        <h1 className="title">Your 24/7 AI Helpline</h1>
        <p className="subtitle">
          Meet <b>Carys</b> — Conversational Assistant for Responsive Yielding Solutions. Get instant, friendly help.
        </p>
        <div className="cta">
          <button className="button" onClick={subscribe}>Subscribe £9.99/month</button>
        </div>
      </header>

      <div className="grid">
        <section className="card">
          <h3>Chat with Carys</h3>
          <div className="chatbox">
            {chat.map((m, i) => (
              <div key={i} className={`msg ${m.role === 'user' ? 'user' : 'bot'}`}>{m.role === 'user' ? '🧑 ' : '🤖 '}{m.content}</div>
            ))}
            {loading && <div className="msg bot">Carys is typing…</div>}
          </div>
          <div className="inputrow">
            <input className="input" value={input} onChange={e=>setInput(e.target.value)} placeholder="Ask anything…" onKeyDown={(e)=>{ if(e.key==='Enter') send(); }} />
            <button className="send" onClick={send}>Send</button>
          </div>
        </section>

        <aside className="card">
          <h3>What you get</h3>
          <ul style={{textAlign:'left', lineHeight:'1.8'}}>
            <li>✔ 24/7 access to Carys</li>
            <li>✔ Priority answers</li>
            <li>✔ Cancel anytime</li>
            <li>✔ UK-based brand</li>
          </ul>
          <hr/>
          <p style={{textAlign:'left', fontSize:14}}>
            To enable the live AI backend, add <code>OPENAI_API_KEY</code> in Vercel → Project → Settings → Environment Variables and redeploy. No code changes needed.
          </p>
        </aside>
      </div>

      <footer>© 2025 HelpHub24/7</footer>
    </div>
  )
}
