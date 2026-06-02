const canvas = document.getElementById('product-canvas') as HTMLCanvasElement;
const context = canvas.getContext('2d');
const frameCount = 160;

// Zwraca odpowiednią ścieżkę do klatki w folderze /sequence
// Używamy import.meta.env.BASE_URL dla poprawnego działania na GitHub Pages
const currentFrame = (index: number) => 
  `${import.meta.env.BASE_URL}sequence/ezgif-frame-${index.toString().padStart(3, '0')}.jpg`;

const images: HTMLImageElement[] = [];

const preloadImages = () => {
  for (let i = 1; i <= frameCount; i++) {
    const img = new Image();
    img.src = currentFrame(i);
    images[i] = img;
  }
};
preloadImages();

const initFirstFrame = () => {
  if(context && images[1].width > 0) {
    canvas.width = images[1].width;
    canvas.height = images[1].height;
    context.drawImage(images[1], 0, 0, canvas.width, canvas.height);
  }
};

images[1].onload = initFirstFrame;
if (images[1].complete) {
  initFirstFrame();
}

const updateImage = (index: number) => {
  if(context && images[index]) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(images[index], 0, 0, canvas.width, canvas.height);
  }
}

// Logika łączenia scrolla z numerem klatki i zanikaniem tekstu
window.addEventListener('scroll', () => {
  const showcase = document.querySelector('.hero') as HTMLElement;
  const heroContent = document.querySelector('.hero-content') as HTMLElement;
  
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
    
    // Płynne znikanie tekstu podczas przewijania w dół (efekt premium)
    if(heroContent) {
      let opacity = 1 - (scrollPosition / 400); // całkowite zniknięcie po 400px
      if (opacity < 0) opacity = 0;
      if (opacity > 1) opacity = 1;
      heroContent.style.opacity = opacity.toString();
    }
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
