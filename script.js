// ===========================
// 🎵 MUSIC PLAYER — Simple iframe
// Lagu: Ayah - Marcello Tahitoe
// ===========================

let isPlaying = false;
const YT_ID = 'FuEDzFOg7go';

// Tombol MULAI di overlay → buat iframe dengan autoplay setelah user klik
function startExperience() {
  closeOverlay();
  playYoutube();
}

// Tombol LEWATI
function skipMusic() {
  closeOverlay();
}

function closeOverlay() {
  const overlay = document.getElementById('startOverlay');
  overlay.classList.add('hiding');
  setTimeout(() => { overlay.style.display = 'none'; }, 600);
}

function playYoutube() {
  const container = document.getElementById('ytContainer');
  // Bersihkan dulu
  container.innerHTML = '';
  // Buat iframe baru dengan autoplay — WAJIB setelah interaksi user
  const iframe = document.createElement('iframe');
  iframe.id = 'ytFrame';
  iframe.width = '1';
  iframe.height = '1';
  iframe.frameBorder = '0';
  iframe.allow = 'autoplay; encrypted-media';
  iframe.src = `https://www.youtube.com/embed/${YT_ID}?autoplay=1&loop=1&playlist=${YT_ID}&controls=0&rel=0&playsinline=1`;
  container.appendChild(iframe);

  isPlaying = true;
  document.getElementById('musicDisc').classList.add('spinning');
  document.getElementById('playBtn').textContent = '⏸';
}

function stopYoutube() {
  const container = document.getElementById('ytContainer');
  container.innerHTML = ''; // Hapus iframe = stop musik
  isPlaying = false;
  document.getElementById('musicDisc').classList.remove('spinning');
  document.getElementById('playBtn').textContent = '▶';
}

function toggleMusic() {
  if (isPlaying) {
    stopYoutube();
  } else {
    playYoutube();
  }
}

function setVolume(val) {
  // Volume dikontrol lewat slider YouTube embed via postMessage
  const iframe = document.getElementById('ytFrame');
  if (iframe && iframe.contentWindow) {
    iframe.contentWindow.postMessage(JSON.stringify({
      event: 'command',
      func: 'setVolume',
      args: [parseInt(val)]
    }), '*');
  }
}

// Expand panel saat klik disc
document.getElementById('musicDisc').addEventListener('click', () => {
  document.getElementById('musicPlayer').classList.toggle('expanded');
});


const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ===========================
// ANIMATED COUNTER
// ===========================
function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-target'));
  const duration = 2000;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target).toLocaleString('id-ID');
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target.toLocaleString('id-ID');
  }

  requestAnimationFrame(update);
}

// ===========================
// INTERSECTION OBSERVER
// ===========================
const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
};

// Counter observer
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const counters = entry.target.querySelectorAll('.stat-number');
      counters.forEach(counter => animateCounter(counter));
      counterObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

const statsGrid = document.querySelector('.stats-grid');
if (statsGrid) counterObserver.observe(statsGrid);

// Fade-in observer
const fadeElements = [
  ...document.querySelectorAll('.reason-card'),
  ...document.querySelectorAll('.gallery-item'),
  ...document.querySelectorAll('.timeline-item'),
  ...document.querySelectorAll('.stat-card'),
];

fadeElements.forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = `opacity 0.6s ease ${i * 0.1}s, transform 0.6s ease ${i * 0.1}s`;
});

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      fadeObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

fadeElements.forEach(el => fadeObserver.observe(el));

// ===========================
// CAROUSEL / UCAPAN
// ===========================
let currentWish = 0;
const totalWishes = 4;

function goToWish(index) {
  const cards = document.querySelectorAll('.wish-card');
  const dots = document.querySelectorAll('.dot');

  cards[currentWish].classList.remove('active');
  dots[currentWish].classList.remove('active');

  currentWish = (index + totalWishes) % totalWishes;

  cards[currentWish].classList.add('active');
  dots[currentWish].classList.add('active');
}

function changeWish(direction) {
  goToWish(currentWish + direction);
}

// Auto-advance carousel
setInterval(() => changeWish(1), 5000);

// ===========================
// MESSAGE FORM
// ===========================
function sendMessage(event) {
  event.preventDefault();
  const name = document.getElementById('senderName').value;
  const father = document.getElementById('fatherName').value;
  const form = document.getElementById('messageForm');
  const successMsg = document.getElementById('successMsg');
  const successText = document.getElementById('successText');

  successText.textContent = `Pesan cintamu dari ${name} untuk Ayah ${father} sudah terkirim! Semoga Ayahmu selalu sehat dan bahagia. 🧡`;

  form.style.opacity = '0';
  form.style.transform = 'scale(0.95)';
  form.style.transition = 'all 0.4s ease';

  setTimeout(() => {
    form.style.display = 'none';
    successMsg.style.display = 'block';
    successMsg.style.opacity = '0';
    successMsg.style.transform = 'scale(0.9)';
    successMsg.style.transition = 'all 0.5s ease';
    setTimeout(() => {
      successMsg.style.opacity = '1';
      successMsg.style.transform = 'scale(1)';
    }, 50);
  }, 400);
}

// ===========================
// FLOATING PARTICLES (decorative)
// ===========================
function createParticles() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  for (let i = 0; i < 20; i++) {
    const particle = document.createElement('div');
    const size = Math.random() * 6 + 2;
    const x = Math.random() * 100;
    const delay = Math.random() * 8;
    const duration = Math.random() * 10 + 10;

    particle.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      background: rgba(245, 200, 66, ${Math.random() * 0.4 + 0.1});
      border-radius: 50%;
      left: ${x}%;
      bottom: -10px;
      z-index: 1;
      animation: floatUp ${duration}s ${delay}s linear infinite;
      pointer-events: none;
    `;
    hero.appendChild(particle);
  }

  const style = document.createElement('style');
  style.textContent = `
    @keyframes floatUp {
      0% { transform: translateY(0) scale(1); opacity: 1; }
      100% { transform: translateY(-110vh) scale(0.3); opacity: 0; }
    }
  `;
  document.head.appendChild(style);
}

createParticles();

// ===========================
// ACTIVE NAV LINK ON SCROLL
// ===========================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let currentSection = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      currentSection = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === `#${currentSection}`) {
      link.style.color = '#f5c842';
    }
  });
});

// ===========================
// SMOOTH HOVER ON GALLERY
// ===========================
document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('mouseenter', function() {
    this.style.zIndex = '5';
  });
  item.addEventListener('mouseleave', function() {
    this.style.zIndex = '';
  });
});

console.log('%c🎉 Selamat Hari Ayah! 👨‍👧‍👦', 'font-size: 20px; color: #f5c842; font-weight: bold;');
