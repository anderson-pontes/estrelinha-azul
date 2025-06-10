// src/lib/data.ts

export type StoryCategory = "Aventura" | "Fábula" | "Fantasia" | "Animais";

export type Story = {
  id: number;
  title: string;
  category: StoryCategory;
  author: string;
  // Adicione um campo para a imagem de capa da história
  coverImage: string;
  // Um pequeno resumo que aparecerá no card
  summary: string;
  pdfUrl: string; 
};

// Dados de exemplo (mock data) para começarmos
export const stories: Story[] = [
  {
    id: 1,
    title: "O Leão e o Ratinho",
    category: "Fábula",
    author: "Esopo",
    coverImage: "/images/image1.jpg", // Exemplo de caminho
    summary: "Uma lição sobre como os pequenos gestos podem ter grandes impactos.",
    pdfUrl: "/pdfs/O-leão-e-o-rato.pdf"

  },
  {
    id: 2,
    title: "A Aventura na Floresta Encantada",
    category: "Aventura",
    author: "Ana Clara",
    coverImage: "/images/image2.jpg",
    summary: "Dois irmãos descobrem um portal mágico no quintal de casa.",
    pdfUrl: "/pdfs/O-leão-e-o-rato.pdf"
  },
  {
    id: 3,
    title: "O Dragão que não Sabia Voar",
    category: "Fantasia",
    author: "Pedro Lucas",
    coverImage: "/images/image3.jpg",
    summary: "Um jovem dragão precisa da ajuda de seus amigos para aprender a voar.",
    pdfUrl: "/pdfs/O-leão-e-o-rato.pdf"
  },
  {
    id: 4,
    title: "Os Três Porquinhos Músicos",
    category: "Animais",
    author: "Carlos Eduardo",
    coverImage: "/images/image4.jpg",
    summary: "Uma releitura musical do clássico conto dos três porquinhos.",
    pdfUrl: "/pdfs/O-leão-e-o-rato.pdf"
  },
  {
    id: 5,
    title: "A Tartaruga Veloz",
    category: "Fábula",
    author: "Esopo",
    coverImage: "/images/image1.jpg",
    summary: "Uma tartaruga que, com sua inteligência, vence uma corrida.", 
    pdfUrl: "/pdfs/O-leão-e-o-rato.pdf"
  },
];

export const categories: StoryCategory[] = ["Aventura", "Fábula", "Fantasia", "Animais"];