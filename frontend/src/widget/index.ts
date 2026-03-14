;(function () {
  // ─── Config ────────────────────────────────────────────────────────────────
  const script = (document.currentScript as HTMLScriptElement | null)
    ?? (document.querySelector('script[data-token]') as HTMLScriptElement | null)
    ?? (document.querySelector('script[src*="widget"]') as HTMLScriptElement | null)

  const token = script?.dataset.token
  if (!token) { console.warn('[AulaFlow] data-token is missing on the <script> tag'); return }

  const API = (script?.dataset.api ?? 'http://localhost:5000') + '/api/widget'
  const HEADERS = { 'Content-Type': 'application/json', 'X-Business-Token': token }

  // ─── Visitor state ─────────────────────────────────────────────────────────
  let visitorId = localStorage.getItem('_af_vid') || ''
  if (!visitorId) {
    visitorId = Math.random().toString(36).slice(2) + Date.now().toString(36)
    localStorage.setItem('_af_vid', visitorId)
  }

  // ─── State ─────────────────────────────────────────────────────────────────
  let isOpen = false
  let conversationId: string | null = localStorage.getItem('_af_cid') || null
  let leadCaptured = localStorage.getItem('_af_lead') === '1'
  let isLoading = false
  let showLeadForm = false
  let cfg = { assistantName: 'Asistente', welcomeMessage: 'Hola, ¿en qué puedo ayudarte?', primaryColor: '#1D3557' }

  // ─── Styles ────────────────────────────────────────────────────────────────
  const css = `
    #af-widget-btn {
      position: fixed; bottom: 24px; right: 24px; z-index: 99998;
      width: 56px; height: 56px; border-radius: 50%; border: none;
      background: var(--af-color); cursor: pointer;
      box-shadow: 0 4px 20px rgba(0,0,0,0.18);
      display: flex; align-items: center; justify-content: center;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    #af-widget-btn:hover { transform: scale(1.07); box-shadow: 0 6px 24px rgba(0,0,0,0.22); }
    #af-widget-btn svg { transition: transform 0.25s; }
    #af-widget-btn.open svg.icon-chat { display: none; }
    #af-widget-btn.open svg.icon-close { display: block !important; }

    #af-widget-panel {
      position: fixed; bottom: 92px; right: 24px; z-index: 99999;
      width: 368px; max-height: 580px;
      background: #fff; border-radius: 20px;
      box-shadow: 0 12px 48px rgba(0,0,0,0.16), 0 0 0 1px rgba(0,0,0,0.04);
      display: flex; flex-direction: column; overflow: hidden;
      transform-origin: bottom right;
      animation: af-in 0.22s cubic-bezier(0.16,1,0.3,1);
    }
    @keyframes af-in {
      from { opacity: 0; transform: scale(0.88) translateY(12px); }
      to   { opacity: 1; transform: scale(1) translateY(0); }
    }

    #af-header {
      background: var(--af-color); padding: 18px 20px;
      display: flex; align-items: center; gap: 12px; flex-shrink: 0;
    }
    #af-avatar {
      width: 38px; height: 38px; border-radius: 50%;
      background: rgba(255,255,255,0.2);
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0;
    }
    #af-header-info { flex: 1; min-width: 0; }
    #af-header-name { font-family: system-ui,sans-serif; font-weight: 600; font-size: 15px; color: #fff; line-height: 1.2; }
    #af-header-status { font-family: system-ui,sans-serif; font-size: 12px; color: rgba(255,255,255,0.7); display: flex; align-items: center; gap: 5px; margin-top: 2px; }
    #af-header-status::before { content:''; width:6px; height:6px; border-radius:50%; background: #4ade80; display: block; }

    #af-messages {
      flex: 1; overflow-y: auto; padding: 16px; display: flex;
      flex-direction: column; gap: 10px; min-height: 0;
      background: #FAFAF8;
    }
    #af-messages::-webkit-scrollbar { width: 4px; }
    #af-messages::-webkit-scrollbar-track { background: transparent; }
    #af-messages::-webkit-scrollbar-thumb { background: #e0e0e0; border-radius: 2px; }

    .af-msg { display: flex; max-width: 85%; animation: af-msg-in 0.18s ease; }
    @keyframes af-msg-in { from { opacity:0; transform:translateY(6px); } to { opacity:1; transform:translateY(0); } }
    .af-msg.user { align-self: flex-end; }
    .af-msg.assistant { align-self: flex-start; }
    .af-bubble {
      padding: 10px 14px; border-radius: 16px; font-family: system-ui,sans-serif;
      font-size: 14px; line-height: 1.55; word-break: break-word;
    }
    .af-msg.user .af-bubble { background: var(--af-color); color: #fff; border-bottom-right-radius: 4px; }
    .af-msg.assistant .af-bubble { background: #fff; color: #111; border-bottom-left-radius: 4px; border: 1px solid #ece9e6; }

    .af-typing { display: flex; align-items: center; gap: 4px; padding: 12px 14px; }
    .af-typing span { width: 6px; height: 6px; border-radius: 50%; background: #bbb; animation: af-bounce 1.2s infinite; }
    .af-typing span:nth-child(2) { animation-delay: 0.2s; }
    .af-typing span:nth-child(3) { animation-delay: 0.4s; }
    @keyframes af-bounce { 0%,80%,100% { transform: translateY(0); } 40% { transform: translateY(-5px); } }

    #af-footer {
      padding: 12px; border-top: 1px solid #eee; display: flex;
      align-items: flex-end; gap: 8px; flex-shrink: 0; background: #fff;
    }
    #af-input {
      flex: 1; border: 1.5px solid #e5e5e5; border-radius: 12px;
      padding: 9px 13px; font-family: system-ui,sans-serif; font-size: 14px;
      color: #111; resize: none; outline: none; max-height: 100px;
      line-height: 1.5; transition: border-color 0.15s;
      background: #fafaf8; overflow-y: hidden; scrollbar-width: none;
    }
    #af-input::-webkit-scrollbar { display: none; }
    #af-input:focus { border-color: var(--af-color); }
    #af-input::placeholder { color: #aaa; }
    #af-send {
      width: 38px; height: 38px; border-radius: 12px; border: none;
      background: var(--af-color); color: #fff; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0; transition: opacity 0.15s, transform 0.1s;
    }
    #af-send:hover { opacity: 0.9; }
    #af-send:active { transform: scale(0.93); }
    #af-send:disabled { opacity: 0.4; cursor: not-allowed; }

    #af-lead-form {
      padding: 16px; border-top: 1px solid #eee; background: #fff;
    }
    #af-lead-form p { font-family: system-ui,sans-serif; font-size: 13px; color: #555; margin: 0 0 10px; line-height: 1.5; }
    .af-field { margin-bottom: 8px; }
    .af-field input {
      width: 100%; box-sizing: border-box;
      border: 1.5px solid #e5e5e5; border-radius: 10px;
      padding: 8px 12px; font-family: system-ui,sans-serif; font-size: 13px;
      color: #111; outline: none; transition: border-color 0.15s; background: #fafaf8;
    }
    .af-field input:focus { border-color: var(--af-color); }
    .af-field input::placeholder { color: #aaa; }
    #af-lead-submit {
      width: 100%; padding: 9px; border: none; border-radius: 10px;
      background: var(--af-color); color: #fff; font-family: system-ui,sans-serif;
      font-size: 14px; font-weight: 600; cursor: pointer;
      transition: opacity 0.15s; margin-top: 4px;
    }
    #af-lead-submit:hover { opacity: 0.9; }
    #af-lead-submit:disabled { opacity: 0.5; cursor: not-allowed; }

    #af-branding {
      text-align: center; padding: 6px 0 10px;
      font-family: system-ui,sans-serif; font-size: 11px; color: #bbb;
      flex-shrink: 0; background: #fff;
    }
    #af-branding a { color: #bbb; text-decoration: none; }
    #af-branding a:hover { color: #888; }

    @media (max-width: 420px) {
      #af-widget-panel { right: 12px; left: 12px; width: auto; bottom: 84px; }
    }
  `

  // ─── DOM helpers ───────────────────────────────────────────────────────────
  function injectCSS() {
    const style = document.createElement('style')
    style.textContent = css
    document.head.appendChild(style)
  }

  function el<T extends HTMLElement>(tag: string, attrs: Record<string, string> = {}, html = '') {
    const e = document.createElement(tag) as T
    Object.entries(attrs).forEach(([k, v]) => e.setAttribute(k, v))
    if (html) e.innerHTML = html
    return e
  }

  // ─── Build UI ──────────────────────────────────────────────────────────────
  function buildUI() {
    document.documentElement.style.setProperty('--af-color', cfg.primaryColor)

    // Button
    const btn = el('button', { id: 'af-widget-btn', 'aria-label': 'Chat' }, `
      <svg class="icon-chat" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="white" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
      </svg>
      <svg class="icon-close" style="display:none" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="white" stroke-width="2.5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
      </svg>
    `)
    btn.addEventListener('click', togglePanel)

    // Panel
    const panel = el('div', { id: 'af-widget-panel' }, `
      <div id="af-header">
        <div id="af-avatar">
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="white" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/>
          </svg>
        </div>
        <div id="af-header-info">
          <div id="af-header-name">${cfg.assistantName}</div>
          <div id="af-header-status">En línea</div>
        </div>
      </div>
      <div id="af-messages"></div>
      <div id="af-footer">
        <textarea id="af-input" placeholder="Escribe tu mensaje…" rows="1"></textarea>
        <button id="af-send" aria-label="Enviar">
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
          </svg>
        </button>
      </div>
      <div id="af-branding"><a href="https://aulaflow.io" target="_blank">Powered by AulaFlow</a></div>
    `)

    panel.style.display = 'none'
    document.body.appendChild(btn)
    document.body.appendChild(panel)

    // Input events
    const input = panel.querySelector('#af-input') as HTMLTextAreaElement
    const sendBtn = panel.querySelector('#af-send') as HTMLButtonElement

    input.addEventListener('input', () => {
      input.style.height = 'auto'
      input.style.height = Math.min(input.scrollHeight, 100) + 'px'
    })
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage() }
    })
    sendBtn.addEventListener('click', sendMessage)
  }

  // ─── Panel toggle ──────────────────────────────────────────────────────────
  async function togglePanel() {
    const panel = document.getElementById('af-widget-panel')!
    const btn = document.getElementById('af-widget-btn')!
    isOpen = !isOpen

    if (isOpen) {
      panel.style.display = 'flex'
      panel.style.flexDirection = 'column'
      btn.classList.add('open')
      if (!conversationId) await startConversation()
      else scrollToBottom()
      setTimeout(() => (document.getElementById('af-input') as HTMLTextAreaElement)?.focus(), 100)
    } else {
      panel.style.display = 'none'
      btn.classList.remove('open')
    }
  }

  // ─── API ───────────────────────────────────────────────────────────────────
  async function startConversation() {
    try {
      addTypingIndicator()
      const res = await fetch(`${API}/conversations`, {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify({ visitorId }),
      })
      const data = await res.json()
      removeTypingIndicator()
      conversationId = data.conversationId
      localStorage.setItem('_af_cid', conversationId!)
      cfg.assistantName = data.assistantName
      cfg.primaryColor = data.primaryColor || cfg.primaryColor
      document.documentElement.style.setProperty('--af-color', cfg.primaryColor)
      const nameEl = document.getElementById('af-header-name')
      if (nameEl) nameEl.textContent = cfg.assistantName
      appendMessage('assistant', data.welcomeMessage)
    } catch {
      removeTypingIndicator()
      appendMessage('assistant', 'No se pudo conectar con el asistente. Inténtalo de nuevo.')
    }
  }

  async function sendMessage() {
    const input = document.getElementById('af-input') as HTMLTextAreaElement
    const content = input.value.trim()
    if (!content || isLoading || !conversationId) return

    input.value = ''
    input.style.height = 'auto'
    isLoading = true
    updateSendBtn(true)

    appendMessage('user', content)
    addTypingIndicator()

    try {
      const res = await fetch(`${API}/conversations/${conversationId}/messages`, {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify({ content }),
      })
      const data = await res.json()
      removeTypingIndicator()
      appendMessage('assistant', data.assistantMessage.content)

      // Mostrar captura de lead tras 2 respuestas si no se ha capturado
      if (!leadCaptured) checkLeadCapture()
    } catch {
      removeTypingIndicator()
      appendMessage('assistant', 'Ha ocurrido un error. Inténtalo de nuevo.')
    } finally {
      isLoading = false
      updateSendBtn(false)
    }
  }

  async function submitLead(name: string, email: string, phone: string) {
    if (!conversationId) return
    try {
      await fetch(`${API}/conversations/${conversationId}/lead`, {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify({ name, email, phone: phone || undefined }),
      })
      leadCaptured = true
      localStorage.setItem('_af_lead', '1')
      removeLeadForm()
      appendMessage('assistant', `¡Gracias, ${name}! Hemos registrado tus datos y nos pondremos en contacto contigo pronto.`)
    } catch {
      appendMessage('assistant', 'No se pudo guardar tu información. Inténtalo de nuevo.')
    }
  }

  // ─── Lead capture logic ────────────────────────────────────────────────────
  let messageCount = 0
  function checkLeadCapture() {
    messageCount++
    if (messageCount >= 2 && !showLeadForm && !leadCaptured) {
      showLeadForm = true
      renderLeadForm()
    }
  }

  function renderLeadForm() {
    const panel = document.getElementById('af-widget-panel')!
    const existing = document.getElementById('af-lead-form')
    if (existing) return

    const form = el('div', { id: 'af-lead-form' }, `
      <p>¿Quieres que te contactemos? Déjanos tus datos.</p>
      <div class="af-field"><input id="af-lead-name" type="text" placeholder="Tu nombre *" required /></div>
      <div class="af-field"><input id="af-lead-email" type="email" placeholder="Tu email *" required /></div>
      <div class="af-field"><input id="af-lead-phone" type="tel" placeholder="Teléfono (opcional)" /></div>
      <button id="af-lead-submit">Enviar mis datos</button>
    `)

    // Insert before branding
    const branding = document.getElementById('af-branding')!
    panel.insertBefore(form, branding)

    document.getElementById('af-lead-submit')!.addEventListener('click', async () => {
      const name = (document.getElementById('af-lead-name') as HTMLInputElement).value.trim()
      const email = (document.getElementById('af-lead-email') as HTMLInputElement).value.trim()
      const phone = (document.getElementById('af-lead-phone') as HTMLInputElement).value.trim()
      if (!name || !email) { alert('Nombre y email son obligatorios'); return }
      const btn = document.getElementById('af-lead-submit') as HTMLButtonElement
      btn.disabled = true
      btn.textContent = 'Enviando…'
      await submitLead(name, email, phone)
    })

    scrollToBottom()
  }

  function removeLeadForm() {
    document.getElementById('af-lead-form')?.remove()
    showLeadForm = false
  }

  // ─── Message rendering ─────────────────────────────────────────────────────
  function appendMessage(role: 'user' | 'assistant', text: string) {
    const container = document.getElementById('af-messages')!
    const wrapper = el('div', { class: `af-msg ${role}` })
    const bubble = el('div', { class: 'af-bubble' })
    bubble.textContent = text
    wrapper.appendChild(bubble)
    container.appendChild(wrapper)
    scrollToBottom()
  }

  function addTypingIndicator() {
    removeTypingIndicator()
    const container = document.getElementById('af-messages')!
    const typing = el('div', { class: 'af-msg assistant', id: 'af-typing' }, `
      <div class="af-bubble af-typing">
        <span></span><span></span><span></span>
      </div>
    `)
    container.appendChild(typing)
    scrollToBottom()
  }

  function removeTypingIndicator() {
    document.getElementById('af-typing')?.remove()
  }

  function scrollToBottom() {
    const msgs = document.getElementById('af-messages')
    if (msgs) msgs.scrollTop = msgs.scrollHeight
  }

  function updateSendBtn(disabled: boolean) {
    const btn = document.getElementById('af-send') as HTMLButtonElement
    if (btn) btn.disabled = disabled
  }

  // ─── Init ──────────────────────────────────────────────────────────────────
  function init() {
    injectCSS()
    buildUI()

    // If conversation existed, restore it when opening
    if (conversationId) {
      const panel = document.getElementById('af-widget-panel')!
      const footer = document.getElementById('af-footer')!
      const branding = document.getElementById('af-branding')!

      const restore = el('div', { style: 'padding:12px 16px; text-align:center;' }, `
        <button id="af-restore-btn" style="
          font-family:system-ui,sans-serif; font-size:13px; color:var(--af-color);
          background:none; border:none; cursor:pointer; text-decoration:underline;
        ">Cargar conversación anterior</button>
      `)
      panel.insertBefore(restore, footer)

      document.getElementById('af-restore-btn')!.addEventListener('click', async () => {
        restore.remove()
        addTypingIndicator()
        try {
          const res = await fetch(`${API}/conversations/${conversationId}/messages?visitorId=${visitorId}`, { headers: HEADERS })
          const msgs: Array<{ role: string; content: string }> = await res.json()
          removeTypingIndicator()
          msgs.forEach(m => appendMessage(m.role === 'User' ? 'user' : 'assistant', m.content))
        } catch {
          removeTypingIndicator()
          appendMessage('assistant', 'No se pudo cargar el historial.')
        }
      })
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init)
  } else {
    init()
  }
})()
