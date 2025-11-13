// === ESTADO GLOBAL ===
let initialized = false;
let scrollTimeout;
let resend; // Resend será inicializado no DOMContentLoaded

// === TRADUÇÃO COMPLETA (COM HTML PARA CORES) ===
const translations = {
  pt: {
    title: "Viginaldo Jaquim - Portfólio",
    loading: "VIGINALDO JAQUIM",
    location: "Desenvolvedor Web & UI/UX Designer",
    typing: "Desenvolvedor Web & UI/UX Designer",
    home: "Início", about: "Sobre", experience: "Experiência", skills: "Habilidades",
    projects: "Projetos", testimonials: "Depoimentos", contact: "Contato",
    projects_btn: "Ver Projetos", contact_btn: "Contato", cv_btn: "Download CV",
    visits: "Visitas:",
    freelancer: "Concurso - Destiny", freelancer_desc: "Premio do 1º lugar no desenvolvimento de um sistema de gestão de Hoteis/Restaurantes.",
    freelancer_2: "Website - Destiny", freelancer_desc_2: "Desenvolvimento de um website.",
    title_Book: "BookZone", title_Book_desc: "A sua loja de livros digital",
    title_Dest: "Destine - Website", title_Dest_desc: "Web Com as maiores marcas de Destiny",
    title_its: "ISCTEM", title_its_desc: "Projeto escolar",
    title_rank: "Ranking", title_rank_desc: "Projeto de ranking",
    title_pharm: "PharmaFind", title_pharm_desc: "A sua loja de medicamentos",
    live: "Live", github: "GitHub",
    name_placeholder: "Seu Nome", email_placeholder: "Seu Email", message_placeholder: "Sua Mensagem", send: "Enviar",
    testimonial_1: '"Trabalho excelente! Entrega rápida e código limpo."',
    testimonial_2: '"Recomendo 100%. Transformo vossas ideias em realidade."',
    made_with: "Feito com", in_moz: "em Moçambique",
    lang_pt: "Português", lang_en: "English",

    about_text: `Sou um <span class="keyword">const</span> <span class="variable">dev</span> = <span class="string">"<strong>Desenvolvedor Web & UI/UX Designer</strong>"</span> 
      apaixonado por transformar <span class="string">"ideias"</span> em 
      <span class="neon">experiências digitais que funcionam e encantam</span>.`,

    about_text2: `Trabalho com <span class="keyword">const</span> <span class="variable">stack</span> = [
        <span class="tech">React</span>, <span class="tech">JavaScript</span>, 
        <span class="tech">PHP</span>, <span class="tech">MySQL</span>
      ] e hospedagem em <span class="tech">Vercel</span>.
      Crio sites <span class="highlight">rápidos</span>, <span class="highlight">responsivos</span> e com design moderno — 
      do protótipo ao <span class="function">Produção</span>.`,

    about_text3: `Meu foco? <span class="keyword">return</span> {
        <span class="property">simplicidade</span>: <span class="boolean">true</span>,
        <span class="property">eficiência</span>: <span class="boolean">true</span>,
        <span class="property">toqueHumano</span>: <span class="boolean">true</span>
      } para Pequenas e Medias Empresas.`
  },
  en: {
    title: "Viginaldo Jaquim - Portfolio",
    loading: "VIGINALDO JAQUIM",
    location: "Web Developer & UI/UX Designer",
    typing: "Web Developer & UI/UX Designer",
    home: "Home", about: "About", experience: "Experience", skills: "Skills",
    projects: "Projects", testimonials: "Testimonials", contact: "Contact",
    projects_btn: "View Projects", contact_btn: "Contact", cv_btn: "Download CV",
    visits: "Visits:",
    freelancer: "Destiny - Contest", freelancer_desc: "1st place prize in the development of a hotel/restaurant management system.",
    freelancer_2: "Website - Destiny", freelancer_desc_2: "Website development.",
    title_Book: "BookZone", title_Book_desc: "Your digital book store",
    title_Dest: "Destiny - Website", title_Dest_desc: "Website with the top Destiny brands",
    title_its: "ISCTEM", title_its_desc: "School project",
    title_rank: "Ranking", title_rank_desc: "Ranking project",
    title_pharm: "PharmaFind", title_pharm_desc: "Your pharmacy store",
    live: "Live", github: "GitHub",
    name_placeholder: "Your Name", email_placeholder: "Your Email", message_placeholder: "Your Message", send: "Send",
    testimonial_1: '"Excellent work! Fast delivery and clean code."',
    testimonial_2: '"100% recommended. Turn your ideas into reality."',
    made_with: "Made with", in_moz: "in Mozambique",
    lang_pt: "Portuguese", lang_en: "English",

    about_text: `I'm a <span class="keyword">const</span> <span class="variable">dev</span> = <span class="string">"<strong>Web Developer & UI/UX Designer</strong>"</span> 
      passionate about turning <span class="string">"ideas"</span> into 
      <span class="neon">digital experiences that work and delight</span>.`,

    about_text2: `I work with <span class="keyword">const</span> <span class="variable">stack</span> = [
        <span class="tech">React</span>, <span class="tech">JavaScript</span>, 
        <span class="tech">PHP</span>, <span class="tech">MySQL</span>
      ] and hosting on <span class="tech">Vercel</span>.
      I build <span class="highlight">fast</span>, <span class="highlight">responsive</span> websites with modern design — 
      from prototype to <span class="function">Production</span>.`,

    about_text3: `My focus? <span class="keyword">return</span> {
        <span class="property">simplicity</span>: <span class="boolean">true</span>,
        <span class="property">efficiency</span>: <span class="boolean">true</span>,
        <span class="property">humanTouch</span>: <span class="boolean">true</span>
      } for Small and Medium Businesses.`
  }
};

