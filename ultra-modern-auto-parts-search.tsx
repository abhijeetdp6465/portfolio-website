"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
// Добавьте после других импортов
import {
  Search,
  ArrowRight,
  X,
  ChevronRight,
  Sparkles,
  Zap,
  Layers,
  Compass,
  Clock,
  DollarSign,
  RefreshCw,
  Check,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { TracingBeam } from "@/components/tracing-beam"
import AnimeSphereAnimation from "@/components/anime-sphere-animation"

// Компонент для анимированного placeholder
function AnimatedPlaceholder({ texts, className }: { texts: string[]; className?: string }) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [typingSpeed, setTypingSpeed] = useState(80)

  useEffect(() => {
    const text = texts[currentTextIndex]

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Печатаем текст
        if (currentText.length < text.length) {
          setCurrentText(text.substring(0, currentText.length + 1))
          setTypingSpeed(80)
        } else {
          // Пауза перед удалением
          setIsDeleting(true)
          setTypingSpeed(1000)
        }
      } else {
        // Удаляем текст
        if (currentText.length > 0) {
          setCurrentText(text.substring(0, currentText.length - 1))
          setTypingSpeed(40)
        } else {
          // Переход к следующему тексту
          setIsDeleting(false)
          setCurrentTextIndex((currentTextIndex + 1) % texts.length)
          setTypingSpeed(500)
        }
      }
    }, typingSpeed)

    return () => clearTimeout(timeout)
  }, [currentText, currentTextIndex, isDeleting, texts, typingSpeed])

  return (
    <span className={className}>
      {currentText}
      <span className="animate-pulse">|</span>
    </span>
  )
}

