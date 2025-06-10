// src/components/Footer.tsx
import { Heart } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white/50 border-t border-gray-200/60 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-[#8492A6] text-center md:text-left">
            &copy; {currentYear} Histórias para Sonhar. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-2 text-sm text-[#8492A6]">
            <span>Feito com</span>
            <Heart className="h-5 w-5 text-red-500 fill-current" />
            <span>para pequenos leitores.</span>
          </div>
          <div className="flex gap-4 text-sm text-[#8492A6]">
            <Link href="/termos-de-uso" className="hover:text-[#3D4752]">Termos de Uso</Link>
            <Link href="/politica-de-privacidade" className="hover:text-[#3D4752]">Privacidade</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}