// === changeLanguage() ===
function changeLanguage(lang) {
  if (!translations[lang]) return;
  
  localStorage.setItem('lang', lang);
  document.documentElement.lang = lang;
  document.documentElement.id = `lang-${lang}`;
  
  document.querySelectorAll('[data-key]').forEach(el => {
    const key = el.getAttribute('data-key');
    const html = translations[lang][key];
    if (!html || el.id === 'visit-count') return;

    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      el.setAttribute('placeholder', html.replace(/<[^>]*>/g, ''));
    } else {
      el.innerHTML = html;
    }
  });

  document.title = translations[lang].title;

  const typingEl = document.getElementById('typing');
  if (typingEl && typingEl.dataset.typing === 'true') {
    typingEl.textContent = '';
    typingEl.dataset.typing = 'false';
    startTyping(translations[lang].typing.replace(/<[^>]*>/g, ''));
  }
}

// === startTyping() — ANTES DO hideLoader ===
function startTyping(text) {
  const el = document.getElementById('typing');
  if (!el || el.dataset.typing === 'true') return;
  el.dataset.typing = 'true';

  let i = 0;
  el.textContent = '';
  const type = () => {
    if (i < text.length) {
      el.textContent += text.charAt(i++);
      setTimeout(type, 110);
    } else {
      el.innerHTML += '<span class="cursor">|</span>';
    }
  };
  type();
}

// === hideLoader() — AGORA FUNCIONA COM TEU HTML! ===
function hideLoader() {
  if (initialized) return;
  initialized = true;

  const loader = document.getElementById('loader');
  const main = document.getElementById('main'); // ← ID DO TEU HTML

  if (!loader || !main) {
    console.error('Loader ou main não encontrados! Verifique o HTML.');
    return;
  }

  loader.style.opacity = '0';
  main.style.opacity = '1';
  main.classList.add('show');

  setTimeout(() => {
    loader.style.display = 'none';
    document.body.style.overflow = 'auto';

    const lang = localStorage.getItem('lang') || 'pt';
    changeLanguage(lang);
    startTyping(translations[lang].typing.replace(/<[^>]*>/g, ''));
    highlightMenu();
    debounceScroll();
    updateVisitCount();

    setTimeout(() => {
      document.querySelectorAll('.fill').forEach(bar => {
        bar.style.width = bar.getAttribute('data-width') + '%';
      });
    }, 300);
  }, 1200);
}

// === INICIAÇÃO ===
const fallback = setTimeout(hideLoader, 6000);
window.addEventListener('load', () => {
  clearTimeout(fallback);
  setTimeout(hideLoader, 2500);
});

// === MENU ATIVO + PROGRESS BAR ===
function highlightMenu() {
  const sections = document.querySelectorAll('section, #hero');
  const navLinks = document.querySelectorAll('.links a');
  let current = 'hero';

  sections.forEach(sec => {
    const rect = sec.getBoundingClientRect();
    if (rect.top <= 150 && rect.bottom >= 150) {
      current = sec.id;
    }
  });

  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
}

function debounceScroll() {
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    highlightMenu();
    const scroll = document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = (scroll / height) * 100;
    const bar = document.getElementById('progress-bar');
    if (bar) bar.style.width = progress + '%';
    const navbar = document.getElementById('navbar');
    if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 100);
  }, 50);
}
window.addEventListener('scroll', debounceScroll);

// === CARROSSEL DE IMAGENS ===
let slideIndex = 0;
const slides = document.querySelectorAll('.about-images .slide');

function showNextSlide() {
  if (slides.length === 0) return;
  slides[slideIndex].classList.remove('active');
  slideIndex = (slideIndex + 1) % slides.length;
  slides[slideIndex].classList.add('active');
}
document.addEventListener('DOMContentLoaded', () => {
  if (slides.length > 0) setInterval(showNextSlide, 5000);
});

