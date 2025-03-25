"use client"

import { useState, useEffect } from "react"
import { ChevronRight, ChevronLeft, Menu, X } from "lucide-react"
import FaqDropdown from "@/components/faq-dropdown"
import Link from "next/link"

const ResumeWebsite = () => {
  const [activeSection, setActiveSection] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [transitioning, setTransitioning] = useState(false)

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
          <div className="relative">
            {/* Background decorative elements */}
            <div className="absolute top-10 right-0 w-48 h-48 bg-red-900 rounded-full filter blur-3xl opacity-10 transform translate-x-1/4"></div>
            <div className="absolute bottom-10 left-0 w-40 h-40 bg-red-900 rounded-full filter blur-3xl opacity-10 transform -translate-x-1/4"></div>

            {/* Main content with subtle animation */}
            <div className="relative z-10">
              <div className="mb-10 inline-block">
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
                  I'm <span className="text-red-300 font-semibold">Ritwik Singh</span>,
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

              <div className="w-24 h-px bg-gradient-to-r from-red-800 to-transparent my-8"></div>

              <div className="relative pl-5 border-l-2 border-red-900 mt-12">
                <p
                  className="text-xl text-gray-300"
                  style={{ fontFamily: "'Crimson Text', serif", lineHeight: "1.6", fontStyle: "italic" }}
                >
                  With this unique blend of skills, I bridge the gap between
                  <span className="relative inline-block mx-1">
                    <span className="text-red-300">cinematic vision</span>
                    <span className="absolute bottom-0 left-0 w-full h-px bg-red-800 opacity-40"></span>
                  </span>
                  and
                  <span className="relative inline-block mx-1">
                    <span className="text-red-300">data-driven results</span>
                    <span className="absolute bottom-0 left-0 w-full h-px bg-red-800 opacity-40"></span>
                  </span>
                  —transforming creative concepts into measurable business outcomes.
                </p>
              </div>

              {/* Skill badges */}
              <div className="flex flex-wrap gap-3 mt-12">
                <span
                  className="bg-red-950 bg-opacity-30 border border-red-900 border-opacity-40 px-3 py-1 text-sm rounded text-red-200"
                  style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: "0.05em" }}
                >
                  Filmmaker
                </span>
                <span
                  className="bg-red-950 bg-opacity-30 border border-red-900 border-opacity-40 px-3 py-1 text-sm rounded text-red-200"
                  style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: "0.05em" }}
                >
                  Marketer
                </span>
                <span
                  className="bg-red-950 bg-opacity-30 border border-red-900 border-opacity-40 px-3 py-1 text-sm rounded text-red-200"
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
          <p className="mb-8 text-xl" style={{ fontFamily: "'Crimson Text', serif", lineHeight: "1.6" }}>
            I manage the complete marketing lifecycle from content creation to customer conversion.
          </p>

          <div className="space-y-12 my-10">
            <div className="flex items-start">
              <div className="mr-6">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-900 bg-opacity-30 border border-red-800">
                  <span className="text-red-400 font-bold" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    01
                  </span>
                </div>
                <div className="h-full w-px bg-gradient-to-b from-red-800 to-transparent mx-auto my-2 opacity-30"></div>
              </div>
              <div>
                <h4
                  className="text-xl font-medium text-red-300 mb-3"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Content Creation
                </h4>
                <p className="text-gray-300">
                  I produce engaging video content that communicates your brand message effectively.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="mr-6">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-900 bg-opacity-30 border border-red-800">
                  <span className="text-red-400 font-bold" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    02
                  </span>
                </div>
                <div className="h-full w-px bg-gradient-to-b from-red-800 to-transparent mx-auto my-2 opacity-30"></div>
              </div>
              <div>
                <h4
                  className="text-xl font-medium text-red-300 mb-3"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Targeted Campaigns
                </h4>
                <p className="text-gray-300">
                  I implement targeted campaigns on Facebook and YouTube to connect your content with the right
                  audience.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="mr-6">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-900 bg-opacity-30 border border-red-800">
                  <span className="text-red-400 font-bold" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    03
                  </span>
                </div>
              </div>
              <div>
                <h4
                  className="text-xl font-medium text-red-300 mb-3"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Automated Systems
                </h4>
                <p className="text-gray-300">
                  I build automated systems using n8n that nurture leads through the conversion process without constant
                  manual intervention.
                </p>
              </div>
            </div>
          </div>

          <p className="mt-8 text-lg border-l-2 border-red-800 pl-4 italic text-gray-400">
            This three-stage approach creates a seamless journey from first impression to final conversion while
            maximizing efficiency.
          </p>
        </>
      ),
      icon: "02",
    },
    {
      title: "Filmmaker Portfolio",
      content: (
        <>
          <h3
            className="text-2xl font-normal mb-8 text-red-300"
            style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}
          >
            Visual Storytelling
          </h3>

          {/* Timeline visualization */}
          <div className="relative pb-12 mb-10">
            <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-red-800 via-red-900 to-transparent"></div>

            <div className="relative ml-8 mb-10">
              <div className="absolute -left-8 w-6 h-6 rounded-full bg-red-950 border border-red-800 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
              </div>
              <div className="bg-black bg-opacity-40 p-5 border-l border-red-900">
                <h4
                  className="text-red-200 mb-2"
                  style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.85rem", letterSpacing: "0.1em" }}
                >
                  EARLY BEGINNINGS
                </h4>
                <p className="text-gray-400">
                  My filmmaking journey progressed from early projects in school to serving as Direction Head for Sri
                  Venkateshwara College's filmmaking society.
                </p>
              </div>
            </div>

            <div className="relative ml-8">
              <div className="absolute -left-8 w-6 h-6 rounded-full bg-red-950 border border-red-800 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
              </div>
              <div className="bg-black bg-opacity-40 p-5 border-l border-red-900">
                <h4
                  className="text-red-200 mb-2"
                  style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.85rem", letterSpacing: "0.1em" }}
                >
                  PROFESSIONAL WORK
                </h4>
                <p className="text-gray-400">
                  For the past two years, I've helped brands communicate through video as a freelance filmmaker.
                </p>
              </div>
            </div>
          </div>

          {/* Philosophy section */}
          <div className="relative mb-12">
            <div className="absolute top-0 left-0 w-12 h-12 -mt-6 -ml-6">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 12L12 7L17 12L12 17L7 12Z" stroke="#8B0000" strokeOpacity="0.4" strokeWidth="0.5" />
              </svg>
            </div>

            <div className="border-r border-red-900 pr-6 py-4 ml-6">
              <h4 className="text-lg text-red-200 mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                My Approach
              </h4>
              <p className="text-gray-300 italic" style={{ fontFamily: "'Crimson Text', serif", lineHeight: "1.7" }}>
                "Maintaining narrative integrity—never breaking the brand's story for visual flair. The content serves
                business objectives first, aesthetics second."
              </p>
            </div>
          </div>

          {/* Portfolio call to action */}
          <div className="relative mt-16 mb-8">
            <div className="h-px w-full bg-gradient-to-r from-transparent via-red-900 to-transparent opacity-30 mb-8"></div>
            <p
              className="text-xl text-center italic mb-8"
              style={{ fontFamily: "'Crimson Text', serif", lineHeight: "1.6" }}
            >
              <span className="text-red-400">Action speaks louder than words.</span> Let my work tell its own story.
            </p>
            <Link
              href="/portfolio"
              className="group bg-red-950 hover:bg-red-900 border border-red-800 text-red-200 py-3 px-6 rounded-sm transition-all mx-auto flex items-center"
              style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: "0.1em", fontSize: "0.9rem" }}
            >
              VIEW MY PORTFOLIO <span className="ml-2 group-hover:ml-3 transition-all">→</span>
            </Link>
          </div>
        </>
      ),
      icon: "03",
    },
    {
      title: "Performance Marketing",
      content: (
        <>
          <h3
            className="text-2xl font-normal mb-6 text-red-300"
            style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}
          >
            Strategic Campaign Management
          </h3>
          <p className="mb-6">
            I design data-driven campaigns on Facebook and YouTube that deliver measurable results. My approach
            includes:
          </p>
          <ul className="space-y-3 mb-6">
            <li className="flex items-start">
              <span className="text-red-400 mr-3">—</span>
              <span>Precise audience targeting</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-400 mr-3">—</span>
              <span>Creative testing and optimization</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-400 mr-3">—</span>
              <span>Conversion pathway refinement</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-400 mr-3">—</span>
              <span>Cross-platform coordination</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-400 mr-3">—</span>
              <span>Performance analysis</span>
            </li>
          </ul>
          <p className="mb-10">
            Each campaign generates valuable insights while producing immediate results in awareness, engagement, and
            conversions.
          </p>

          {/* Case Study */}
          <div className="bg-black bg-opacity-40 border border-red-900 border-opacity-30 rounded-sm mt-12 overflow-hidden">
            <div className="border-b border-red-900 border-opacity-30 px-6 py-4 flex justify-between items-center">
              <h4 className="text-lg font-medium text-red-200" style={{ fontFamily: "'Playfair Display', serif" }}>
                Case Study: Wear Azora
              </h4>
              <a
                href="https://wearazora.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-red-400 hover:text-red-300 transition-colors underline"
              >
                Visit Site
              </a>
            </div>

            <div className="p-6">
              <div className="flex flex-wrap gap-6 mb-6">
                <div className="flex-1 min-w-[200px]">
                  <p className="text-sm text-gray-400 mb-1">Client Industry</p>
                  <p className="text-gray-200">Fashion & Apparel</p>
                </div>
                <div className="flex-1 min-w-[200px]">
                  <p className="text-sm text-gray-400 mb-1">Campaign Period</p>
                  <p className="text-gray-200">Ongoing</p>
                </div>
                <div className="flex-1 min-w-[200px]">
                  <p className="text-sm text-gray-400 mb-1">Platform</p>
                  <p className="text-gray-200">Facebook & Instagram Ads</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-6 mt-8">
                <div className="flex-1 min-w-[180px]">
                  <p className="text-sm text-gray-400 mb-2">Monthly Ad Spend</p>
                  <p className="text-2xl text-white font-light">₹80,000</p>
                </div>
                <div className="flex-1 min-w-[180px]">
                  <p className="text-sm text-gray-400 mb-2">ROAS</p>
                  <p className="text-2xl text-red-300 font-light">12.4x</p>
                </div>
                <div className="flex-1 min-w-[180px]">
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
        </>
      ),
      icon: "04",
    },
    {
      title: "Backend Automation",
      content: (
        <>
          <h3
            className="text-2xl font-normal mb-6 text-red-300"
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
            <h4 className="text-lg font-medium mb-4 text-red-300" style={{ fontFamily: "'Playfair Display', serif" }}>
              FAQ
            </h4>

            <FaqDropdown
              question="WHAT IS N8N?"
              answer="n8n is a workflow automation platform that connects apps and services. Unlike Zapier, it offers greater flexibility and can be self-hosted—perfect for creating custom automation solutions with minimal coding."
            />
          </div>
        </>
      ),
      icon: "05",
    },
    {
      title: "The Interconnected Approach",
      content: (
        <>
          <h3
            className="text-2xl font-normal mb-6 text-red-300"
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
        </>
      ),
      icon: "06",
    },
  ]

  return (
    <div
      className="min-h-screen bg-black text-gray-300 font-serif antialiased overflow-hidden"
      style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}
    >
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full bg-black bg-opacity-90 z-50 backdrop-blur-sm border-b border-red-950">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div
            className="text-xl font-bold tracking-wide"
            style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: "0.15em" }}
          >
            <span className="text-red-700">RITWIK</span>
            <span className="text-gray-200">SINGH</span>
          </div>

          {/* Progress indicators */}
          <div className="hidden md:flex items-center">
            {sections.map((section, index) => (
              <button
                key={index}
                onClick={() => goToSection(index)}
                className={`w-2 h-2 mx-3 rounded-full transition-all ${
                  activeSection === index ? "bg-red-700 scale-150" : "bg-gray-800 hover:bg-gray-700"
                }`}
                aria-label={`Go to ${typeof section.title === "string" ? section.title : "section"}`}
              />
            ))}
          </div>

          {/* Section title display */}
          <div
            className="hidden md:block text-sm uppercase tracking-widest text-gray-400"
            style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: "0.2em", fontSize: "0.75rem" }}
          >
            {sections[activeSection].title} <span className="text-red-700 ml-2">{sections[activeSection].icon}</span>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-gray-300 hover:text-red-400 focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden bg-black border-t border-red-950 overflow-hidden transition-all duration-300 ease-in-out ${
            mobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="container mx-auto px-6 py-4 space-y-4">
            {sections.map((section, index) => (
              <button
                key={index}
                onClick={() => goToSection(index)}
                className={`block w-full text-left py-2 text-sm uppercase tracking-widest ${
                  activeSection === index ? "text-red-500 font-medium" : "text-gray-400"
                }`}
              >
                {typeof section.title === "string" ? section.title : "Section " + (index + 1)}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative w-full h-screen pt-16">
        {sections.map((section, index) => (
          <div
            key={index}
            className={`absolute top-0 left-0 w-full h-full transition-all duration-500 ease-in-out transform overflow-y-auto ${
              activeSection === index
                ? "opacity-100 translate-x-0"
                : index < activeSection
                  ? "opacity-0 -translate-x-full pointer-events-none"
                  : "opacity-0 translate-x-full pointer-events-none"
            } ${transitioning ? "pointer-events-none" : ""}`}
          >
            <div className="container min-h-full px-6 py-16 flex flex-col">
              <div className="max-w-3xl mx-auto w-full">
                <div className="mb-12">
                  <div className="flex items-baseline mb-4">
                    <span
                      className="text-red-900 text-3xl font-bold mr-4"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      {section.icon}
                    </span>
                    <h2
                      className="text-4xl md:text-5xl font-light text-white"
                      style={{ fontFamily: "'Playfair Display', serif", letterSpacing: "0.02em" }}
                    >
                      {section.title}
                    </h2>
                  </div>
                  <div className="h-px w-32 bg-gradient-to-r from-red-900 to-transparent"></div>
                </div>

                <div
                  className="space-y-6 leading-relaxed text-lg flex-grow"
                  style={{ fontFamily: "'Crimson Text', serif", letterSpacing: "0.01em", lineHeight: "1.8" }}
                >
                  {section.content}
                </div>
              </div>

              {/* Navigation controls */}
              <div className="flex justify-between items-center mt-12 mb-4 max-w-3xl mx-auto w-full pt-8 sticky bottom-0 bg-black bg-opacity-80 backdrop-blur-sm py-4 border-t border-red-950">
                <button
                  onClick={goToPrevSection}
                  className={`flex items-center space-x-2 text-sm uppercase tracking-widest transition-colors ${
                    index > 0 ? "text-gray-500 hover:text-red-500" : "text-gray-800 cursor-not-allowed"
                  }`}
                  style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: "0.15em", fontSize: "0.7rem" }}
                  disabled={index === 0}
                >
                  <ChevronLeft size={16} />
                  <span>Previous</span>
                </button>

                <div className="flex space-x-2">
                  {sections.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goToSection(i)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        i === activeSection ? "bg-red-700 scale-125" : "bg-gray-800"
                      }`}
                      aria-label={`Go to slide ${i + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={goToNextSection}
                  className={`flex items-center space-x-2 text-sm uppercase tracking-widest transition-colors ${
                    index < sections.length - 1
                      ? "text-gray-500 hover:text-red-500"
                      : "text-gray-800 cursor-not-allowed"
                  }`}
                  style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: "0.15em", fontSize: "0.7rem" }}
                  disabled={index === sections.length - 1}
                >
                  <span>Next</span>
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Background decoration */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        {/* Dark red diagonal line */}
        <div className="absolute top-0 right-0 w-1/4 h-screen bg-gradient-to-b from-red-950 to-transparent opacity-30"></div>

        {/* Subtle grid */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgxMjgsMCwwLDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>

        {/* Section number indicator */}
        <div className="absolute top-1/2 right-8 transform -translate-y-1/2 text-red-950 text-[200px] font-bold opacity-20 hidden lg:block">
          {sections[activeSection].icon}
        </div>

        {/* A few very subtle red accents */}
        <div className="absolute top-1/4 left-1/3 w-32 h-32 rounded-full bg-red-900 filter blur-3xl opacity-5"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-red-900 filter blur-3xl opacity-5"></div>
      </div>
    </div>
  )
}

export default ResumeWebsite

