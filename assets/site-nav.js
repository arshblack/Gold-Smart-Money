(() => {
  const buttons = document.querySelectorAll('[data-menu-toggle]');

  buttons.forEach((button) => {
    const panelId = button.getAttribute('aria-controls');
    const panel = panelId ? document.getElementById(panelId) : null;
    if (!panel) return;

    const close = () => {
      panel.hidden = true;
      button.setAttribute('aria-expanded', 'false');
    };

    button.addEventListener('click', () => {
      const willOpen = panel.hidden;
      panel.hidden = !willOpen;
      button.setAttribute('aria-expanded', String(willOpen));
    });

    panel.querySelectorAll('a').forEach((link) => link.addEventListener('click', close));
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') close();
    });
  });
})();
