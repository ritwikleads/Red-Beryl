"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronRight, ChevronLeft, Menu, X, ArrowRight } from "lucide-react"
import FaqDropdown from "@/components/faq-dropdown"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

const ResumeWebsite = () => {
  const [activeSection, setActiveSection] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [transitioning, setTransitioning] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)
  const contentRefs = useRef([])

  // Initialize refs for each section
  useEffect(() => {
    contentRefs.current = Array(sections.length).fill().map(() => useRef())
  }, [])

  // Handle scroll for sticky header effect
  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 50)
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
        }, 400)
      }, 400)
    }
    setMobileMenuOpen(false)
  }

  const goToNextSection = () => {
    if (activeSection < sections.length - 1) {
      goToSection(activeSection + 1)
    }
  }

  const goToPrevSection = () => {
    if (activeSection > 0) {
      goToSection(activeSection - 1)
    }
  }

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        goToNextSection()
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        goToPrevSection()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [activeSection])

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  }

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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
            variants={staggerChildren}
          >
            {/* Background decorative elements */}
            <div className="absolute top-10 right-0 w-48 h-48 bg-red-900 rounded-full filter blur-3xl opacity-10 transform translate-x-1/4 animate-pulse"></div>
            <div className="absolute bottom-10 left-0 w-40 h-40 bg-red-900 rounded-full filter blur-3xl opacity-10 transform -translate-x-1/4 animate-pulse" style={{ animationDelay: "1s" }}></div>

            {/* Main content with subtle animation */}
            <div className="relative z-10">
              <motion.div 
                className="mb-10 inline-block"
                variants={fadeInUp}
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
                  I'm <span className="text-red-300 font-semibold hover:text-red-400 transition-colors">Ritwik Singh</span>,
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
              ></motion.div>

              <motion.div 
                className="relative pl-5 border-l-2 border-red-900 mt-12"
                variants={fadeInUp}
              >
                <p
                  className="text-xl text-gray-300"
                  style={{ fontFamily: "'Crimson Text', serif", lineHeight: "1.6", fontStyle: "italic" }}
                >
                  With this unique blend of skills, I bridge the gap between
                  <span className="relative inline-block mx-1 group">
                    <span className="text-red-300 group-hover:text-red-200 transition-colors">cinematic vision</span>
                    <span className="absolute bottom-0 left-0 w-full h-px bg-red-800 opacity-40 group-hover:w-0 transition-all duration-500"></span>
                  </span>
                  and
                  <span className="relative inline-block mx-1 group">
                    <span className="text-red-300 group-hover:text-red-200 transition-colors">data-driven results</span>
                    <span className="absolute bottom-0 left-0 w-full h-px bg-red-800 opacity-40 group-hover:w-0 transition-all duration-500"></span>
                  </span>
                  —transforming creative concepts into measurable business outcomes.
                </p>
              </motion.div>

              {/* Skill badges */}
              <motion.div 
                className="flex flex-wrap gap-3 mt-12"
                variants={staggerChildren}
              >
                <motion.span
                  variants={fadeInUp}
                  className="bg-red-950 bg-opacity-30 border border-red-900 border-opacity-40 px-3 py-1 text-sm rounded text-red-200 hover:bg-red-900 hover:bg-opacity-50 transition-all cursor-default transform hover:-translate-y-1"
                  style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: "0.05em" }}
                >
                  Filmmaker
                </motion.span>
                <motion.span
                  variants={fadeInUp}
                  className="bg-red-950 bg-opacity-30 border border-red-900 border-opacity-40 px-3 py-1 text-sm rounded text-red-200 hover:bg-red-900 hover:bg-opacity-50 transition-all cursor-default transform hover:-translate-y-1"
                  style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: "0.05em" }}
                >
                  Marketer
                </motion.span>
                <motion.span
                  variants={fadeInUp}
                  className="bg-red-950 bg-opacity-30 border border-red-900 border-opacity-40 px-3 py-1 text-sm rounded text-red-200 hover:bg-red-900 hover:bg-opacity-50 transition-all cursor-default transform hover:-translate-y-1"
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
              >
                <div className="mr-6">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-900 bg-opacity-30 border border-red-800 group-hover:bg-opacity-50 transition-all">
                    <span className="text-red-400 font-bold" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                      01
                    </span>
                  </div>
                  <div className="h-full w-px bg-gradient-to-b from-red-800 to-transparent mx-auto my-2 opacity-30 group-hover:opacity-60 transition-opacity"></div>
                </div>
                <div>
                  <h4
                    className="text-xl font-medium text-red-300 mb-3 group-hover:text-red-200 transition-colors"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    Content Creation
                  </h4>
                  <p className="text-gray-300 group-hover:text-gray-200 transition-colors">
                    I produce engaging video content that communicates your brand message effectively.
                  </p>
                </div>
              </motion.div>

              <motion.div 
                className="flex items-start group"
                variants={fadeInUp}
              >
                <div className="mr-6">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-900 bg-opacity-30 border border-red-800 group-hover:bg-opacity-50 transition-all">
                    <span className="text-red-400 font-bold" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                      02
                    </span>
                  </div>
                  <div className="h-full w-px bg-gradient-to-b from-red-800 to-transparent mx-auto my-2 opacity-30 group-hover:opacity-60 transition-opacity"></div>
                </div>
                <div>
                  <h4
                    className="text-xl font-medium text-red-300 mb-3 group-hover:text-red-200 transition-colors"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    Targeted Campaigns
                  </h4>
                  <p className="text-gray-300 group-hover:text-gray-200 transition-colors">
                    I implement targeted campaigns on Facebook and YouTube to connect your content with the right
                    audience.
                  </p>
                </div>
              </motion.div>

              <motion.div 
                className="flex items-start group"
                variants={fadeInUp}
              >
                <div className="mr-6">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-900 bg-opacity-30 border border-red-800 group-hover:bg-opacity-50 transition-all">
                    <span className="text-red-400 font-bold" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                      03
                    </span>
                  </div>
                </div>
                <div>
                  <h4
                    className="text-xl font-medium text-red-300 mb-3 group-hover:text-red-200 transition-colors"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    Automated Systems
                  </h4>
                  <p className="text-gray-300 group-hover:text-gray-200 transition-colors">
                    I build automated systems using n8n that nurture leads through the conversion process without constant
                    manual intervention.
                  </p>
                </div>
              </motion.div>
            </motion.div>

            <motion.p 
              className="mt-8 text-lg border-l-2 border-red-800 pl-4 italic text-gray-400 hover:border-red-700 hover:text-gray-300 transition-all"
              variants={fadeInUp}
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
            variants={staggerChildren}
          >
            <motion.h3
              className="text-2xl font-normal mb-8 text-red-300"
              style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}
              variants={fadeInUp}
            >
              Visual Storytelling
            </motion.h3>

            {/* Timeline visualization */}
            <motion.div 
              className="relative pb-12 mb-10"
              variants={staggerChildren}
            >
              <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-red-800 via-red-900 to-transparent"></div>

              <motion.div 
                className="relative ml-8 mb-10 group"
                variants={fadeInUp}
              >
                <div className="absolute -left-8 w-6 h-6 rounded-full bg-red-950 border border-red-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <div className="w-2 h-2 rounded-full bg-red-500 group-hover:w-3 group-hover:h-3 transition-all"></div>
                </div>
                <div className="bg-black bg-opacity-40 p-5 border-l border-red-900 hover:bg-opacity-50 transition-all">
                  <h4
                    className="text-red-200 mb-2"
                    style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.85rem", letterSpacing: "0.1em" }}
                  >
                    EARLY BEGINNINGS
                  </h4>
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                    My filmmaking journey progressed from early projects in school to serving as Direction Head for Sri
                    Venkateshwara College's filmmaking society.
                  </p>
                </div>
              </motion.div>

              <motion.div 
                className="relative ml-8 group"
                variants={fadeInUp}
              >
                <div className="absolute -left-8 w-6 h-6 rounded-full bg-red-950 border border-red-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <div className="w-2 h-2 rounded-full bg-red-500 group-hover:w-3 group-hover:h-3 transition-all"></div>
                </div>
                <div className="bg-black bg-opacity-40 p-5 border-l border-red-900 hover:bg-opacity-50 transition-all">
                  <h4
                    className="text-red-200 mb-2"
                    style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.85rem", letterSpacing: "0.1em" }}
                  >
                    PROFESSIONAL WORK
                  </h4>
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                    For the past two years, I've helped brands communicate through video as a freelance filmmaker.
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* Philosophy section */}
            <motion.div 
              className="relative mb-12 group"
              variants={fadeInUp}
            >
              <div className="absolute top-0 left-0 w-12 h-12 -mt-6 -ml-6 group-hover:rotate-45 transition-transform duration-500">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 12L12 7L17 12L12 17L7 12Z" stroke="#8B0000" strokeOpacity="0.4" strokeWidth="0.5" />
                </svg>
              </div>

              <div className="border-r border-red-900 pr-6 py-4 ml-6 group-hover:border-red-700 transition-colors">
                <h4 className="text-lg text-red-200 mb-3 group-hover:text-red-100 transition-colors" style={{ fontFamily: "'Playfair Display', serif" }}>
                  My Approach
                </h4>
                <p className="text-gray-300 italic group-hover:text-gray-200 transition-colors" style={{ fontFamily: "'Crimson Text', serif", lineHeight: "1.7" }}>
                  "Maintaining narrative integrity—never breaking the brand's story for visual flair. The content serves
                  business objectives first, aesthetics second."
                </p>
              </div>
            </motion.div>

            {/* Portfolio call to action */}
            <motion.div 
              className="relative mt-16 mb-8"
              variants={fadeInUp}
            >
              <div className="h-px w-full bg-gradient-to-r from-transparent via-red-900 to-transparent opacity-30 mb-8"></div>
              <p
                className="text-xl text-center italic mb-8"
                style={{ fontFamily: "'Crimson Text', serif", lineHeight: "1.6" }}
              >
                <span className="text-red-400">Action speaks louder than words.</span> Let my work tell its own story.
              </p>
              <Link
                href="/portfolio"
                className="group bg-red-950 hover:bg-red-900 border border-red-800 text-red-200 py-3 px-6 rounded-sm transition-all mx-auto flex items-center hover:shadow-lg hover:shadow-red-900/20"
                style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: "0.1em", fontSize: "0.9rem" }}
              >
                VIEW MY PORTFOLIO <span className="ml-2 group-hover:ml-3 transition-all">→</span>
              </Link>
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
            variants={staggerChildren}
          >
            <motion.h3
              className="text-2xl font-normal mb-6 text-red-300"
              style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}
              variants={fadeInUp}
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
                className="flex items-start hover:transform hover:translate-x-2 transition-transform"
                variants={fadeInUp}
              >
                <span className="text-red-400 mr-3">—</span>
                <span>Precise audience targeting</span>
              </motion.li>
              <motion.li 
                className="flex items-start hover:transform hover:translate-x-2 transition-transform"
                variants={fadeInUp}
              >
                <span className="text-red-400 mr-3">—</span>
                <span>Creative testing and optimization</span>
              </motion.li>
              <motion.li 
                className="flex items-start hover:transform hover:translate-x-2 transition-transform"
                variants={fadeInUp}
              >
                <span className="text-red-400 mr-3">—</span>
                <span>Conversion pathway refinement</span>
              </motion.li>
              <motion.li 
                className="flex items-start hover:transform hover:translate-x-2 transition-transform"
                variants={fadeInUp}
              >
                <span className="text-red-400 mr-3">—</span>
                <span>Cross-platform coordination</span>
              </motion.li>
              <motion.li 
                className="flex items-start hover:transform hover:translate-x-2 transition-transform"
                variants={fadeInUp}
              >
                <span className="text-red-400 mr-3">—</span>
                <span>Performance analysis</span>
              </motion.li>
            </motion.ul>
            
            <motion.p className="mb-10" variants={fadeInUp}>
              Each campaign generates valuable insights while producing immediate results in awareness, engagement, and
              conversions.
            </motion.p>

            {/* Case Study */}
            <motion.div 
              className="bg-black bg-opacity-40 border border-red-900 border-opacity-30 rounded-sm mt-12 overflow-hidden hover:bg-opacity-60 hover:shadow-xl transition-all"
              variants={fadeInUp}
            >
              <div className="border-b border-red-900 border-opacity-30 px-6 py-4 flex justify-between items-center">
                <h4 className="text-lg font-medium text-red-200" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Case Study: Wear Azora
                </h4>
                <a
                  href="https://wearazora.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-red-400 hover:text-red-300 transition-colors underline group flex items-center"
                >
                  Visit Site 
                  <ArrowRight size={12} className="ml-1 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all" />
                </a>
              </div>

              <div className="p-6">
                <div className="flex flex-wrap gap-6 mb-6">
                  <div className="flex-1 min-w-[200px] hover:transform hover:translate-y-[-2px] transition-transform">
                    <p className="text-sm text-gray-400 mb-1">Client Industry</p>
                    <p className="text-gray-200">Fashion & Apparel</p>
                  </div>
                  <div className="flex-1 min-w-[200px] hover:transform hover:translate-y-[-2px] transition-transform">
                    <p className="text-sm text-gray-400 mb-1">Campaign Period</p>
                    <p className="text-gray-200">Ongoing</p>
                  </div>
                  <div className="flex-1 min-w-[200px] hover:transform hover:translate-y-[-2px] transition-transform">
                    <p className="text-sm text-gray-400 mb-1">Platform</p>
                    <p className="text-gray-200">Facebook & Instagram Ads</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-6 mt-8">
                  <div className="flex-1 min-w-[180px] hover:transform hover:translate-y-[-2px] transition-transform">
                    <p className="text-sm text-gray-400 mb-2">Monthly Ad Spend</p>
                    <p className="text-2xl text-white font-light">₹80,000</p>
                  </div>
                  <div className="flex-1 min-w-[180px] hover:transform hover:translate-y-[-2px] transition-transform">
                    <p className="text-sm text-gray-400 mb-2">ROAS</p>
                    <p className="text-2xl text-red-300 font-light">
                      <span className="inline-block animate-pulse">12.4x</span>
                    </p>
                  </div>
                  <div className="flex-1 min-w-[180px] hover:transform hover:translate-y-[-2px] transition-transform">
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
            variants={staggerChildren}
          >
            <motion.h3
              className="text-2xl font-normal mb-6 text-red-300"
              style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}
              variants={fadeInUp}
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
              <h4 className="text-lg font-medium mb-4 text-red-300" style={{ fontFamily: "'Playfair Display', serif" }}>
                FAQ
              </h4>

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
            variants={staggerChildren}
          >
            <motion.h3
              className="text-2xl font-normal mb-6 text-red-300"
              style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}
              variants={fadeInUp}
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

            {/* Added illustrative diagram */}
            <motion.div 
              className="mt-12 p-6 bg-black bg-opacity-30 rounded-sm border border-red-900 border-opacity-30 hover:shadow-xl transition-all"
              variants={fadeInUp}
            >
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex-1 p-4 border border-red-900 border-opacity-30 rounded-sm text-center bg-red-950 bg-opacity-20 hover:bg-opacity-30 transition-all">
                  <div className="mb-2 font-semibold text-red-300">Content Creation</div>
                  <div className="text-sm text-gray-300">Informs strategy</div>
                </div>
                <div className="text-red-400 rotate-90 md:rotate-0">→</div>
                <div className="flex-1 p-4 border border-red-900 border-opacity-30 rounded-sm text-center bg-red-950 bg-opacity-20 hover:bg-opacity-30 transition-all">
                  <div className="mb-2 font-semibold text-red-300">Targeted Campaigns</div>
                  <div className="text-sm text-gray-300">Drive engagement</div>
                </div>
                <div className="text-red-400 rotate-90 md:rotate-0">→</div>
                <div className="flex-1 p-4 border border-red-900 border-opacity-30 rounded-sm text-center bg-red-950 bg-opacity-20 hover:bg-opacity-30 transition