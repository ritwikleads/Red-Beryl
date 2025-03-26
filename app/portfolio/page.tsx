"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronLeft, Play, Maximize, X } from "lucide-react"
import Link from "next/link"

const VideoPortfolio = () => {
  // Updated portfolio data with YouTube videos
  const portfolioItems = [
    {
      id: 1,
      title: "The Ekaanta Film",
      description: "A cinematic journey through the luxurious Ekaanta wellness resort in Haridwar, showcasing its serene ambiance and rejuvenating experiences.",
      youtubeId: "PiIJj8T_ZcM", 
      thumbnail: "https://img.youtube.com/vi/PiIJj8T_ZcM/maxresdefault.jpg",
      client: "Ekaanta Minversity"
    },
    {
      id: 2,
      title: "Pullman Aerocity Advertisement",
      description: "An immersive visual narrative highlighting the premium spa experience at Pullman, designed to entice guests with its world-class relaxation treatments.",
      youtubeId: "8GQzGMv_oPY", 
      thumbnail: "https://img.youtube.com/vi/8GQzGMv_oPY/maxresdefault.jpg",
      client: "Pullman Hotel, Aerocity"
    },
    {
      id: 3,
      title: "Tour de Art at Pullman",
      description: "An elegant showcase of the prestigious Tour de Art exhibition held at Pullman, capturing the intersection of hospitality and artistic expression.",
      youtubeId: "QiYrqeVXGRE", 
      thumbnail: "https://img.youtube.com/vi/QiYrqeVXGRE/maxresdefault.jpg",
      client: "Pullman Hotel, Aerocity"
    },
    {
      id: 4,
      title: "Made in Smoke Lab",
      description: "Intimate confessions of a master mixologist revealing the artistry behind creating signature cocktails using Smoke Lab vodka.",
      youtubeId: "-n6xsZ320Vo", 
      thumbnail: "https://img.youtube.com/vi/-n6xsZ320Vo/maxresdefault.jpg",
      client: "Smoke Lab Vodka"
    },
    {
      id: 5,
      title: "Digital Jalebi Brand Film",
      description: "A compelling corporate communication piece showcasing the innovative approach and creative philosophy of Digital Jalebi studios.",
      youtubeId: "LKsoF0NVzGs", 
      thumbnail: "https://img.youtube.com/vi/LKsoF0NVzGs/maxresdefault.jpg",
      client: "Digital Jalebi"
    },
    {
      id: 6,
      title: "Tiber Taber: The Story",
      description: "An authentic brand narrative featuring the founders of Tiber Taber sharing their vision, inspiration, and creative journey.",
      youtubeId: "bShDiyE1U9M", 
      thumbnail: "https://img.youtube.com/vi/bShDiyE1U9M/maxresdefault.jpg",
      client: "Tiber Taber Clothing"
    },
    {
      id: 7,
      title: "Chasma AD",
      description: "An engaging campaign video highlighting the unique offerings and customer experience of the premier eyewear platform.",
      youtubeId: "Z-A6oX5VT5s", 
      thumbnail: "https://img.youtube.com/vi/Z-A6oX5VT5s/maxresdefault.jpg",
      client: "Chasma.com"
    },
    {
      id: 8,
      title: "DJ X IIAD",
      description: "A dynamic admissions campaign showcasing educational opportunities and creative pathways at the prestigious design institute.",
      youtubeId: "dYAMPpykukk", 
      thumbnail: "https://img.youtube.com/vi/dYAMPpykukk/maxresdefault.jpg",
      client: "IIAD"
    },
  ]

  // State management
  const [selectedVideo, setSelectedVideo] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const modalRef = useRef(null)

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
        </div>
      </div>

      {/* Portfolio Grid */}
      <div className="container mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioItems.map((item) => (
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
              </div>

              <div className="p-6">
                <h3
                  className="text-xl font-medium text-red-300 mb-2"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {item.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4">{item.description}</p>

                <div className="flex justify-center text-xs text-gray-500 mt-6 pt-4 border-t border-red-950 border-opacity-30">
                  <span>{item.client}</span>
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
                  src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1&modestbranding=1&rel=0`}
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              )}
            </div>

            {!isFullscreen && (
              <div className="p-4 border-t border-red-950">
                <p className="text-gray-400 text-sm">{selectedVideo.description}</p>
                <div className="flex justify-center text-xs text-gray-500 mt-4">
                  <span>Client: {selectedVideo.client}</span>
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