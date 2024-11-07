 // Tạo Intersection Observer để theo dõi khi phần tử vào vùng nhìn thấy
 document.addEventListener('DOMContentLoaded', () => {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const observerOptions = {
      root: null, // Theo dõi vùng nhìn thấy của viewport
      rootMargin: '0px',
      threshold: 0.1 // Phần tử cần ít nhất 10% visible để trigger
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // Ngừng theo dõi sau khi đã hiện lên
        }
      });
    }, observerOptions);

    fadeElements.forEach(element => observer.observe(element));
  });