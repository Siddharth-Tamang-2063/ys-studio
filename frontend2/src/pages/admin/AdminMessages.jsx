import React, { useState } from 'react'
import { Mail, MailOpen, Trash2, Reply, Clock } from 'lucide-react'
import AdminLayout from '../../components/admin/AdminLayout'
import { CONTACT_MESSAGES } from '../../data/products'

export default function AdminMessages() {
  const [messages, setMessages] = useState(CONTACT_MESSAGES)
  const [selected, setSelected] = useState(null)
  const [replyText, setReplyText] = useState('')
  const [replySent, setReplySent] = useState({})

  const markRead = (id) => setMessages(ms => ms.map(m => m.id === id ? { ...m, read: true } : m))
  const deleteMsg = (id) => { setMessages(ms => ms.filter(m => m.id !== id)); if (selected?.id === id) setSelected(null) }
  const selectMsg = (msg) => { setSelected(msg); markRead(msg.id) }
  const sendReply = (id) => {
    if (!replyText.trim()) return
    setReplySent(r => ({ ...r, [id]: true }))
    setReplyText('')
  }

  const unread = messages.filter(m => !m.read).length

  return (
    <AdminLayout>
      <div className="max-w-7xl">
        <div className="mb-8">
          <h1 className="font-sans text-2xl font-semibold text-charcoal">Messages</h1>
          <p className="text-sm text-charcoal/50 font-sans mt-1">
            {messages.length} messages {unread > 0 && <span className="text-sand font-medium">· {unread} unread</span>}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 bg-white rounded border border-gray-100 overflow-hidden" style={{ minHeight: '500px' }}>
          {/* Message list */}
          <div className="lg:col-span-2 border-r border-gray-100">
            <div className="divide-y divide-gray-50">
              {messages.map(msg => (
                <button key={msg.id} onClick={() => selectMsg(msg)}
                  className={`w-full text-left p-5 transition-colors ${selected?.id === msg.id ? 'bg-sand/5 border-l-2 border-sand' : 'hover:bg-gray-50'} ${!msg.read ? 'bg-blue-50/30' : ''}`}>
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div className="flex items-center gap-2">
                      {!msg.read ? <Mail size={12} className="text-blue-500 flex-shrink-0" /> : <MailOpen size={12} className="text-charcoal/30 flex-shrink-0" />}
                      <p className={`text-sm font-sans ${!msg.read ? 'font-medium text-charcoal' : 'text-charcoal/70'}`}>{msg.name}</p>
                    </div>
                    <p className="text-[10px] text-charcoal/30 font-sans whitespace-nowrap flex-shrink-0">{msg.date}</p>
                  </div>
                  <p className="text-xs font-sans font-medium text-charcoal/70 mb-1 pl-5">{msg.subject}</p>
                  <p className="text-xs font-sans text-charcoal/40 pl-5 line-clamp-2">{msg.message}</p>
                </button>
              ))}

              {messages.length === 0 && (
                <div className="p-8 text-center">
                  <p className="text-sm text-charcoal/40 font-sans">No messages</p>
                </div>
              )}
            </div>
          </div>

          {/* Message detail */}
          <div className="lg:col-span-3 p-6">
            {selected ? (
              <div className="h-full flex flex-col">
                {/* Header */}
                <div className="flex items-start justify-between mb-6 pb-6 border-b border-gray-100">
                  <div>
                    <h2 className="font-sans font-semibold text-charcoal text-lg mb-1">{selected.subject || 'No Subject'}</h2>
                    <div className="flex items-center gap-3">
                      <p className="text-sm font-sans text-charcoal/60">{selected.name}</p>
                      <span className="text-charcoal/20">·</span>
                      <p className="text-sm text-sand font-sans">{selected.email}</p>
                    </div>
                    <div className="flex items-center gap-1 mt-1 text-xs text-charcoal/30 font-sans">
                      <Clock size={10} />
                      {selected.date}
                    </div>
                  </div>
                  <button onClick={() => deleteMsg(selected.id)}
                    className="w-8 h-8 flex items-center justify-center text-charcoal/30 hover:text-red-500 hover:bg-red-50 rounded transition-all">
                    <Trash2 size={14} />
                  </button>
                </div>

                {/* Message body */}
                <div className="flex-1 mb-6">
                  <div className="bg-gray-50 rounded p-5">
                    <p className="text-sm font-sans text-charcoal/80 leading-relaxed">{selected.message}</p>
                  </div>
                </div>

                {/* Reply section */}
                {replySent[selected.id] ? (
                  <div className="bg-emerald-50 p-4 rounded flex items-center gap-2">
                    <Reply size={14} className="text-emerald-600" />
                    <p className="text-sm font-sans text-emerald-700">Reply sent to {selected.email}</p>
                  </div>
                ) : (
                  <div>
                    <p className="text-xs tracking-widest uppercase font-sans font-medium text-charcoal mb-3">Reply</p>
                    <textarea
                      value={replyText}
                      onChange={e => setReplyText(e.target.value)}
                      rows={4}
                      placeholder={`Reply to ${selected.name}...`}
                      className="w-full border border-gray-200 rounded px-4 py-3 text-sm font-sans text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:border-sand transition-colors resize-none mb-3"
                    />
                    <button onClick={() => sendReply(selected.id)}
                      className="flex items-center gap-2 bg-charcoal text-cream px-5 py-2.5 text-xs tracking-widest uppercase font-sans font-medium hover:bg-charcoal-800 transition-colors">
                      <Reply size={12} /> Send Reply
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-center">
                <div>
                  <MailOpen size={40} className="text-charcoal/15 mx-auto mb-4" />
                  <p className="font-sans text-charcoal/40 text-sm">Select a message to read it</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
