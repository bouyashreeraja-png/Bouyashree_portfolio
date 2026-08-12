/* ==========================================================================
   PORTFOLIO MAIN INTERACTION ENGINE - BOUYASHREE R
   Navbar Scroll, Project Canvas Visualizers, Modals & Toast System
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (window.lucide) {
    lucide.createIcons();
  }

  // 1. NAVBAR SCROLL & ACTIVE LINK HIGHLIGHTING
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('section[id]');
  const navToggle = document.querySelector('.nav-toggle');
  const navLinksContainer = document.querySelector('.nav-links');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // ScrollSpy active link detection
    let currentSection = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  });

  // Mobile Hamburger Toggle
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navLinksContainer.classList.toggle('open');
      const icon = navToggle.querySelector('i');
      if (navLinksContainer.classList.contains('open')) {
        icon.setAttribute('data-lucide', 'x');
      } else {
        icon.setAttribute('data-lucide', 'menu');
      }
      lucide.createIcons();
    });
  }

  // Close Mobile Nav on link click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navLinksContainer.classList.remove('open');
      const icon = navToggle ? navToggle.querySelector('i') : null;
      if (icon) {
        icon.setAttribute('data-lucide', 'menu');
        lucide.createIcons();
      }
    });
  });

  // 2. PROJECT PREVIEW CANVAS VISUALIZERS
  initProjectVisualizers();

  // 3. PROJECT MODAL ENGINE DATA & HANDLERS
  window.projectData = {
    feelsync: {
      title: "Project FeelSync",
      subtitle: "AI-Based Real-Time Emotion Recognition and Mental Wellness Application",
      description: "Developed an AI-based face and voice detection application for real-time emotion recognition and mental wellness. FeelSync continuously monitors multimodal emotional state indicators to provide instant mental health insights and supportive interventions.",
      features: [
        "Facial Expression Analysis (Real-Time FER Dataset Mapping)",
        "Voice Sentiment & Acoustic Pitch Analysis",
        "Multi-modal Real-Time Emotion Recognition Engine",
        "AI-Based Mental Wellness & Mood Assessment",
        "Interactive Text-to-Speech Feedback Integration"
      ],
      technologies: ["Python", "OpenCV", "DeepFace", "Librosa", "Pyttsx3"],
      architecture: [
        "Frontend/GUI Layer: Real-time camera feed capture & audio stream buffering",
        "Computer Vision Module: OpenCV face mesh detection + DeepFace facial expression classifier",
        "Acoustic ML Module: Librosa feature extraction (MFCCs, spectral pitch, tempo)",
        "Synthesis & Wellness Engine: Pyttsx3 automated vocal prompts & mental health tracking"
      ]
    },
    sentinalai: {
      title: "Project SentinalAI",
      subtitle: "AI-Powered Blackmail and Cybersecurity Threat Detection System",
      description: "Developed an AI-powered cybersecurity defense system designed for early detection of potential digital blackmail attempts, suspicious textual patterns, and emerging online security threats.",
      features: [
        "Suspicious Pattern & Keyword Detection Engine",
        "Potential Digital Security Risk & Extortion Threat Identification",
        "AI-Based Natural Language Threat Analysis",
        "Real-Time Cyber Vulnerability Matrix",
        "Automated Security Alert & Incident Reporting"
      ],
      technologies: ["Python", "AI / ML", "Cybersecurity", "Pattern Matching"],
      architecture: [
        "Input Ingestion Layer: Text logs, message feeds, and network communication monitors",
        "NLP & Threat Engine: Custom pattern extraction algorithms & anomaly scoring",
        "Risk Evaluation Engine: Multi-factor blackmail indicators & threat severity classifier",
        "Response Dispatcher: Visual danger dashboard & security breach warnings"
      ]
    }
  };

  // Modal Window Logic
  const modalOverlay = document.getElementById('project-modal');
  const modalBody = document.getElementById('modal-body-content');
  const modalCloseBtn = document.getElementById('modal-close-btn');

  window.openProjectModal = function (projectId) {
    const project = window.projectData[projectId];
    if (!project || !modalOverlay) return;

    modalBody.innerHTML = `
      <div style="margin-bottom: 1.5rem;">
        <span class="hero-badge"><i data-lucide="cpu"></i> ${project.title}</span>
        <h2 style="font-size: 1.8rem; font-weight: 800; margin-top: 0.5rem; color: #ffffff;">${project.subtitle}</h2>
      </div>
      
      <p style="color: var(--text-muted); font-size: 1.05rem; line-height: 1.7; margin-bottom: 1.75rem;">
        ${project.description}
      </p>

      <div style="margin-bottom: 1.75rem;">
        <h4 style="color: var(--accent-cyan); font-size: 1.1rem; margin-bottom: 0.75rem; font-weight: 700;">Key Features & Capabilities:</h4>
        <ul style="list-style: none; padding: 0;">
          ${project.features.map(f => `
            <li style="display: flex; align-items: center; gap: 0.6rem; color: var(--text-main); margin-bottom: 0.5rem; font-size: 0.95rem;">
              <i data-lucide="check-circle-2" style="color: var(--primary-purple); width: 18px; flex-shrink: 0;"></i>
              ${f}
            </li>
          `).join('')}
        </ul>
      </div>

      <div style="margin-bottom: 1.75rem;">
        <h4 style="color: var(--accent-cyan); font-size: 1.1rem; margin-bottom: 0.75rem; font-weight: 700;">System Architecture:</h4>
        <div style="background: rgba(7, 9, 19, 0.7); border: 1px solid var(--border-glass); border-radius: 12px; padding: 1.25rem;">
          ${project.architecture.map((arch, idx) => `
            <div style="display: flex; gap: 0.75rem; margin-bottom: 0.6rem; font-size: 0.9rem; color: var(--text-muted);">
              <span style="font-family: var(--font-mono); color: var(--accent-cyan); font-weight: 700;">0${idx + 1}.</span>
              <span>${arch}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <div>
        <h4 style="color: var(--accent-cyan); font-size: 1.1rem; margin-bottom: 0.75rem; font-weight: 700;">Technologies Used:</h4>
        <div style="display: flex; flex-wrap: wrap; gap: 0.6rem;">
          ${project.technologies.map(t => `<span class="tech-badge" style="font-size: 0.85rem; padding: 0.4rem 0.9rem;">${t}</span>`).join('')}
        </div>
      </div>
    `;

    lucide.createIcons();
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  // Resume Modal Engine
  window.openResumeModal = function (e) {
    if (e && e.preventDefault) e.preventDefault();
    const modalOverlay = document.getElementById('project-modal');
    const modalBody = document.getElementById('modal-body-content');
    if (!modalOverlay || !modalBody) return;

    modalBody.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-glass); padding-bottom: 1rem; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
        <div>
          <span class="hero-badge"><i data-lucide="file-check-2"></i> Official Resume Document</span>
          <h2 style="font-size: 1.8rem; font-weight: 800; margin-top: 0.4rem; color: #ffffff;">BOUYASHREE R</h2>
        </div>
        <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
          <a href="assets/resume.html" target="_blank" class="btn btn-primary" style="padding: 0.5rem 1rem; font-size: 0.85rem;">
            <i data-lucide="printer"></i> Print / Save PDF
          </a>
        </div>
      </div>

      <div style="background: rgba(15, 23, 42, 0.95); border: 1px solid var(--border-glow-cyan); border-radius: 14px; padding: 2rem; font-family: var(--font-heading); color: #e2e8f0; line-height: 1.6; font-size: 0.95rem; box-shadow: inset 0 0 30px rgba(0, 0, 0, 0.5);">
        
        <!-- Header -->
        <div style="text-align: center; border-bottom: 1px dashed rgba(255,255,255,0.15); padding-bottom: 1.25rem; margin-bottom: 1.25rem;">
          <h1 style="font-size: 1.8rem; font-weight: 800; letter-spacing: 0.05em; color: #ffffff; margin-bottom: 0.4rem;">BOUYASHREE R</h1>
          <div style="font-size: 0.9rem; color: var(--accent-cyan); display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap;">
            <span><i data-lucide="phone" style="width: 14px; vertical-align: middle;"></i> 7598117754</span>
            <span><i data-lucide="mail" style="width: 14px; vertical-align: middle;"></i> bouyashreeraja@gmail.com</span>
          </div>
          <div style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.4rem; display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap;">
            <a href="https://www.linkedin.com/in/bouyashree-raja-a77353328" target="_blank" style="color: var(--accent-cyan); text-decoration: none;">linkedin.com/in/bouyashree-raja-a77353328</a>
            <span>•</span>
            <a href="https://github.com/bouyashreeraja-png" target="_blank" style="color: var(--accent-cyan); text-decoration: none;">github.com/bouyashreeraja-png</a>
          </div>
        </div>

        <!-- Career Objective -->
        <div style="margin-bottom: 1.25rem;">
          <h3 style="font-size: 1rem; font-weight: 700; color: var(--accent-cyan); text-transform: uppercase; border-bottom: 1px solid rgba(0, 240, 255, 0.2); padding-bottom: 0.3rem; margin-bottom: 0.6rem;">CAREER OBJECTIVE</h3>
          <p style="font-size: 0.9rem; color: var(--text-muted); text-align: justify;">
            Computer Science Engineering student with hands-on experience in Java full-stack development, Python programming, web technologies, databases, artificial intelligence, and cybersecurity. Interested in software development and AI-driven solutions, with a strong passion for learning new technologies and building practical real-world applications.
          </p>
        </div>

        <!-- Education -->
        <div style="margin-bottom: 1.25rem;">
          <h3 style="font-size: 1rem; font-weight: 700; color: var(--accent-cyan); text-transform: uppercase; border-bottom: 1px solid rgba(0, 240, 255, 0.2); padding-bottom: 0.3rem; margin-bottom: 0.6rem;">EDUCATION</h3>
          
          <div style="display: flex; justify-content: space-between; font-weight: 700; color: #ffffff; font-size: 0.95rem; flex-wrap: wrap;">
            <span>AVS Engineering College, Autonomous</span>
            <span>2024–2028</span>
          </div>
          <div style="display: flex; justify-content: space-between; color: var(--text-muted); font-size: 0.9rem; margin-bottom: 0.75rem; flex-wrap: wrap;">
            <span>B.E. Computer Science Engineering</span>
            <span style="color: var(--accent-cyan); font-weight: 700;">CGPA: 8.2</span>
          </div>

          <div style="font-weight: 700; color: #ffffff; font-size: 0.95rem;">
            Government Girls Higher Secondary School, Mallasamudram
          </div>
          <div style="display: flex; gap: 1.5rem; color: var(--text-muted); font-size: 0.85rem; margin-top: 0.25rem; flex-wrap: wrap;">
            <span>12th Standard: <strong style="color: #ffffff;">458 Marks</strong></span>
            <span>10th Standard: <strong style="color: #ffffff;">367 Marks</strong></span>
          </div>
        </div>

        <!-- Technical Skills -->
        <div style="margin-bottom: 1.25rem;">
          <h3 style="font-size: 1rem; font-weight: 700; color: var(--accent-cyan); text-transform: uppercase; border-bottom: 1px solid rgba(0, 240, 255, 0.2); padding-bottom: 0.3rem; margin-bottom: 0.6rem;">TECHNICAL SKILLS</h3>
          <div style="font-size: 0.9rem; display: flex; flex-direction: column; gap: 0.4rem;">
            <div><strong style="color: #ffffff;">Programming:</strong> C, Python, Java, TypeScript</div>
            <div><strong style="color: #ffffff;">Web Technologies:</strong> HTML, CSS, Angular, Spring Boot, Flask, Node.js, Express.js</div>
            <div><strong style="color: #ffffff;">Database:</strong> MySQL, SQL</div>
            <div><strong style="color: #ffffff;">AI / ML:</strong> OpenCV, DeepFace, Librosa</div>
            <div><strong style="color: #ffffff;">Tools:</strong> Git, GitHub, VS Code, Eclipse, PyCharm, Postman</div>
          </div>
        </div>

        <!-- Internships -->
        <div style="margin-bottom: 1.25rem;">
          <h3 style="font-size: 1rem; font-weight: 700; color: var(--accent-cyan); text-transform: uppercase; border-bottom: 1px solid rgba(0, 240, 255, 0.2); padding-bottom: 0.3rem; margin-bottom: 0.6rem;">INTERNSHIPS</h3>
          
          <div style="margin-bottom: 0.75rem;">
            <div style="display: flex; justify-content: space-between; font-weight: 700; color: #ffffff; font-size: 0.95rem; flex-wrap: wrap;">
              <span>Redmind Technologies</span>
              <span style="color: var(--primary-purple); font-size: 0.85rem;">Java Full Stack Intern — 30–35 Days</span>
            </div>
            <ul style="margin-left: 1.2rem; font-size: 0.88rem; color: var(--text-muted); margin-top: 0.25rem;">
              <li>Gained practical exposure to Java full-stack application development.</li>
              <li>Worked with frontend, backend, database, and application integration.</li>
            </ul>
          </div>

          <div>
            <div style="display: flex; justify-content: space-between; font-weight: 700; color: #ffffff; font-size: 0.95rem; flex-wrap: wrap;">
              <span>CKM Buildbase</span>
              <span style="color: var(--primary-purple); font-size: 0.85rem;">Java Full Stack Developer Intern — 30–35 Days</span>
            </div>
            <ul style="margin-left: 1.2rem; font-size: 0.88rem; color: var(--text-muted); margin-top: 0.25rem;">
              <li>Gained hands-on exposure to Java-based full-stack development.</li>
              <li>Worked with frontend, backend, database connectivity, and APIs.</li>
            </ul>
          </div>
        </div>

        <!-- Projects -->
        <div style="margin-bottom: 1.25rem;">
          <h3 style="font-size: 1rem; font-weight: 700; color: var(--accent-cyan); text-transform: uppercase; border-bottom: 1px solid rgba(0, 240, 255, 0.2); padding-bottom: 0.3rem; margin-bottom: 0.6rem;">PROJECTS</h3>

          <div style="margin-bottom: 0.75rem;">
            <div style="font-weight: 700; color: #ffffff; font-size: 0.95rem;">FeelSync</div>
            <div style="font-style: italic; font-size: 0.85rem; color: var(--accent-cyan);">AI-Based Real-Time Emotion Recognition and Mental Wellness Application</div>
            <ul style="margin-left: 1.2rem; font-size: 0.88rem; color: var(--text-muted); margin-top: 0.25rem;">
              <li>Developed an AI-based face and voice detection application for real-time emotion recognition and mental wellness.</li>
              <li>Combined facial expression and voice analysis to identify emotional states.</li>
              <li><strong style="color: #ffffff;">Technologies:</strong> Python, OpenCV, DeepFace, Librosa, Pyttsx3</li>
            </ul>
          </div>

          <div>
            <div style="font-weight: 700; color: #ffffff; font-size: 0.95rem;">SentinalAI</div>
            <div style="font-style: italic; font-size: 0.85rem; color: var(--accent-cyan);">AI-Powered Blackmail and Cybersecurity Threat Detection System</div>
            <ul style="margin-left: 1.2rem; font-size: 0.88rem; color: var(--text-muted); margin-top: 0.25rem;">
              <li>Developed an AI-powered system for detecting potential blackmail attempts and cybersecurity threats.</li>
              <li>Designed to identify suspicious patterns and potential digital security risks using AI-based analysis.</li>
            </ul>
          </div>
        </div>

        <!-- Certifications -->
        <div style="margin-bottom: 1.25rem;">
          <h3 style="font-size: 1rem; font-weight: 700; color: var(--accent-cyan); text-transform: uppercase; border-bottom: 1px solid rgba(0, 240, 255, 0.2); padding-bottom: 0.3rem; margin-bottom: 0.6rem;">CERTIFICATIONS</h3>
          <ul style="margin-left: 1.2rem; font-size: 0.88rem; color: var(--text-muted);">
            <li>Python Programming – Master Mind Techno Solution</li>
            <li>Python Essentials 1 – Cisco Networking Academy</li>
            <li>Python with Flask – Master Mind Techno Solution</li>
            <li>Advanced Java – Master Mind Techno Solution</li>
            <li>SQL Hiring Secrets Bootcamp – Novi Tech R&D</li>
          </ul>
        </div>

        <!-- Languages -->
        <div>
          <h3 style="font-size: 1rem; font-weight: 700; color: var(--accent-cyan); text-transform: uppercase; border-bottom: 1px solid rgba(0, 240, 255, 0.2); padding-bottom: 0.3rem; margin-bottom: 0.6rem;">LANGUAGES</h3>
          <div style="font-size: 0.9rem; color: var(--text-muted);">
            English — Tamil
          </div>
        </div>

      </div>
    `;

    lucide.createIcons();
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  function closeModal() {
    if (modalOverlay) {
      modalOverlay.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  }

  // 4. CONTACT FORM HANDLER & TOAST
  const contactForm = document.getElementById('contact-form');
  const toast = document.getElementById('toast-notification');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('form-name').value.trim();
      const email = document.getElementById('form-email').value.trim();
      const subject = document.getElementById('form-subject').value.trim();
      const message = document.getElementById('form-message').value.trim();

      if (!name || !email || !message) {
        showToast('⚠️ Please complete all required fields.', 'warning');
        return;
      }

      // Prepare mailto link fallback
      const mailtoLink = `mailto:bouyashreeraja@gmail.com?subject=${encodeURIComponent(subject || 'Portfolio Inquiry from ' + name)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;

      showToast('🚀 Opening email client to send message...', 'success');

      setTimeout(() => {
        window.location.href = mailtoLink;
        contactForm.reset();
      }, 1200);
    });
  }

  function showToast(msg, type = 'info') {
    if (!toast) return;
    const toastMsg = document.getElementById('toast-message');
    if (toastMsg) toastMsg.textContent = msg;
    
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 4000);
  }
});

// Canvas Project Visualizer Renderer
function initProjectVisualizers() {
  // Canvas 1: FeelSync AI Face Mesh Visualizer
  const feelCanvas = document.getElementById('feelsync-canvas');
  if (feelCanvas) {
    const ctx = feelCanvas.getContext('2d');
    let width = feelCanvas.width = feelCanvas.parentElement.clientWidth;
    let height = feelCanvas.height = 180;

    let time = 0;
    function renderFeelSync() {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = '#070913';
      ctx.fillRect(0, 0, width, height);

      // Render Face Mesh Points
      const centerX = width / 2;
      const centerY = height / 2;
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.4)';
      ctx.lineWidth = 1;

      // Concentric Neural Grid
      for (let r = 20; r <= 70; r += 15) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, r + Math.sin(time + r * 0.1) * 3, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Pulsing Face Points
      const points = [
        { x: centerX - 30, y: centerY - 20 },
        { x: centerX + 30, y: centerY - 20 },
        { x: centerX, y: centerY },
        { x: centerX - 20, y: centerY + 25 },
        { x: centerX + 20, y: centerY + 25 },
        { x: centerX, y: centerY + 35 }
      ];

      ctx.fillStyle = '#9d4edd';
      points.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y + Math.sin(time * 2) * 2, 4, 0, Math.PI * 2);
        ctx.fill();
      });

      // Sound Wave lines
      ctx.beginPath();
      ctx.strokeStyle = '#00f0ff';
      for (let x = 0; x < width; x += 5) {
        let y = centerY + Math.sin(x * 0.05 + time * 3) * 15;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.globalAlpha = 0.3;
      ctx.stroke();
      ctx.globalAlpha = 1;

      time += 0.03;
      requestAnimationFrame(renderFeelSync);
    }
    renderFeelSync();
  }

  // Canvas 2: SentinalAI Cybersecurity Threat Matrix
  const sentCanvas = document.getElementById('sentinal-canvas');
  if (sentCanvas) {
    const ctx = sentCanvas.getContext('2d');
    let width = sentCanvas.width = sentCanvas.parentElement.clientWidth;
    let height = sentCanvas.height = 180;

    let scanY = 0;
    const nodes = [];
    for (let i = 0; i < 30; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        status: Math.random() > 0.8 ? 'threat' : 'safe'
      });
    }

    function renderSentinal() {
      ctx.fillStyle = '#070913';
      ctx.fillRect(0, 0, width, height);

      // Radar Scan Line
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.6)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, scanY);
      ctx.lineTo(width, scanY);
      ctx.stroke();

      // Threat Radar Sweep Gradient
      let grad = ctx.createLinearGradient(0, scanY - 40, 0, scanY);
      grad.addColorStop(0, 'rgba(0, 240, 255, 0)');
      grad.addColorStop(1, 'rgba(0, 240, 255, 0.15)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, scanY - 40, width, 40);

      // Security Nodes
      nodes.forEach(n => {
        ctx.beginPath();
        ctx.arc(n.x, n.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = n.status === 'threat' ? '#f43f5e' : '#10b981';
        ctx.fill();

        if (n.status === 'threat') {
          ctx.strokeStyle = 'rgba(244, 63, 94, 0.4)';
          ctx.beginPath();
          ctx.arc(n.x, n.y, 10, 0, Math.PI * 2);
          ctx.stroke();
        }
      });

      scanY += 1.5;
      if (scanY > height) scanY = 0;

      requestAnimationFrame(renderSentinal);
    }
    renderSentinal();
  }
}
