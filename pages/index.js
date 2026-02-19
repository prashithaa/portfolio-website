import React, { useState, useEffect, useRef } from 'react';
import { Mail, Linkedin, Github, ChevronDown, ExternalLink, Award, GraduationCap, Code, MapPin } from 'lucide-react';

export default function Portfolio() {
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('home');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState('default');
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [stats, setStats] = useState({ gpa: 0, projects: 0, publications: 0 });
  const cursorRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      const sections = ['home', 'about', 'experience', 'projects', 'design', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };
    
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    const animateValue = (start, end, duration, key) => {
      const range = end - start;
      const increment = range / (duration / 16);
      let current = start;
      const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
          current = end;
          clearInterval(timer);
        }
        setStats(prev => ({ ...prev, [key]: current }));
      }, 16);
    };

    setTimeout(() => {
      animateValue(0, 3.69, 1500, 'gpa');
      animateValue(0, 6, 1200, 'projects');
      animateValue(0, 1, 800, 'publications');
    }, 500);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleMouseEnter = () => setCursorVariant('hover');
    const handleMouseLeave = () => setCursorVariant('default');

    const interactiveElements = document.querySelectorAll('a, button, .card-hover');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, [visibleSections]);

  const projects = [
    {
      title: "Caption It: Image Captioning",
      date: "Feb 2025",
      description: "End-to-end image captioning pipeline using frozen ViT encoder and GPT-2 decoder with cross-modal attention.",
      highlights: [
        "Fine-tuned on Flickr8k with custom 2-layer MLP bridge",
        "Outperformed CNN-RNN baselines in BLEU-4, ROUGE-L, CIDEr",
        "Progressive unfreezing of ViT layers for optimal performance"
      ],
      tech: ["PyTorch", "Vision Transformers", "GPT-2", "NLP"],
      image: "/images/projects/captionit.png",
      demoLink: "",
      githubLink: ""
    },
    {
      title: "Multimodal Deepfake Detection",
      date: "May 2024",
      description: "Multi-modal deepfake detection system analyzing image, video, and audio using advanced deep learning architectures.",
      highlights: [
        "93% accuracy, 0.92 F1 Score, 0.95 AUC on 5,000+ samples",
        "Published research in IJISAE",
        "Combined CNNs, Xception, ResNeXt with Mel spectrograms"
      ],
      tech: ["PyTorch", "Librosa", "Computer Vision", "Audio Processing"],
      image: "/images/projects/deepfake.png",
      link: "https://ijisae.org/index.php/IJISAE/article/view/5734"
    },
    {
      title: "Edge AI Anomaly Detection",
      date: "Nov 2025",
      description: "Near real-time edge-AI system for sensor anomaly detection using LSTM time-series models and Isolation Forest.",
      highlights: [
        "Built for resource-constrained IoT environments",
        "End-to-end ML pipeline with sensor ingestion",
        "Real-time feature engineering and evaluation"
      ],
      tech: ["LSTM", "Isolation Forest", "IoT", "Time Series"],
      image: "/images/projects/edgeai.png"
    },
    {
      title: "ATS Resume Grader",
      date: "Dec 2024",
      description: "ML-powered resume analysis tool using BERT and HuggingFace Transformers to evaluate resumes against job descriptions.",
      highlights: [
        "Implemented PDF text extraction pipeline and NLP-based keyword matching",
        "Skill gap analysis and targeted feedback generation",
        "Achieved 87% accuracy in relevance prediction on curated test dataset"
      ],
      tech: ["BERT", "HuggingFace", "NLP", "Python"],
      image: "/images/projects/Atsresume.png"
    },
    {
      title: "Plant Disease Detection",
      date: "2023",
      description: "ML model addressing agricultural sustainability through accessible disease identification for small farmers.",
      highlights: [
        "93.5% accuracy on test data",
        "Designed for mobile/web deployment",
        "Impact on 50% of India's workforce"
      ],
      tech: ["Machine Learning", "Image Processing", "Computer Vision"],
      image: "/images/projects/plant.png"
    }
  ];

  const experience = [
    {
      company: "Bessemer Alliance LLC",
      role: "AI Innovation Intern",
      location: "Pittsburgh, USA",
      date: "Nov 2025 – Dec 2025",
      logo: "/images/companies/bessemer.png",
      achievements: [
        "Built near real-time edge-AI anomaly detection system",
        "Developed end-to-end ML pipelines for IoT environments",
        "Implemented LSTM time-series models and Isolation Forest"
      ]
    },
    {
      company: "Affekta",
      role: "Machine Learning Intern",
      location: "Houston, USA",
      date: "May 2025 – Aug 2025",
      logo: "/images/companies/affekta.png",
      achievements: [
        "Engineered real-time affective computing pipeline with Emotion-Qwen",
        "Developed DSL-to-SMT reasoning framework with Z3 and LLMs",
        "Collaborated using Git, Docker, and CI/CD workflows"
      ]
    },
    {
      company: "Detect Technology",
      role: "Data Science Intern",
      location: "Chennai, India",
      date: "Nov 2023 – Feb 2024",
      logo: "/images/companies/detect.png",
      achievements: [
        "Built YOLOv5 object detection system for oil industry",
        "Achieved 95% accuracy on production test sets",
        "Led data annotation and augmentation pipeline"
      ]
    },
    {
      company: "ChuChu TV",
      role: "Software Intern",
      location: "Chennai, India",
      date: "Feb 2023 – Mar 2023",
      logo: "/images/companies/chuchutv.png",
      achievements: [
        "Developed Android app for 67M+ subscriber channel",
        "Implemented Firebase Authentication with Kotlin",
        "Created responsive UI following modern design principles"
      ]
    }
  ];

  const skills = {
    "Languages": ["Python", "C++", "Java", "Kotlin", "SQL", "C"],
    "ML/AI": ["PyTorch", "TensorFlow", "Scikit-learn", "HuggingFace", "BERT"],
    "Tools": ["Git", "Docker", "Streamlit", "Google Colab", "Firebase", "Figma"]
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden cursor-none">
      {/* Custom Cursor */}
      <div 
        ref={cursorRef}
        className="fixed pointer-events-none z-50 mix-blend-difference transition-transform duration-150 ease-out"
        style={{
          left: `${cursorPosition.x}px`,
          top: `${cursorPosition.y}px`,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div 
          className={`rounded-full bg-white transition-all duration-300 ${
            cursorVariant === 'hover' ? 'w-16 h-16 opacity-20' : 'w-8 h-8 opacity-50'
          }`}
        />
        <div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full"
        />
      </div>


      {/* Subtle dotted background */}
      <div className="fixed inset-0 pointer-events-none opacity-20" style={{
        backgroundImage: `radial-gradient(circle, #000000 1.5px, transparent 1.5px)`,
        backgroundSize: '40px 40px'
      }} />
      
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-40 transition-all duration-300 ${scrollY > 50 ? 'bg-white/95 backdrop-blur-xl shadow-sm' : 'bg-transparent'}`}>
        <div className="max-w-6xl mx-auto px-6 py-5 flex justify-between items-center">
          <a href="#home" className="text-2xl font-light tracking-tight text-slate-900">
            Prashithaa <span className="font-semibold">Balaji</span>
          </a>
          <div className="hidden md:flex space-x-1">
            {['About', 'Experience', 'Projects', 'Design', 'Contact'].map(item => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeSection === item.toLowerCase() 
                    ? 'text-slate-900 bg-slate-100' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {item}
              </a>
            ))}
          </div>
          <a 
            href="mailto:pb55@rice.edu" 
            className="px-5 py-2.5 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800 transition-all duration-200 flex items-center space-x-2 hover:scale-105"
          >
            <Mail className="w-4 h-4" />
            <span>Contact</span>
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-16">
            {/* Photo */}
            <div className="relative flex-shrink-0 group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-200 to-purple-200 rounded-2xl blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
              <div className="relative">
                <img 
                  src="/images/profile-photo.JPG"
                  alt="Prashithaa Abhirami Balaji"
                  className="w-72 h-72 rounded-2xl object-cover shadow-2xl ring-1 ring-slate-900/5 group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.outerHTML = `<div class="w-72 h-72 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center shadow-2xl ring-1 ring-slate-900/5"><span class="text-6xl font-light text-slate-400">PA</span></div>`;
                  }}
                />
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-slate-100 rounded-full mb-6 hover:scale-105 transition-transform duration-300">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm font-medium text-slate-700">Available for Opportunities</span>
              </div>

              <h1 className="text-5xl md:text-6xl font-light mb-4 tracking-tight text-slate-900">
                Prashithaa
                <div className="font-semibold">Abhirami Balaji</div>
              </h1>
              
              <p className="text-xl text-slate-600 mb-3 font-light">
                AI/ML Engineer & Researcher
              </p>
              
              <p className="text-lg text-slate-500 mb-2 leading-relaxed">
                Master&apos;s in Computer Science at <span className="font-medium text-slate-700">Rice University</span>
              </p>

              <div className="flex items-center justify-center md:justify-start gap-2 text-slate-400 mb-8">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">Houston, Texas</span>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap justify-center md:justify-start gap-8 mb-10">
                <div className="hover:scale-110 transition-transform duration-300">
                  <div className="text-3xl font-light text-slate-900 mb-1">{stats.gpa.toFixed(2)}</div>
                  <div className="text-sm text-slate-500 font-medium">GPA at Rice</div>
                </div>
                <div className="w-px bg-slate-200" />
                <div className="hover:scale-110 transition-transform duration-300">
                  <div className="text-3xl font-light text-slate-900 mb-1">{Math.floor(stats.projects)}+</div>
                  <div className="text-sm text-slate-500 font-medium">AI/ML Projects</div>
                </div>
                <div className="w-px bg-slate-200" />
                <div className="hover:scale-110 transition-transform duration-300">
                  <div className="text-3xl font-light text-slate-900 mb-1">{Math.floor(stats.publications)}</div>
                  <div className="text-sm text-slate-500 font-medium">Publication</div>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex justify-center md:justify-start space-x-4">
                {[
                  { Icon: Mail, href: "mailto:pb55@rice.edu", label: "Email" },
                  { Icon: Linkedin, href: "https://linkedin.com/in/prashithaa", label: "LinkedIn" },
                  { Icon: Github, href: "https://github.com/prashithaa", label: "GitHub" }
                ].map(({ Icon, href, label }, i) => (
                  <a 
                    key={i}
                    href={href} 
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="p-3 bg-white hover:bg-slate-50 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-200 hover:scale-110 hover:-translate-y-1"
                    aria-label={label}
                  >
                    <Icon className="w-5 h-5 text-slate-600" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <a href="#about" className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ChevronDown className="w-8 h-8 text-slate-300 hover:text-slate-600 transition-colors" />
          </a>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-6 bg-slate-50" data-animate>
        <div className="max-w-5xl mx-auto">
          <div className={`mb-16 transition-all duration-1000 ${visibleSections.has('about') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl md:text-5xl font-light mb-3 text-slate-900">
              About <span className="font-semibold">Me</span>
            </h2>
            <div className="w-16 h-0.5 bg-slate-900" />
          </div>
          
          <div className={`card-hover bg-white p-12 rounded-2xl shadow-sm border border-slate-200 mb-12 transition-all duration-500 hover:shadow-xl hover:-translate-y-2 ${visibleSections.has('about') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="prose prose-lg max-w-none text-slate-600 leading-relaxed space-y-4">
              <p>
                My fascination with artificial intelligence began in childhood, sparked by curiosity about how 
                computer games worked. Learning from my father about the thousands of lines of code behind 
                these games led me to wonder: <span className="font-medium text-slate-900">can machines think and act like us?</span>
              </p>
              <p>
                This question deepened when I discovered IBM Watson in 2010 and the concept of &quot;computers that learn.&quot; 
                The Iron Man movie series and JARVIS visualized how AI could transform every aspect of life, 
                opening my eyes to the vast opportunities in this field.
              </p>
              <p>
                Today, at Rice University, I&apos;m pursuing my passion for developing AI-driven solutions that make 
                real-world impact, from affective computing to edge AI anomaly detection.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {[
              {
                title: "Rice University",
                degree: "MS Computer Science",
                gpa: "3.69/4.0",
                date: "Aug 2024 - Dec 2025",
                Icon: GraduationCap
              },
              {
                title: "Anna University",
                degree: "BS Computer Science",
                gpa: "9.2/10.0",
                date: "Nov 2020 - May 2024",
                Icon: Award
              }
            ].map((edu, i) => (
              <div 
                key={i}
                className={`card-hover bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 ${visibleSections.has('about') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center mb-5">
                  <edu.Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-slate-900">{edu.title}</h3>
                <div className="text-slate-600 mb-4">{edu.degree}</div>
                <div className="flex items-center gap-4 text-sm">
                  <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-lg font-medium">
                    {edu.gpa}
                  </span>
                  <span className="text-slate-500">{edu.date}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Skills */}
          <div className="grid md:grid-cols-3 gap-6">
            {Object.entries(skills).map(([category, items], i) => (
              <div 
                key={category}
                className={`card-hover bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 ${visibleSections.has('about') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${(i + 2) * 100}ms` }}
              >
                <h3 className="text-lg font-semibold mb-4 text-slate-900">{category}</h3>
                <div className="flex flex-wrap gap-2">
                  {items.map(skill => (
                    <span 
                      key={skill} 
                      className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 hover:bg-slate-100 hover:scale-105 transition-all duration-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-32 px-6" data-animate>
        <div className="max-w-5xl mx-auto">
          <div className={`mb-16 transition-all duration-1000 ${visibleSections.has('experience') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl md:text-5xl font-light mb-3 text-slate-900">
              Work <span className="font-semibold">Experience</span>
            </h2>
            <div className="w-16 h-0.5 bg-slate-900" />
          </div>

          <div className="space-y-6">
            {experience.map((exp, idx) => (
              <div 
                key={idx} 
                className={`card-hover bg-white rounded-2xl shadow-sm border border-slate-200 p-8 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 ${visibleSections.has('experience') ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <div className="flex items-start gap-5 mb-6">
                  <img 
                    src={exp.logo}
                    alt={`${exp.company} logo`}
                    className="w-14 h-14 rounded-xl object-contain bg-slate-50 border border-slate-200 p-2 flex-shrink-0"
                    onError={(e) => {
                      e.target.outerHTML = `<div class="w-14 h-14 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center flex-shrink-0"><span class="text-lg font-semibold text-slate-400">${exp.company.charAt(0)}</span></div>`;
                    }}
                  />
                  <div>
                    <h3 className="text-2xl font-semibold text-slate-900 mb-1">{exp.role}</h3>
                    <div className="text-lg text-slate-700 mb-2">{exp.company}</div>
                    <div className="flex items-center gap-3 text-sm text-slate-500">
                      <MapPin className="w-4 h-4" />
                      <span>{exp.location}</span>
                      <span>•</span>
                      <span>{exp.date}</span>
                    </div>
                  </div>
                </div>
                <ul className="space-y-2">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i} className="text-slate-600 flex items-start">
                      <span className="mr-3 mt-2 w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-32 px-6 bg-slate-50" data-animate>
        <div className="max-w-6xl mx-auto">
          <div className={`mb-16 transition-all duration-1000 ${visibleSections.has('projects') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl md:text-5xl font-light mb-3 text-slate-900">
              Featured <span className="font-semibold">Projects</span>
            </h2>
            <div className="w-16 h-0.5 bg-slate-900" />
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, idx) => (
              <div 
                key={idx} 
                className={`card-hover bg-white rounded-2xl shadow-sm overflow-hidden border border-slate-200 hover:shadow-xl transition-all duration-500 hover:-translate-y-3 ${visibleSections.has('projects') ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <div className="h-48 relative overflow-hidden group bg-slate-100">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.target.parentElement.innerHTML = `<div class="w-full h-full bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center"><svg class="w-16 h-16 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg></div>`;
                    }}
                  />
                  <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-lg text-xs font-medium text-slate-700">
                    {project.date}
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-slate-900">
                    {project.title}
                  </h3>
                  <p className="text-slate-600 mb-4 text-sm leading-relaxed">{project.description}</p>
                  
                  <ul className="mb-4 space-y-1.5">
                    {project.highlights.map((highlight, i) => (
                      <li key={i} className="text-sm text-slate-600 flex items-start">
                        <span className="mr-2 mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map(tech => (
                      <span 
                        key={tech} 
                        className="px-2.5 py-1 bg-slate-50 border border-slate-200 text-slate-700 rounded-lg text-xs font-medium hover:bg-slate-100 hover:scale-105 transition-all duration-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  {(project.demoLink || project.githubLink || project.link) && (
                    <div className="flex gap-3 pt-4 border-t border-slate-100">
                      {project.link && (
                        <a 
                          href={project.link} 
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 px-4 py-2.5 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800 hover:scale-105 transition-all duration-200 text-center flex items-center justify-center gap-2"
                        >
                          Paper <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                      {project.demoLink && (
                        <a 
                          href={project.demoLink}
                          target="_blank"
                          rel="noopener noreferrer" 
                          className="flex-1 px-4 py-2.5 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800 hover:scale-105 transition-all duration-200 text-center flex items-center justify-center gap-2"
                        >
                          Demo <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                      {project.githubLink && (
                        <a 
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer" 
                          className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 hover:scale-110 rounded-lg transition-all duration-200 flex items-center justify-center"
                        >
                          <Github className="w-5 h-5 text-slate-700" />
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Design Section */}
      <section id="design" className="py-32 px-6" data-animate>
        <div className="max-w-6xl mx-auto">
          <div className={`mb-16 transition-all duration-1000 ${visibleSections.has('design') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl md:text-5xl font-light mb-3 text-slate-900">
              Design <span className="font-semibold">Portfolio</span>
            </h2>
            <div className="w-16 h-0.5 bg-slate-900 mb-2" />
            <p className="text-slate-600">UI/UX leadership as Head of Design at Coders Club</p>
          </div>
          
          {/* Logos */}
          <div className="mb-16">
            <h3 className="text-2xl font-semibold mb-8 text-slate-900">Logo Designs</h3>
            <div className="grid grid-cols-2 gap-6 max-w-2xl mx-auto">
              {[1, 2].map((i) => (
                <div 
                  key={i} 
                  className={`card-hover bg-white rounded-2xl shadow-sm border border-slate-200 hover:shadow-xl transition-all duration-500 hover:-translate-y-3 p-8 aspect-square flex items-center justify-center ${visibleSections.has('design') ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
                  style={{ transitionDelay: `${i * 50}ms` }}
                >
                  <img 
                    src={`/images/logos/logo-${i}.png`}
                    alt={`Logo ${i}`}
                    className="max-w-full max-h-full object-contain hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.target.parentElement.innerHTML = `<div class="text-slate-300 text-center"><svg class="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg><p class="text-sm font-medium">Logo ${i}</p></div>`;
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Posters */}
          <div>
            <h3 className="text-2xl font-semibold mb-8 text-slate-900">Event Posters</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div 
                  key={i} 
                  className={`card-hover bg-white rounded-2xl shadow-sm border border-slate-200 hover:shadow-xl transition-all duration-500 hover:-translate-y-3 overflow-hidden ${visibleSections.has('design') ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
                  style={{ transitionDelay: `${(i + 2) * 50}ms` }}
                >
                  <div className="aspect-[3/4] bg-slate-50 overflow-hidden">
                    <img 
                      src={`/images/posters/poster-${i}.png`}
                      alt={`Event Poster ${i}`}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                      onError={(e) => {
                        e.target.parentElement.innerHTML = `<div class="flex items-center justify-center h-full text-slate-300"><svg class="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg></div>`;
                      }}
                    />
                  </div>
                  <div className="p-4 bg-white">
                    <p className="text-sm font-medium text-slate-700 text-center">Event Poster {i}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6 bg-slate-50" data-animate>
        <div className="max-w-4xl mx-auto text-center">
          <div className={`transition-all duration-1000 ${visibleSections.has('contact') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl md:text-5xl font-light mb-4 text-slate-900">
              Let&apos;s <span className="font-semibold">Connect</span>
            </h2>
            <p className="text-lg text-slate-600 mb-12 leading-relaxed max-w-2xl mx-auto">
              I&apos;m currently seeking opportunities in AI/ML engineering and research. 
              Let&apos;s discuss how I can contribute to your team.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a 
                href="mailto:pb55@rice.edu" 
                className="px-8 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 hover:scale-105 transition-all duration-200 font-medium flex items-center justify-center gap-2"
              >
                <Mail className="w-5 h-5" />
                Email Me
              </a>
              <a 
                href="https://linkedin.com/in/prashithaa" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="px-8 py-3 bg-white border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 hover:scale-105 transition-all duration-200 font-medium flex items-center justify-center gap-2"
              >
                <Linkedin className="w-5 h-5" />
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-slate-900 text-slate-400">
        <div className="max-w-6xl mx-auto text-center">
          <p className="mb-6">© 2025 Prashithaa Abhirami Balaji. All rights reserved.</p>
          <div className="flex justify-center space-x-6">
            {[
              { Icon: Mail, href: "mailto:pb55@rice.edu" },
              { Icon: Linkedin, href: "https://linkedin.com/in/prashithaa" },
              { Icon: Github, href: "https://github.com/prashithaa" }
            ].map(({ Icon, href }, i) => (
              <a 
                key={i}
                href={href} 
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="p-3 bg-slate-800 hover:bg-slate-700 hover:scale-110 rounded-lg transition-all duration-200"
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}