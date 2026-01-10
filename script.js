const galleryHeader = document.getElementById('galleryHeader');


// PALABRAS CLAVE
const yearEl = document.getElementById('year');
const galleryModal = document.getElementById('galleryModal');
const modalClose = galleryModal.querySelector('.modal-close');
const carouselTrack = document.querySelector('.carousel-track');
const carouselPrev = document.querySelector('.carousel-btn.prev');
const carouselNext = document.querySelector('.carousel-btn.next');
const playBtn = document.getElementById('carouselPlay');
const pauseBtn = document.getElementById('carouselPause');

yearEl.textContent = new Date().getFullYear();


const galleryTexts = {
  'Bubb': 'Bubb — Lámpara experimental que combina rigidez y flexibilidad.',
  'Campgrill': 'Camp & Grill — Barbacoa portátil diseñada para camping.',
  'Tabhaus': 'Tabhaus — Taburete modular inspirado en Bauhaus.',
  'Towerfridge': 'Tower Fridge — Frigorífico eco-friendly sin electricidad.'
};


function openGallery(key){
  const images = galleries[key] || [];
  if(!images.length) return;

  currentGallery = images;
  currentIndex = 0;

  // Cambia el texto según el proyecto
  galleryHeader.textContent = galleryTexts[key] || '';

  renderCarousel();
  galleryModal.setAttribute('aria-hidden','false');
  document.body.style.overflow = 'hidden';
  startAutoplay();
};



// PARA QUE DESLICE 
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const href = a.getAttribute('href');
    if(!href || href === '#') return;
    const target = document.querySelector(href);
    if(target){
      e.preventDefault();
      target.scrollIntoView({behavior:'smooth', block:'start'});
    }
  });
});



// SCROLL DE LADO A LADO
const reveals = document.querySelectorAll('.reveal');
const obs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
    }
  });
},);
reveals.forEach(r => obs.observe(r));



//  LAS FOTOS DE CADA PROYECTO 
const galleries = {
  'bubb': ['./img/foto1BUBB1.jpg', './img/foto1BUBB2.jpg','./img/foto1BUBB3.jpg','./img/foto1BUBB4.jpg','./img/foto1BUBB5.jpg','./img/foto1BUBB6.jpg','./img/foto1BUBB7.jpg','./img/foto1BUBB8.jpg'],
  'campgrill': ['./img/foto2CAMP&GRILL2.jpg','./img/foto2CAMP&GRILL3.jpg','./img/foto2CAMP&GRILL4.jpg','./img/foto2CAMP&GRILL5.jpg','./img/foto2CAMP&GRILL6.jpg','./img/foto2CAMP&GRILL7.jpg','./img/foto2CAMP&GRILL8.jpg','./img/foto2CAMP&GRILL9.jpg','./img/foto2CAMP&GRILL10.jpg','./img/foto2CAMP&GRILL11.jpg','./img/foto2CAMP&GRILL12.jpg','./img/foto2CAMP&GRILL13.jpg','./img/foto2CAMP&GRILL14.jpg','./img/foto2CAMP&GRILL15.jpg','./img/foto2CAMP&GRILL16.jpg','./img/foto2CAMP&GRILL17.jpg','./img/foto2CAMP&GRILL18.jpg','./img/foto2CAMP&GRILL19.jpg','./img/foto2CAMP&GRILL20.jpg',],
  'tabhaus': ['./img/foto3TABHAUS1.jpg','./img/foto3TABHAUS2.jpg','./img/foto3TABHAUS3.jpg','./img/foto3TABHAUS4.jpg','./img/foto3TABHAUS5.jpg','./img/foto3TABHAUS6.jpg','./img/foto3TABHAUS7.jpg','./img/foto3TABHAUS8.jpg','./img/foto3TABHAUS9.jpg','./img/foto3TABHAUS10.jpg','./img/foto3TABHAUS11.jpg',],
  'towerfridge': ['./img/foto4FRIDGE2.png','./img/foto4FRIDGE3.png','./img/foto4FRIDGE4.png','./img/foto4FRIDGE5.png',]
};


//EL PASO DE LAS FOTOS
let currentIndex = 0;
let currentGallery = [];
let autoplayTimer = null;
const AUTOPLAY_DELAY = 2000;



// FUNCIONAMIENTO BOTONES DE LA GALERIA 
document.querySelectorAll('.js-open-gallery').forEach(btn => {
  btn.addEventListener('click', () => {
    const key = btn.dataset.gallery;
    openGallery(key);
  });
});



// CERRAR LAS FOTOS CON LA X O CON EL FONDO
modalClose.addEventListener('click', closeGallery);
galleryModal.addEventListener('click', (e) => {
  if(e.target === galleryModal) closeGallery();
});
function closeGallery(){
  galleryModal.setAttribute('aria-hidden','true');
  document.body.style.overflow = '';
  stopAutoplay();
}


function renderCarousel() {
  // VACIA EL CARRUSEL
  carouselTrack.innerHTML = '';
  // AÑADE CADA IMAGEN
  for (let i = 0; i < currentGallery.length; i++) {
    let img = document.createElement('img');
    img.src = currentGallery[i];
    carouselTrack.appendChild(img);
  }
  // ENSEÑA LA PRIMERA FOTO
  carouselTrack.style.transform = 'translateX(0)';
}


// MOVIMIENTO PASAR LAS FOTOS
function updateCarouselPosition(){
  const w = carouselTrack.querySelector('img')?.clientWidth || carouselTrack.clientWidth;
  carouselTrack.style.transform = `translateX(-${currentIndex * (w + 8)}px)`;
}
// ALANTE Y DETRAS 
function prevSlide(){
  currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
  updateCarouselPosition();
}
function nextSlide(){
  currentIndex = (currentIndex + 1) % currentGallery.length;
  updateCarouselPosition();
}
carouselPrev.addEventListener('click', prevSlide);
carouselNext.addEventListener('click', nextSlide);



// REPRODUCCION AUTOMATICAA DE LAS FOTOS
function startAutoplay(){
  stopAutoplay();
  autoplayTimer = setInterval(() => {
    nextSlide();
  }, AUTOPLAY_DELAY);
}
function stopAutoplay(){
  if(autoplayTimer) clearInterval(autoplayTimer);
  autoplayTimer = null;
}
playBtn?.addEventListener('click', startAutoplay);
pauseBtn?.addEventListener('click', stopAutoplay);

// Recompute on resize to keep correct transform
window.addEventListener('resize', () => {
  setTimeout(updateCarouselPosition, 120);
});


