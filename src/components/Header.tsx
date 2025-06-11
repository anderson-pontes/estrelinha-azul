// src/components/Header.tsx
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Sparkles } from 'lucide-react';

export function Header() {
  const menuItems = [
    { label: 'Histórias', href: '/' },
    { label: 'Sobre', href: '/sobre' },
    { label: 'Informações', href: '/informacoes' },
  ];

  return (
    <header className="bg-[#F7F7F2]/80 backdrop-blur-sm sticky top-0 z-50 w-full border-b border-black/5">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        {/* Logo com as novas cores */}
        <Link href="/" className="flex items-center gap-2">
          <Sparkles className="h-7 w-7 text-[#84A98C]" />
          <span className="text-xl font-bold text-[#3E443A]">
            Histórias para Sonhar
          </span>
        </Link>

        {/* Navegação de Desktop com as novas cores */}
        <nav className="hidden md:flex items-center gap-6">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-md font-semibold text-[#3E443A] hover:text-[#84A98C] transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Menu de Celular */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="bg-transparent border-gray-300">
                <Menu className="h-6 w-6 text-[#3E443A]" />
                <span className="sr-only">Abrir menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-[#F7F7F2]">
              <div className="flex flex-col gap-6 pt-10">
                {menuItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="text-xl font-semibold text-[#3E443A] hover:text-[#84A98C] transition-colors"
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