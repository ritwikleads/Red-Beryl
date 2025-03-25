"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronLeft, Play, Maximize, X } from "lucide-react"
import Link from "next/link"

const VideoPortfolio = () => {
  // Sample portfolio data - replace with your actual Vimeo videos
  const portfolioItems = [
    {
      id: 1,
      title: "Brand Campaign: Azora Fashion",
      description: "A cinematic brand story that captures the essence of Azora's unique style and vision.",
      category: "Commercial",
      vimeoId: "123456789", // Replace with your actual Vimeo ID
      thumbnail: "/placeholder.svg?height=360&width=640", // This will be replaced with your video thumbnail
      client: "Wear Azora",
      year: "2023",
    },
    {
      id: 2,
      title: "Product Launch: Summer Collection",
      description: "Showcasing the vibrant new summer collection through a narrative-driven visual experience.",
      category: "Product",
      vimeoId: "987654321", // Replace with your actual Vimeo ID
      thumbnail: "/placeholder.svg?height=360&width=640", // This will be replaced with your video thumbnail
      client: "Lifestyle Brand",
      year: "2023",
    },
    {
      id: 3,
      title: "Promotional Campaign: Sales Event",
      description:
        "An energetic promotional video highlighting limited-time offers while maintaining brand aesthetics.",
      category: "Promotional",
      vimeoId: "567891234", // Replace with your actual Vimeo ID
      thumbnail: "/placeholder.svg?height=360&width=640", // This will be replaced with your video thumbnail
      client: "Retail Client",
      year: "2022",
    },
    {
      id: 4,
      title: "Behind the Scenes: Production Process",
      description: "A documentary-style look at our meticulous approach to creating high-quality content.",
      category: "Documentary",
      vimeoId: "345678912", // Replace with your actual Vimeo ID
      thumbnail: "/placeholder.svg?height=360&width=640", // This will be replaced with your video thumbnail
      client: "Internal Production",
      year: "2022",
    },
    {
      id: 5,
      title: "Brand Story: Company Origins",
      description: "Telling the founder's journey and the evolution of the brand through cinematic storytelling.",
      category: "Brand Story",
      vimeoId: "234567891", // Replace with your actual Vimeo ID
      thumbnail: "/placeholder.svg?height=360&width=640", // This will be replaced with your video thumbnail
      client: "Tech Startup",
      year: "2023",
    },
    {
      id: 6,
      title: "Social Media Series: Quick Tips",
      description: "A series of short, engaging videos designed specifically for social media consumption.",
      category: "Social Media",
      vimeoId: "891234567", // Replace with your actual Vimeo ID
      thumbnail: "/placeholder.svg?height=360&width=640", // This will be replaced with your video thumbnail
      client: "Educational Platform",
      year: "2023",
    },
  ]

  // State management
  const [activeCategory, setActiveCategory] = useState("All")
  const [filteredItems, setFilteredItems] = useState(portfolioItems)
  const [selectedVideo, setSelectedVideo] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const modalRef = useRef(null)

  // Get unique categories for filter
  const categories = ["All", ...new Set(portfolioItems.map((item) => item.category))]

  // Filter videos by category
  useEffect(() => {
    if (activeCategory === "All") {
      setFilteredItems(portfolioItems)
    } else {
      setFilteredItems(portfolioItems.filter((item) => item.category === activeCategory))
    }
  }, [activeCategory])

  // Handle video selection
  const handleVideoSelect = (video) => {
    setSelectedVideo(video)
    setIsPlaying(true)
  }

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal()
      }
    }

    if (selectedVideo) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [selectedVideo])

  // Close modal function
  const closeModal = () => {
    setSelectedVideo(null)
    setIsPlaying(false)
    setIsFullscreen(false)
  }

  // Toggle fullscreen
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  // Escape key to close modal
  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === "Escape") {
        closeModal()
      }
    }

    window.addEventListener("keydown", handleEscKey)
    return () => window.removeEventListener("keydown", handleEscKey)
  }, [])

  return (
    <div
      className="min-h-screen bg-black text-gray-300 font-serif antialiased"
      style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}
    >
      {/* Header Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Link
              href="/"
              className="inline-flex items-center text-sm text-gray-400 hover:text-red-300 transition-colors mb-8"
              style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: "0.05em" }}
            >
              <ChevronLeft size={16} className="mr-1" />
              Back to Resume
            </Link>
          </div>

          <div className="mb-12">
            <div className="flex items-baseline mb-4">
              <span className="text-red-900 text-3xl font-bold mr-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                07
              </span>
              <h2
                className="text-4xl md:text-5xl font-light text-white"
                style={{ fontFamily: "'Playfair Display', serif", letterSpacing: "0.02em" }}
              >
                Video Portfolio
              </h2>
            </div>
            <div className="h-px w-32 bg-gradient-to-r from-red-900 to-transparent"></div>
          </div>

          <div
            className="space-y-6 leading-relaxed text-lg mb-16"
            style={{ fontFamily: "'Crimson Text', serif", letterSpacing: "0.01em", lineHeight: "1.8" }}
          >
            <p className="mb-6">
              Below is a curated selection of my work that demonstrates my approach to visual storytelling and marketing
              communications. Each project balances aesthetic quality with strategic business objectives.
            </p>

            <div className="relative pl-5 border-l-2 border-red-900 my-12">
              <p
                className="text-xl text-gray-300"
                style={{ fontFamily: "'Crimson Text', serif", lineHeight: "1.6", fontStyle: "italic" }}
              >
                "I believe in maintaining
                <span className="relative inline-block mx-1">
                  <span className="text-red-300">narrative integrity</span>
                  <span className="absolute bottom-0 left-0 w-full h-px bg-red-800 opacity-40"></span>
                </span>
                throughout every project, ensuring the content serves the business objectives while creating a
                <span className="relative inline-block mx-1">
                  <span className="text-red-300">memorable impression</span>
                  <span className="absolute bottom-0 left-0 w-full h-px bg-red-800 opacity-40"></span>
                </span>
                on the viewer."
              </p>
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 text-sm rounded transition-all ${
                  activeCategory === category
                    ? "bg-red-900 bg-opacity-50 text-red-200 border border-red-800"
                    : "bg-black bg-opacity-40 text-gray-400 border border-gray-800 hover:border-red-900 hover:text-red-300"
                }`}
                style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: "0.05em" }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Portfolio Grid */}
      <div className="container mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group bg-black bg-opacity-40 border border-red-950 border-opacity-40 hover:border-red-900 transition-all overflow-hidden rounded-sm"
            >
              <div className="relative overflow-hidden">
                <div className="aspect-video bg-gray-900 relative overflow-hidden">
                  <img
                    src={item.thumbnail || "/placeholder.svg"}
                    alt={item.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-all duration-500 opacity-80 group-hover:opacity-100"
                  />

                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleVideoSelect(item)}
                      className="w-16 h-16 bg-red-900 bg-opacity-80 rounded-full flex items-center justify-center"
                    >
                      <Play size={24} className="text-white ml-1" />
                    </button>
                  </div>
                </div>

                <div className="absolute top-4 left-4">
                  <span
                    className="bg-red-950 bg-opacity-80 text-red-200 px-2 py-1 text-xs"
                    style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: "0.1em" }}
                  >
                    {item.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3
                  className="text-xl font-medium text-red-300 mb-2"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {item.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4">{item.description}</p>

                <div className="flex justify-between text-xs text-gray-500 mt-6 pt-4 border-t border-red-950 border-opacity-30">
                  <span>{item.client}</span>
                  <span>{item.year}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div
            ref={modalRef}
            className={`bg-black border border-red-900 relative ${isFullscreen ? "w-full h-full" : "max-w-4xl w-full"}`}
          >
            <div className="flex justify-between items-center p-4 border-b border-red-950">
              <h3 className="text-red-300 font-medium">{selectedVideo.title}</h3>
              <div className="flex gap-4">
                <button onClick={toggleFullscreen} className="text-gray-400 hover:text-red-300 transition-colors">
                  <Maximize size={20} />
                </button>
                <button onClick={closeModal} className="text-gray-400 hover:text-red-300 transition-colors">
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className={`aspect-video ${isFullscreen ? "h-[calc(100%-56px)]" : ""} bg-black`}>
              {isPlaying && (
                <iframe
                  src={`https://player.vimeo.com/video/${selectedVideo.vimeoId}?autoplay=1&title=0&byline=0&portrait=0`}
                  className="w-full h-full"
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                ></iframe>
              )}
            </div>

            {!isFullscreen && (
              <div className="p-4 border-t border-red-950">
                <p className="text-gray-400 text-sm">{selectedVideo.description}</p>
                <div className="flex justify-between text-xs text-gray-500 mt-4">
                  <span>Client: {selectedVideo.client}</span>
                  <span>Year: {selectedVideo.year}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Background decoration */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        {/* Dark red diagonal line */}
        <div className="absolute top-0 right-0 w-1/4 h-screen bg-gradient-to-b from-red-950 to-transparent opacity-30"></div>

        {/* Subtle grid */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgxMjgsMCwwLDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>

        {/* Section number indicator */}
        <div className="absolute top-1/2 right-8 transform -translate-y-1/2 text-red-950 text-[200px] font-bold opacity-20 hidden lg:block">
          07
        </div>

        {/* A few very subtle red accents */}
        <div className="absolute top-1/4 left-1/3 w-32 h-32 rounded-full bg-red-900 filter blur-3xl opacity-5"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-red-900 filter blur-3xl opacity-5"></div>
      </div>
    </div>
  )
}

export default VideoPortfolio