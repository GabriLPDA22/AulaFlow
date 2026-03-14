(function(){(function(){let e=document.currentScript??document.querySelector(`script[data-token]`)??document.querySelector(`script[src*="widget"]`),t=e?.dataset.token;if(!t){console.warn(`[AulaFlow] data-token is missing on the <script> tag`);return}let n=(e?.dataset.api??`http://localhost:5000`)+`/api/widget`,r={"Content-Type":`application/json`,"X-Business-Token":t},i=localStorage.getItem(`_af_vid`)||``;i||(i=Math.random().toString(36).slice(2)+Date.now().toString(36),localStorage.setItem(`_af_vid`,i));let a=!1,o=localStorage.getItem(`_af_cid`)||null,s=localStorage.getItem(`_af_lead`)===`1`,c=!1,l=!1,u={assistantName:`Asistente`,welcomeMessage:`Hola, ¿en qué puedo ayudarte?`,primaryColor:`#1D3557`};function d(){let e=document.createElement(`style`);e.textContent=`
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
  `,document.head.appendChild(e)}function f(e,t={},n=``){let r=document.createElement(e);return Object.entries(t).forEach(([e,t])=>r.setAttribute(e,t)),n&&(r.innerHTML=n),r}function p(){document.documentElement.style.setProperty(`--af-color`,u.primaryColor);let e=f(`button`,{id:`af-widget-btn`,"aria-label":`Chat`},`
      <svg class="icon-chat" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="white" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
      </svg>
      <svg class="icon-close" style="display:none" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="white" stroke-width="2.5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
      </svg>
    `);e.addEventListener(`click`,m);let t=f(`div`,{id:`af-widget-panel`},`
      <div id="af-header">
        <div id="af-avatar">
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="white" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/>
          </svg>
        </div>
        <div id="af-header-info">
          <div id="af-header-name">${u.assistantName}</div>
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
    `);t.style.display=`none`,document.body.appendChild(e),document.body.appendChild(t);let n=t.querySelector(`#af-input`),r=t.querySelector(`#af-send`);n.addEventListener(`input`,()=>{n.style.height=`auto`,n.style.height=Math.min(n.scrollHeight,100)+`px`}),n.addEventListener(`keydown`,e=>{e.key===`Enter`&&!e.shiftKey&&(e.preventDefault(),g())}),r.addEventListener(`click`,g)}async function m(){let e=document.getElementById(`af-widget-panel`),t=document.getElementById(`af-widget-btn`);a=!a,a?(e.style.display=`flex`,e.style.flexDirection=`column`,t.classList.add(`open`),o?T():await h(),setTimeout(()=>document.getElementById(`af-input`)?.focus(),100)):(e.style.display=`none`,t.classList.remove(`open`))}async function h(){try{C();let e=await(await fetch(`${n}/conversations`,{method:`POST`,headers:r,body:JSON.stringify({visitorId:i})})).json();w(),o=e.conversationId,localStorage.setItem(`_af_cid`,o),u.assistantName=e.assistantName,u.primaryColor=e.primaryColor||u.primaryColor,document.documentElement.style.setProperty(`--af-color`,u.primaryColor);let t=document.getElementById(`af-header-name`);t&&(t.textContent=u.assistantName),S(`assistant`,e.welcomeMessage)}catch{w(),S(`assistant`,`No se pudo conectar con el asistente. Inténtalo de nuevo.`)}}async function g(){let e=document.getElementById(`af-input`),t=e.value.trim();if(!(!t||c||!o)){e.value=``,e.style.height=`auto`,c=!0,E(!0),S(`user`,t),C();try{let e=await(await fetch(`${n}/conversations/${o}/messages`,{method:`POST`,headers:r,body:JSON.stringify({content:t})})).json();w(),S(`assistant`,e.assistantMessage.content),s||y()}catch{w(),S(`assistant`,`Ha ocurrido un error. Inténtalo de nuevo.`)}finally{c=!1,E(!1)}}}async function _(e,t,i){if(o)try{await fetch(`${n}/conversations/${o}/lead`,{method:`POST`,headers:r,body:JSON.stringify({name:e,email:t,phone:i||void 0})}),s=!0,localStorage.setItem(`_af_lead`,`1`),x(),S(`assistant`,`¡Gracias, ${e}! Hemos registrado tus datos y nos pondremos en contacto contigo pronto.`)}catch{S(`assistant`,`No se pudo guardar tu información. Inténtalo de nuevo.`)}}let v=0;function y(){v++,v>=2&&!l&&!s&&(l=!0,b())}function b(){let e=document.getElementById(`af-widget-panel`);if(document.getElementById(`af-lead-form`))return;let t=f(`div`,{id:`af-lead-form`},`
      <p>¿Quieres que te contactemos? Déjanos tus datos.</p>
      <div class="af-field"><input id="af-lead-name" type="text" placeholder="Tu nombre *" required /></div>
      <div class="af-field"><input id="af-lead-email" type="email" placeholder="Tu email *" required /></div>
      <div class="af-field"><input id="af-lead-phone" type="tel" placeholder="Teléfono (opcional)" /></div>
      <button id="af-lead-submit">Enviar mis datos</button>
    `),n=document.getElementById(`af-branding`);e.insertBefore(t,n),document.getElementById(`af-lead-submit`).addEventListener(`click`,async()=>{let e=document.getElementById(`af-lead-name`).value.trim(),t=document.getElementById(`af-lead-email`).value.trim(),n=document.getElementById(`af-lead-phone`).value.trim();if(!e||!t){alert(`Nombre y email son obligatorios`);return}let r=document.getElementById(`af-lead-submit`);r.disabled=!0,r.textContent=`Enviando…`,await _(e,t,n)}),T()}function x(){document.getElementById(`af-lead-form`)?.remove(),l=!1}function S(e,t){let n=document.getElementById(`af-messages`),r=f(`div`,{class:`af-msg ${e}`}),i=f(`div`,{class:`af-bubble`});i.textContent=t,r.appendChild(i),n.appendChild(r),T()}function C(){w();let e=document.getElementById(`af-messages`),t=f(`div`,{class:`af-msg assistant`,id:`af-typing`},`
      <div class="af-bubble af-typing">
        <span></span><span></span><span></span>
      </div>
    `);e.appendChild(t),T()}function w(){document.getElementById(`af-typing`)?.remove()}function T(){let e=document.getElementById(`af-messages`);e&&(e.scrollTop=e.scrollHeight)}function E(e){let t=document.getElementById(`af-send`);t&&(t.disabled=e)}function D(){if(d(),p(),o){let e=document.getElementById(`af-widget-panel`),t=document.getElementById(`af-footer`);document.getElementById(`af-branding`);let a=f(`div`,{style:`padding:12px 16px; text-align:center;`},`
        <button id="af-restore-btn" style="
          font-family:system-ui,sans-serif; font-size:13px; color:var(--af-color);
          background:none; border:none; cursor:pointer; text-decoration:underline;
        ">Cargar conversación anterior</button>
      `);e.insertBefore(a,t),document.getElementById(`af-restore-btn`).addEventListener(`click`,async()=>{a.remove(),C();try{let e=await(await fetch(`${n}/conversations/${o}/messages?visitorId=${i}`,{headers:r})).json();w(),e.forEach(e=>S(e.role===`User`?`user`:`assistant`,e.content))}catch{w(),S(`assistant`,`No se pudo cargar el historial.`)}})}}document.readyState===`loading`?document.addEventListener(`DOMContentLoaded`,D):D()})()})();