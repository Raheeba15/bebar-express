document.addEventListener('DOMContentLoaded', function() {
  const viewMoreBtn = document.getElementById('viewMoreBtn');
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  const dotsContainer = document.querySelector('.carousel-dots');
  const wrapper = document.querySelector('.testimonials-wrapper');
  
  let currentIndex = 0;
  let isExpanded = false;
  let autoSlideInterval;
  const totalCards = testimonialCards.length;

  function createDots() {
    dotsContainer.innerHTML = '';
    for (let i = 0; i < totalCards; i++) {
      const dot = document.createElement('span');
      dot.classList.add('carousel-dot');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => {
        if (!isExpanded) {
          stopAutoSlide();
          goToSlide(i);
          startAutoSlide();
        }
      });
      dotsContainer.appendChild(dot);
    }
  }

  function updateDots() {
    const dots = document.querySelectorAll('.carousel-dot');
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });
  }

  function goToSlide(index) {
    if (isExpanded) return;
    
    currentIndex = index;
    
    testimonialCards.forEach((card, idx) => {
      card.style.display = 'none';
      card.classList.remove('active');
      card.classList.add('hidden-card');
    });
    
    testimonialCards[currentIndex].style.display = 'block';
    testimonialCards[currentIndex].classList.remove('hidden-card');
    testimonialCards[currentIndex].classList.add('active');
    
    updateDots();
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % totalCards;
    goToSlide(currentIndex);
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + totalCards) % totalCards;
    goToSlide(currentIndex);
  }

  function startAutoSlide() {
    if (autoSlideInterval) {
      clearInterval(autoSlideInterval);
    }
    autoSlideInterval = setInterval(() => {
      if (!isExpanded) {
        nextSlide();
      }
    }, 4000); 
  }

  function stopAutoSlide() {
    if (autoSlideInterval) {
      clearInterval(autoSlideInterval);
    }
  }

  viewMoreBtn.addEventListener('click', function() {
    isExpanded = !isExpanded;
    
    if (isExpanded) {
      stopAutoSlide();
      
      testimonialCards.forEach((card, index) => {
        card.style.display = 'block';
        card.classList.remove('hidden-card');
        card.classList.add('show');
      });
      
      viewMoreBtn.classList.add('expanded');
      viewMoreBtn.querySelector('.btn-text').textContent = 'View Less';
      
      prevBtn.style.display = 'none';
      nextBtn.style.display = 'none';
      dotsContainer.style.display = 'none';
      
    } else {
      testimonialCards.forEach((card) => {
        card.style.display = 'none';
        card.classList.remove('show');
        card.classList.add('hidden-card');
        card.classList.remove('active');
      });
      
      viewMoreBtn.classList.remove('expanded');
      viewMoreBtn.querySelector('.btn-text').textContent = 'View More Testimonials';
      
      prevBtn.style.display = 'flex';
      nextBtn.style.display = 'flex';
      dotsContainer.style.display = 'flex';
      
      setTimeout(() => {
        currentIndex = 0;
        goToSlide(0);
        startAutoSlide();
      }, 50);
    }
  });

  prevBtn.addEventListener('click', function() {
    if (!isExpanded) {
      stopAutoSlide();
      prevSlide();
      startAutoSlide();
    }
  });

  nextBtn.addEventListener('click', function() {
    if (!isExpanded) {
      stopAutoSlide();
      nextSlide();
      startAutoSlide();
    }
  });

  const testimonialSection = document.querySelector('.testimonials-carousel');
  testimonialSection.addEventListener('mouseenter', () => {
    if (!isExpanded) {
      stopAutoSlide();
    }
  });
  
  testimonialSection.addEventListener('mouseleave', () => {
    if (!isExpanded) {
      startAutoSlide();
    }
  });

  document.addEventListener('keydown', function(e) {
    if (!isExpanded) {
      if (e.key === 'ArrowLeft') {
        stopAutoSlide();
        prevSlide();
        startAutoSlide();
      } else if (e.key === 'ArrowRight') {
        stopAutoSlide();
        nextSlide();
        startAutoSlide();
      }
    }
  });

  let touchStartX = 0;
  let touchEndX = 0;

  testimonialSection.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  testimonialSection.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  function handleSwipe() {
    if (!isExpanded) {
      if (touchEndX < touchStartX - 50) {
        stopAutoSlide();
        nextSlide();
        startAutoSlide();
      }
      if (touchEndX > touchStartX + 50) {
        stopAutoSlide();
        prevSlide();
        startAutoSlide();
      }
    }
  }

  function initCarousel() {
    testimonialCards.forEach((card) => {
      card.style.display = 'none';
      card.classList.add('hidden-card');
      card.classList.remove('active');
    });
    
    testimonialCards[0].style.display = 'block';
    testimonialCards[0].classList.remove('hidden-card');
    testimonialCards[0].classList.add('active');
    
    createDots();
    startAutoSlide();
  }

  initCarousel();
});

