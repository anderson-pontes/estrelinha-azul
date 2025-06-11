export type StoryCategory = "Ficção" | "Fábula" | "Fantasia" | "Animais";

export type Story = {
  id: string;
  title: string;
  category: StoryCategory;
  author: string;
  coverImage: string;
  summary: string;
  pdfUrl: string; 
};



export const categories: StoryCategory[] = ["Ficção", "Fábula", "Fantasia", "Animais"];