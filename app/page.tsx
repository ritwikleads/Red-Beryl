"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronRight, ChevronLeft, Menu, X, ArrowRight, MousePointer } from "lucide-react"
import FaqDropdown from "@/components/faq-dropdown"
import Link from "next/link"
import { motion, AnimatePresence, useAnimation } from "framer-motion"

const ResumeWebsite = () => {
  const [activeSection, setActiveSection] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [transitioning, setTransitioning] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [showKeyboardHint, setShowKeyboardHint] = useState(false)
  const contentRefs = useRef([])
  const progressBarControls = useAnimation()
  
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
      
      progressBarControls.start({ scaleX: progress })
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [progressBarControls])

  // Navigation functions with enhanced transitions
  const goToSection = (index) => {
    if (index >= 0 && index < sections.length && !transitioning) {
      setTransitioning(true)
      
      // Start transition out animation
      setTimeout(() => {
        setActiveSection(index)
        // Wait for transition in animation
        setTimeout(() => {
          setTransitioning(false)
          // Show keyboard hint briefly after navigation
          setShowKeyboardHint(true)
          setTimeout(() => setShowKeyboardHint(false), 2000)
        }, 500)
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
      goToSection(activeSection - 0)
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

  // Page load initial animation
  useEffect(() => {
    // Initial page animation
    const timer = setTimeout(() => {
      document.body.classList.add('loaded')
    }, 100)
    
    return () => clearTimeout(timer)
  }, [])

  // Animation variants with improved timing and physics
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        ease: [0.25, 0, 0.35, 1] // Custom easing for smoother motion
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.4
      }
    }
  }

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
        ease: "easeIn"
      }
    }
  }

  // New subtle parallax effect for decorative elements
  const subtleParallax = {
    initial: { x: 0, y: 0 },
    animate: (i) => ({
      x: cursorPosition.x / 100 * i,
      y: cursorPosition.y / 100 * i,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 30,
        mass: 0.8
      }
    })
  }

  // Page transition variants
  const pageTransition = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.6,
        ease: "easeInOut"
      }
    },
    exit: { 
      opacity: 0,
      transition: { 
        duration: 0.4,
        ease: "easeInOut" 
      }
    }
  }

  // Pulsing animation for attention
  const pulse = {
    initial: { scale: 1 },
    animate: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  }

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
          <motion.div 
            className="relative"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={staggerChildren}
          >
            {/* Background decorative elements with parallax */}
            <motion.div 
              custom={-0.5}
              variants={subtleParallax}
              initial="initial"
              animate="animate"
              className="absolute top-10 right-0 w-48 h-48 bg-red-900 rounded-full filter blur-3xl opacity-10 transform translate-x-1/4 animate-pulse"
            ></motion.div>
            <motion.div 
              custom={0.5}
              variants={subtleParallax}
              initial="initial"
              animate="animate"
              className="absolute bottom-10 left-0 w-40 h-40 bg-red-900 rounded-full filter blur-3xl opacity-10 transform -translate-x-1/4 animate-pulse" 
              style={{ animationDelay: "1s" }}
            ></motion.div>

            {/* Main content with subtle animation */}
            <div className="relative z-10">
              <motion.div 
                className="mb-10 inline-block"
                variants={fadeInUp}
                whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
              >
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
              </motion.div>

              <motion.div 
                className="w-24 h-px bg-gradient-to-r from-red-800 to-transparent my-8"
                variants={fadeInUp}
                whileHover={{ width: "32px", transition: { duration: 0.4 } }}
              ></motion.div>

              <motion.div 
                className="relative pl-5 border-l-2 border-red-900 mt-12"
                variants={fadeInUp}
                whileHover={{ x: 4, borderColor: "#b91c1c", transition: { duration: 0.3 } }}
              >
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
              </motion.div>

              {/* Skill badges with improved hover effects */}
              <motion.div 
                className="flex flex-wrap gap-3 mt-12"
                variants={staggerChildren}
              >
                <motion.span
                  variants={fadeInUp}
                  whileHover={{ 
                    y: -5, 
                    scale: 1.05, 
                    backgroundColor: "rgba(127, 29, 29, 0.5)",
                    transition: { duration: 0.2 }
                  }}
                  className="bg-red-950 bg-opacity-30 border border-red-900 border-opacity-40 px-3 py-1 text-sm rounded text-red-200 hover:bg-red-900 hover:bg-opacity-50 transition-all cursor-default transform"
                  style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: "0.05em" }}
                >
                  Filmmaker
                </motion.span>
                <motion.span
                  variants={fadeInUp}
                  whileHover={{ 
                    y: -5, 
                    scale: 1.05, 
                    backgroundColor: "rgba(127, 29, 29, 0.5)",
                    transition: { duration: 0.2 }
                  }}
                  className="bg-red-950 bg-opacity-30 border border-red-900 border-opacity-40 px-3 py-1 text-sm rounded text-red-200 hover:bg-red-900 hover:bg-opacity-50 transition-all cursor-default transform"
                  style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: "0.05em" }}
                >
                  Marketer
                </motion.span>
                <motion.span
                  variants={fadeInUp}
                  whileHover={{ 
                    y: -5, 
                    scale: 1.05, 
                    backgroundColor: "rgba(127, 29, 29, 0.5)",
                    transition: { duration: 0.2 }
                  }}
                  className="bg-red-950 bg-opacity-30 border border-red-900 border-opacity-40 px-3 py-1 text-sm rounded text-red-200 hover:bg-red-900 hover:bg-opacity-50 transition-all cursor-default transform"
                  style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: "0.05em" }}
                >
                  Automation
                </motion.span>
              </motion.div>
            </div>
          </motion.div>
        </>
      ),
      icon: "01",
    },
    {
      title: "What Do I Do?",
      content: (
        <>
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={staggerChildren}
          >
            <motion.p 
              className="mb-8 text-xl" 
              style={{ fontFamily: "'Crimson Text', serif", lineHeight: "1.6" }}
              variants={fadeInUp}
            >
              I manage the complete marketing lifecycle from content creation to customer conversion.
            </motion.p>

            <motion.div 
              className="space-y-12 my-10"
              variants={staggerChildren}
            >
              <motion.div 
                className="flex items-start group"
                variants={fadeInUp}
                whileHover={{ x: 5, transition: { duration: 0.3 } }}
              >
                <div className="mr-6">
                  <motion.div 
                    whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
                    className="flex items-center justify-center w-12 h-12 rounded-full bg-red-900 bg-opacity-30 border border-red-800 group-hover:bg-opacity-50 transition-all duration-300"
                  >
                    <span className="text-red-400 font-bold" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                      01
                    </span>
                  </motion.div>
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    className="h-full w-px bg-gradient-to-b from-red-800 to-transparent mx-auto my-2 opacity-30 group-hover:opacity-60 transition-opacity duration-300"
                  ></motion.div>
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
              </motion.div>

              <motion.div 
                className="flex items-start group"
                variants={fadeInUp}
                whileHover={{ x: 5, transition: { duration: 0.3 } }}
              >
                <div className="mr-6">
                  <motion.div 
                    whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
                    className="flex items-center justify-center w-12 h-12 rounded-full bg-red-900 bg-opacity-30 border border-red-800 group-hover:bg-opacity-50 transition-all duration-300"
                  >
                    <span className="text-red-400 font-bold" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                      02
                    </span>
                  </motion.div>
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    className="h-full w-px bg-gradient-to-b from-red-800 to-transparent mx-auto my-2 opacity-30 group-hover:opacity-60 transition-opacity duration-300"
                  ></motion.div>
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
              </motion.div>

              <motion.div 
                className="flex items-start group"
                variants={fadeInUp}
                whileHover={{ x: 5, transition: { duration: 0.3 } }}
              >
                <div className="mr-6">
                  <motion.div 
                    whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
                    className="flex items-center justify-center w-12 h-12 rounded-full bg-red-900 bg-opacity-30 border border-red-800 group-hover:bg-opacity-50 transition-all duration-300"
                  >
                    <span className="text-red-400 font-bold" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                      03
                    </span>
                  </motion.div>
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
              </motion.div>
            </motion.div>

            <motion.p 
              className="mt-8 text-lg border-l-2 border-red-800 pl-4 italic text-gray-400 hover:border-red-700 hover:text-gray-300 transition-all duration-300"
              variants={fadeInUp}
              whileHover={{ x: 5, borderColor: "#b91c1c", transition: { duration: 0.3 } }}
            >
              This three-stage approach creates a seamless journey from first impression to final conversion while
              maximizing efficiency.
            </motion.p>
          </motion.div>
        </>
      ),
      icon: "02",
    },
    {
      title: "Filmmaker Portfolio",
      content: (
        <>
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={staggerChildren}
          >
            <motion.h3
              className="text-2xl font-normal mb-8 text-red-300"
              style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}
              variants={fadeInUp}
              whileHover={{ x: 5, color: "#f8b4b4", transition: { duration: 0.3 } }}
            >
              Visual Storytelling
            </motion.h3>

            {/* Timeline visualization with enhanced animations */}
            <motion.div 
              className="relative pb-12 mb-10"
              variants={staggerChildren}
            >
              <motion.div 
                initial={{ height: 0 }}
                animate={{ height: "100%" }} 
                transition={{ duration: 1, delay: 0.3 }}
                className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-red-800 via-red-900 to-transparent"
              ></motion.div>

              <motion.div 
                className="relative ml-8 mb-10 group"
                variants={fadeInUp}
                whileHover={{ x: 10, transition: { duration: 0.3 } }}
              >
                <motion.div 
                  className="absolute -left-8 w-6 h-6 rounded-full bg-red-950 border border-red-800 flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                  whileHover={{ scale: 1.2, transition: { duration: 0.2 } }}
                >
                  <motion.div 
                    className="w-2 h-2 rounded-full bg-red-500 group-hover:w-3 group-hover:h-3 transition-all duration-300"
                    animate={{ 
                      scale: [1, 1.3, 1],
                      opacity: [0.7, 1, 0.7],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  ></motion.div>
                </motion.div>
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
              </motion.div>

              <motion.div 
                className="relative ml-8 group"
                variants={fadeInUp}
                whileHover={{ x: 10, transition: { duration: 0.3 } }}
              >
                <motion.div 
                  className="absolute -left-8 w-6 h-6 rounded-full bg-red-950 border border-red-800 flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                  whileHover={{ scale: 1.2, transition: { duration: 0.2 } }}
                >
                  <motion.div 
                    className="w-2 h-2 rounded-full bg-red-500 group-hover:w-3 group-hover:h-3 transition-all duration-300"
                    animate={{ 
                      scale: [1, 1.3, 1],
                      opacity: [0.7, 1, 0.7],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse",
                      delay: 0.7
                    }}
                  ></motion.div>
                </motion.div>
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
              </motion.div>
            </motion.div>

            {/* Philosophy section with enhanced animations */}
            <motion.div 
              className="relative mb-12 group"
              variants={fadeInUp}
              whileHover={{ x: 8, transition: { duration: 0.3 } }}
            >
              <motion.div 
                className="absolute top-0 left-0 w-12 h-12 -mt-6 -ml-6"
                animate={{ rotate: [0, 45, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              >
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 12L12 7L17 12L12 17L7 12Z" stroke="#8B0000" strokeOpacity="0.4" strokeWidth="0.5" />
                </svg>
              </motion.div>

              <div className="border-r border-red-900 pr-6 py-4 ml-6 group-hover:border-red-700 transition-colors duration-300">
                <h4 className="text-lg text-red-200 mb-3 group-hover:text-red-100 transition-colors duration-300" style={{ fontFamily: "'Playfair Display', serif" }}>
                  My Approach
                </h4>
                <p className="text-gray-300 italic group-hover:text-gray-200 transition-colors duration-300" style={{ fontFamily: "'Crimson Text', serif", lineHeight: "1.7" }}>
                  "Maintaining narrative integrity—never breaking the brand's story for visual flair. The content serves
                  business objectives first, aesthetics second."
                </p>
              </div>
            </motion.div>

            {/* Portfolio call to action with enhanced animations */}
            <motion.div 
              className="relative mt-16 mb-8"
              variants={fadeInUp}
            >
              <div className="h-px w-full bg-gradient-to-r from-transparent via-red-900 to-transparent opacity-30 mb-8"></div>
              <motion.p
                className="text-xl text-center italic mb-8"
                style={{ fontFamily: "'Crimson Text', serif", lineHeight: "1.6" }}
                variants={pulse}
                initial="initial"
                animate="animate"
              >
                <span className="text-red-400">Action speaks louder than words.</span> Let my work tell its own story.
              </motion.p>
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="flex justify-center"
              >
                <Link
                  href="/portfolio"
                  className="group bg-red-950 hover:bg-red-900 border border-red-800 text-red-200 py-3 px-6 rounded-sm transition-all flex items-center hover:shadow-lg hover:shadow-red-900/20 duration-300"
                  style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: "0.1em", fontSize: "0.9rem" }}
                >
                  VIEW MY PORTFOLIO <span className="ml-2 group-hover:ml-3 transition-all duration-300">→</span>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </>
      ),
      icon: "03",
    },
    {
      title: "Performance Marketing",
      content: (
        <>
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={staggerChildren}
          >
            <motion.h3
              className="text-2xl font-normal mb-6 text-red-300"
              style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}
              variants={fadeInUp}
              whileHover={{ x: 5, color: "#f8b4b4", transition: { duration: 0.3 } }}
            >
              Strategic Campaign Management
            </motion.h3>
            
            <motion.p className="mb-6" variants={fadeInUp}>
              I design data-driven campaigns on Facebook and YouTube that deliver measurable results. My approach
              includes:
            </motion.p>
            
            <motion.ul 
              className="space-y-3 mb-6"
              variants={staggerChildren}
            >
              <motion.li 
                className="flex items-start"
                variants={fadeInUp}
                whileHover={{ x: 8, transition: { duration: 0.2 } }}
              >
                <span className="text-red-400 mr-3">—</span>
                <span>Precise audience targeting</span>
              </motion.li>
              <motion.li 
                className="flex items-start"
                variants={fadeInUp}
                whileHover={{ x: 8, transition: { duration: 0.2 } }}
              >
                <span className="text-red-400 mr-3">—</span>
                <span>Creative testing and optimization</span>
              </motion.li>
              <motion.li 
                className="flex items-start"
                variants={fadeInUp}
                whileHover={{ x: 8, transition: { duration: 0.2 } }}
              >
                <span className="text-red-400 mr-3">—</span>
                <span>Conversion pathway refinement</span>
              </motion.li>
              <motion.li 
                className="flex items-start"
                variants={fadeInUp}
                whileHover={{ x: 8, transition: { duration: 0.2 } }}
              >
                <span className="text-red-400 mr-3">—</span>
                <span>Cross-platform coordination</span>
              </motion.li>
              <motion.li 
                className="flex items-start"
                variants={fadeInUp}
                whileHover={{ x: 8, transition: { duration: 0.2 } }}
              >
                <span className="text-red-400 mr-3">—</span>
                <span>Performance analysis</span>
              </motion.li>
            </motion.ul>
            
            <motion.p className="mb-10" variants={fadeInUp}>
              Each campaign generates valuable insights while producing immediate results in awareness, engagement, and
              conversions.
            </motion.p>

            {/* Case Study with enhanced animations */}
            <motion.div 
              className="bg-black bg-opacity-40 border border-red-900 border-opacity-30 rounded-sm mt-12 overflow-hidden"
              variants={fadeInUp}
              whileHover={{ 
                y: -10, 
                boxShadow: "0 20px 25px -5px rgba(139, 0, 0, 0.1), 0 10px 10px -5px rgba(139, 0, 0, 0.04)",
                borderColor: "rgba(185, 28, 28, 0.5)",
                transition: { duration: 0.4 } 
              }}
            >
              <div className="border-b border-red-900 border-opacity-30 px-6 py-4 flex justify-between items-center">
                <h4 className="text-lg font-medium text-red-200" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Case Study: Wear Azora
                </h4>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  href="https://wearazora.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-red-400 hover:text-red-300 transition-colors duration-300 underline group flex items-center"
                >
                  Visit Site 
                  <motion.div
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                  >
                    <ArrowRight size={12} className="ml-1 group-hover:ml-2 transition-all duration-300" />
                  </motion.div>
                </motion.a>
              </div>

              <div className="p-6">
                <div className="flex flex-wrap gap-6 mb-6">
                  <motion.div 
                    className="flex-1 min-w-[200px]"
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  >
                    <p className="text-sm text-gray-400 mb-1">Client Industry</p>
                    <p className="text-gray-200">Fashion & Apparel</p>
                  </motion.div>
                  <motion.div 
                    className="flex-1 min-w-[200px]"
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  >
                    <p className="text-sm text-gray-400 mb-1">Campaign Period</p>
                    <p className="text-gray-200">Ongoing</p>
                  </motion.div>
                  <motion.div 
                    className="flex-1 min-w-[200px]"
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  >
                    <p className="text-sm text-gray-400 mb-1">Platform</p>
                    <p className="text-gray-200">Facebook & Instagram Ads</p>
                  </motion.div>
                </div>

                <div className="flex flex-wrap gap-6 mt-8">
                  <motion.div 
                    className="flex-1 min-w-[180px]"
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  >
                    <p className="text-sm text-gray-400 mb-2">Monthly Ad Spend</p>
                    <p className="text-2xl text-white font-light">₹80,000</p>
                  </motion.div>
                  <motion.div 
                    className="flex-1 min-w-[180px]"
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  >
                    <p className="text-sm text-gray-400 mb-2">ROAS</p>
                    <motion.p 
                      className="text-2xl text-red-300 font-light"
                      animate={{ 
                        scale: [1, 1.05, 1],
                        opacity: [0.9, 1, 0.9],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                    >
                      12.4x
                    </motion.p>
                  </motion.div>
                  <motion.div 
                    className="flex-1 min-w-[180px]"
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  >
                    <p className="text-sm text-gray-400 mb-2">Revenue Generated</p>
                    <p className="text-2xl text-white font-light">₹992,000</p>
                  </motion.div>
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
            </motion.div>
          </motion.div>
        </>
      ),
      icon: "04",
    },
    {
      title: "Backend Automation",
      content: (
        <>
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={staggerChildren}
          >
            <motion.h3
              className="text-2xl font-normal mb-6 text-red-300"
              style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}
              variants={fadeInUp}
              whileHover={{ x: 5, color: "#f8b4b4", transition: { duration: 0.3 } }}
            >
              Systems Integration
            </motion.h3>
            
            <motion.p className="mb-6" variants={fadeInUp}>
              Using n8n, I create automated workflows that connect marketing platforms, CRM systems, and communication
              channels into a cohesive ecosystem.
            </motion.p>
            
            <motion.p className="mb-10" variants={fadeInUp}>
              These systems handle routine tasks, respond to user behavior, and maintain personalized communication at
              scale—reducing administrative work while improving response consistency.
            </motion.p>

            <motion.div className="mt-12" variants={fadeInUp}>
              <motion.h4 
                className="text-lg font-medium mb-4 text-red-300" 
                style={{ fontFamily: "'Playfair Display', serif" }}
                whileHover={{ x: 5, color: "#f8b4b4", transition: { duration: 0.3 } }}
              >
                FAQ
              </motion.h4>

              <FaqDropdown
                question="WHAT IS N8N?"
                answer="n8n is a workflow automation platform that connects apps and services. Unlike Zapier, it offers greater flexibility and can be self-hosted—perfect for creating custom automation solutions with minimal coding."
              />
            </motion.div>
          </motion.div>
        </>
      ),
      icon: "05",
    },
    {
      title: "The Interconnected Approach",
      content: (
        <>
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={staggerChildren}
          >
            <motion.h3
              className="text-2xl font-normal mb-6 text-red-300"
              style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}
              variants={fadeInUp}
              whileHover={{ x: 5, color: "#f8b4b4", transition: { duration: 0.3 } }}
            >
              How Everything Works Together
            </motion.h3>
            
            <motion.p className="mb-6" variants={fadeInUp}>
              The true value comes from integration. My content creation informs advertising strategy, advertising
              insights guide automation design, and automation extends the reach of creative and advertising efforts.
            </motion.p>
            
            <motion.p variants={fadeInUp}>
              This eliminates disconnects between creative, advertising, and conversion stages, maintaining cohesion
              throughout the customer journey while operating efficiently for your business.
            </motion.p>

            {/* Added illustrative diagram with enhanced animations */}
            <motion.div 
              className="mt-12 p-6 bg-black bg-opacity-30 rounded-sm border border-red-900 border-opacity-30"
              variants={fadeInUp}
              whileHover={{ 
                y: -10, 
                boxShadow: "0 20px 25px -5px rgba(139, 0, 0, 0.1), 0 10px 10px -5px rgba(139, 0, 0, 0.04)",
                borderColor: "rgba(185, 28, 28, 0.5)",
                transition: { duration: 0.4 } 
              }}
            >
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <motion.div 
                  className="flex-1 p-4 border border-red-900 border-opacity-30 rounded-sm text-center bg-red-950 bg-opacity-20"
                  whileHover={{ 
                    y: -5, 
                    backgroundColor: "rgba(127, 29, 29, 0.4)",
                    transition: { duration: 0.3 } 
                  }}
                >
                  <div className="mb-2 font-semibold text-red-300">Content Creation</div>
                  <div className="text-sm text-gray-300">Informs strategy</div>
                </motion.div>
                <motion.div 
                  className="text-red-400"
                  animate={{ 
                    x: [0, 5, 0],
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                >
                  <ChevronRight className="rotate-90 md:rotate-0" />
                </motion.div>
                <motion.div 
                  className="flex-1 p-4 border border-red-900 border-opacity-30 rounded-sm text-center bg-red-950 bg-opacity-20"
                  whileHover={{ 
                    y: -5, 
                    backgroundColor: "rgba(127, 29, 29, 0.4)",
                    transition: { duration: 0.3 } 
                  }}
                >
                  <div className="mb-2 font-semibold text-red-300">Targeted Campaigns</div>
                  <div className="text-sm text-gray-300">Drive engagement</div>
                </motion.div>
                <motion.div 
                  className="text-red-400"
                  animate={{ 
                    x: [0, 5, 0],
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: 0.5
                  }}
                >
                  <ChevronRight className="rotate-90 md:rotate-0" />
                </motion.div>
                <motion.div 
                  className="flex-1 p-4 border border-red-900 border-opacity-30 rounded-sm text-center bg-red-950 bg-opacity-20"
                  whileHover={{ 
                    y: -5, 
                    backgroundColor: "rgba(127, 29, 29, 0.4)",
                    transition: { duration: 0.3 } 
                  }}
                >
                  <div className="mb-2 font-semibold text-red-300">Automated Systems</div>
                  <div className="text-sm text-gray-300">Convert efficiently</div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </>
      ),
      icon: "06",
    },
  ]

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Page loader animation */}
      <div className="fixed inset-0 bg-black z-50 pointer-events-none flex items-center justify-center transition-opacity duration-1000 opacity-100 loaded:opacity-0">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-red-500"
          style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem" }}
        >
          Red Beryl
        </motion.div>
      </div>

      {/* Subtle keyboard navigation hint */}
      <AnimatePresence>
        {showKeyboardHint && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-80 border border-red-900 text-red-300 px-3 py-2 rounded-md text-sm z-40 flex items-center"
          >
            <MousePointer size={14} className="mr-2" /> Use arrow keys to navigate
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div id="main-container" className="container max-w-6xl mx-auto px-4 py-8 relative">
        {/* Fixed progress bar */}
        <div className="fixed top-0 left-0 w-full h-1 bg-red-950 bg-opacity-30 z-50">
          <motion.div 
            className="h-full bg-red-800"
            initial={{ scaleX: 0, transformOrigin: "left" }}
            animate={progressBarControls}
          ></motion.div>
        </div>

        {/* Mobile header */}
        <div className={`sticky top-0 z-40 py-3 px-4 md:px-6 flex justify-between items-center bg-black ${
          hasScrolled ? "shadow-md" : ""
        } transition-shadow duration-300`}>
          <motion.div 
            className="text-xl sm:text-2xl font-medium"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            <span className="text-red-400">Red</span> <span className="text-white">Beryl</span>
          </motion.div>

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
              <motion.button
                key={index}
                onClick={() => goToSection(index)}
                className={`relative flex items-center focus:outline-none group px-2 py-1`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className={`w-3 h-3 rounded-full border ${
                    activeSection === index ? "bg-red-500 border-red-400" : "bg-transparent border-red-800"
                  } group-hover:border-red-500 transition-colors duration-300`}
                  whileHover={{ scale: 1.2 }}
                ></motion.div>
                <span 
                  className={`absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-10 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap ${
                    activeSection === index ? "text-red-400" : "text-gray-400"
                  }`}
                >
                  {typeof section.title === "string" ? section.title : section.icon}
                </span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Mobile menu drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed inset-0 z-30 md:hidden"
            >
              <div className="absolute inset-0 bg-black bg-opacity-80" onClick={() => setMobileMenuOpen(false)}></div>
              <motion.div 
                className="absolute right-0 top-0 h-full w-64 bg-black border-l border-red-900 p-8 overflow-y-auto"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
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
                    <motion.button
                      key={index}
                      onClick={() => goToSection(index)}
                      className={`block w-full text-left px-3 py-2 focus:outline-none ${
                        activeSection === index
                          ? "text-red-400 border-l-2 border-red-600 bg-red-900 bg-opacity-10"
                          : "text-gray-300 hover:text-red-300"
                      } transition-all duration-300`}
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="text-xs text-red-500 mr-2">{section.icon}</span>
                      {typeof section.title === "string" ? section.title : "Home"}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main section content with improved transitions */}
        <div className="py-10 relative">
          <div className="grid grid-cols-12 gap-6 items-start">
            {/* Left-side content */}
            <div className="col-span-12 md:col-span-8 relative">
              <motion.div className="mb-8" variants={fadeInUp}>
                <AnimatePresence mode="wait">
                  <motion.h2
                    key={`title-${activeSection}`}
                    className="text-4xl font-light mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    {sections[activeSection].title}
                  </motion.h2>
                </AnimatePresence>
              </motion.div>

              <div className="relative min-h-[60vh]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`content-${activeSection}`}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={pageTransition}
                    className="relative"
                  >
                    {sections[activeSection].content}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Right sidebar - Section navigation */}
            <div className="hidden md:block col-span-4 sticky top-24">
              <div className="border-l border-red-900 border-opacity-30 pl-6 space-y-6">
                {sections.map((section, index) => (
                  <motion.div
                    key={index}
                    className={`relative cursor-pointer group ${
                      activeSection === index ? "opacity-100" : "opacity-50"
                    }`}
                    onClick={() => goToSection(index)}
                    whileHover={{ x: 5, opacity: 1 }}
                    whileTap={{ scale: 0.98 }}
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
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Section navigation arrows with improved animations */}
        <div className="fixed bottom-6 left-0 right-0 flex justify-between px-4 md:px-8 z-20">
          <motion.button
            onClick={goToPrevSection}
            className={`p-2 rounded-full bg-black bg-opacity-30 border border-red-900 border-opacity-30 focus:outline-none ${
              activeSection === 0 ? "opacity-30 cursor-not-allowed" : "opacity-100 hover:bg-opacity-50"
            } transition-all duration-300`}
            whileHover={activeSection > 0 ? { scale: 1.1, backgroundColor: "rgba(185, 28, 28, 0.2)" } : {}}
            whileTap={activeSection > 0 ? { scale: 0.95 } : {}}
            disabled={activeSection === 0}
          >
            <ChevronLeft className="text-red-400" />
          </motion.button>

          <motion.button
            onClick={goToNextSection}
            className={`p-2 rounded-full bg-black bg-opacity-30 border border-red-900 border-opacity-30 focus:outline-none ${
              activeSection === sections.length - 1 ? "opacity-30 cursor-not-allowed" : "opacity-100 hover:bg-opacity-50"
            } transition-all duration-300`}
            whileHover={activeSection < sections.length - 1 ? { scale: 1.1, backgroundColor: "rgba(185, 28, 28, 0.2)" } : {}}
            whileTap={activeSection < sections.length - 1 ? { scale: 0.95 } : {}}
            disabled={activeSection === sections.length - 1}
          >
            <ChevronRight className="text-red-400" />
          </motion.button>
        </div>
      </div>

      {/* Added subtle CSS animations */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideInUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
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
        
        @keyframes shake {
          10%, 90% { transform: translate3d(-1px, 0, 0); }
          20%, 80% { transform: translate3d(1px, 0, 0); }
          30%, 70% { transform: translate3d(-1px, 0, 0); }
          40%, 60% { transform: translate3d(1px, 0, 0); }
          50% { transform: translate3d(-1px, 0, 0); }
        }
      `}</style>
    </div>
  )
}

export default ResumeWebsite