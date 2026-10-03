(() => {
  const defaults = {
    prenom: 'LÉA',
    date: '12 mars 2024',
    heure: '08h42',
    ville: 'Paris',
    phrase: 'Le jour où tout a commencé',
  };

  const money = (cents) => new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
  }).format((Number(cents) || 0) / 100);

  const normalizeFrame = (value) => {
    const clean = String(value || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    if (clean.includes('chene')) return 'chene';
    if (clean.includes('blanc')) return 'blanc';
    return 'noir';
  };

  const formatDate = (value) => {
    if (!value) return defaults.date;
    const date = new Date(`${value}T12:00:00`);
    if (Number.isNaN(date.getTime())) return value;
    return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const fitText = (element, base, minimum, maxChars) => {
    if (!element) return;
    const length = Math.max(1, element.textContent.trim().length);
    const scale = Math.min(1, maxChars / length);
    element.style.fontSize = `${Math.max(minimum, base * scale)}cqw`;
  };

  function initProductPage() {
    const root = document.querySelector('[data-product-page]');
    if (!root) return;

    const form = document.getElementById('ProductForm');
    const variantNode = root.querySelector('[data-variants-json]');
    const selectedNode = root.querySelector('[data-selected-variant-json]');
    const hiddenVariant = form ? form.querySelector('[data-variant-id]') : null;
    const addButton = form ? form.querySelector('[data-add-to-cart]') : null;
    const addLabel = form ? form.querySelector('[data-add-label]') : null;
    const error = form ? form.querySelector('[data-form-error]') : null;
    const frameWrap = root.querySelector('.poster-frame');
    if (!form || !variantNode || !selectedNode || !hiddenVariant || !addButton) return;

    let variants = [];
    let selectedVariant = null;
    try {
      variants = JSON.parse(variantNode.textContent || '[]');
      selectedVariant = JSON.parse(selectedNode.textContent || 'null');
    } catch (event) {
      variants = [];
    }
    const options = selectedVariant && Array.isArray(selectedVariant.options) ? [...selectedVariant.options] : [];

    const findVariant = () => variants.find((variant) => (
      Array.isArray(variant.options) && variant.options.every((option, index) => option === options[index])
    ));

    const updateVariant = () => {
      const variant = findVariant();
      if (!variant || !variant.available) {
        hiddenVariant.value = variant ? variant.id : '';
        addButton.disabled = true;
        if (addLabel) addLabel.textContent = variant ? 'Indisponible dans cette combinaison' : 'Combinaison introuvable';
        return;
      }
      hiddenVariant.value = variant.id;
      addButton.disabled = false;
      if (addLabel) addLabel.textContent = `Ajouter au panier — ${money(variant.price)} TTC`;
      const framePosition = [...root.querySelectorAll('[data-option-position]')].findIndex((group) => group.querySelector('legend') && group.querySelector('legend').textContent.toLowerCase().includes('cadre'));
      const frameValue = framePosition >= 0 ? options[framePosition] : options[1];
      if (frameWrap) frameWrap.dataset.frame = normalizeFrame(frameValue);
      if (window.history && window.history.replaceState && variant.id) {
        const url = new URL(window.location.href);
        url.searchParams.set('variant', variant.id);
        window.history.replaceState({}, '', url);
      }
    };

    root.querySelectorAll('[data-option-position]').forEach((group) => {
      const position = Number(group.dataset.optionPosition || 1) - 1;
      group.querySelectorAll('[data-option-value]').forEach((button) => {
        button.addEventListener('click', () => {
          options[position] = button.dataset.optionValue;
          group.querySelectorAll('[data-option-value]').forEach((item) => item.classList.toggle('active', item === button));
          updateVariant();
        });
      });
    });

    const fields = {
      prenom: root.querySelector('[data-live-field="prenom"]'),
      date: root.querySelector('[data-live-field="date"]'),
      ville: root.querySelector('[data-live-field="ville"]'),
      phrase: root.querySelector('[data-live-field="phrase"]'),
    };
    const values = { ...defaults };
    const counter = form.querySelector('[data-message-counter]');

    const renderPreview = () => {
      fields.prenom.textContent = values.prenom || defaults.prenom;
      fields.date.textContent = `${values.date || defaults.date} · ${values.heure || defaults.heure}`;
      fields.ville.textContent = values.ville || defaults.ville;
      fields.phrase.textContent = values.phrase || defaults.phrase;
      fitText(fields.prenom, 9, 4.7, 10);
      fitText(fields.date, 3.6, 2.2, 24);
      fitText(fields.ville, 3.4, 2.1, 18);
      fitText(fields.phrase, 3.4, 2.1, 44);
    };

    form.querySelectorAll('[data-preview-input]').forEach((input) => {
      input.addEventListener('input', () => {
        const key = input.dataset.previewInput;
        let value = input.value.trim();
        if (key === 'prenom') value = value.toUpperCase();
        if (key === 'ville' && value) value = value.charAt(0).toUpperCase() + value.slice(1);
        if (key === 'phrase' && value) value = value.charAt(0).toUpperCase() + value.slice(1);
        if (key === 'date') value = formatDate(input.value);
        if (key === 'heure') value = input.value ? input.value.replace(':', 'h') : '';
        values[key] = value;
        if (key === 'phrase' && counter) counter.textContent = `${input.value.length}/60`;
        renderPreview();
      });
    });

    form.addEventListener('submit', (event) => {
      if (error) error.hidden = true;
      if (!hiddenVariant.value || addButton.disabled) {
        event.preventDefault();
        if (error) {
          error.textContent = 'Cette combinaison de taille et de cadre est indisponible.';
          error.hidden = false;
        }
        return;
      }
      if (!form.checkValidity()) {
        event.preventDefault();
        form.reportValidity();
        if (error) {
          error.textContent = 'Complétez le prénom, la date, l’heure, la ville et la vérification de l’orthographe.';
          error.hidden = false;
        }
        return;
      }
      addButton.disabled = true;
      if (addLabel) addLabel.textContent = 'Ajout au panier…';
      if (window.celestiarToast) window.celestiarToast('Votre affiche rejoint le panier.');
    });

    renderPreview();
    updateVariant();
  }

  document.addEventListener('DOMContentLoaded', initProductPage);
})();