export default function UltraModernAutoPartsSearch() {
  const [searchQuery, setSearchQuery] = useState("")
  const [city, setCity] = useState("Москва")
  const [searchFocused, setSearchFocused] = useState(false)
  const [activeSection, setActiveSection] = useState("search")
  const [showResults, setShowResults] = useState(false)
  const [selectedPart, setSelectedPart] = useState<string | null>(null)

  const searchInputRef = useRef<HTMLInputElement>(null)
  const resultsRef = useRef<HTMLDivElement>(null)
  const searchSectionRef = useRef<HTMLElement>(null)
  const howSectionRef = useRef<HTMLElement>(null)
  const pricingSectionRef = useRef<HTMLElement>(null)
  const businessSectionRef = useRef<HTMLElement>(null)

  // Handle search submission
  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (searchQuery.trim()) {
      setShowResults(true)
      // Scroll to results after a small delay to allow for animation
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth" })
      }, 100)
    }
  }

  // Handle escape key to close search results
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowResults(false)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  // Focus search input on initial load


  // Scroll to section when menu item is clicked
  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId)

    const sectionMap = {
      search: searchSectionRef,
      how: howSectionRef,
      pricing: pricingSectionRef,
      business: businessSectionRef,
    }

    const sectionRef = sectionMap[sectionId as keyof typeof sectionMap]
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }

  // Handle scroll events for active section detection
  useEffect(() => {
    const handleScroll = () => {
      // Determine active section based on scroll position
      const sections = [
        { id: "search", ref: searchSectionRef },
        { id: "how", ref: howSectionRef },
        { id: "pricing", ref: pricingSectionRef },
        { id: "business", ref: businessSectionRef },
      ]

      for (const section of sections) {
        if (section.ref.current) {
          const rect = section.ref.current.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section.id)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])





  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Background elements */}
      <div className="fixed inset-0 z-0">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0a] to-black"></div>

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
            backgroundSize: "30px 30px",
          }}
        ></div>

        {/* Animated gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-red-500/10 blur-[100px] animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-red-400/10 blur-[80px] animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      {/* Main content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/30 border-b border-white/5">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <span className="font-bold text-lg tracking-tight">AUTOPARTS</span>

            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                className={cn(
                  "text-white/70 hover:text-white hover:bg-white/5 rounded-full",
                  activeSection === "search" && "text-white bg-white/5",
                )}
                onClick={() => scrollToSection("search")}
              >
                Search
              </Button>
              <Button
                variant="ghost"
                className={cn(
                  "text-white/70 hover:text-white hover:bg-white/5 rounded-full",
                  activeSection === "how" && "text-white bg-white/5",
                )}
                onClick={() => scrollToSection("how")}
              >
                How it works
              </Button>
              <Button
                variant="ghost"
                className={cn(
                  "text-white/70 hover:text-white hover:bg-white/5 rounded-full",
                  activeSection === "pricing" && "text-white bg-white/5",
                )}
                onClick={() => scrollToSection("pricing")}
              >
                Pricing
              </Button>
              <Button
                variant="ghost"
                className={cn(
                  "text-white/70 hover:text-white hover:bg-white/5 rounded-full",
                  activeSection === "business" && "text-white bg-white/5",
                )}
                onClick={() => scrollToSection("business")}
              >
                For Business
              </Button>
            </div>
          </div>
        </header>

        {/* Main content area with TracingBeam */}
        <TracingBeam className="pt-24 pb-16">
          {/* Hero section with search */}
          <section
            ref={searchSectionRef}
            id="search"
            className="min-h-[90vh] flex flex-col items-center justify-center px-4 relative"
          >
            <div className="absolute inset-0 -z-10">
              <AnimeSphereAnimation />
            </div>
            <div
              className={cn(
                "max-w-4xl w-full transition-all duration-500 ease-out",
                searchFocused ? "scale-105" : "scale-100",
              )}
            >
              <h1
                className={cn(
                  "text-5xl md:text-7xl font-bold mb-6 text-center transition-all duration-500",
                  searchFocused ? "opacity-0 -translate-y-10" : "opacity-100 translate-y-0",
                )}
              >
                Find auto parts instantly
              </h1>

              <p
                className={cn(
                  "text-xl text-white/70 text-center mb-12 max-w-2xl mx-auto transition-all duration-500",
                  searchFocused ? "opacity-0 -translate-y-10" : "opacity-100 translate-y-0",
                )}
              >
                Instant search across thousands of stores in your city powered by artificial intelligence
              </p>




            </div>

            {/* Stats */}
            <div
              className={cn(
                "absolute bottom-8 left-0 right-0 flex justify-center gap-16 transition-all duration-500",
                searchFocused ? "opacity-0 translate-y-10" : "opacity-100 translate-y-0",
              )}
            >
              <div className="text-center">
                <div className="text-3xl font-bold">5000+</div>
                <div className="text-white/50 text-sm">Stores</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">1M+</div>
                <div className="text-white/50 text-sm">Parts</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">30+</div>
                <div className="text-white/50 text-sm">Seconds to search</div>
              </div>
            </div>
          </section>

          {/* Search results */}


          {/* How it works section */}
          <section ref={howSectionRef} id="how" className="py-16 px-4 border-t border-white/5">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center">How it works</h2>
              <p className="text-white/70 text-center max-w-3xl mx-auto mb-16">
                Our service uses advanced technologies for instant auto parts search across thousands of stores in your
                city
              </p>

              <div className="grid md:grid-cols-3 gap-8 mb-16 relative">
                {/* Connection line for desktop */}
                <div className="hidden md:block absolute top-24 left-[calc(16.67%+8px)] right-[calc(16.67%+8px)] h-0.5">
                  <div className="h-full bg-white/10 relative">
                    {/* Точки на линии, соответствующие центрам блоков */}
                    <div className="absolute top-1/2 left-1/6 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-red-500 rounded-full"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-red-500 rounded-full"></div>
                    <div className="absolute top-1/2 left-5/6 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-red-500 rounded-full"></div>
                  </div>
                </div>

                {[
                  {
                    icon: <Search className="h-8 w-8 text-red-400" />,
                    title: "Enter your query",
                    description:
                      "Enter part name or article number, and we'll instantly check availability across thousands of stores",
                    benefits: [
                      "Smart search understands even imprecise queries",
                      "Automatic city detection",
                      "Search history for quick access",
                    ],
                  },
                  {
                    icon: <Layers className="h-8 w-8 text-red-400" />,
                    title: "Choose the best offer",
                    description: "Compare prices, location and availability, choose the optimal option",
                    benefits: [
                      "Sort by price, distance and rating",
                      "Filter by availability and manufacturer",
                      "Detailed information about each offer",
                    ],
                  },
                  {
                    icon: <Zap className="h-8 w-8 text-red-400" />,
                    title: "Contact the store",
                    description: "Call the store directly or request a callback through our service",
                    benefits: [
                      "Direct contact without intermediaries",
                      "Parts reservation capability",
                      "Route building to store",
                    ],
                  },
                ].map((step, index) => (
                  <div key={index} className="relative group">
                    <div className="absolute -inset-px bg-gradient-to-r from-red-500/0 via-red-500/0 to-red-500/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>

                    <div className="relative border border-white/10 rounded-2xl p-6 h-full transition-all duration-300 group-hover:border-red-500/50 group-hover:bg-white/5">
                      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-black border border-white/10 flex items-center justify-center text-xl font-bold">
                        {index + 1}
                      </div>

                      <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-6 mt-4">
                        {step.icon}
                      </div>

                      <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                      <p className="text-white/70 mb-6">{step.description}</p>

                      <div className="space-y-2">
                        {step.benefits.map((benefit, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <div className="w-5 h-5 rounded-full bg-red-500/20 flex-shrink-0 flex items-center justify-center mt-0.5">
                              <div className="w-2 h-2 rounded-full bg-red-500"></div>
                            </div>
                            <p className="text-sm text-white/60">{benefit}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border border-white/10 rounded-2xl p-8 mb-16 bg-white/5 backdrop-blur-sm">
                <h3 className="text-2xl font-bold mb-6 text-center">Service advantages</h3>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    {
                      title: "Time saving",
                      description: "Users save up to 3 hours on average searching for needed parts",
                      icon: <Clock className="h-6 w-6 text-red-400" />,
                    },
                    {
                      title: "Money saving",
                      description: "Price comparison allows saving up to 30% on parts cost",
                      icon: <DollarSign className="h-6 w-6 text-green-400" />,
                    },
                    {
                      title: "Real-time data",
                      description: "Availability and price information updates in real-time",
                      icon: <RefreshCw className="h-6 w-6 text-red-400" />,
                    },
                    {
                      title: "Artificial Intelligence",
                      description: "AI analyzes queries and finds exact matches even with imprecise requests",
                      icon: <Sparkles className="h-6 w-6 text-red-400" />,
                    },
                  ].map((benefit, index) => (
                    <div
                      key={index}
                      className="border border-white/10 rounded-xl p-4 hover:border-red-500/50 hover:bg-white/5 transition-all duration-300"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                          {benefit.icon}
                        </div>
                        <h4 className="font-bold">{benefit.title}</h4>
                      </div>
                      <p className="text-white/70 text-sm">{benefit.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border border-white/10 rounded-2xl p-8 mb-16 bg-gradient-to-br from-black to-red-950/30 backdrop-blur-sm">
                <h3 className="text-2xl font-bold mb-6 text-center flex items-center justify-center gap-2">
                  <Sparkles className="h-6 w-6 text-red-400" />
                  Artificial Intelligence at the core of search
                </h3>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold text-red-400">Smart parts search</h4>
                    <p className="text-white/70">
                      Our service uses advanced AI algorithms and MeiliSearch to index millions of parts, allowing you
                      to find needed parts even with imprecise queries and typos.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <div className="w-5 h-5 rounded-full bg-red-500/20 flex-shrink-0 flex items-center justify-center mt-0.5">
                          <Check className="h-3 w-3 text-red-400" />
                        </div>
                        <p className="text-sm text-white/70">Understands natural language queries</p>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-5 h-5 rounded-full bg-red-500/20 flex-shrink-0 flex items-center justify-center mt-0.5">
                          <Check className="h-3 w-3 text-red-400" />
                        </div>
                        <p className="text-sm text-white/70">Recognizes part analogs and substitutes</p>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-5 h-5 rounded-full bg-red-500/20 flex-shrink-0 flex items-center justify-center mt-0.5">
                          <Check className="h-3 w-3 text-red-400" />
                        </div>
                        <p className="text-sm text-white/70">Considers compatibility with your vehicle</p>
                      </li>
                    </ul>
                  </div>

                  <div className="relative">
                    <div className="absolute -inset-px bg-gradient-to-r from-red-500/20 via-red-500/10 to-red-500/20 rounded-2xl blur-md"></div>
                    <div className="relative border border-white/10 rounded-2xl p-6 h-full">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center">
                          <svg
                            className="w-6 h-6 text-red-400"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z"
                              fill="currentColor"
                            />
                            <path
                              d="M12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17Z"
                              fill="currentColor"
                            />
                          </svg>
                        </div>
                        <h4 className="text-xl font-semibold">MeiliSearch с ИИ</h4>
                      </div>
                      <p className="text-white/70 mb-4">
                        We use MeiliSearch with AI integration to create the fastest and most accurate auto parts search
                        system.
                      </p>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-white/50">Search speed</span>
                        <span className="text-red-400 font-medium">{"<"} 50 мс</span>
                      </div>
                      <div className="w-full h-1.5 bg-white/10 rounded-full mt-1 mb-3">
                        <div className="h-full bg-red-500 rounded-full" style={{ width: "95%" }}></div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-white/50">Result accuracy</span>
                        <span className="text-red-400 font-medium">99.7%</span>
                      </div>
                      <div className="w-full h-1.5 bg-white/10 rounded-full mt-1">
                        <div className="h-full bg-red-500 rounded-full" style={{ width: "97%" }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative mb-16">
                <div className="absolute -inset-px bg-gradient-to-r from-red-500/20 via-red-500/20 to-red-500/20 rounded-2xl blur-md"></div>

                <div className="relative border border-white/10 rounded-2xl overflow-hidden">
                  <div className="aspect-video relative">
                    <Image
                      src="/placeholder.svg?height=720&width=1280"
                      width={1280}
                      height={720}
                      alt="Демонстрация работы сервиса"
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <div className="w-20 h-20 rounded-full bg-red-600/80 flex items-center justify-center">
                        <div className="w-0 h-0 border-t-8 border-t-transparent border-l-16 border-l-white border-b-8 border-b-transparent ml-2"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <h3 className="text-2xl font-bold mb-6">Ready to find parts?</h3>
                <Button
                  className="rounded-full bg-red-600 hover:bg-red-700 h-12 px-8 text-lg"
                  onClick={() => scrollToSection("search")}
                >
                  Start search
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </section>

          {/* Pricing section */}
          <section ref={pricingSectionRef} id="pricing" className="py-16 px-4 border-t border-white/5">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center">Pricing</h2>
              <p className="text-white/70 text-center max-w-3xl mx-auto mb-16">
                Choose the right plan for auto parts search. Free plan available for personal use
              </p>



            </div>
          </section>

          {/* For business section */}
          <section ref={businessSectionRef} id="business" className="py-16 px-4 border-t border-white/5">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">For Business</h2>

              <div className="grid md:grid-cols-2 gap-12 mb-16">
                <div>
                  <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <Sparkles className="h-6 w-6 text-red-400" />
                    Connection benefits
                  </h3>

                  <div className="space-y-6">
                    {[
                      {
                        title: "New customers",
                        description: "Attract customers who are specifically looking for parts in your city",
                      },
                      {
                        title: "Automatic synchronization",
                        description: "Integration with your accounting system to update availability and price data",
                      },
                      {
                        title: "Analytics and statistics",
                        description: "Get data on popular queries and demand in your region",
                      },
                      {
                        title: "Easy connection",
                        description: "Free connection and technical support at all stages",
                      },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="border border-white/10 rounded-xl p-4 hover:border-red-500/50 hover:bg-white/5 transition-all duration-300"
                      >
                        <h4 className="font-bold mb-2">{item.title}</h4>
                        <p className="text-white/70">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="relative">
                    <div className="absolute -inset-px bg-gradient-to-r from-red-500/20 via-red-500/20 to-red-500/20 rounded-2xl blur-md"></div>

                    <div className="relative border border-white/10 rounded-2xl p-6 bg-black/50 backdrop-blur-sm">
                      <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <Compass className="h-6 w-6 text-red-400" />
                        Submit application
                      </h3>

                      <form className="space-y-4">
                        <div>
                          <label className="block text-sm text-white/70 mb-1">Company name</label>
                          <Input className="bg-white/5 border-white/10 rounded-lg focus:border-red-500 focus:ring-red-500 text-white" />
                        </div>

                        <div>
                          <label className="block text-sm text-white/70 mb-1">Email</label>
                          <Input
                            type="email"
                            className="bg-white/5 border-white/10 rounded-lg focus:border-red-500 focus:ring-red-500 text-white"
                          />
                        </div>

                        <div>
                          <label className="block text-sm text-white/70 mb-1">Phone</label>
                          <Input
                            type="tel"
                            className="bg-white/5 border-white/10 rounded-lg focus:border-red-500 focus:ring-red-500 text-white"
                          />
                        </div>

                        <div>
                          <label className="block text-sm text-white/70 mb-1">City</label>
                          <Input className="bg-white/5 border-white/10 rounded-lg focus:border-red-500 focus:ring-red-500 text-white" />
                        </div>

                        <Button type="submit" className="w-full rounded-lg bg-red-600 hover:bg-red-700 h-12">
                          Submit application
                        </Button>
                      </form>
                    </div>
                  </div>

                  <div className="mt-8 p-6 border border-white/10 rounded-2xl">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-bold">Connection statistics</h4>
                      <div className="text-sm text-white/50">Average indicators</div>
                    </div>

                    <div className="space-y-4">
                      {[
                        { label: "Customer growth", value: "+40%" },
                        { label: "Sales increase", value: "+35%" },
                        { label: "Inventory optimization", value: "-20%" },
                      ].map((stat, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <span className="text-white/70">{stat.label}</span>
                          <span className="font-bold text-red-400">{stat.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <h3 className="text-2xl font-bold mb-6">Join our store network</h3>
                <Button className="rounded-full bg-red-600 hover:bg-red-700 h-12 px-8 text-lg">
                  Become a partner
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </section>
        </TracingBeam>

        {/* Footer */}
        <footer className="border-t border-white/5 py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <span className="font-bold">AUTOPARTS</span>

              <div className="flex gap-6">
                <a href="#" className="text-white/50 hover:text-white transition-colors">
                  About service
                </a>
                <a href="#" className="text-white/50 hover:text-white transition-colors">
                  Terms of use
                </a>
                <a href="#" className="text-white/50 hover:text-white transition-colors">
                  Privacy
                </a>
                <a href="#" className="text-white/50 hover:text-white transition-colors">
                  Contacts
                </a>
              </div>

              <div className="text-white/50">© {new Date().getFullYear()} AUTOPARTS</div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
