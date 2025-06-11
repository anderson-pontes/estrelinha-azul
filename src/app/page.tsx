
import {
  collection,
  getDocs,
  orderBy,
  query,
  where, // Importe o 'where' para criar filtros
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  WithFieldValue,
  DocumentData,
  QueryConstraint, // Importe o tipo para os modificadores
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Story } from '@/lib/data';
import { StoryGrid } from '@/components/StoryGrid'; // Precisaremos do componente de cliente

const storyConverter: FirestoreDataConverter<Story> = {
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): Story {
    const data = snapshot.data(options);
    // Um pequeno ajuste para garantir a tipagem correta
    return {
      id: snapshot.id,
      ...data,
    } as Story;
  },
  toFirestore(story: WithFieldValue<Story>): DocumentData {
    const { id, ...data } = story;
    return data;
  },
};

// MUDANÇA 1: A função agora aceita um objeto com os filtros
async function getStories({
  category,
  search,
}: {
  category?: string;
  search?: string;
}): Promise<Story[]> {
  const storiesCollection = collection(db, 'stories').withConverter(storyConverter);

  // MUDANÇA 2: Construímos a query dinamicamente
  const constraints: QueryConstraint[] = [];

  // Adiciona filtro de categoria, se aplicável
  if (category && category !== 'All') {
    constraints.push(where('category', '==', category));
  }

  // Adiciona filtro de busca por título (simula "começa com")
  if (search) {
    // Esta combinação encontra documentos cujo 'title' começa com o termo da busca
    constraints.push(where('title', '>=', search));
    constraints.push(where('title', '<=', search + '\uf8ff'));
  }

  // Adiciona a ordenação padrão por título
  constraints.push(orderBy('title'));

  // Usa o array de 'constraints' para montar a query final
  const q = query(storiesCollection, ...constraints);

  const storiesSnapshot = await getDocs(q);
  const storiesList = storiesSnapshot.docs.map(doc => doc.data());
  return storiesList;
}

// MUDANÇA 3: A página agora lê os parâmetros da URL para buscar os dados
export default async function HomePage({
  searchParams,
}: {
  searchParams: { category?: string; search?: string };
}) {
  const category = searchParams.category;
  const search = searchParams.search;

  // Chama a função de busca passando os filtros da URL
  const stories = await getStories({ category, search });

  // Passa as histórias já filtradas para o componente de cliente
  return <StoryGrid initialStories={stories} />;
}