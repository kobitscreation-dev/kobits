/* Small reliability layer for the static prototype. */
document.addEventListener('click', (event) => {
  if (event.target.classList.contains('modal-backdrop')) {
    closeModals();
  }

  const button = event.target.closest('button');
  if (button && button.id === 'apply-filters') {
    requestAnimationFrame(renderSearch);
  }
});

/* A static file can be opened without persistent browser storage in some viewers. */
const originalSave = save;
save = () => {
  try {
    originalSave();
  } catch {
    toast('Changes are active for this visit. Browser storage is unavailable.');
  }
};

window.addEventListener('unhandledrejection', (event) => {
  if (String(event.reason).includes('ServiceWorker')) event.preventDefault();
});
