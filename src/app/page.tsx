// src/app/page.tsx
'use client';

import { useState, useMemo } from 'react';
import { Input } from "@/components/ui/input";
import { StoryCard } from "@/components/StoryCard";
import { stories, categories, StoryCategory } from "@/lib/data";
import { Search } from 'lucide-react';

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<StoryCategory | 'All'>('All');

  const filteredStories = useMemo(() => {
    return stories.filter(story => {
      const matchesCategory = selectedCategory === 'All' || story.category === selectedCategory;
      const matchesSearch = story.title.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, selectedCategory]);

  return (
    // Aplicando a nova paleta vibrante
    <div className="min-h-screen bg-[#FFFDF5] text-[#3D4752]">
      <main className="container mx-auto px-4 py-12 md:py-20">
        <header className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4 text-[#3D4752]">
            Histórias para Sonhar
          </h1>
          <p className="text-lg md:text-xl text-[#8492A6] max-w-2xl mx-auto">
            Explore um universo de fábulas, aventuras e fantasias feitas para acender a imaginação.
          </p>
        </header>

        {/* --- Controles de Filtro com Cores Vivas --- */}
        <div className="flex flex-col md:flex-row gap-6 mb-12 items-center">
          <div className="relative flex-grow w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#8492A6]" />
            <Input
              type="text"
              placeholder="Qual historinha você procura?"
              className="w-full text-base rounded-full pl-12 pr-4 py-6 border-2 border-transparent bg-white shadow-md focus:border-[#00A9B5] focus:ring-2 focus:ring-[#00A9B5]/50"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-3 flex-wrap justify-center">
            <button
              onClick={() => setSelectedCategory('All')}
              className={`px-5 py-2 rounded-full text-sm font-bold transition-transform duration-200 hover:scale-105 ${
                selectedCategory === 'All' ? 'bg-[#00A9B5] text-white shadow-lg' : 'bg-white hover:bg-gray-100 text-[#3D4752] shadow-md'
              }`}
            >
              Todas
            </button>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2 rounded-full text-sm font-bold transition-transform duration-200 hover:scale-105 ${
                  selectedCategory === category ? 'bg-[#00A9B5] text-white shadow-lg' : 'bg-white hover:bg-gray-100 text-[#3D4752] shadow-md'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* --- Grid de Histórias --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
          {filteredStories.map(story => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      </main>
    </div>
  );
}