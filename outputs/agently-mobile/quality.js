/* A small last-loaded layer that makes the static marketplace feel dependable. */
(() => {
  const q = (selector) => document.querySelector(selector);
  const qa = (selector) => [...document.querySelectorAll(selector)];
  let previousScreen = 'home-screen';
  let orderSubmitting = false;

  const baseShowScreen = showScreen;
  showScreen = (screenId) => {
    const current = q('.screen.active')?.id;
    if (current && current !== screenId && current !== 'agent-profile-screen') previousScreen = current;
    baseShowScreen(screenId);
    q('.screen.active')?.scrollIntoView({ block: 'start', behavior: 'smooth' });
  };

  const baseOpenModal = openModal;
  openModal = (id) => {
    baseOpenModal(id);
    document.body.classList.add('modal-open');
    requestAnimationFrame(() => q(`#${id} button, #${id} input, #${id} textarea, #${id} select`)?.focus());
  };

  const baseCloseModals = closeModals;
  closeModals = () => {
    baseCloseModals();
    document.body.classList.remove('modal-open');
    orderSubmitting = false;
    const checkoutButton = q('#confirm-hire');
    if (checkoutButton) checkoutButton.disabled = false;
  };

  function addCheckoutGuidance() {
    const sheet = q('#hire-modal .sheet');
    const brief = q('#task-brief');
    if (!sheet || !brief) return;

    if (!q('#checkout-assurance')) {
      brief.insertAdjacentHTML('afterend', '<p class="brief-help" id="brief-help">A good brief names the result you want, the context, and anything the agent should avoid.</p>');
      q('.fine-print')?.insertAdjacentHTML('afterend', '<div class="checkout-assurance" id="checkout-assurance"><b>✓</b><div><strong>Pay only after you are happy</strong>Your payment is held safely. Review the delivery, then accept it or request a revision.</div></div><div class="checkout-steps"><span>1. Give a brief</span><span>2. Agent works</span><span>3. You review</span></div><p class="checkout-choice" id="checkout-choice" aria-live="polite"></p>');
    }
    updateCheckoutChoice();
  }

  function updateCheckoutChoice() {
    const note = q('#checkout-choice');
    const button = q('#confirm-hire');
    if (!note || !button || !activeAgent) return;
    const tier = activeAgent.tiers[selectedTier];
    note.textContent = `${tier.name} package selected · $${Number(tier.price).toFixed(2)} · ${activeAgent.turnaround}`;
    button.textContent = `Place ${tier.name} order · $${Number(tier.price).toFixed(2)}`;
  }

  function updateSearchClear() {
    const input = q('#search-input');
    const clear = q('#search-clear');
    if (!input || !clear) return;
    clear.classList.toggle('visible', Boolean(input.value.trim()));
  }

  function addSearchClear() {
    const input = q('#search-input');
    if (!input || q('#search-clear')) return;
    input.closest('.search-input')?.insertAdjacentHTML('afterend', '<button class="search-clear" id="search-clear" type="button">Clear search</button>');
    updateSearchClear();
  }

  function makeEmptySearchRecoverable() {
    const state = q('#search-results .empty-state');
    if (state && !q('#clear-search-filters')) {
      state.insertAdjacentHTML('beforeend', '<button class="secondary-button" id="clear-search-filters" type="button">Show all agents</button>');
    }
  }

  addCheckoutGuidance();
  addSearchClear();
  makeEmptySearchRecoverable();

  document.addEventListener('input', (event) => {
    if (event.target.id === 'search-input') updateSearchClear();
    if (event.target.id === 'task-brief') {
      const hint = q('#brief-help');
      if (hint) hint.textContent = `${event.target.value.trim().length}/500 characters · Clear outcomes give better work.`;
    }
  });

  document.addEventListener('click', (event) => {
    const button = event.target.closest('button');
    if (!button) return;

    if (button.classList.contains('avatar')) showScreen('profile-screen');

    if (q('#agent-profile-screen.active') && button.classList.contains('back')) {
      event.preventDefault();
      event.stopImmediatePropagation();
      showScreen(previousScreen || 'home-screen');
      return;
    }

    if (button.id === 'search-clear' || button.id === 'clear-search-filters') {
      selectedCategory = 'All';
      priceFilter = 'any';
      ratingFilter = 'any';
      const input = q('#search-input');
      if (input) input.value = '';
      renderSearch();
      addSearchClear();
      updateSearchClear();
      makeEmptySearchRecoverable();
      return;
    }

    if (button.dataset.tier || button.id === 'hire-button' || button.id === 'agent-page-buy') {
      queueMicrotask(() => { addCheckoutGuidance(); updateCheckoutChoice(); });
    }
  }, true);

  document.addEventListener('click', (event) => {
    const button = event.target.closest('button');
    if (!button || button.id !== 'confirm-hire') return;
    if (orderSubmitting) {
      event.preventDefault();
      event.stopImmediatePropagation();
      return;
    }
    orderSubmitting = true;
    button.disabled = true;
    button.textContent = 'Starting your order…';
  }, true);

  document.addEventListener('submit', (event) => {
    if (event.target.id === 'message-form') {
      event.preventDefault();
      const field = q('#message-text');
      if (!field?.value.trim()) return;
      toast('Messages are not used for orders. Put requirements in the order brief.');
      field.value = '';
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeModals();
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      showScreen('search-screen');
      q('#search-input')?.focus();
    }
  });

  const baseRenderSearch = renderSearch;
  renderSearch = () => {
    baseRenderSearch();
    addSearchClear();
    updateSearchClear();
    makeEmptySearchRecoverable();
  };
})();
