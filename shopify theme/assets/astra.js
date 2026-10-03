(() => {
  const fallback = "Astra sera connectée dès que l'URL de l'API sera renseignée dans les paramètres du thème. En attendant, écrivez-nous à celestiarshop@outlook.com.";

  const sessionId = () => {
    let id = window.localStorage.getItem('astra_session');
    if (!id) {
      id = crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
      window.localStorage.setItem('astra_session', id);
    }
    return id;
  };

  function initAstra() {
    const root = document.querySelector('[data-astra]');
    if (!root) return;
    const toggle = root.querySelector('[data-astra-toggle]');
    const panel = root.querySelector('[data-astra-panel]');
    const messages = root.querySelector('[data-astra-messages]');
    const chips = root.querySelector('[data-astra-chips]');
    const form = root.querySelector('[data-astra-form]');
    const input = root.querySelector('[data-astra-input]');
    const openIcon = root.querySelector('.astra__icon-open');
    const closeIcon = root.querySelector('.astra__icon-close');
    let streaming = false;

    const scroll = () => {
      messages.scrollTop = messages.scrollHeight;
    };
    const addMessage = (role, content) => {
      const node = document.createElement('div');
      node.className = `astra__message astra__message--${role}`;
      node.setAttribute('data-testid', `astra-message-${messages.children.length}`);
      node.textContent = content;
      messages.appendChild(node);
      scroll();
      return node;
    };
    const setOpen = (open) => {
      panel.hidden = !open;
      openIcon.hidden = open;
      closeIcon.hidden = !open;
      toggle.setAttribute('aria-expanded', String(open));
      if (open) window.setTimeout(() => input.focus(), 80);
    };

    toggle.addEventListener('click', () => setOpen(panel.hidden));

    const send = async (text) => {
      const message = String(text || input.value || '').trim();
      if (!message || streaming) return;
      streaming = true;
      input.value = '';
      if (chips) chips.hidden = true;
      addMessage('user', message);
      const answer = addMessage('assistant', '…');
      const apiUrl = String(root.dataset.apiUrl || '').trim().replace(/\/$/, '');

      if (!apiUrl) {
        answer.textContent = fallback;
        streaming = false;
        return;
      }

      try {
        const response = await fetch(`${apiUrl}/astra/chat`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ session_id: sessionId(), message }),
        });
        if (!response.ok || !response.body) throw new Error('http');
        answer.textContent = '';
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const parts = buffer.split('\n\n');
          buffer = parts.pop();
          parts.forEach((part) => {
            if (!part.startsWith('data: ')) return;
            const data = part.slice(6);
            if (data === '[DONE]') return;
            try {
              const parsed = JSON.parse(data);
              if (parsed.error) throw new Error('stream');
              if (parsed.delta) {
                answer.textContent += parsed.delta;
                scroll();
              }
            } catch (event) {
              if (event.message === 'stream') throw event;
            }
          });
        }
        if (!answer.textContent.trim()) throw new Error('empty');
      } catch (event) {
        answer.textContent = 'Petite interférence cosmique… Réessayez dans un instant, ou écrivez-nous à celestiarshop@outlook.com.';
      } finally {
        streaming = false;
        scroll();
      }
    };

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      send();
    });
    root.querySelectorAll('[data-astra-chip]').forEach((chip) => {
      chip.addEventListener('click', () => send(chip.textContent));
    });
  }

  document.addEventListener('DOMContentLoaded', initAstra);
})();
