// src/components/Footer.tsx
import { Heart } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-transparent mt-auto">
      <div className="container mx-auto px-4 py-8 border-t border-black/5">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-[#A9A9A9] text-center md:text-left">
            &copy; {currentYear} Histórias para Sonhar. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-2 text-sm text-[#A9A9A9]">
            <span>Feito com</span>
            {/* Coração com a cor de acento Rosa Pêssego */}
            <Heart className="h-5 w-5 text-[#FFC09F] fill-current" />
            <span>para pequenos leitores.</span>
          </div>
          <div className="flex gap-4 text-sm text-[#A9A9A9]">
            <Link href="/termos-de-uso" className="hover:text-[#3E443A] transition-colors">Termos de Uso</Link>
            <Link href="/politica-de-privacidade" className="hover:text-[#3E443A] transition-colors">Privacidade</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}