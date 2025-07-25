"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
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
  Loader2,
} from "lucide-react";
import { Facebook, Instagram, Linkedin, Youtube, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { TracingBeam } from "@/components/tracing-beam";
import AnimeSphereAnimation from "@/components/anime-sphere-animation";
import { Mail } from "lucide-react";
import Link from "next/link";

// Компонент для анимированного placeholder
function AnimatedPlaceholder({
  texts,
  className,
}: {
  texts: string[];
  className?: string;
}) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(80);

  useEffect(() => {
    const text = texts[currentTextIndex];

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Печатаем текст
        if (currentText.length < text.length) {
          setCurrentText(text.substring(0, currentText.length + 1));
          setTypingSpeed(80);
        } else {
          // Пауза перед удалением
          setIsDeleting(true);
          setTypingSpeed(1000);
        }
      } else {
        // Удаляем текст
        if (currentText.length > 0) {
          setCurrentText(text.substring(0, currentText.length - 1));
          setTypingSpeed(40);
        } else {
          // Переход к следующему тексту
          setIsDeleting(false);
          setCurrentTextIndex((currentTextIndex + 1) % texts.length);
          setTypingSpeed(500);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [currentText, currentTextIndex, isDeleting, texts, typingSpeed]);

  return (
    <span className={className}>
      {currentText}
      <span className="animate-pulse">|</span>
    </span>
  );
}

export default function UltraModernAutoPartsSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [city, setCity] = useState("Москва");
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const [searchFocused, setSearchFocused] = useState(false);
  const [activeSection, setActiveSection] = useState("search");
  const [showResults, setShowResults] = useState(false);
  const [selectedPart, setSelectedPart] = useState<string | null>(null);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const searchSectionRef = useRef<HTMLElement>(null);
  const howSectionRef = useRef<HTMLElement>(null);
  const pricingSectionRef = useRef<HTMLElement>(null);
  const businessSectionRef = useRef<HTMLElement>(null);
  const aboutSectionRef = useRef<HTMLElement>(null);
  const contactSectionRef = useRef<HTMLElement>(null);

  // Handle search submission
  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (searchQuery.trim()) {
      setShowResults(true);
      // Scroll to results after a small delay to allow for animation
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(formRef.current!);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      subject: `Phone: ${formData.get("phone")}`,
      message: formData.get("message"),
    };

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    setLoading(false);

    if (res.ok) {
      alert("Message sent successfully! 🎉");
      formRef.current?.reset();
    } else {
      alert("Failed to send message. Please try again later.");
    }
  };

  // Handle escape key to close search results
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowResults(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Focus search input on initial load

  // Scroll to section when menu item is clicked
  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);

    const sectionMap = {
      search: searchSectionRef,
      how: howSectionRef,
      pricing: pricingSectionRef,
      business: businessSectionRef,
      about: aboutSectionRef,
      contact: contactSectionRef,
    };

    const sectionRef = sectionMap[sectionId as keyof typeof sectionMap];
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Handle scroll events for active section detection
  useEffect(() => {
    const handleScroll = () => {
      // Determine active section based on scroll position
      const sections = [
        { id: "search", ref: searchSectionRef },
        { id: "how", ref: howSectionRef },
        { id: "pricing", ref: pricingSectionRef },
        { id: "business", ref: businessSectionRef },
        { id: "about", ref: aboutSectionRef },
        { id: "contact", ref: contactSectionRef },
      ];

      for (const section of sections) {
        if (section.ref.current) {
          const rect = section.ref.current.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white  z-0 overflow-x-hidden overflow-hidden">
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
      <div className="relative z-0">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-[100] backdrop-blur-md bg-black/30 border-b border-white/5">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            {/* add logo from assets */}
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center">
                <Image src="/Logo.png" alt="Logo" height={50} width={50} />
              </Link>
            </div>
            <div className="flex items-center gap-4">
              {/* add simple links to #about # contact us button with good design */}
              <div className="flex gap-6">
                <Button
                  variant="link"
                  className={cn(
                    "text-white/70 hover:text-white transition-colors",
                    activeSection === "about" ? "text-white" : ""
                  )}
                  onClick={() => scrollToSection("about")}
                >
                  About Us
                </Button>

                <Button onClick={() => scrollToSection("contact")}>
                  Connect
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main content area with TracingBeam */}
        <TracingBeam className="pt-24 pb-16">
          {/* Hero section with search */}
          <section
            ref={searchSectionRef}
            id="search"
            className="min-h-[90vh] flex flex-col items-center justify-center px-4 relative z-10"
          >
            <div className="absolute inset-0 -z-10">
              <AnimeSphereAnimation />
            </div>
            <div
              className={cn(
                "max-w-4xl w-full transition-all duration-500 ease-out",
                searchFocused ? "scale-105" : "scale-100"
              )}
            >
              {/* can you add logo  */}
              <div className="flex justify-center mb-8">
                <Image
                  src="/Logo.png"
                  alt="Logo"
                  width={100}
                  height={100}
                  className="rounded-full"
                />
              </div>
              <h1
                className={cn(
                  "text-5xl md:text-7xl font-bold mb-4 text-center transition-all duration-500",
                  searchFocused
                    ? "opacity-0 -translate-y-10"
                    : "opacity-100 translate-y-0"
                )}
              >
                Motion<span className="text-red-700">Pix</span> India
              </h1>
              <p
                className={cn(
                  "text-xl md:text-xl mb-6 text-center text-white/70 transition-all duration-500",
                  searchFocused
                    ? "opacity-0 -translate-y-10"
                    : "opacity-100 translate-y-0"
                )}
              >
                Motionpix cinematix india private limited
              </p>
              {/* add divider */}
              <p
                className={cn(
                  "text-xl md:text-xl font-bold mb-6  text-center transition-all capitalize duration-500",
                  searchFocused
                    ? "opacity-0 -translate-y-10"
                    : "opacity-100 translate-y-0"
                )}
              >
                Your digital branding partner
              </p>

            </div>

            {/* Stats */}
            <div
              className={cn(
                "absolute bottom-8 left-0 right-0 flex justify-center gap-16 transition-all duration-500",
                searchFocused
                  ? "opacity-0 translate-y-10"
                  : "opacity-100 translate-y-0"
              )}
            >
              <div className="text-center">
                <div className="text-3xl font-bold">20+</div>
                <div className="text-white/50 text-sm">
                  visual design experts
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">15+</div>
                <div className="text-white/50 text-sm">years of experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">100+</div>
                <div className="text-white/50 text-sm">
                  successful projects delivered
                </div>
              </div>
            </div>
          </section>
          <p
            className={cn(
              "text-xl text-white/70 text-center mb-12 max-w-2xl mx-auto transition-all duration-500",
              searchFocused
                ? "opacity-0 -translate-y-10"
                : "opacity-100 translate-y-0"
            )}
          >
            We craft next-gen 3D industrial visuals, cinematic experiences, and
            AR/VR content.{" "}
          </p>

          {/* add about us section for motionpix */}

          <section
            ref={aboutSectionRef}
            id="about"
            className=" py-16 my-16 px-4 bg-black/50 backdrop-blur-sm border-t rounded-2xl border-white/5 scroll-mt-40"
          >
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center">
                About Us
              </h2>
              <p className="text-white/70 text-center max-w-3xl mx-auto mb-12">
                At Motionpix Pvt Ltd, we blend creativity with cutting-edge
                technology to deliver stunning 3D visuals, cinematic
                experiences, and immersive AR/VR content. Our team of experts is
                dedicated to pushing the boundaries of what's possible in the
                world of digital media.
              </p>
              {/* add heading why Why Motionpix? */}
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-center">
                Why Motionpix?
              </h3>
              <p className="text-white/70 text-center max-w-2xl mx-auto mb-12">
                We bring your unseen mind’s ideas to life through creative
                motion graphics and immersive visual content. With over 15 years
                of experience and a team of 20+ design experts, we’ve delivered
                100+ successful projects.
              </p>
            </div>
          </section>

          {/* add Services  section what we offer */}
<div className="relative z-10 my-10 px-4 md:px-8">
  <div className="max-w-6xl mx-auto rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-10 backdrop-blur-md shadow-xl">
    <h2 className="text-3xl md:text-5xl font-bold text-center text-white mb-4 md:mb-6">
      Our Services
    </h2>
    <p className="text-white/70 text-center max-w-2xl mx-auto mb-10 text-sm sm:text-base">
      At Motionpix, we deliver cutting-edge digital experiences through our comprehensive services:
    </p>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {[
        "3D Modeling & Animation",
        "Cinematic Video Production",
        "Augmented Reality (AR) Experiences",
        "Virtual Reality (VR) Content Creation",
        "Motion Graphics Design",
        "Process Animations & Visualizations",
        "Plant Visualizations",
        "Greenfield Projects & Plant Animations",
        "Proposal & Project Animations",
        "Sales Manual Visualizations",
        "3D Interactive Animations",
        "2D Flash Animations",
        "AR/VR Services",
        "Motion Graphics Picture",
        "Digital SOPs",
      ].map((service, index) => (
        <div
          key={index}
          className="group transition transform hover:-translate-y-1 bg-white/10 hover:bg-white/20 rounded-xl p-4 text-white/90 backdrop-blur-sm border border-white/10 shadow-md hover:shadow-lg"
        >
          <div className="flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-pink-400 group-hover:scale-125 transition" />
            <p className="text-sm sm:text-base">{service}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>


          {/* section for Industries Section  Industries We Serve */}
          <section className="py-16 px-4 bg-black/50 backdrop-blur-sm border-t rounded-2xl border-white/5 mb-16">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center">
                Industries We Serve
              </h2>
              <p className="text-white/70 text-center max-w-3xl mx-auto mb-12">
                Our expertise spans various industries, allowing us to create
                tailored solutions for each sector:
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-white/80">
                {[
                  "Automotive",
                  "Pharma",
                  "Textile",
                  "Food Packaging",
                  "Logistics",
                  "Other Domains",
                ].map((industry, index) => (
                  <li
                    key={index}
                    className=" hover:bg-white/5 hover:border-red-700 transition rounded-lg px-4 py-2 backdrop-blur-sm border border-white/10"
                  >
                    {industry}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* add a section with marquee for client logos */}
          <section className="py-16 w-full mb-16">
            <div className=" mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-10 text-center text-white">
                Our Clients
              </h2>
              <div className="relative overflow-hidden">
                <div className="flex animate-marquee space-x-12 ">
                  {[
                    "/clients/Asset1.png",
                    "/clients/Asset2.png",
                    "/clients/Asset3.png",
                    "/clients/Asset4.png",
                    "/clients/Asset5.png",
                    "/clients/Asset6.png",
                    "/clients/Asset7.png",
                    "/clients/Asset8.png",
                    "/clients/Asset9.png",
                    "/clients/Asset10.png",
                    "/clients/Asset11.png",
                    "/clients/Asset12.png",
                    "/clients/Asset13.png",
                    "/clients/Asset14.png",
                    "/clients/Asset15.png",
                    "/clients/Asset16.png",
                    "/clients/Asset17.png",
                    "/clients/Asset18.png",
                    "/clients/Asset19.png",
                    "/clients/Asset20.png",
                    "/clients/Asset21.png",
                  ].map((logo, index) => (
                    <img
                      key={index}
                      src={logo}
                      alt={`Client ${index + 1}`}
                      className="h-16 w-auto opacity-80 hover:opacity-100 transition"
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* **Featured Projects Section**
   - Heading: “Featured Work”
   - Show 2-3 embedded YouTube videos in cards
   - Each card has: thumbnail, video title, short description */}

          <section className="py-16 px-4 rounded-2xl border-white/5 mb-16">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center">
                Featured Work
              </h2>
              <p className="text-white/70 text-center max-w-3xl mx-auto mb-12">
                Explore our recent projects that showcase our expertise in 3D
                modeling, animation, and immersive content.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    title: "MotionPix India Corporate Video",
                    description:
                      "Our corporate profile.",
                    videoId: "ZIhtzuLkkpk",
                  },
                  {
                    title: "3D Show Reel",
                    description:
                      "Our 3D video show reel",
                    videoId: "ZpkMrCETUyA",
                  },
                ].map((project, index) => (
                  <div
                    key={index}
                    className="bg-white/10 rounded-lg overflow-hidden hover:bg-white/20 hover:border-red-700 transition"
                  >
                    <div className="aspect-video relative">
                      <Image
                        src={`https://img.youtube.com/vi/${project.videoId}/hqdefault.jpg`}
                        alt={project.title}
                        width={1280}
                        height={720}
                        className="object-cover w-full h-full"
                      />
                      <a
                        href={`https://www.youtube.com/watch?v=${project.videoId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute inset-0 flex items-center justify-center bg-black/50 hover:bg-black/70 transition"
                      >
                        <ArrowRight className="h-8 w-8 text-white" />
                      </a>
                    </div>
                    <div className="p-4">
                      <h3 className="text-xl font-semibold mb-2">
                        {project.title}
                      </h3>
                      <p className="text-white/70">{project.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Call to Action */}
              <div className="text-center mt-12">
                  <Link href="/projects" >
                <button className="bg-gradient-to-r from-red-500 to-red-900 hover:from-red-700 hover:to-red-500 px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105">
                    View All Projects
                </button>
                  </Link>
              </div>
            </div>
          </section>

          {/*  **Client Testimonials**
   - Heading: “What Our Clients Say”
   - Quote: “With the same marketing team, we secured significantly more business using branding animations created by Motionpix.” */}

          <section className="py-16 my-16 px-4  border-t rounded-2xl border-white/5">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-8">
                What Our Clients Say
              </h2>
              <blockquote className="text-xl md:text-2xl italic text-white/70 border-l-4 border-red-500 pl-6">
                “With the same marketing team, we secured significantly more
                business using branding animations created by Motionpix.”
              </blockquote>
            </div>
          </section>

          {/* For business section */}
          <section
            ref={businessSectionRef}
            id="contact"
            className="py-16 px-4 border-t border-white/5 scroll-mt-[100px]"
          >
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
                For Business
              </h2>

              <div className="grid md:grid-cols-2 gap-12 mb-16">
                <div>
                  <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <Sparkles className="h-6 w-6 text-red-400" />
                    Contact Information
                  </h3>

                  <div className="space-y-4 text-white/80">
                    <div className="border border-white/10 rounded-xl p-4 bg-white/5 backdrop-blur-sm">
                      <p className="font-semibold">Address:</p>
                      <p>
                        54/A, Rakshalekha Society,
                        <br />
                        Dhanakawadi, Pune 411043
                      </p>
                    </div>

                    <div className="border border-white/10 rounded-xl p-4 bg-white/5 backdrop-blur-sm">
                      <p className="font-semibold">Phone:</p>
                      <p>
                        <a
                          href="tel:+919822055205"
                          className="hover:text-red-400 transition"
                        >
                          +91 9822055205
                        </a>
                      </p>
                    </div>

                    <div className="border border-white/10 rounded-xl p-4 bg-white/5 backdrop-blur-sm">
                      <p className="font-semibold">Email:</p>
                      <p>
                        <a
                          href="mailto:info@motionpixindia.com"
                          className="hover:text-red-400 transition"
                        >
                          info@motionpixindia.com
                        </a>
                      </p>
                    </div>

                    <div className="border border-white/10 rounded-xl p-4 bg-white/5 backdrop-blur-sm">
                      <p className="font-semibold">Website:</p>
                      <p>
                        <a
                          href="https://www.motionpixindia.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-red-400 transition"
                        >
                          www.motionpixindia.com
                        </a>
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="relative">
                    <div className="absolute -inset-px bg-gradient-to-r from-red-500/20 via-red-500/20 to-red-500/20 rounded-2xl blur-md"></div>

                    <div className="relative border border-white/10 rounded-2xl p-6 bg-black/50 backdrop-blur-sm max-w-xl mx-auto">
                      <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <Mail className="h-6 w-6 text-red-400" />
                        Contact Us
                      </h3>
                      <section ref={contactSectionRef} className="scroll-mt-40">
                        <form
                          ref={formRef}
                          onSubmit={handleSubmit}
                          className="space-y-4"
                        >
                          <div>
                            <label
                              className="block text-sm text-white/70 mb-1"
                              htmlFor="name"
                            >
                              Full Name
                            </label>
                            <Input
                              id="name"
                              name="name"
                              required
                              placeholder="Enter your name"
                              className="bg-white/5 border-white/10 rounded-lg focus:border-red-500 focus:ring-red-500 text-white"
                            />
                          </div>

                          <div>
                            <label
                              className="block text-sm text-white/70 mb-1"
                              htmlFor="email"
                            >
                              Email
                            </label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              required
                              placeholder="Enter your email"
                              className="bg-white/5 border-white/10 rounded-lg focus:border-red-500 focus:ring-red-500 text-white"
                            />
                          </div>

                          <div>
                            <label
                              className="block text-sm text-white/70 mb-1"
                              htmlFor="phone"
                            >
                              Phone
                            </label>
                            <Input
                              id="phone"
                              name="phone"
                              type="tel"
                              required
                              placeholder="Enter your phone number"
                              className="bg-white/5 border-white/10 rounded-lg focus:border-red-500 focus:ring-red-500 text-white"
                            />
                          </div>

                          <div>
                            <label
                              className="block text-sm text-white/70 mb-1"
                              htmlFor="message"
                            >
                              Message
                            </label>
                            <Textarea
                              id="message"
                              name="message"
                              rows={4}
                              required
                              placeholder="How can we help you?"
                              className="bg-white/5 border-white/10 rounded-lg focus:border-red-500 focus:ring-red-500 text-white"
                            />
                          </div>

                          <Button
                            type="submit"
                            className="w-full rounded-lg bg-red-600 hover:bg-red-700 h-12"
                            disabled={loading}
                          >
                            {loading ? (
                              <Loader2 className="animate-spin w-5 h-5" />
                            ) : (
                              "Send Message"
                            )}
                          </Button>
                        </form>
                      </section>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </TracingBeam>

        {/* Footer */}
        <footer className="border-t border-white/5 backdrop-blur-md bg-black/30 py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <span className="font-bold">
                {/* add logo */}
                <Image
                  src="/Logo.png"
                  alt="Logo"
                  width={50}
                  height={50}
                  className="inline-block mr-2"
                ></Image>
                Motion<span className="text-red-500">Pix</span> India
              </span>

              <div className="flex gap-6">
                <a
                  href="https://www.facebook.com/profile.php?id=61578380430447"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/50 hover:text-white transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="https://www.instagram.com/motionpixindia/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/50 hover:text-white transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/motionpix-india-615579375/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/50 hover:text-white transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
 href="https://www.youtube.com/channel/UCI0DaU_jECXW-gAsbk7_JGA"
                   target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/50 hover:text-white transition-colors"
                >
                  <Youtube className="w-5 h-5" />
                </a>

              </div>

              <div className="text-white/50 pb-8 lg:pb-0 capitalize">
                © {new Date().getFullYear()} MotionPix cinematix india Pvt. Ltd.
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
