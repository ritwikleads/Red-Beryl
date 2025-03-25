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
  const [showKeyboardHint, setShowKeyboardHint] = useState(false)
  const progressBarRef = useRef(null)
  const contentRefs = useRef([])

  // Initialize refs for each section
  useEffect(() => {
    contentRefs.current = Array(sections.length).fill().map(() => useRef())
  }, [])

  // Handle scroll for sticky header effect and progress
  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 50)
      
      // Update progress bar based on scroll
      if (progressBarRef.current) {
        const scrollTop = window.scrollY
        const winHeight = window.innerHeight
        const docHeight = document.body.scrollHeight
        const totalScrollable = docHeight - winHeight
        const progress = scrollTop / totalScrollable
        
        progressBarRef.current.style.transform = `scaleX(${progress})`
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Navigation functions
  const goToSection = (index) => {
    if (index >= 0 && index < sections.length && !transitioning) {
      setTransitioning(true)
      
      setTimeout(() => {
        setActiveSection(index)
        
        setTimeout(() => {
          setTransitioning(false)
          // Show keyboard hint briefly after navigation
          setShowKeyboardHint(true)
          setTimeout(() => setShowKeyboardHint(false), 2000)
        }, 500)
      }, 300)
    }
    setMobileMenuOpen(false)
  }

  const goToNextSection = () => {
    if (activeSection < sections.length - 1) {
      goToSection(activeSection + 1)
    } else {
      const element = document.getElementById("main-container")
      if (element) {
        element.classList.add("shake-subtle")
        setTimeout(() => element.classList.remove("shake-subtle"), 500)
      }
    }
  }

  const goToPrevSection = () => {
    if (activeSection > 0) {
      goToSection(activeSection - 1)
    } else {
      const element = document.getElementById("main-container")
      if (element) {
        element.classList.add("shake-subtle")
        setTimeout(() => element.classList.remove("shake-subtle"), 500)
      }
    }
  }

  // Handle keyboard navigation
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

  // Page load animation
  useEffect(() => {
    document.body.classList.add('loaded')
  }, [])

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
          <div className="relative section-content">
            {/* Background decorative elements */}
            <div 
              className="absolute top-10 right-0 w-48 h-48 bg-red-900 rounded-full filter blur-3xl opacity-10 transform translate-x-1/4 animate-pulse"
            ></div>
            <div 
              className="absolute bottom-10 left-0 w-40 h-40 bg-red-900 rounded-full filter blur-3xl opacity-10 transform -translate-x-1/4 animate-pulse" 
              style={{ animationDelay: "1s" }}
            ></div>

            {/* Main content with subtle animation */}
            <div className="relative z-10">
              <div className="mb-10 inline-block hover-scale">
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

              <div className="w-24 h-px bg-gradient-to-r from-red-800 to-transparent my-8 hover:w-16 transition-all duration-300"></div>

              <div className="relative pl-5 border-l-2 border-red-900 mt-12 hover-slide">
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
              <div className="flex flex-wrap gap-3 mt-12">
                <span
                  className="bg-red-950 bg-opacity-30 border border-red-900 border-opacity-40 px-3 py-1 text-sm rounded text-red-200 hover:bg-red-900 hover:bg-opacity-50 transition-all cursor-default transform hover:-translate-y-1 hover:scale-105"
                  style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: "0.05em" }}
                >
                  Filmmaker
                </span>
                <span
                  className="bg-red-950 bg-opacity-30 border border-red-900 border-opacity-40 px-3 py-1 text-sm rounded text-red-200 hover:bg-red-900 hover:bg-opacity-50 transition-all cursor-default transform hover:-translate-y-1 hover:scale-105"
                  style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: "0.05em" }}
                >
                  Marketer
                </span>
                <span
                  className="bg-red-950 bg-opacity-30 border border-red-900 border-opacity-40 px-3 py-1 text-sm rounded text-red-200 hover:bg-red-900 hover:bg-opacity-50 transition-all cursor-default transform hover:-translate-y-1 hover:scale-105"
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
          <div className="section-content">
            <p 
              className="mb-8 text-xl" 
              style={{ fontFamily: "'Crimson Text', serif", lineHeight: "1.6" }}
            >
              I manage the complete marketing lifecycle from content creation to customer conversion.
            </p>

            <div className="space-y-12 my-10">
              <div className="flex items-start group hover-slide">
                <div className="mr-6">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-900 bg-opacity-30 border border-red-800 group-hover:bg-opacity-50 transition-all duration-300 hover:scale-110">
                    <span className="text-red-400 font-bold" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                      01
                    </span>
                  </div>
                  <div className="h-full w-px bg-gradient-to-b from-red-800 to-transparent mx-auto my-2 opacity-30 group-hover:opacity-60 transition-opacity duration-300"></div>
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

              <div className="flex items-start group hover-slide">
                <div className="mr-6">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-900 bg-opacity-30 border border-red-800 group-hover:bg-opacity-50 transition-all duration-300 hover:scale-110">
                    <span className="text-red-400 font-bold" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                      02
                    </span>
                  </div>
                  <div className="h-full w-px bg-gradient-to-b from-red-800 to-transparent mx-auto my-2 opacity-30 group-hover:opacity-60 transition-opacity duration-300"></div>
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

              <div className="flex items-start group hover-slide">
                <div className="mr-6">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-900 bg-opacity-30 border border-red-800 group-hover:bg-opacity-50 transition-all duration-300 hover:scale-110">
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
              className="mt-8 text-lg border-l-2 border-red-800 pl-4 italic text-gray-400 hover:border-red-700 hover:text-gray-300 transition-all duration-300 hover-slide"
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
          <div className="section-content">
            <h3
              className="text-2xl font-normal mb-8 text-red-300 hover-slide"
              style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}
            >
              Visual Storytelling
            </h3>

            {/* Timeline visualization with enhanced animations */}
            <div className="relative pb-12 mb-10">
              <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-red-800 via-red-900 to-transparent"></div>

              <div className="relative ml-8 mb-10 group hover-slide">
                <div className="absolute -left-8 w-6 h-6 rounded-full bg-red-950 border border-red-800 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <div className="w-2 h-2 rounded-full bg-red-500 group-hover:w-3 group-hover:h-3 transition-all duration-300 animate-pulse-slow"></div>
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

              <div className="relative ml-8 group hover-slide">
                <div className="absolute -left-8 w-6 h-6 rounded-full bg-red-950 border border-red-800 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <div className="w-2 h-2 rounded-full bg-red-500 group-hover:w-3 group-hover:h-3 transition-all duration-300 animate-pulse-slow" style={{ animationDelay: "0.7s" }}></div>
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
            <div className="relative mb-12 group hover-slide">
              <div className="absolute top-0 left-0 w-12 h-12 -mt-6 -ml-6 animate-spin-slow">
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
                  className="group bg-red-950 hover:bg-red-900 border border-red-800 text-red-200 py-3 px-6 rounded-sm transition-all flex items-center hover:shadow-lg hover:shadow-red-900/20 duration-300 transform hover:scale-105 hover:-translate-y-1"
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
          <div className="section-content">
            <h3
              className="text-2xl font-normal mb-6 text-red-300 hover-slide"
              style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}
            >
              Strategic Campaign Management
            </h3>
            
            <p className="mb-6">
              I design data-driven campaigns on Facebook and YouTube that deliver measurable results. My approach
              includes:
            </p>
            
            <ul className="space-y-3 mb-6">
              <li className="flex items-start hover-slide">
                <span className="text-red-400 mr-3">—</span>
                <span>Precise audience targeting</span>
              </li>
              <li className="flex items-start hover-slide">
                <span className="text-red-400 mr-3">—</span>
                <span>Creative testing and optimization</span>
              </li>
              <li className="flex items-start hover-slide">
                <span className="text-red-400 mr-3">—</span>
                <span>Conversion pathway refinement</span>
              </li>
              <li className="flex items-start hover-slide">
                <span className="text-red-400 mr-3">—</span>
                <span>Cross-platform coordination</span>
              </li>
              <li className="flex items-start hover-slide">
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
              className="bg-black bg-opacity-40 border border-red-900 border-opacity-30 rounded-sm mt-12 overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-red-900/10 hover:border-red-800"
            >
              <div className="border-b border-red-900 border-opacity-30 px-6 py-4 flex justify-between items-center">
                <h4 className="text-lg font-medium text-red-200" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Case Study: Wear Azora
                </h4>
                <a
                  href="https://wearazora.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-red-400 hover:text-red-300 transition-colors duration-300 underline group flex items-center hover:scale-105"
                >
                  Visit Site 
                  <span className="ml-1 group-hover:ml-2 transition-all duration-300">
                    <ArrowRight size={12} />
                  </span>
                </a>
              </div>

              <div className="p-6">
                <div className="flex flex-wrap gap-6 mb-6">
                  <div className="flex-1 min-w-[200px] transition-transform duration-200 hover:-translate-y-1">
                    <p className="text-sm text-gray-400 mb-1">Client Industry</p>
                    <p className="text-gray-200">Fashion & Apparel</p>
                  </div>
                  <div className="flex-1 min-w-[200px] transition-transform duration-200 hover:-translate-y-1">
                    <p className="text-sm text-gray-400 mb-1">Campaign Period</p>
                    <p className="text-gray-200">Ongoing</p>
                  </div>
                  <div className="flex-1 min-w-[200px] transition-transform duration-200 hover:-translate-y-1">
                    <p className="text-sm text-gray-400 mb-1">Platform</p>
                    <p className="text-gray-200">Facebook & Instagram Ads</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-6 mt-8">
                  <div className="flex-1 min-w-[180px] transition-transform duration-200 hover:-translate-y-1">
                    <p className="text-sm text-gray-400 mb-2">Monthly Ad Spend</p>
                    <p className="text-2xl text-white font-light">₹80,000</p>
                  </div>
                  <div className="flex-1 min-w-[180px] transition-transform duration-200 hover:-translate-y-1">
                    <p className="text-sm text-gray-400 mb-2">ROAS</p>
                    <p className="text-2xl text-red-300 font-light animate-pulse-slow">
                      12.4x
                    </p>
                  </div>
                  <div className="flex-1 min-w-[180px] transition-transform duration-200 hover:-translate-y-1">
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
          <div className="section-content">
            <h3
              className="text-2xl font-normal mb-6 text-red-300 hover-slide"
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
                className="text-lg font-medium mb-4 text-red-300 hover-slide" 
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
          <div className="section-content">
            <h3
              className="text-2xl font-normal mb-6 text-red-300 hover-slide"
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
              className="mt-12 p-6 bg-black bg-opacity-30 rounded-sm border border-red-900 border-opacity-30 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-red-900/10 hover:border-red-800"
            >
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div 
                  className="flex-1 p-4 border border-red-900 border-opacity-30 rounded-sm text-center bg-red-950 bg-opacity-20 transition-all duration-300 hover:-translate-y-1 hover:bg-opacity-30"
                >
                  <div className="mb-2 font-semibold text-red-300">Content Creation</div>
                  <div className="text-sm text-gray-300">Informs strategy</div>
                </div>
                <div className="text-red-400 arrow-right">
                  <ChevronRight className="rotate-90 md:rotate-0" />
                </div>
                <div 
                  className="flex-1 p-4 border border-red-900 border-opacity-30 rounded-sm text-center bg-red-950 bg-opacity-20 transition-all duration-300 hover:-translate-y-1 hover:bg-opacity-30"
                >
                  <div className="mb-2 font-semibold text-red-300">Targeted Campaigns</div>
                  <div className="text-sm text-gray-300">Drive engagement</div>
                </div>
                <div className="text-red-400 arrow-right">
                  <ChevronRight className="rotate-90 md:rotate-0" />
                </div>
                <div 
                  className="flex-1 p-4 border border-red-900 border-opacity-30 rounded-sm text-center bg-red-950 bg-opacity-20 transition-all duration-300 hover:-translate-y-1 hover:bg-opacity-30"
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
      {/* Subtle keyboard navigation hint */}
      <div className={`fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-80 border border-red-900 text-red-300 px-3 py-2 rounded-md text-sm z-40 flex items-center ${showKeyboardHint ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
        <MousePointer size={14} className="mr-2" /> Use arrow keys to navigate
      </div>

      {/* Main content */}
      <div id="main-container" className="container max-w-6xl mx-auto px-4 py-8 relative fade-in">
        {/* Fixed progress bar */}
        <div className="fixed top-0 left-0 w-full h-1 bg-red-950 bg-opacity-30 z-50">
          <div 
            ref={progressBarRef}
            className="h-full bg-red-800 origin-left transition-transform duration-300"
            style={{ transform: 'scaleX(0)' }}
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
                className={`relative flex items-center focus:outline-none group px-2 py-1 hover:scale-110 transition-transform duration-200`}
              >
                <div
                  className={`w-3 h-3 rounded-full border ${
                    activeSection === index ? "bg-red-500 border-red-400" : "bg-transparent border-red-800"
                  } group-hover:border-red-500 transition-colors duration-300`}
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
        <div className={`fixed inset-0 z-30 md:hidden ${mobileMenuOpen ? 'visible' : 'invisible'} transition-visibility duration-300`}>
          <div 
            className={`absolute inset-0 bg-black bg-opacity-80 ${mobileMenuOpen ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
            onClick={() => setMobileMenuOpen(false)}
          ></div>
          <div 
            className={`absolute right-0 top-0 h-full w-64 bg-black border-l border-red-900 p-8 overflow-y-auto transform ${
              mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
            } transition-transform duration-300`}
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
                  className={`block w-full text-left px-3 py-2 focus:outline-none hover:translate-x-1 transition-transform duration-200 ${
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
                <div className="h-16 relative">
                  {sections.map((section, index) => (
                    <div
                      key={`title-${index}`}
                      className={`absolute w-full transition-opacity duration-500 ${
                        activeSection === index ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      <h2 className="text-4xl font-light mb-6">
                        {section.title}
                      </h2>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative min-h-[60vh]">
                {sections.map((section, index) => (
                  <div
                    key={`content-${index}`}
                    className={`transition-opacity duration-500 ${
                      activeSection === index ? 'opacity-100 relative z-10' : 'opacity-0 absolute top-0 pointer-events-none'
                    }`}
                    style={{
                      width: '100%',
                      transition: 'opacity 0.5s ease'
                    }}
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
                    className={`relative cursor-pointer group hover:translate-x-1 transition-transform duration-200 ${
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
            className={`p-2 rounded-full bg-black bg-opacity-30 border border-red-900 border-opacity-30 focus:outline-none hover:scale-110 active:scale-95 transition-all duration-200 ${
              activeSection === 0 ? "opacity-30 cursor-not-allowed" : "opacity-100 hover:bg-opacity-50"
            }`}
            disabled={activeSection === 0}
          >
            <ChevronLeft className="text-red-400" />
          </button>

          <button
            onClick={goToNextSection}
            className={`p-2 rounded-full bg-black bg-opacity-30 border border-red-900 border-opacity-30 focus:outline-none hover:scale-110 active:scale-95 transition-all duration-200 ${
              activeSection === sections.length - 1 ? "opacity-30 cursor-not-allowed" : "opacity-100 hover:bg-opacity-50"
            }`}
            disabled={activeSection === sections.length - 1}
          >
            <ChevronRight className="text-red-400" />
          </button>
        </div>
      </div>

      {/* CSS for animations */}
      <style jsx global>{`
        /* Base styles */
        .fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
        
        .slide-in-left {
          animation: slideInLeft 0.5s ease-out forwards;
        }
        
        /* Interactive elements */
        .hover-scale {
          transition: transform 0.3s ease;
        }
        
        .hover-scale:hover {
          transform: scale(1.02);
        }
        
        .hover-slide {
          transition: transform 0.3s ease;
        }
        
        .hover-slide:hover {
          transform: translateX(4px);
        }
        
        /* Animations */
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideInLeft {
          from { transform: translateX(-20px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        
        .animate-pulse-slow {
          animation: pulseSlow 2s infinite alternate;
        }
        
        .animate-pulse-text {
          animation: pulseText 3s infinite alternate;
        }
        
        .animate-spin-slow {
          animation: spinSlow 8s linear infinite;
        }
        
        .arrow-right {
          animation: arrowRight 1.5s infinite alternate;
        }
        
        @keyframes pulseSlow {
          0% { transform: scale(1); opacity: 0.7; }
          100% { transform: scale(1.3); opacity: 1; }
        }
        
        @keyframes pulseText {
          0% { opacity: 0.8; }
          100% { opacity: 1; }
        }
        
        @keyframes spinSlow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes arrowRight {
          0% { transform: translateX(0); }
          100% { transform: translateX(5px); }
        }
        
        .shake-subtle {
          animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
        }
        
        @keyframes shake {
          10%, 90% { transform: translate3d(-1px, 0, 0); }
          20%, 80% { transform: translate3d(1px, 0, 0); }
          30%, 70% { transform: translate3d(-1px, 0, 0); }
          40%, 60% { transform: translate3d(1px, 0, 0); }
          50% { transform: translate3d(-1px, 0, 0); }
        }
        
        /* Section content animations */
        .section-content {
          animation: fadeIn 0.6s ease-out forwards;
        }
        
        body {
          opacity: 0;
          transition: opacity 0.5s ease-in;
        }
        
        body.loaded {
          opacity: 1;
        }
        
        /* Add transitions to everything */
        *, *::before, *::after {
          transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow, transform;
          transition-duration: 300ms;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
    </div>
  )
}

export default ResumeWebsite