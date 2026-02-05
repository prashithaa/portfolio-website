import React, { useState, useEffect, useRef } from 'react';
import { Mail, Linkedin, Github, ChevronDown, ExternalLink, Award, Briefcase, GraduationCap, Code, Brain, Database, FileImage, Palette, ArrowRight, Star, MapPin, TrendingUp, Users, BookOpen, Sparkles } from 'lucide-react';

export default function Portfolio() {
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('home');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [activeProject, setActiveProject] = useState(0);
  const [stats, setStats] = useState({ gpa: 0, projects: 0, publications: 0 });

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
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    // Animate stats
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

  // Intersection Observer for scroll animations
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
      metrics: [
        { label: "Model", value: "ViT-GPT2" },
        { label: "Dataset", value: "Flickr8k" }
      ],
      tech: ["PyTorch", "Vision Transformers", "GPT-2", "NLP"],
      gradient: "from-blue-400 via-cyan-400 to-teal-400",
      image: "/images/caption-it-demo.png",
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
      metrics: [
        { label: "Accuracy", value: "93%" },
        { label: "Samples", value: "5000+" }
      ],
      tech: ["PyTorch", "Librosa", "Computer Vision", "Audio Processing"],
      gradient: "from-purple-400 via-pink-400 to-rose-400",
      image: "/images/deepfake-detection.png",
      link: "https://ijisae.org/index.php/IJISAE/article/view/5734",
      demoLink: "",
      githubLink: ""
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
      metrics: [
        { label: "Type", value: "Edge AI" },
        { label: "Model", value: "LSTM" }
      ],
      tech: ["LSTM", "Isolation Forest", "IoT", "Time Series"],
      gradient: "from-orange-400 via-amber-400 to-yellow-400",
      image: "/images/edge-ai.png",
      demoLink: "",
      githubLink: ""
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
      metrics: [
        { label: "Accuracy", value: "93.5%" },
        { label: "Impact", value: "High" }
      ],
      tech: ["Machine Learning", "Image Processing", "Computer Vision"],
      gradient: "from-green-400 via-emerald-400 to-teal-400",
      image: "/images/plant-disease.png",
      demoLink: "",
      githubLink: ""
    }
  ];

  const experience = [
    {
      company: "Bessemer Alliance LLC",
      role: "AI Innovation Intern",
      location: "Pittsburgh, USA",
      date: "Nov 2025 – Dec 2025",
      color: "emerald",
      icon: <TrendingUp className="w-5 h-5" />,
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
      color: "blue",
      icon: <Brain className="w-5 h-5" />,
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
      color: "purple",
      icon: <Database className="w-5 h-5" />,
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
      color: "pink",
      icon: <Code className="w-5 h-5" />,
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Animated gradient orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute w-96 h-96 rounded-full blur-3xl opacity-30 bg-gradient-to-br from-blue-400 to-cyan-400 transition-all duration-1000 ease-out"
          style={{
            left: `${mousePosition.x / 10}px`,
            top: `${mousePosition.y / 10}px`,
          }}
        />
        <div 
          className="absolute w-96 h-96 rounded-full blur-3xl opacity-20 bg-gradient-to-br from-purple-400 to-pink-400 transition-all duration-1000 ease-out"
          style={{
            right: `${mousePosition.x / 15}px`,
            bottom: `${mousePosition.y / 15}px`,
          }}
        />
      </div>
      
      {/* Animated gradient orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div 
        className="absolute w-[600px] h-[600px] rounded-full blur-3xl opacity-40 bg-gradient-to-br from-blue-400 via-cyan-400 to-purple-400 transition-all duration-700 ease-out"
        style={{
          left: `${mousePosition.x - 300}px`,
          top: `${mousePosition.y - 300}px`,
        }}
        />
        <div 
          className="absolute w-[500px] h-[500px] rounded-full blur-3xl opacity-30 bg-gradient-to-br from-purple-400 via-pink-400 to-rose-400 transition-all duration-1000 ease-out"
          style={{
            left: `${mousePosition.x - 250}px`,
            top: `${mousePosition.y - 250}px`,
            transform: 'translate(100px, 100px)',
            }}
            />
        <div 
        className="absolute w-[400px] h-[400px] rounded-full blur-3xl opacity-25 bg-gradient-to-br from-cyan-400 via-teal-400 to-green-400 transition-all duration-500 ease-out"
        style={{
          left: `${mousePosition.x - 200}px`,
          top: `${mousePosition.y - 200}px`,
          transform: 'translate(-50px, 50px)',
           }}
          />
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrollY > 50 ? 'bg-white/90 backdrop-blur-2xl shadow-lg border-b border-gray-200' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <a href="#home" className="group flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
              <span className="text-white font-bold text-lg">PA</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Prashithaa
            </span>
          </a>
          <div className="hidden md:flex space-x-1">
            {['About', 'Experience', 'Projects', 'Design', 'Contact'].map(item => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeSection === item.toLowerCase() 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {item}
              </a>
            ))}
          </div>
          <a 
            href="mailto:pb55@rice.edu" 
            className="group px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl text-sm font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center space-x-2"
          >
            <Mail className="w-4 h-4 group-hover:rotate-12 transition-transform" />
            <span>Get in Touch</span>
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center px-6 pt-20 relative">
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="mb-8 inline-block">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity animate-pulse" />
              <div className="relative w-40 h-40 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center text-white text-5xl font-bold shadow-2xl transform group-hover:scale-110 transition-transform duration-500">
                PA
              </div>
            </div>
          </div>
          
          {/* Removed availability badge */}

          <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tight">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient">
              Prashithaa Abhirami Balaji
            </span>
          </h1>
          
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              ))}
            </div>
          </div>

          <p className="text-xl md:text-2xl text-gray-700 font-semibold mb-4 max-w-3xl mx-auto">
            AI/ML Engineer & Researcher
          </p>
          
          <p className="text-lg text-gray-600 mb-4 max-w-3xl mx-auto leading-relaxed">
            Master's in Computer Science at <span className="font-bold text-blue-600">Rice University</span>, 
            specializing in deep learning, computer vision, and natural language processing
          </p>

          <div className="flex items-center justify-center gap-2 text-gray-500 mb-8">
            <MapPin className="w-4 h-4" />
            <span className="text-sm font-medium">Houston, Texas</span>
          </div>

          {/* Animated Stats */}
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            <div className="group bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-blue-100">
              <div className="text-4xl font-black bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">
                {stats.gpa.toFixed(2)}
              </div>
              <div className="text-gray-600 text-sm font-semibold flex items-center gap-2">
                <GraduationCap className="w-4 h-4" />
                GPA at Rice
              </div>
            </div>
            <div className="group bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-purple-100">
              <div className="text-4xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                {Math.floor(stats.projects)}+
              </div>
              <div className="text-gray-600 text-sm font-semibold flex items-center gap-2">
                <Code className="w-4 h-4" />
                AI/ML Projects
              </div>
            </div>
            <div className="group bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-pink-100">
              <div className="text-4xl font-black bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent mb-2">
                {Math.floor(stats.publications)}
              </div>
              <div className="text-gray-600 text-sm font-semibold flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Publication
              </div>
            </div>
          </div>

          <div className="flex justify-center space-x-4 mb-12">
            {[
              { Icon: Mail, href: "mailto:pb55@rice.edu", color: "blue" },
              { Icon: Linkedin, href: "https://linkedin.com/in/prashithaa", color: "purple" },
              { Icon: Github, href: "https://github.com/prashithaa", color: "pink" }
            ].map(({ Icon, href, color }, i) => (
              <a 
                key={i}
                href={href} 
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className={`group p-4 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 hover:-translate-y-1 border border-${color}-100`}
              >
                <Icon className={`w-6 h-6 text-gray-600 group-hover:text-${color}-600 transition-colors`} />
              </a>
            ))}
          </div>

          <a href="#about" className="inline-block animate-bounce">
            <ChevronDown className="w-10 h-10 text-gray-400 hover:text-blue-600 transition-colors" />
          </a>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-6" data-animate>
        <div className="max-w-6xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-1000 ${visibleSections.has('about') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-flex items-center space-x-2 mb-4 px-6 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-bold text-blue-600 uppercase tracking-wider">About Me</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              My Journey
            </h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full" />
          </div>
          
          <div className={`bg-white/80 backdrop-blur-sm p-10 md:p-16 rounded-3xl shadow-2xl mb-12 border border-gray-100 hover:shadow-3xl transition-all duration-500 ${visibleSections.has('about') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed mb-6">
                My fascination with artificial intelligence began in childhood, sparked by curiosity about how 
                computer games worked. Learning from my father about the thousands of lines of code behind 
                these games led me to wonder: <span className="font-bold text-blue-600">can machines think and act like us?</span>
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                This question deepened when I discovered IBM Watson in 2010 and the concept of "computers that learn." 
                The Iron Man movie series and JARVIS visualized how AI could transform every aspect of life, 
                opening my eyes to the vast opportunities in this field.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Today, at Rice University, I'm pursuing my passion for developing AI-driven solutions that make 
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
                color: "blue",
                Icon: GraduationCap
              },
              {
                title: "Anna University",
                degree: "BS Computer Science",
                gpa: "9.2/10.0",
                date: "Nov 2020 - May 2024",
                color: "purple",
                Icon: Award
              }
            ].map((edu, i) => (
              <div 
                key={i}
                className={`group bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${visibleSections.has('about') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br from-${edu.color}-500 to-${edu.color}-600 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300`}>
                  <edu.Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-2 text-gray-900">{edu.title}</h3>
                <div className="text-gray-600 font-medium mb-3">{edu.degree}</div>
                <div className="flex items-center gap-3">
                  <span className={`px-4 py-2 bg-gradient-to-r from-${edu.color}-100 to-${edu.color}-50 text-${edu.color}-700 rounded-xl text-sm font-bold`}>
                    {edu.gpa}
                  </span>
                  <span className="text-sm text-gray-500">{edu.date}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Skills */}
          <div className="grid md:grid-cols-3 gap-6">
            {Object.entries(skills).map(([category, items], i) => (
              <div 
                key={category}
                className={`bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${visibleSections.has('about') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${(i + 2) * 100}ms` }}
              >
                <h3 className="text-xl font-bold mb-4 text-gray-900">{category}</h3>
                <div className="flex flex-wrap gap-2">
                  {items.map(skill => (
                    <span 
                      key={skill} 
                      className="px-3 py-2 bg-gradient-to-r from-gray-100 to-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:shadow-md hover:scale-105 transition-all duration-200 cursor-default"
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
      <section id="experience" className="py-32 px-6 bg-gradient-to-b from-white to-blue-50" data-animate>
        <div className="max-w-6xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-1000 ${visibleSections.has('experience') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-flex items-center space-x-2 mb-4 px-6 py-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full">
              <Briefcase className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-bold text-purple-600 uppercase tracking-wider">Experience</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Work History
            </h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto rounded-full" />
          </div>

          <div className="space-y-8">
            {experience.map((exp, idx) => (
              <div 
                key={idx} 
                className={`group bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${visibleSections.has('experience') ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                  <div className="flex items-start gap-4">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br from-${exp.color}-500 to-${exp.color}-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300`}>
                      {exp.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{exp.role}</h3>
                      <div className="text-xl font-semibold text-gray-700 mb-2">{exp.company}</div>
                      <div className="flex items-center gap-3 text-sm text-gray-500">
                        <MapPin className="w-4 h-4" />
                        <span>{exp.location}</span>
                        <span>•</span>
                        <span>{exp.date}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <ul className="space-y-3">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i} className="text-gray-700 flex items-start group/item">
                      <ArrowRight className="mr-3 mt-1 w-5 h-5 text-blue-600 flex-shrink-0 group-hover/item:translate-x-2 transition-transform duration-300" />
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
      <section id="projects" className="py-32 px-6" data-animate>
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-1000 ${visibleSections.has('projects') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-flex items-center space-x-2 mb-4 px-6 py-2 bg-gradient-to-r from-cyan-100 to-blue-100 rounded-full">
              <Code className="w-4 h-4 text-cyan-600" />
              <span className="text-sm font-bold text-cyan-600 uppercase tracking-wider">Portfolio</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black mb-4 bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-cyan-600 to-blue-600 mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, idx) => (
              <div 
                key={idx} 
                className={`group bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 ${visibleSections.has('projects') ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                style={{ transitionDelay: `${idx * 100}ms` }}
                onMouseEnter={() => setActiveProject(idx)}
              >
                <div className={`h-56 bg-gradient-to-br ${project.gradient} relative overflow-hidden`}>
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                    onError={(e) => e.target.style.display = 'none'}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                    <span className="text-white/90 text-sm font-semibold">{project.date}</span>
                    <div className="flex gap-2">
                      {project.metrics.map((metric, i) => (
                        <div key={i} className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-lg">
                          <div className="text-white text-xs font-bold">{metric.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{project.description}</p>
                  
                  <ul className="mb-6 space-y-2">
                    {project.highlights.map((highlight, i) => (
                      <li key={i} className="text-sm text-gray-600 flex items-start">
                        <span className="mr-2 mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-600 flex-shrink-0" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map(tech => (
                      <span 
                        key={tech} 
                        className="px-3 py-1.5 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 text-blue-700 rounded-xl text-xs font-semibold hover:scale-110 transition-transform duration-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex gap-3 pt-4 border-t border-gray-100">
                    {project.demoLink && (
                      <a 
                        href={project.demoLink} 
                        className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl text-sm font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 text-center flex items-center justify-center gap-2"
                      >
                        Live Demo <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                    {project.githubLink && (
                      <a 
                        href={project.githubLink} 
                        className="px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all duration-300 flex items-center justify-center"
                      >
                        <Github className="w-5 h-5" />
                      </a>
                    )}
                    {project.link && (
                      <a 
                        href={project.link} 
                        className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-200 text-purple-700 rounded-xl text-sm font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 text-center flex items-center justify-center gap-2"
                      >
                        Publication <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Design Section */}
      <section id="design" className="py-32 px-6 bg-gradient-to-b from-purple-50 to-pink-50" data-animate>
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-1000 ${visibleSections.has('design') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-flex items-center space-x-2 mb-4 px-6 py-2 bg-gradient-to-r from-pink-100 to-purple-100 rounded-full">
              <Palette className="w-4 h-4 text-pink-600" />
              <span className="text-sm font-bold text-pink-600 uppercase tracking-wider">Creative Work</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Design Portfolio
            </h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-pink-600 to-purple-600 mx-auto rounded-full mb-4" />
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              UI/UX leadership as Head of Design at Coders Club
            </p>
          </div>
          
          {/* Logos */}
          <div className="mb-20">
            <h3 className="text-3xl font-bold text-center mb-10 text-gray-900">Logo Designs</h3>
            <div className="grid grid-cols-2 gap-6 max-w-2xl mx-auto">
              {[1, 2].map((i) => (
                <div 
                  key={i} 
                  className={`group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-8 aspect-square flex items-center justify-center border border-gray-100 hover:-translate-y-3 ${visibleSections.has('design') ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
                  style={{ transitionDelay: `${i * 50}ms` }}
                >
                  <img 
                    src={`/images/logos/logo-${i}.png`}
                    alt={`Logo ${i}`}
                    className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.target.parentElement.innerHTML = `<div class="text-gray-300 text-center"><svg class="w-20 h-20 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg><p class="text-sm font-medium">Logo ${i}</p></div>`;
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Posters */}
          <div>
            <h3 className="text-3xl font-bold text-center mb-10 text-gray-900">Event Posters</h3>
            <div className="grid md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div 
                  key={i} 
                  className={`group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:-translate-y-3 ${visibleSections.has('design') ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
                  style={{ transitionDelay: `${(i + 4) * 50}ms` }}
                >
                  <div className="aspect-[3/4] bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 overflow-hidden">
                    <img 
                      src={`/images/posters/poster-${i}.png`}
                      alt={`Poster ${i}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      onError={(e) => {
                        e.target.parentElement.innerHTML = `<div class="flex items-center justify-center h-full text-gray-300"><svg class="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg></div>`;
                      }}
                    />
                  </div>
                  <div className="p-5 bg-white">
                    <p className="text-sm font-bold text-gray-700 text-center">Event Poster {i}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6" data-animate>
        <div className="max-w-4xl mx-auto text-center">
          <div className={`transition-all duration-1000 ${visibleSections.has('contact') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-flex items-center space-x-2 mb-4 px-6 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full">
              <Mail className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-bold text-blue-600 uppercase tracking-wider">Get in Touch</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Let's Connect
            </h2>
            <p className="text-xl text-gray-600 mb-12 leading-relaxed max-w-2xl mx-auto">
              I'm currently seeking opportunities in AI/ML engineering and research. 
              Let's discuss how I can contribute to your team.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <a 
                href="mailto:pb55@rice.edu" 
                className="group px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl hover:shadow-2xl transition-all duration-300 font-bold text-lg hover:scale-105 flex items-center justify-center gap-3"
              >
                <Mail className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                Email Me
              </a>
              <a 
                href="https://linkedin.com/in/prashithaa" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group px-10 py-4 bg-white border-2 border-blue-600 text-blue-600 rounded-2xl hover:bg-blue-50 transition-all duration-300 font-bold text-lg hover:scale-105 flex items-center justify-center gap-3 shadow-lg"
              >
                <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform" />
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-gradient-to-r from-gray-900 to-gray-800 text-gray-300">
        <div className="max-w-6xl mx-auto text-center">
          <p className="mb-6 text-lg">© 2025 Prashithaa Abhirami Balaji. Crafted with passion & precision.</p>
          <div className="flex justify-center space-x-6">
            {[
              { Icon: Mail, href: "mailto:pb55@rice.edu" },
              { Icon: Linkedin, href: "https://linkedin.com/in/prashithaa" },
              { Icon: Github, href: "https://github.com/prashithaa" }
            ].map(({ Icon, href }, i) => (
              <a 
                key={i}
                href={href} 
                className="p-3 bg-gray-800 hover:bg-gray-700 rounded-xl transition-all duration-300 hover:scale-110"
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
}