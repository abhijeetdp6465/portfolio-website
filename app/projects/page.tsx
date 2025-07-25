"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play, Calendar, Tag, ExternalLink, Filter, Search, Grid, List } from 'lucide-react';

const AllProjectsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
    const isUnderMaintenance = true;

    if (isUnderMaintenance) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white text-center px-4">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-red-500">
            🚧 Page Under Maintenance
          </h1>
          <p className="text-white/70 text-lg md:text-xl">
            We're currently updating this page. Please check back later.
          </p>

          <Button className="mt-6" variant="default" size="lg">
            <Link href="/" className="text-red-500 ">
              Go back to homepage
            </Link>
          </Button>
        </div>
      </div>
    );
  }


  const projects = [
    {
      id: 1,
      title: "Industrial Plant Animation",
      description: "A detailed 3D animation of a manufacturing plant showcasing complex machinery and production processes.",
      fullDescription: "This comprehensive 3D animation project brings an entire manufacturing facility to life, featuring detailed machinery animations, realistic lighting, and smooth camera movements that guide viewers through the production process.",
      category: "Animation",
      date: "2024-12",
      duration: "3:45",
      image: "https://images.unsplash.com/photo-1565043666747-69f6646db940?w=800&h=450&fit=crop",
      videoId: "dQw4w9WgXcQ",
      tags: ["3D Animation", "Industrial", "Machinery", "Visualization"],
      client: "ManufacCorp Industries"
    },
    {
      id: 2,
      title: "Cinematic Product Showcase",
      description: "A cinematic video showcasing a new product launch with dramatic lighting and smooth transitions.",
      fullDescription: "Created for a major product launch, this cinematic showcase combines photorealistic rendering with dynamic camera work and atmospheric lighting to highlight key product features and create emotional connection with viewers.",
      category: "Product Visualization",
      date: "2024-11",
      duration: "2:30",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=450&fit=crop",
      videoId: "eYq7WapuDLU",
      tags: ["Product Design", "Cinematic", "Lighting", "Commercial"],
      client: "TechFlow Solutions"
    },
    {
      id: 3,
      title: "Augmented Reality Experience",
      description: "An AR experience for an automotive exhibition featuring interactive 3D models.",
      fullDescription: "This cutting-edge AR application allows exhibition visitors to interact with detailed 3D car models, explore interior features, and customize configurations in real-time using mobile devices.",
      category: "AR/VR",
      date: "2024-10",
      duration: "Interactive",
      image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&h=450&fit=crop",
      videoId: "tgbNymZ7vqY",
      tags: ["Augmented Reality", "Automotive", "Interactive", "Mobile"],
      client: "AutoExpo International"
    },
    {
      id: 4,
      title: "Architectural Walkthrough",
      description: "Virtual tour of a luxury residential complex with photorealistic rendering.",
      fullDescription: "A stunning architectural visualization that takes viewers on a comprehensive tour through a luxury residential development, featuring accurate lighting, materials, and landscaping.",
      category: "Architecture",
      date: "2024-09",
      duration: "4:20",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=450&fit=crop",
      videoId: "9bZkp7q19f0",
      tags: ["Architecture", "Real Estate", "Walkthrough", "Luxury"],
      client: "Premier Properties"
    },
    {
      id: 5,
      title: "Medical Device Animation",
      description: "Educational animation explaining complex medical device functionality.",
      fullDescription: "A detailed medical animation that breaks down complex surgical procedures and device functionality for educational and marketing purposes, featuring accurate anatomical models and clear visual explanations.",
      category: "Medical",
      date: "2024-08",
      duration: "5:15",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=450&fit=crop",
      videoId: "2vjPBrBU-TM",
      tags: ["Medical", "Education", "Healthcare", "Scientific"],
      client: "MedTech Innovations"
    },
    {
      id: 6,
      title: "Gaming Environment Showcase",
      description: "Immersive 3D environments designed for next-generation gaming experiences.",
      fullDescription: "A collection of highly detailed gaming environments featuring advanced lighting systems, particle effects, and interactive elements designed for AAA gaming experiences.",
      category: "Gaming",
      date: "2024-07",
      duration: "6:30",
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=450&fit=crop",
      videoId: "kJQP7kiw5Fk",
      tags: ["Gaming", "Environment", "Real-time", "Interactive"],
      client: "GameStudio Pro"
    },
    {
      id: 7,
      title: "Corporate Brand Animation",
      description: "Dynamic brand animation for corporate identity and marketing campaigns.",
      fullDescription: "A comprehensive brand animation package including logo reveals, corporate presentations, and marketing materials that strengthen brand identity through motion graphics and 3D elements.",
      category: "Branding",
      date: "2024-06",
      duration: "1:45",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=450&fit=crop",
      videoId: "L_jWHffIx5E",
      tags: ["Branding", "Corporate", "Motion Graphics", "Marketing"],
      client: "Global Enterprises Ltd"
    },
    {
      id: 8,
      title: "Scientific Visualization",
      description: "Complex molecular structures and scientific processes brought to life through 3D animation.",
      fullDescription: "Advanced scientific visualization showcasing molecular interactions, chemical processes, and biological systems with accurate scientific data and engaging visual storytelling.",
      category: "Scientific",
      date: "2024-05",
      duration: "4:10",
      image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&h=450&fit=crop",
      videoId: "fJ9rUzIMcZQ",
      tags: ["Scientific", "Molecular", "Research", "Educational"],
      client: "Research Institute"
    }
  ];

  const categories = ['All', 'Animation', 'Product Visualization', 'AR/VR', 'Architecture', 'Medical', 'Gaming', 'Branding', 'Scientific'];

  const filteredProjects = projects.filter(project => {
    const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const ProjectCard = ({ project, isListView = false }) => (
    <div className={`bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden hover:bg-white/20 transition-all duration-300 transform hover:scale-[1.02] border border-white/10 ${isListView ? 'flex' : ''}`}>
      <div className={`relative ${isListView ? 'w-80 flex-shrink-0' : 'aspect-video'}`}>
        <img
          src={project.image}
          alt={project.title}
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <a
          href={`https://www.youtube.com/watch?v=${project.videoId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0 flex items-center justify-center bg-black/50 hover:bg-black/70 transition group"
        >
          <Play className="h-12 w-12 text-white group-hover:scale-110 transition" />
        </a>
        <div className="absolute top-4 left-4">
          <span className="bg-red-600/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
            {project.category}
          </span>
        </div>
        <div className="absolute bottom-4 right-4">
          <span className="bg-black/80 backdrop-blur-sm px-2 py-1 rounded text-sm">
            {project.duration}
          </span>
        </div>
      </div>
      
      <div className={`p-6 ${isListView ? 'flex-1' : ''}`}>
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">{project.title}</h3>
          <ExternalLink className="h-5 w-5 text-white/60 hover:text-white transition flex-shrink-0 ml-2" />
        </div>
        
        <p className="text-white/70 mb-4 line-clamp-3">
          {isListView ? project.fullDescription : project.description}
        </p>
        
        <div className="flex items-center gap-4 text-sm text-white/60 mb-4">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            {new Date(project.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
          </div>
          <div className="text-white/40">•</div>
          <div>{project.client}</div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag, index) => (
            <span key={index} className="bg-white/10 px-2 py-1 rounded-md text-xs text-white/80">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    

  // give alert message for this page is under construction
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="relative overflow-hidden py-20 px-4">
        <div className="absolute inset-0 bg-black" />
        <div className="relative max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-red-400 to-purple-400 bg-clip-text text-transparent">
            All Projects
          </h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Explore our complete portfolio of 3D animations, visualizations, and immersive experiences
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="max-w-6xl mx-auto px-4 mb-8">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">

            {/* Category Filter */}
            <div className="flex items-center gap-2 flex-wrap">
              <Filter className="h-5 w-5 text-white/60" />
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg transition ${
                    selectedCategory === category
                      ? 'bg-red-600 text-white'
                      : 'bg-white/10 text-white/70 hover:bg-white/20'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-2 bg-white/10 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded transition ${
                  viewMode === 'grid' ? 'bg-red-600 text-white' : 'text-white/60 hover:text-white'
                }`}
              >
                <Grid className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded transition ${
                  viewMode === 'list' ? 'bg-red-600 text-white' : 'text-white/60 hover:text-white'
                }`}
              >
                <List className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Projects Grid/List */}
      <div className="max-w-6xl mx-auto px-4 pb-16">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            {filteredProjects.length} Project{filteredProjects.length !== 1 ? 's' : ''}
            {selectedCategory !== 'All' && ` in ${selectedCategory}`}
          </h2>
        </div>

        {filteredProjects.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-white/40 mb-4">
              <Tag className="h-16 w-16 mx-auto mb-4" />
              <p className="text-xl">No projects found</p>
              <p className="text-white/60">Try adjusting your search or filter criteria</p>
            </div>
          </div>
        ) : (
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' : 'space-y-6'}>
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} isListView={viewMode === 'list'} />
            ))}
          </div>
        )}
      </div>

      {/* Call to Action */}

    </div>
  );
};

export default AllProjectsPage;