// === CHUVA DE ÍCONES ===
function createRain() {
  const container = document.querySelector('.rain-container');
  if (!container) return;
  const icons = ['<', '>', '{', '}', '[', ']', '(', ')', '/', '\\', '*', '#', '@', '&', '!', '?', '='];
  for (let i = 0; i < 50; i++) {
    const el = document.createElement('div');
    el.className = 'rain-icon';
    el.innerHTML = icons[Math.floor(Math.random() * icons.length)];
    el.style.left = Math.random() * 100 + 'vw';
    el.style.animationDuration = (Math.random() * 3 + 2) + 's';
    el.style.animationDelay = Math.random() * 2 + 's';
    el.style.fontSize = (Math.random() * 1 + 1.2) + 'rem';
    container.appendChild(el);
  }
}
document.addEventListener('DOMContentLoaded', createRain);

// === TEMA ===
function loadSavedTheme() {
  const saved = localStorage.getItem('theme') || 'dark';
  document.body.setAttribute('data-theme', saved);
  const icon = document.querySelector('#theme-toggle i');
  if (icon) icon.className = saved === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
}
document.addEventListener('DOMContentLoaded', loadSavedTheme);

document.getElementById('theme-toggle')?.addEventListener('click', () => {
  const current = document.body.getAttribute('data-theme') || 'dark';
  const next = current === 'dark' ? 'light' : 'dark';
  document.body.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  const icon = document.querySelector('#theme-toggle i');
  if (icon) icon.className = next === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
});

// === IDIOMA ===
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.lang-toggle');
  const options = document.querySelector('.lang-options');
  if (!toggle || !options) return;

  toggle.addEventListener('click', e => {
    e.stopPropagation();
    options.classList.toggle('show');
  });

  document.querySelectorAll('[data-lang]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      changeLanguage(btn.getAttribute('data-lang'));
      options.classList.remove('show');
    });
  });

  document.addEventListener('click', () => options.classList.remove('show'));
});

// === CONTADOR DE VISITAS ===
function updateVisitCount() {
  let count = parseInt(localStorage.getItem('visitCount') || '0') + 1;
  localStorage.setItem('visitCount', count);
  const el = document.getElementById('visit-count');
  if (el) el.textContent = count;
}

// === RESEND ===
document.addEventListener('DOMContentLoaded', () => {
  if (window.Resend) {
    resend = new window.Resend('re_UxiapfYf_9dk3BmoLBhZVDTykyea2Gh4P');
  } else {
    console.error('Resend não carregou!');
  }
});

// === FORMULÁRIO ===
document.getElementById('contact-form')?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const button = e.target.querySelector('button');
  button.disabled = true;
  button.textContent = 'Enviando...';

  if (!resend) {
    alert('Serviço de email não carregou. Tenta recarregar a página.');
    button.disabled = false;
    button.textContent = translations[document.documentElement.lang].send;
    return;
  }

  const formData = {
    name: e.target.name.value,
    email: e.target.email.value,
    message: e.target.message.value,
    date: new Date().toLocaleString('pt-MZ')
  };

  try {
    const { error } = await resend.emails.send({
      from: 'Viginaldo <viginaldozainurimussa@gmail.com>',
      to: ['viginaldozainurimussa@gmail.com'],
      subject: `Nova mensagem: ${formData.name}`,
      html: `
        <div style="font-family:Inter;background:#0a0a0a;color:#e0e0e0;padding:2rem;border-radius:16px;max-width:600px;margin:auto">
          <h1 style="color:#00ff88;text-shadow:0 0 10px #00ff88">Nova Mensagem</h1>
          <p><strong>Nome:</strong> ${formData.name}</p>
          <p><strong>Email:</strong> ${formData.email}</p>
          <div style="background:#1a1a1a;padding:1rem;border-left:3px solid #00ff88;border-radius:8px;margin:1rem 0">${formData.message}</div>
          <p style="color:#00ff88;text-align:right">Enviado: ${formData.date}</p>
        </div>
      `
    });

    if (error) throw error;

    alert('Mensagem enviada com sucesso!');
    e.target.reset();
  } catch (err) {
    console.error('Erro Resend:', err);
    alert('Erro ao enviar. Tenta novamente.');
  } finally {
    button.disabled = false;
    button.textContent = translations[document.documentElement.lang].send;
  }
});

// === MENU MOBILE (HAMBURGER) ===
function toggleMenu() {
  const navLinks = document.getElementById('nav-links');
  const mobileMenu = document.querySelector('.mobile-menu');
  
  if (!navLinks || !mobileMenu) return;

  navLinks.classList.toggle('show');
  mobileMenu.classList.toggle('active');
}

// Fecha ao clicar em link (mobile)
document.querySelectorAll('.links a').forEach(link => {
  link.addEventListener('click', () => {
    const navLinks = document.getElementById('nav-links');
    const mobileMenu = document.querySelector('.mobile-menu');
    if (navLinks && mobileMenu) {
      navLinks.classList.remove('show');
      mobileMenu.classList.remove('active');
    }
  });
});