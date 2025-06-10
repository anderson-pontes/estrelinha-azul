// src/components/Header.tsx
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Sparkles } from 'lucide-react'; // Ícones

export function Header() {
  const menuItems = [
    { label: 'Histórias', href: '/' },
    { label: 'Sobre', href: '/sobre' },
    { label: 'Informações', href: '/informacoes' },
  ];

  return (
    <header className="bg-white/80 backdrop-blur-sm sticky top-0 z-50 w-full border-b border-gray-200/60">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        {/* --- Logo --- */}
        <Link href="/" className="flex items-center gap-2">
          <Sparkles className="h-7 w-7 text-[#00A9B5]" />
          <span className="text-xl font-bold text-[#3D4752]">
            Histórias para Sonhar
          </span>
        </Link>

        {/* --- Navegação para Desktop --- */}
        <nav className="hidden md:flex items-center gap-6">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-md font-semibold text-[#3D4752] hover:text-[#00A9B5] transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* --- Menu para Celular (Sheet) --- */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Abrir menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-6 pt-10">
                {menuItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="text-xl font-semibold text-[#3D4752] hover:text-[#00A9B5] transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}