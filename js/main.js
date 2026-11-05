// Включаем анимации только если JavaScript работает,
// иначе блоки с классом .reveal остались бы невидимыми
document.documentElement.classList.add('js');

function initRevealOnScroll() {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    },
    { threshold: 0.12 },
  );

  document.querySelectorAll('.reveal').forEach((block) => observer.observe(block));
}

// Если фото не найдено, убираем сломанную картинку и остаются инициалы
function initPortraitFallback() {
  const photo = document.querySelector('.portrait__photo');
  if (!photo) return;

  const removePhoto = () => photo.remove();
  photo.addEventListener('error', removePhoto);

  // Ошибка могла случиться ещё до запуска скрипта
  if (photo.complete && photo.naturalWidth === 0) removePhoto();
}

initRevealOnScroll();
initPortraitFallback();
