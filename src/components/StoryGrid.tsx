'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Input } from "@/components/ui/input";
import { StoryCard } from "@/components/StoryCard";
import { Story, categories, StoryCategory } from "@/lib/data";
import { Search } from 'lucide-react';

interface StoryGridProps {
  initialStories: Story[];
}

export function StoryGrid({ initialStories }: StoryGridProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();


  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState<StoryCategory | 'All'>(
    (searchParams.get('category') as StoryCategory) || 'All'
  );

  
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    const timeoutId = setTimeout(() => {
      if (searchTerm) {
        params.set('search', searchTerm);
      } else {
        params.delete('search');
      }
    
      router.push(`${pathname}?${params.toString()}`);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, pathname, router, searchParams]);


  const handleCategoryChange = (category: StoryCategory | 'All') => {
    setSelectedCategory(category);
    const params = new URLSearchParams(searchParams.toString());
    if (category !== 'All') {
      params.set('category', category);
    } else {
      params.delete('category');
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <main className="container mx-auto px-4 py-12 md:py-20">
      {/* ... (código do header da página) ... */}
      
      <div className="flex flex-col md:flex-row gap-6 mb-12 items-center">
        {/* Input de busca */}
        <div className="relative flex-grow w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Qual historinha você procura?"
            className="w-full text-base rounded-full pl-12 pr-4 py-6 border-2 bg-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {/* Botões de categoria */}
        <div className="flex items-center gap-3 flex-wrap justify-center">
          <button onClick={() => handleCategoryChange('All')} /* ... (classes de estilo) ... */>Todas</button>
          {categories.map(category => (
            <button key={category} onClick={() => handleCategoryChange(category)} /* ... (classes de estilo) ... */>
              {category}
            </button>
          ))}
        </div>
      </div>
      
      {/* Grid que apenas exibe os resultados vindos do servidor */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
        {initialStories.map(story => (
          <StoryCard key={story.id} story={story} />
        ))}
        {initialStories.length === 0 && (
          <p className="col-span-full text-center text-gray-500">Nenhuma historinha encontrada com esses filtros.</p>
        )}
      </div>
    </main>
  );
}