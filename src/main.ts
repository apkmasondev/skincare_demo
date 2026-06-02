const canvas = document.getElementById('product-canvas') as HTMLCanvasElement;
const context = canvas.getContext('2d');
const frameCount = 160;

// Zwraca odpowiednią ścieżkę do klatki w folderze /sequence
const currentFrame = (index: number) => 
  `/sequence/ezgif-frame-${index.toString().padStart(3, '0')}.jpg`;

const preloadImages = () => {
  for (let i = 1; i <= frameCount; i++) {
    const img = new Image();
    img.src = currentFrame(i);
  }
};

const img = new Image();
img.src = currentFrame(1);
canvas.width = 800;
canvas.height = 800;

img.onload = function() {
  if(context) {
    context.drawImage(img, 0, 0, canvas.width, canvas.height);
  }
}

const updateImage = (index: number) => {
  img.src = currentFrame(index);
  if(context) {
    context.drawImage(img, 0, 0, canvas.width, canvas.height);
  }
}

// Logika łączenia scrolla z numerem klatki
window.addEventListener('scroll', () => {
  const showcase = document.querySelector('.hero') as HTMLElement;
  
  if(showcase) {
    const rect = showcase.getBoundingClientRect();
    const scrollPosition = -rect.top;
    const maxScroll = showcase.scrollHeight - window.innerHeight;
    
    let scrollFraction = scrollPosition / maxScroll;
    if (scrollFraction < 0) scrollFraction = 0;
    if (scrollFraction > 1) scrollFraction = 1;

    // Przeliczenie frakcji (0 do 1) na index klatki (0 do 159) + 1
    const frameIndex = Math.min(
      frameCount - 1,
      Math.floor(scrollFraction * frameCount)
    );
    
    requestAnimationFrame(() => updateImage(frameIndex + 1));
  }
});

preloadImages();

// Intersection Observer dla animacji kart "Features"
const revealElements = document.querySelectorAll('.feature-card');
const revealOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px"
};

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('reveal');
      }, index * 100);
      observer.unobserve(entry.target);
    }
  });
}, revealOptions);

revealElements.forEach(el => revealObserver.observe(el));

// Intersection Observer dla tekstów Premium
const premiumBlocks = document.querySelectorAll('.premium-block');
const textOptions = {
  threshold: 0.3,
  rootMargin: "0px 0px -10% 0px"
};

const textObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, textOptions);

premiumBlocks.forEach(el => textObserver.observe(el));
