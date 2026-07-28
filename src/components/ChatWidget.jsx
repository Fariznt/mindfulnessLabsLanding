import { useState } from 'react'
import { Maximize2, Minimize2, X, Send } from 'lucide-react'
import { parseChatLinks } from '../../lib/parseChatLinks'
import './ChatWidget.css'

// Turn markdown [label](href) into clickable anchors in assistant replies
function renderMessageText(text) {
  return parseChatLinks(text).map((part, i) => {
    if (part.type !== 'link') return part.value

    const isExternal = /^https?:\/\//i.test(part.href)
    return (
      <a
        key={i}
        href={part.href}
        className="chat-message-link"
        {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {part.value}
      </a>
    )
  })
}

const CHAT_API_URL = window.location.hostname === 'localhost'
  ? 'http://localhost:3001/api/chat'
  : '/.netlify/functions/agentic-service'

function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [maximized, setMaximized] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [sending, setSending] = useState(false)

  const handleClose = () => {
    setOpen(false)
    setMaximized(false)
  }

  const handleSend = async (e) => {
    e.preventDefault()
    const text = input.trim()
    if (!text || sending) return

    const updatedMessages = [...messages, { sender: 'me', text }]
    setMessages(updatedMessages)
    setInput('')
    setSending(true)

    try {
      const response = await fetch(CHAT_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updatedMessages })
      })
      if (!response.ok) throw new Error('Request failed')
      const data = await response.json()
      setMessages((prev) => [...prev, { sender: 'them', text: data.reply }])
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { sender: 'them', text: "Sorry, something went wrong. Please try again." }
      ])
    } finally {
      setSending(false)
    }
  }

  if (!open) {
    return (
      <button
        className="chat-widget-bubble"
        onClick={() => setOpen(true)}
        aria-label="Open chat"
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7 8.5H12M7 12H15M9.68375 18H16.2C17.8802 18 18.7202 18 19.362 17.673C19.9265 17.3854 20.3854 16.9265 20.673 16.362C21 15.7202 21 14.8802 21 13.2V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V20.3355C3 20.8684 3 21.1348 3.10923 21.2716C3.20422 21.3906 3.34827 21.4599 3.50054 21.4597C3.67563 21.4595 3.88367 21.2931 4.29976 20.9602L6.68521 19.0518C7.17252 18.662 7.41617 18.4671 7.68749 18.3285C7.9282 18.2055 8.18443 18.1156 8.44921 18.0613C8.74767 18 9.0597 18 9.68375 18Z"
            stroke="var(--primary-color)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    )
  }

  return (
    <div className={`chat-widget-panel ${maximized ? 'maximized' : ''}`}>
      <div className="chat-widget-header">
        <span className="chat-widget-title">Have questions? Ask anything!</span>
        <div className="chat-widget-header-actions">
          <button
            className="chat-widget-icon-btn"
            onClick={() => setMaximized((m) => !m)}
            aria-label={maximized ? 'Restore chat' : 'Maximize chat'}
          >
            {maximized ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
          </button>
          <button
            className="chat-widget-icon-btn"
            onClick={handleClose}
            aria-label="Close chat"
          >
            <X size={18} />
          </button>
        </div>
      </div>
      <div className="chat-widget-body">
        {messages.map((msg, i) => (
          <div key={i} className={`chat-message ${msg.sender === 'me' ? 'chat-message-me' : 'chat-message-them'}`}>
            {msg.sender === 'them' ? renderMessageText(msg.text) : msg.text}
          </div>
        ))}
        {sending && (
          <div className="chat-message chat-message-them chat-message-typing" aria-label="Typing">
            <span className="chat-typing-dot"></span>
            <span className="chat-typing-dot"></span>
            <span className="chat-typing-dot"></span>
          </div>
        )}
      </div>
      <form className="chat-widget-input-row" onSubmit={handleSend}>
        <input
          type="text"
          className="chat-widget-input"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="submit"
          className="chat-widget-send-btn"
          disabled={!input.trim() || sending}
          aria-label="Send message"
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  )
}

export default ChatWidget
