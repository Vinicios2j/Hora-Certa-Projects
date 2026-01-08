// ============================================================
// HORA CERTA PROJETOS - SCRIPT COMPLETO V3
// Menu hambúrguer, scroll suave, animações, formulários
// ============================================================

document.addEventListener('DOMContentLoaded', function() {
  
  // ========== MENU HAMBURGUER 3 PONTINHAS ==========
  const menuToggle = document.getElementById('menuToggle');
  const mobileNav = document.getElementById('mobileNav');
  
  if (menuToggle && mobileNav) {
    // Toggle menu
    menuToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      menuToggle.classList.toggle('active');
      mobileNav.classList.toggle('active');
      
      // Previne scroll body quando menu aberto
      if (mobileNav.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });
    
    // Fecha menu clicando nos links
    document.querySelectorAll('.hc-mobile-nav a').forEach(link => {
      link.addEventListener('click', function() {
        menuToggle.classList.remove('active');
        mobileNav.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
    
    // Fecha menu clicando fora
    document.addEventListener('click', function(e) {
      if (!menuToggle.contains(e.target) && !mobileNav.contains(e.target)) {
        menuToggle.classList.remove('active');
        mobileNav.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }
  
  // ========== HEADER SHRINK ON SCROLL ==========
  const header = document.querySelector('.hc-header');
  let lastScroll = 0;
  
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    lastScroll = scrollTop;
  });
  
  // ========== SMOOTH SCROLL PARA LINKS ==========
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      
      if (target) {
        const offsetTop = target.offsetTop - 90; // Altura do header
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // ========== ANIMAÇÃO REVEAL ON SCROLL ==========
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);
  
  document.querySelectorAll('.hc-reveal').forEach(el => {
    observer.observe(el);
  });
  
  // ========== WHATSAPP BUTTONS ==========
  const whatsappNumber = '5511999999999'; // SUBSTITUA PELO SEU NÚMERO
  
  function openWhatsApp(message = '') {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  }
  
  // Todos os botões WhatsApp
  document.querySelectorAll('.hc-btn-whatsapp, #btnWhats, #btnFinalWhats, #btnHeroCard').forEach(btn => {
    btn.addEventListener('click', function() {
      let message = 'Olá! Vim pelo site Hora Certa Projetos e quero saber mais sobre ';
      
      if (this.id === 'btnHeroCard') {
        message += 'o pacote "Lançamento Rápido" (Landing + Bot + Hospedagem)';
      } else if (this.id === 'btnWhats') {
        message += 'criação de sites e hospedagem';
      } else if (this.id === 'btnFinalWhats') {
        message += 'orçamento e próximos passos';
      } else {
        message += 'os serviços da Hora Certa Projetos';
      }
      
      openWhatsApp(message);
    });
  });
  
  // ========== FORMULÁRIO ORÇAMENTO ==========
  const orcamentoForm = document.getElementById('orcamentoForm');
  
  if (orcamentoForm) {
    orcamentoForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Pega os dados do formulário
      const formData = new FormData(orcamentoForm);
      const nome = document.getElementById('nome').value;
      const whatsapp = document.getElementById('whatsapp').value;
      const tipoProjeto = document.getElementById('tipoProjeto').value;
      const orcamentoFaixa = document.getElementById('orcamentoFaixa').value;
      const mensagem = document.getElementById('mensagem').value;
      
      // Monta mensagem WhatsApp
      let whatsappMessage = `🔥 *NOVO ORÇAMENTO - HORA CERTA PROJETOS*\n\n`;
      whatsappMessage += `👤 *Nome:* ${nome}\n`;
      whatsappMessage += `📱 *WhatsApp:* ${whatsapp}\n`;
      whatsappMessage += `💼 *Tipo de projeto:* ${tipoProjeto}\n`;
      whatsappMessage += `💰 *Faixa de investimento:* ${orcamentoFaixa}\n\n`;
      whatsappMessage += `📝 *Mensagem:*\n${mensagem}\n\n`;
      whatsappMessage += `⏰ *Enviado em:* ${new Date().toLocaleString('pt-BR')}`;
      
      // Abre WhatsApp
      openWhatsApp(whatsappMessage);
      
      // Mostra feedback (opcional)
      const submitBtn = orcamentoForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fa-solid fa-check"></i> Mensagem enviada!';
      submitBtn.style.background = '#44ff9a';
      
      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.style.background = '';
        orcamentoForm.reset();
      }, 3000);
    });
  }
  
  // ========== BOTÃO SEGUIDORES ==========
  const btnSeguidores = document.getElementById('btnSeguidores');
  if (btnSeguidores) {
    btnSeguidores.addEventListener('click', function() {
      openWhatsApp('🚀 Vim pelo site interessado na *ferramenta de crescimento acelerado para Instagram* - quero saber mais sobre seguidores reais e roubar audiência dos concorrentes!');
    });
  }
  
  // ========== BOTÃO HERO ORÇAMENTO ==========
  const btnHeroOrcamento = document.getElementById('btnHeroOrcamento');
  if (btnHeroOrcamento) {
    btnHeroOrcamento.addEventListener('click', function() {
      document.querySelector('#orcamento').scrollIntoView({ 
        behavior: 'smooth' 
      });
    });
  }
  
  // ========== TOGGLE HOSPEDAGEM MENSAL/ANUAL ==========
  document.querySelectorAll('.hc-toggle-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.hc-toggle-btn').forEach(b => b.classList.remove('hc-toggle-btn--active'));
      this.classList.add('hc-toggle-btn--active');
      
      const billingType = this.dataset.billing;
      document.querySelectorAll('.hc-hosting-price').forEach(priceEl => {
        const valueSpan = priceEl.querySelector('.hc-hosting-value');
        const cycleSpan = priceEl.querySelector('.hc-hosting-cycle');
        const mensalPrice = priceEl.dataset.priceMensal;
        const anualPrice = priceEl.dataset.priceAnual;
        
        if (billingType === 'mensal') {
          valueSpan.textContent = `R$ ${mensalPrice}`;
          cycleSpan.textContent = '/ mês';
        } else {
          valueSpan.textContent = `R$ ${anualPrice}`;
          cycleSpan.textContent = '/ mês (anual)';
        }
      });
    });
  });
  
  // ========== BOTÕES PLANOS HOSPEDAGEM ==========
  document.querySelectorAll('.hc-btn-hosting, .hc-btn-plan').forEach(btn => {
    btn.addEventListener('click', function() {
      const planName = this.dataset.plan;
      openWhatsApp(`💎 Interessado no plano *${planName}*\n\nMe conta mais sobre seu projeto para eu preparar a melhor proposta!`);
    });
  });
  
  // ========== HEADER SCROLL EFFECT ==========
  let ticking = false;
  function updateHeader() {
    const scrollY = window.scrollY;
    document.documentElement.style.setProperty('--scrollY', `${scrollY}px`);
    ticking = false;
  }
  
  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateHeader);
      ticking = true;
    }
  }
  
  window.addEventListener('scroll', requestTick);
  
});

// ========== PRELOAD / PERFORMANCE ==========
window.addEventListener('load', function() {
  document.body.classList.add('loaded');
});

// FIM DO SCRIPT
