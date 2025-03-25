"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

interface FaqDropdownProps {
  question: string
  answer: string
}

const FaqDropdown = ({ question, answer }: FaqDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="mb-4 border border-red-900 border-opacity-30 rounded-md overflow-hidden">
      <button
        className="w-full flex items-center justify-between bg-red-950 bg-opacity-30 px-6 py-4 text-left transition-colors hover:bg-opacity-50 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span
          className="text-red-200 font-medium"
          style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.9rem" }}
        >
          {question}
        </span>
        <ChevronDown
          size={18}
          className={`text-red-400 transition-transform duration-300 ${isOpen ? "transform rotate-180" : ""}`}
        />
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 py-4 bg-black bg-opacity-50">
          <p
            className="text-gray-300 leading-relaxed"
            style={{ fontFamily: "'Crimson Text', serif", fontSize: "0.95rem" }}
          >
            {answer}
          </p>
        </div>
      </div>
    </div>
  )
}

export default FaqDropdown

