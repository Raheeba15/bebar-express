document.addEventListener('DOMContentLoaded', function() {
  const viewMoreBtn = document.getElementById('viewMoreBtn');
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  const dotsContainer = document.querySelector('.carousel-dots');
  const wrapper = document.querySelector('.testimonials-wrapper');
  
  let currentPage = 0;
  let isExpanded = false;
  let autoSlideInterval;
  const totalCards = testimonialCards.length;
  let visibleCount = getVisibleCount();
  let totalPages = Math.max(1, Math.ceil(totalCards / visibleCount));

  function getVisibleCount() {
    if (window.innerWidth < 768) return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
  }

  function createDots() {
    dotsContainer.innerHTML = '';
    for (let i = 0; i < totalPages; i++) {
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
      dot.classList.toggle('active', index === currentPage);
    });
  }

  function goToSlide(index) {
    if (isExpanded) return;
    
    currentPage = index;
    const start = currentPage * visibleCount;
    const end = start + visibleCount;
    
    testimonialCards.forEach((card, idx) => {
      const inView = idx >= start && idx < end;
      card.style.display = inView ? 'flex' : 'none';
      card.classList.toggle('active', inView);
      card.classList.toggle('hidden-card', !inView);
    });
    
    updateDots();
  }

  function nextSlide() {
    currentPage = (currentPage + 1) % totalPages;
    goToSlide(currentPage);
  }

  function prevSlide() {
    currentPage = (currentPage - 1 + totalPages) % totalPages;
    goToSlide(currentPage);
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
      
      // Add expanded class to wrapper for grid layout
      wrapper.classList.add('expanded');
      
      testimonialCards.forEach((card, index) => {
        card.style.display = 'flex';
        card.classList.remove('hidden-card');
        card.classList.add('show');
        // Add staggered animation delay
        card.style.animationDelay = `${index * 0.1}s`;
      });
      
      viewMoreBtn.classList.add('expanded');
      viewMoreBtn.querySelector('.btn-text').textContent = 'View Less';
      
      prevBtn.style.display = 'none';
      nextBtn.style.display = 'none';
      dotsContainer.style.display = 'none';
      
    } else {
      // Remove expanded class
      wrapper.classList.remove('expanded');
      
      testimonialCards.forEach((card) => {
        card.style.display = 'none';
        card.style.animationDelay = '0s';
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
        currentPage = 0;
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
    visibleCount = getVisibleCount();
    totalPages = Math.max(1, Math.ceil(totalCards / visibleCount));
    testimonialCards.forEach((card) => {
      card.style.display = 'none';
      card.classList.add('hidden-card');
      card.classList.remove('active');
    });
    
    goToSlide(0);
    
    createDots();
    startAutoSlide();
  }

  window.addEventListener('resize', () => {
    const newVisible = getVisibleCount();
    if (newVisible !== visibleCount && !isExpanded) {
      visibleCount = newVisible;
      totalPages = Math.max(1, Math.ceil(totalCards / visibleCount));
      currentPage = Math.min(currentPage, totalPages - 1);
      createDots();
      goToSlide(currentPage);
    }
  });

  initCarousel();
});

