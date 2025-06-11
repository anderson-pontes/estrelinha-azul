// src/components/StoryCard.tsx

import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Story } from "@/lib/data";

interface StoryCardProps {
  story: Story;
}

export function StoryCard({ story }: StoryCardProps) {
 return (
    <a
      href={story.pdfUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block group perspective-1000"
    >
      <Card 
        className="
          flex flex-col h-full bg-white rounded-xl overflow-visible 
          transition-all duration-500 ease-in-out transform-style-3d group-hover:rotate-y-4
          shadow-lg hover:shadow-2xl
        "
      >
        <CardHeader className="p-0 z-10">
          <div className="relative w-full h-56 mx-auto -mt-8 rounded-lg overflow-hidden shadow-xl">
            <Image
              src={story.coverImage}
              alt={`Capa da história ${story.title}`}
              fill
              style={{ objectFit: "cover" }}
              className="transition-transform duration-500 ease-in-out group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </CardHeader>
        
        <CardContent className="p-6 pt-8 flex-grow relative">
          {/* Marcador de Página com a cor Rosa Pêssego */}
          <div 
            className="
              absolute top-0 right-5 bg-[#FFC09F] text-[#3E443A] 
              font-bold text-xs px-3 py-4 rounded-b-md shadow-md
              transition-all duration-300 ease-in-out group-hover:top-[-4px] group-hover:py-5
              [clip-path:polygon(0_0,100%_0,100%_100%,50%_85%,0_100%)]
            "
          >
            {story.category}
          </div>
          
          {/* Textos com as novas cores */}
          <h3 className="text-2xl font-bold text-[#3E443A] leading-tight mt-2">
            {story.title}
          </h3>
          <p className="text-sm text-[#A9A9A9] mt-3">{story.summary}</p>
        </CardContent>

        <CardFooter className="p-6 pt-0 border-t-2 border-dashed border-gray-200 mt-4">
          <p className="text-xs text-[#A9A9A9] w-full">
            Por: <span className="font-bold text-[#3E443A]">{story.author}</span>
          </p>
        </CardFooter>
      </Card>
    </a>
  );
}