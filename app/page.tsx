"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronRight, ChevronLeft, Menu, X, ArrowRight, MousePointer } from "lucide-react"
import FaqDropdown from "@/components/faq-dropdown"
import Link from "next/link"

const ResumeWebsite = () => {
  const [activeSection, setActiveSection] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [transitioning, setTransitioning] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [showKeyboardHint, setShowKeyboardHint] = useState(false)
  const [pageLoaded, setPageLoaded] = useState(false)
  const [progressValue, setProgressValue] = useState(0)
  const contentRefs = useRef([])
  
  // Initialize refs for each section
  useEffect(() => {
    contentRefs.current = Array(sections.length).fill().map(() => useRef())
  }, [])

  // Track cursor position for custom interactions
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Page load initial animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setPageLoaded(true)
      document.body.classList.add('loaded')
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  // Handle scroll for sticky header effect and progress
  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 50)
      
      // Update progress bar based on scroll
      const scrollTop = window.scrollY
      const winHeight = window.innerHeight
      const docHeight = document.body.scrollHeight
      const totalScrollable = docHeight - winHeight
      const progress = scrollTop / totalScrollable
      
      setProgressValue(progress)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Navigation functions with enhanced transitions
  const goToSection = (index) => {
    if (index >= 0 && index < sections.length && !transitioning) {
      setTransitioning(true)
      
      // Add exit animation class
      const currentSection = document.getElementById(`section-${activeSection}`)
      if (currentSection) {
        currentSection.classList.add('section-exit')
      }
      
      // Start transition out animation
      setTimeout(() => {
        setActiveSection(index)
        
        // Wait for transition in animation
        setTimeout(() => {
          const newSection = document.getElementById(`section-${index}`)
          if (newSection) {
            newSection.classList.add('section-enter')
          }
          
          setTransitioning(false)
          
          // Show keyboard hint briefly after navigation
          setShowKeyboardHint(true)
          setTimeout(() => setShowKeyboardHint(false), 2000)
        }, 50)
      }, 400)
    }
    setMobileMenuOpen(false)
  }

  const goToNextSection = () => {
    if (activeSection < sections.length - 1) {
      goToSection(activeSection + 1)
    } else {
      // Visual feedback when at the last section
      const element = document.getElementById("main-container")
      element.classList.add("shake-subtle")
      setTimeout(() => element.classList.remove("shake-subtle"), 500)
    }
  }

  const goToPrevSection = () => {
    if (activeSection > 0) {
      goToSection(activeSection - 1)
    } else {
      // Visual feedback when at the first section
      const element = document.getElementById("main-container")
      element.classList.add("shake-subtle")
      setTimeout(() => element.classList.remove("shake-subtle"), 500)
    }
  }

  // Handle keyboard navigation with enhanced feedback
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        goToNextSection()
        setShowKeyboardHint(true)
        setTimeout(() => setShowKeyboardHint(false), 1000)
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        goToPrevSection()
        setShowKeyboardHint(true)
        setTimeout(() => setShowKeyboardHint(false), 1000)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [activeSection])

  // Apply subtle parallax effect to decorative elements
  useEffect(() => {
    const parallaxElements = document.querySelectorAll('.parallax-element')
    
    parallaxElements.forEach(element => {
      const factor = parseFloat(element.getAttribute('data-factor') || '0.5')
      const translateX = cursorPosition.x / 100 * factor
      const translateY = cursorPosition.y / 100 * factor
      
      element.style.transform = `translate(${translateX}px, ${translateY}px)`
    })
  }, [cursorPosition])

  const sections = [
    {
      title: (
        <>
          <span
            className="font-serif"
            style={{
              fontFamily: "'Playfair Display', 'Times New Roman', serif",
              fontWeight: 400,
              letterSpacing: "0.02em",
            }}
          >
            Hi, <span style={{ fontStyle: "italic" }}>Red</span> <span style={{ fontStyle: "italic" }}>Beryl</span>
          </span>
        </>
      ),
      content: (
        <>
          <div className="relative animate-fade-in-up">
            {/* Background decorative elements with parallax */}
            <div 
              className="absolute top-10 right-0 w-48 h-48 bg-red-900 rounded-full filter blur-3xl opacity-10 transform translate-x-1/4 animate-pulse parallax-element"
              data-factor="-0.5"
            ></div>
            <div 
              className="absolute bottom-10 left-0 w-40 h-40 bg-red-900 rounded-full filter blur-3xl opacity-10 transform -translate-x-1/4 animate-pulse parallax-element" 
              style={{ animationDelay: "1s" }}
              data-factor="0.5"
            ></div>

            {/* Main content with subtle animation */}
            <div className="relative z-10">
              <div className="mb-10 inline-block hover-scale-element">
                <span
                  className="text-6xl text-red-500 opacity-20 absolute -top-8 -left-6"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  "
                </span>
                <p
                  className="text-3xl md:text-4xl mb-8 leading-relaxed"
                  style={{ fontFamily: "'Crimson Text', serif", lineHeight: "1.4" }}
                >
                  I'm <span className="text-red-300 font-semibold hover:text-red-400 transition-colors duration-300">Ritwik Singh</span>,
                  <br className="hidden md:block" /> a Filmmaker and Marketer
                  <br className="hidden md:block" /> with a passion for backend automation.
                </p>
                <span
                  className="text-6xl text-red-500 opacity-20 absolute -bottom-10 -right-6"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  "
                </span>
              </div>

              <div className="w-24 h-px bg-gradient-to-r from-red-800 to-transparent my-8 hover-shrink-element"></div>

              <div className="relative pl-5 border-l-2 border-red-900 mt-12 hover-slide-element">
                <p
                  className="text-xl text-gray-300"
                  style={{ fontFamily: "'Crimson Text', serif", lineHeight: "1.6", fontStyle: "italic" }}
                >
                  With this unique blend of skills, I bridge the gap between
                  <span className="relative inline-block mx-1 group">
                    <span className="text-red-300 group-hover:text-red-200 transition-colors duration-300">cinematic vision</span>
                    <span className="absolute bottom-0 left-0 w-full h-px bg-red-800 opacity-40 group-hover:w-0 transition-all duration-700"></span>
                  </span>
                  and
                  <span className="relative inline-block mx-1 group">
                    <span className="text-red-300 group-hover:text-red-200 transition-colors duration-300">data-driven results</span>
                    <span className="absolute bottom-0 left-0 w-full h-px bg-red-800 opacity-40 group-hover:w-0 transition-all duration-700"></span>
                  </span>
                  —transforming creative concepts into measurable business outcomes.
                </p>
              </div>

              {/* Skill badges with improved hover effects */}
              <div className="flex flex-wrap gap-3 mt-12 stagger-fade-in">
                <span
                  className="bg-red-950 bg-opacity-30 border border-red-900 border-opacity-40 px-3 py-1 text-sm rounded text-red-200 hover:bg-red-900 hover:bg-opacity-50 transition-all cursor-default transform hover-pop-element"
                  style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: "0.05em" }}
                >
                  Filmmaker
                </span>
                <span
                  className="bg-red-950 bg-opacity-30 border border-red-900 border-opacity-40 px-3 py-1 text-sm rounded text-red-200 hover:bg-red-900 hover:bg-opacity-50 transition-all cursor-default transform hover-pop-element"
                  style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: "0.05em" }}
                >
                  Marketer
                </span>
                <span
                  className="bg-red-950 bg-opacity-30 border border-red-900 border-opacity-40 px-3 py-1 text-sm rounded text-red-200 hover:bg-red-900 hover:bg-opacity-50 transition-all cursor-default transform hover-pop-element"
                  style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: "0.05em" }}
                >
                  Automation
                </span>
              </div>
            </div>
          </div>
        </>
      ),
      icon: "01",
    },
    {
      title: "What Do I Do?",
      content: (
        <>
          <div className="animate-fade-in-up">
            <p 
              className="mb-8 text-xl" 
              style={{ fontFamily: "'Crimson Text', serif", lineHeight: "1.6" }}
            >
              I manage the complete marketing lifecycle from content creation to customer conversion.
            </p>

            <div className="space-y-12 my-10 stagger-fade-in">
              <div className="flex items-start group hover-slide-element">
                <div className="mr-6">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-900 bg-opacity-30 border border-red-800 group-hover:bg-opacity-50 transition-all duration-300 hover-scale-element">
                    <span className="text-red-400 font-bold" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                      01
                    </span>
                  </div>
                  <div className="animate-grow-height h-full w-px bg-gradient-to-b from-red-800 to-transparent mx-auto my-2 opacity-30 group-hover:opacity-60 transition-opacity duration-300"></div>
                </div>
                <div>
                  <h4
                    className="text-xl font-medium text-red-300 mb-3 group-hover:text-red-200 transition-colors duration-300"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    Content Creation
                  </h4>
                  <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
                    I produce engaging video content that communicates your brand message effectively.
                  </p>
                </div>
              </div>

              <div className="flex items-start group hover-slide-element">
                <div className="mr-6">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-900 bg-opacity-30 border border-red-800 group-hover:bg-opacity-50 transition-all duration-300 hover-scale-element">
                    <span className="text-red-400 font-bold" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                      02
                    </span>
                  </div>
                  <div className="animate-grow-height h-full w-px bg-gradient-to-b from-red-800 to-transparent mx-auto my-2 opacity-30 group-hover:opacity-60 transition-opacity duration-300"></div>
                </div>
                <div>
                  <h4
                    className="text-xl font-medium text-red-300 mb-3 group-hover:text-red-200 transition-colors duration-300"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    Targeted Campaigns
                  </h4>
                  <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
                    I implement targeted campaigns on Facebook and YouTube to connect your content with the right
                    audience.
                  </p>
                </div>
              </div>

              <div className="flex items-start group hover-slide-element">
                <div className="mr-6">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-900 bg-opacity-30 border border-red-800 group-hover:bg-opacity-50 transition-all duration-300 hover-scale-element">
                    <span className="text-red-400 font-bold" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                      03
                    </span>
                  </div>
                </div>
                <div>
                  <h4
                    className="text-xl font-medium text-red-300 mb-3 group-hover:text-red-200 transition-colors duration-300"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    Automated Systems
                  </h4>
                  <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
                    I build automated systems using n8n that nurture leads through the conversion process without constant
                    manual intervention.
                  </p>
                </div>
              </div>
            </div>

            <p 
              className="mt-8 text-lg border-l-2 border-red-800 pl-4 italic text-gray-400 hover:border-red-700 hover:text-gray-300 transition-all duration-300 hover-slide-element"
            >
              This three-stage approach creates a seamless journey from first impression to final conversion while
              maximizing efficiency.
            </p>
          </div>
        </>
      ),
      icon: "02",
    },
    {
      title: "Filmmaker Portfolio",
      content: (
        <>
          <div className="animate-fade-in-up">
            <h3
              className="text-2xl font-normal mb-8 text-red-300 hover-slide-element"
              style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}
            >
              Visual Storytelling
            </h3>

            {/* Timeline visualization with enhanced animations */}
            <div className="relative pb-12 mb-10 stagger-fade-in">
              <div className="absolute left-0 top-0 bottom-0 w-px animate-grow-height bg-gradient-to-b from-red-800 via-red-900 to-transparent"></div>

              <div className="relative ml-8 mb-10 group hover-slide-element">
                <div className="absolute -left-8 w-6 h-6 rounded-full bg-red-950 border border-red-800 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 hover-scale-element">
                  <div className="w-2 h-2 rounded-full bg-red-500 group-hover:w-3 group-hover:h-3 transition-all duration-300 animate-pulse-soft"></div>
                </div>
                <div className="bg-black bg-opacity-40 p-5 border-l border-red-900 hover:bg-opacity-50 transition-all duration-300">
                  <h4
                    className="text-red-200 mb-2"
                    style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.85rem", letterSpacing: "0.1em" }}
                  >
                    EARLY BEGINNINGS
                  </h4>
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                    My filmmaking journey progressed from early projects in school to serving as Direction Head for Sri
                    Venkateshwara College's filmmaking society.
                  </p>
                </div>
              </div>

              <div className="relative ml-8 group hover-slide-element">
                <div className="absolute -left-8 w-6 h-6 rounded-full bg-red-950 border border-red-800 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 hover-scale-element">
                  <div className="w-2 h-2 rounded-full bg-red-500 group-hover:w-3 group-hover:h-3 transition-all duration-300 animate-pulse-soft" style={{ animationDelay: "0.7s" }}></div>
                </div>
                <div className="bg-black bg-opacity-40 p-5 border-l border-red-900 hover:bg-opacity-50 transition-all duration-300">
                  <h4
                    className="text-red-200 mb-2"
                    style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.85rem", letterSpacing: "0.1em" }}
                  >
                    PROFESSIONAL WORK
                  </h4>
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                    For the past two years, I've helped brands communicate through video as a freelance filmmaker.
                  </p>
                </div>
              </div>
            </div>

            {/* Philosophy section with enhanced animations */}
            <div className="relative mb-12 group hover-slide-element">
              <div className="absolute top-0 left-0 w-12 h-12 -mt-6 -ml-6 animate-rotate-slow">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 12L12 7L17 12L12 17L7 12Z" stroke="#8B0000" strokeOpacity="0.4" strokeWidth="0.5" />
                </svg>
              </div>

              <div className="border-r border-red-900 pr-6 py-4 ml-6 group-hover:border-red-700 transition-colors duration-300">
                <h4 className="text-lg text-red-200 mb-3 group-hover:text-red-100 transition-colors duration-300" style={{ fontFamily: "'Playfair Display', serif" }}>
                  My Approach
                </h4>
                <p className="text-gray-300 italic group-hover:text-gray-200 transition-colors duration-300" style={{ fontFamily: "'Crimson Text', serif", lineHeight: "1.7" }}>
                  "Maintaining narrative integrity—never breaking the brand's story for visual flair. The content serves
                  business objectives first, aesthetics second."
                </p>
              </div>
            </div>

            {/* Portfolio call to action with enhanced animations */}
            <div className="relative mt-16 mb-8">
              <div className="h-px w-full bg-gradient-to-r from-transparent via-red-900 to-transparent opacity-30 mb-8"></div>
              <p
                className="text-xl text-center italic mb-8 animate-pulse-text"
                style={{ fontFamily: "'Crimson Text', serif", lineHeight: "1.6" }}
              >
                <span className="text-red-400">Action speaks louder than words.</span> Let my work tell its own story.
              </p>
              <div className="flex justify-center">
                <Link
                  href="/portfolio"
                  className="group bg-red-950 hover:bg-red-900 border border-red-800 text-red-200 py-3 px-6 rounded-sm transition-all flex items-center hover:shadow-lg hover:shadow-red-900/20 duration-300 hover-pop-element"
                  style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: "0.1em", fontSize: "0.9rem" }}
                >
                  VIEW MY PORTFOLIO <span className="ml-2 group-hover:ml-3 transition-all duration-300">→</span>
                </Link>
              </div>
            </div>
          </div>
        </>
      ),
      icon: "03",
    },
    {
      title: "Performance Marketing",
      content: (
        <>
          <div className="animate-fade-in-up">
            <h3
              className="text-2xl font-normal mb-6 text-red-300 hover-slide-element"
              style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}
            >
              Strategic Campaign Management
            </h3>
            
            <p className="mb-6">
              I design data-driven campaigns on Facebook and YouTube that deliver measurable results. My approach
              includes:
            </p>
            
            <ul className="space-y-3 mb-6 stagger-fade-in">
              <li className="flex items-start hover-slide-element">
                <span className="text-red-400 mr-3">—</span>
                <span>Precise audience targeting</span>
              </li>
              <li className="flex items-start hover-slide-element">
                <span className="text-red-400 mr-3">—</span>
                <span>Creative testing and optimization</span>
              </li>
              <li className="flex items-start hover-slide-element">
                <span className="text-red-400 mr-3">—</span>
                <span>Conversion pathway refinement</span>
              </li>
              <li className="flex items-start hover-slide-element">
                <span className="text-red-400 mr-3">—</span>
                <span>Cross-platform coordination</span>
              </li>
              <li className="flex items-start hover-slide-element">
                <span className="text-red-400 mr-3">—</span>
                <span>Performance analysis</span>
              </li>
            </ul>
            
            <p className="mb-10">
              Each campaign generates valuable insights while producing immediate results in awareness, engagement, and
              conversions.
            </p>

            {/* Case Study with enhanced animations */}
            <div 
              className="bg-black bg-opacity-40 border border-red-900 border-opacity-30 rounded-sm mt-12 overflow-hidden hover-lift-element"
            >
              <div className="border-b border-red-900 border-opacity-30 px-6 py-4 flex justify-between items-center">
                <h4 className="text-lg font-medium text-red-200" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Case Study: Wear Azora
                </h4>
                <a
                  href="https://wearazora.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-red-400 hover:text-red-300 transition-colors duration-300 underline group flex items-center hover-scale-element"
                >
                  Visit Site 
                  <div className="arrow-bounce">
                    <ArrowRight size={12} className="ml-1 group-hover:ml-2 transition-all duration-300" />
                  </div>
                </a>
              </div>

              <div className="p-6">
                <div className="flex flex-wrap gap-6 mb-6">
                  <div className="flex-1 min-w-[200px] hover-lift-small-element">
                    <p className="text-sm text-gray-400 mb-1">Client Industry</p>
                    <p className="text-gray-200">Fashion & Apparel</p>
                  </div>
                  <div className="flex-1 min-w-[200px] hover-lift-small-element">
                    <p className="text-sm text-gray-400 mb-1">Campaign Period</p>
                    <p className="text-gray-200">Ongoing</p>
                  </div>
                  <div className="flex-1 min-w-[200px] hover-lift-small-element">
                    <p className="text-sm text-gray-400 mb-1">Platform</p>
                    <p className="text-gray-200">Facebook & Instagram Ads</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-6 mt-8">
                  <div className="flex-1 min-w-[180px] hover-lift-small-element">
                    <p className="text-sm text-gray-400 mb-2">Monthly Ad Spend</p>
                    <p className="text-2xl text-white font-light">₹80,000</p>
                  </div>
                  <div className="flex-1 min-w-[180px] hover-lift-small-element">
                    <p className="text-sm text-gray-400 mb-2">ROAS</p>
                    <p className="text-2xl text-red-300 font-light animate-pulse-text">
                      12.4x
                    </p>
                  </div>
                  <div className="flex-1 min-w-[180px] hover-lift-small-element">
                    <p className="text-sm text-gray-400 mb-2">Revenue Generated</p>
                    <p className="text-2xl text-white font-light">₹992,000</p>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-red-900 border-opacity-20">
                  <p className="text-sm text-gray-300">
                    Currently managing all digital marketing for Wear Azora, driving consistent growth through optimized
                    targeting and creative strategies. By focusing on high-intent audiences and continually refining ad
                    creative, I've achieved an exceptional return on ad spend of 12.4x, significantly outperforming
                    industry averages.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      ),
      icon: "04",
    },
    {
      title: "Backend Automation",
      content: (
        <>
          <div className="animate-fade-in-up">
            <h3
              className="text-2xl font-normal mb-6 text-red-300 hover-slide-element"
              style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}
            >
              Systems Integration
            </h3>
            
            <p className="mb-6">
              Using n8n, I create automated workflows that connect marketing platforms, CRM systems, and communication
              channels into a cohesive ecosystem.
            </p>
            
            <p className="mb-10">
              These systems handle routine tasks, respond to user behavior, and maintain personalized communication at
              scale—reducing administrative work while improving response consistency.
            </p>

            <div className="mt-12">
              <h4 
                className="text-lg font-medium mb-4 text-red-300 hover-slide-element" 
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                FAQ
              </h4>

              <FaqDropdown
                question="WHAT IS N8N?"
                answer="n8n is a workflow automation platform that connects apps and services. Unlike Zapier, it offers greater flexibility and can be self-hosted—perfect for creating custom automation solutions with minimal coding."
              />
            </div>
          </div>
        </>
      ),
      icon: "05",
    },
    {
      title: "The Interconnected Approach",
      content: (
        <>
          <div className="animate-fade-in-up">
            <h3
              className="text-2xl font-normal mb-6 text-red-300 hover-slide-element"
              style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}
            >
              How Everything Works Together
            </h3>
            
            <p className="mb-6">
              The true value comes from integration. My content creation informs advertising strategy, advertising
              insights guide automation design, and automation extends the reach of creative and advertising efforts.
            </p>
            
            <p>
              This eliminates disconnects between creative, advertising, and conversion stages, maintaining cohesion
              throughout the customer journey while operating efficiently for your business.
            </p>

            {/* Added illustrative diagram with enhanced animations */}
            <div 
              className="mt-12 p-6 bg-black bg-opacity-30 rounded-sm border border-red-900 border-opacity-30 hover-lift-element"
            >
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div 
                  className="flex-1 p-4 border border-red-900 border-opacity-30 rounded-sm text-center bg-red-950 bg-opacity-20 hover-lift-small-element"
                >
                  <div className="mb-2 font-semibold text-red-300">Content Creation</div>
                  <div className="text-sm text-gray-300">Informs strategy</div>
                </div>
                <div className="text-red-400 arrow-bounce-horizontal">
                  <ChevronRight className="rotate-90 md:rotate-0" />
                </div>
                <div 
                  className="flex-1 p-4 border border-red-900 border-opacity-30 rounded-sm text-center bg-red-950 bg-opacity-20 hover-lift-small-element"
                >
                  <div className="mb-2 font-semibold text-red-300">Targeted Campaigns</div>
                  <div className="text-sm text-gray-300">Drive engagement</div>
                </div>
                <div className="text-red-400 arrow-bounce-horizontal" style={{ animationDelay: "0.5s" }}>
                  <ChevronRight className="rotate-90 md:rotate-0" />
                </div>
                <div 
                  className="flex-1 p-4 border border-red-900 border-opacity-30 rounded-sm text-center bg-red-950 bg-opacity-20 hover-lift-small-element"
                >
                  <div className="mb-2 font-semibold text-red-300">Automated Systems</div>
                  <div className="text-sm text-gray-300">Convert efficiently</div>
                </div>
              </div>
            </div>
          </div>
        </>
      ),
      icon: "06",
    },
  ]

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Page loader animation */}
      <div className={`fixed inset-0 bg-black z-50 pointer-events-none flex items-center justify-center transition-opacity duration-1000 ${pageLoaded ? 'opacity-0' : 'opacity-100'}`}>
        <div
          className="text-red-500 scale-in-center"
          style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem" }}
        >
          Red Beryl
        </div>
      </div>

      {/* Subtle keyboard navigation hint */}
      <div className={`fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-80 border border-red-900 text-red-300 px-3 py-2 rounded-md text-sm z-40 flex items-center transition-opacity duration-300 ${showKeyboardHint ? 'opacity-100' : 'opacity-0'}`}>
        <MousePointer size={14} className="mr-2" /> Use arrow keys to navigate
      </div>

      {/* Main content */}
      <div id="main-container" className="container max-w-6xl mx-auto px-4 py-8 relative">
        {/* Fixed progress bar */}
        <div className="fixed top-0 left-0 w-full h-1 bg-red-950 bg-opacity-30 z-50">
          <div 
            className="h-full bg-red-800 origin-left"
            style={{ transform: `scaleX(${progressValue})` }}
          ></div>
        </div>

        {/* Mobile header */}
        <div className={`sticky top-0 z-40 py-3 px-4 md:px-6 flex justify-between items-center bg-black ${
          hasScrolled ? "shadow-md" : ""
        } transition-shadow duration-300`}>
          <div 
            className="text-xl sm:text-2xl font-medium slide-in-left"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            <span className="text-red-400">Red</span> <span className="text-white">Beryl</span>
          </div>

          {/* Mobile menu toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 focus:outline-none text-red-400 hover:text-red-300 transition-colors duration-300"
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>

          {/* Desktop navigation dots */}
          <div className="hidden md:flex space-x-4 items-center">
            {sections.map((section, index) => (
              <button
                key={index}
                onClick={() => goToSection(index)}
                className={`relative flex items-center focus:outline-none group px-2 py-1 hover-scale-element`}
              >
                <div
                  className={`w-3 h-3 rounded-full border ${
                    activeSection === index ? "bg-red-500 border-red-400" : "bg-transparent border-red-800"
                  } group-hover:border-red-500 transition-colors duration-300 hover-scale-element`}
                ></div>
                <span 
                  className={`absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-10 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap ${
                    activeSection === index ? "text-red-400" : "text-gray-400"
                  }`}
                >
                  {typeof section.title === "string" ? section.title : section.icon}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Mobile menu drawer */}
        <div className={`fixed inset-0 z-30 md:hidden transition-transform duration-300 ${
          mobileMenuOpen ? 'transform-none' : 'translate-x-full'
        }`}>
          <div 
            className="absolute inset-0 bg-black bg-opacity-80" 
            onClick={() => setMobileMenuOpen(false)}
          ></div>
          <div 
            className={`absolute right-0 top-0 h-full w-64 bg-black border-l border-red-900 p-8 overflow-y-auto transition-transform duration-300 ${
              mobileMenuOpen ? 'transform-none' : 'translate-x-full'
            }`}
          >
            <div className="flex justify-end mb-8">
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 focus:outline-none text-red-400 hover:text-red-300 transition-colors duration-300"
              >
                <X />
              </button>
            </div>
            <div className="space-y-4">
              {sections.map((section, index) => (
                <button
                  key={index}
                  onClick={() => goToSection(index)}
                  className={`block w-full text-left px-3 py-2 focus:outline-none hover-slide-element ${
                    activeSection === index
                      ? "text-red-400 border-l-2 border-red-600 bg-red-900 bg-opacity-10"
                      : "text-gray-300 hover:text-red-300"
                  } transition-all duration-300`}
                >
                  <span className="text-xs text-red-500 mr-2">{section.icon}</span>
                  {typeof section.title === "string" ? section.title : "Home"}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main section content with improved transitions */}
        <div className="py-10 relative">
          <div className="grid grid-cols-12 gap-6 items-start">
            {/* Left-side content */}
            <div className="col-span-12 md:col-span-8 relative">
              <div className="mb-8">
                <div className="title-swap-container relative h-16">
                  {sections.map((section, index) => (
                    <h2
                      key={`title-${index}`}
                      className={`text-4xl font-light mb-6 absolute transition-opacity duration-500 w-full ${
                        activeSection === index ? 'opacity-100' : 'opacity-0 pointer-events-none'
                      }`}
                    >
                      {section.title}
                    </h2>
                  ))}
                </div>
              </div>

              <div className="relative min-h-[60vh]">
                {sections.map((section, index) => (
                  <div
                    id={`section-${index}`}
                    key={`content-${index}`}
                    className={`transition-opacity duration-500 ${
                      activeSection === index ? 'opacity-100 z-10' : 'opacity-0 absolute inset-0 pointer-events-none -z-10'
                    }`}
                  >
                    {section.content}
                  </div>
                ))}
              </div>
            </div>

            {/* Right sidebar - Section navigation */}
            <div className="hidden md:block col-span-4 sticky top-24">
              <div className="border-l border-red-900 border-opacity-30 pl-6 space-y-6">
                {sections.map((section, index) => (
                  <div
                    key={index}
                    className={`relative cursor-pointer group hover-slide-element ${
                      activeSection === index ? "opacity-100" : "opacity-50"
                    }`}
                    onClick={() => goToSection(index)}
                  >
                    <div
                      className={`absolute -left-6 w-px h-full ${
                        activeSection === index ? "bg-red-600" : "bg-transparent group-hover:bg-red-900"
                      } transition-all duration-300`}
                    ></div>
                    <div className="text-xs text-red-600 mb-1">{section.icon}</div>
                    <div
                      className={`text-sm font-medium ${
                        activeSection === index ? "text-red-300" : "text-gray-500 group-hover:text-gray-300"
                      } transition-colors duration-300`}
                    >
                      {typeof section.title === "string" ? section.title : "Introduction"}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Section navigation arrows with improved animations */}
        <div className="fixed bottom-6 left-0 right-0 flex justify-between px-4 md:px-8 z-20">
          <button
            onClick={goToPrevSection}
            className={`p-2 rounded-full bg-black bg-opacity-30 border border-red-900 border-opacity-30 focus:outline-none hover-scale-element ${
              activeSection === 0 ? "opacity-30 cursor-not-allowed" : "opacity-100 hover:bg-opacity-50"
            } transition-all duration-300`}
            disabled={activeSection === 0}
          >
            <ChevronLeft className="text-red-400" />
          </button>

          <button
            onClick={goToNextSection}
            className={`p-2 rounded-full bg-black bg-opacity-30 border border-red-900 border-opacity-30 focus:outline-none hover-scale-element ${
              activeSection === sections.length - 1 ? "opacity-30 cursor-not-allowed" : "opacity-100 hover:bg-opacity-50"
            } transition-all duration-300`}
            disabled={activeSection === sections.length - 1}
          >
            <ChevronRight className="text-red-400" />
          </button>
        </div>
      </div>

      {/* Added subtle CSS animations */}
      <style jsx global>{`
        /* Base animations */
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideInUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes slideInLeft {
          from { transform: translateX(-20px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes scaleIn {
          from { transform: scale(0.8); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        
        @keyframes rotateAnimation {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes pulseAnimation {
          0% { transform: scale(1); opacity: 0.7; }
          50% { transform: scale(1.3); opacity: 1; }
          100% { transform: scale(1); opacity: 0.7; }
        }
        
        @keyframes growHeight {
          from { height: 0; }
          to { height: 100%; }
        }
        
        @keyframes arrowBounce {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(5px); }
        }
        
        @keyframes shake {
          10%, 90% { transform: translate3d(-1px, 0, 0); }
          20%, 80% { transform: translate3d(1px, 0, 0); }
          30%, 70% { transform: translate3d(-1px, 0, 0); }
          40%, 60% { transform: translate3d(1px, 0, 0); }
          50% { transform: translate3d(-1px, 0, 0); }
        }
        
        /* Applied animations */
        body {
          opacity: 0;
          transition: opacity 0.5s ease-in;
        }
        
        body.loaded {
          opacity: 1;
        }
        
        .shake-subtle {
          animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
        }
        
        .animate-fade-in-up {
          animation: slideInUp 0.6s ease forwards;
        }
        
        .slide-in-left {
          animation: slideInLeft 0.5s ease forwards;
        }
        
        .scale-in-center {
          animation: scaleIn 0.5s ease forwards;
        }
        
        .animate-pulse-soft {
          animation: pulseAnimation 2s infinite;
        }
        
        .animate-pulse-text {
          animation: pulseAnimation 3s infinite;
        }
        
        .animate-rotate-slow {
          animation: rotateAnimation 8s linear infinite;
        }
        
        .animate-grow-height {
          animation: growHeight 1s ease forwards;
        }
        
        .arrow-bounce {
          animation: arrowBounce 2s infinite;
        }
        
        .arrow-bounce-horizontal {
          animation: arrowBounce 2s infinite;
          display: inline-block;
        }
        
        /* Interactive element classes */
        .hover-scale-element {
          transition: transform 0.3s ease;
        }
        
        .hover-scale-element:hover {
          transform: scale(1.1);
        }
        
        .hover-shrink-element {
          transition: width 0.4s ease;
        }
        
        .hover-shrink-element:hover {
          width: 32px;
        }
        
        .hover-slide-element {
          transition: transform 0.3s ease;
        }
        
        .hover-slide-element:hover {
          transform: translateX(5px);
        }
        
        .hover-pop-element {
          transition: transform 0.2s ease, box-shadow 0.3s ease;
        }
        
        .hover-pop-element:hover {
          transform: translateY(-5px) scale(1.05);
        }
        
        .hover-pop-element:active {
          transform: scale(0.98);
        }
        
        .hover-lift-element {
          transition: transform 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease, background-color 0.4s ease;
        }
        
        .hover-lift-element:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 25px -5px rgba(139, 0, 0, 0.1), 0 10px 10px -5px rgba(139, 0, 0, 0.04);
          border-color: rgba(185, 28, 28, 0.5);
          background-color: rgba(0, 0, 0, 0.5);
        }
        
        .hover-lift-small-element {
          transition: transform 0.2s ease;
        }
        
        .hover-lift-small-element:hover {
          transform: translateY(-5px);
        }
        
        /* Section transitions */
        .section-exit {
          animation: fadeOut 0.4s forwards;
        }
        
        .section-enter {
          animation: fadeIn 0.4s forwards;
        }
        
        @keyframes fadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        
        /* Staggered animations */
        .stagger-fade-in > *:nth-child(1) {
          animation: slideInUp 0.5s 0.1s both;
        }
        
        .stagger-fade-in > *:nth-child(2) {
          animation: slideInUp 0.5s 0.2s both;
        }
        
        .stagger-fade-in > *:nth-child(3) {
          animation: slideInUp 0.5s 0.3s both;
        }
        
        .stagger-fade-in > *:nth-child(4) {
          animation: slideInUp 0.5s 0.4s both;
        }
        
        .stagger-fade-in > *:nth-child(5) {
          animation: slideInUp 0.5s 0.5s both;
        }
      `}</style>
    </div>
  )
}

export default ResumeWebsite