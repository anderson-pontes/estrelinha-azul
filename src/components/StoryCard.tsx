// src/components/StoryCard.tsx

import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Story } from "@/lib/data";

interface StoryCardProps {
  story: Story;
}

export function StoryCard({ story }: StoryCardProps) {
  return (
    // O link agora tem um efeito de sombra e escala mais pronunciado no hover
    <a
      href={story.pdfUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block group" // Adicionamos 'group' para o hover funcionar no card filho
    >
      <Card className="flex flex-col h-full overflow-hidden rounded-2xl bg-white border-2 border-gray-100 shadow-lg transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-2 group-hover:border-[#00A9B5]">
        <CardHeader className="p-0">
          <div className="relative w-full h-52 overflow-hidden">
            {/* Efeito de zoom na imagem ao passar o mouse */}
            <Image
              src={story.coverImage}
              alt={`Capa da história ${story.title}`}
              fill
              style={{ objectFit: "cover" }}
              className="transition-transform duration-300 group-hover:scale-110"
            />
          </div>
        </CardHeader>
        <CardContent className="p-5 flex-grow">
          {/* Badge com a nova cor Laranja Solar e texto branco para contraste */}
          <Badge className="bg-[#FFA41B] text-white font-bold mb-3 border-0 text-xs px-3 py-1">
            {story.category}
          </Badge>
          {/* Textos com as novas cores de alto contraste */}
          <h3 className="text-xl font-bold text-[#3D4752] leading-tight">{story.title}</h3>
          <p className="text-sm text-[#8492A6] mt-2">{story.summary}</p>
        </CardContent>
        <CardFooter className="p-5 pt-2">
          <p className="text-xs text-[#8492A6]">Por: {story.author}</p>
        </CardFooter>
      </Card>
    </a>
  );
}