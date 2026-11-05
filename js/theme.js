// Переключатель темы: светлая, тёмная или как в системе
(function () {
  const root = document.documentElement;
  const buttons = document.querySelectorAll('[data-theme-choice]');
  const metaThemeColor = document.querySelector('meta[name="theme-color"]');
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)');

  function currentChoice() {
    const theme = root.dataset.theme;
    return theme === 'light' || theme === 'dark' ? theme : 'system';
  }

  function syncThemeColor() {
    if (!metaThemeColor) return;
    const bg = getComputedStyle(root).getPropertyValue('--color-bg').trim();
    if (bg) metaThemeColor.setAttribute('content', bg);
  }

  function render(choice) {
    buttons.forEach((button) => {
      button.setAttribute('aria-pressed', String(button.dataset.themeChoice === choice));
    });
    syncThemeColor();
  }

  function setChoice(choice) {
    if (choice === 'system') {
      delete root.dataset.theme;
    } else {
      root.dataset.theme = choice;
    }

    try {
      if (choice === 'system') localStorage.removeItem('theme');
      else localStorage.setItem('theme', choice);
    } catch (e) {}

    render(choice);
  }

  buttons.forEach((button) => {
    button.addEventListener('click', () => setChoice(button.dataset.themeChoice));
  });

  systemDark.addEventListener('change', () => {
    if (currentChoice() === 'system') syncThemeColor();
  });

  window.addEventListener('storage', (event) => {
    if (event.key !== 'theme') return;
    if (event.newValue === 'light' || event.newValue === 'dark') {
      root.dataset.theme = event.newValue;
    } else {
      delete root.dataset.theme;
    }
    render(currentChoice());
  });

  render(currentChoice());
})();
