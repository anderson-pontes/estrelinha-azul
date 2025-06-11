// src/app/page.tsx

import {
  collection,
  getDocs,
  orderBy,
  query,
  where,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  WithFieldValue,
  DocumentData,
  QueryConstraint,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Story } from '@/lib/data';
import { StoryGrid } from '@/components/StoryGrid';

const storyConverter: FirestoreDataConverter<Story> = {
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): Story {
    const data = snapshot.data(options);
    return {
      id: snapshot.id,
      ...data,
    } as Story;
  },
  toFirestore(story: WithFieldValue<Story>): DocumentData {
    // AQUI ESTÁ A CORREÇÃO:
    // Trocamos 'id' por 'id: _' para sinalizar que o id está sendo
    // intencionalmente ignorado e não utilizado.
    const { id: _, ...data } = story;
    return data;
  },
};

// A função agora aceita um objeto com os filtros
async function getStories({
  category,
  search,
}: {
  category?: string;
  search?: string;
}): Promise<Story[]> {
  const storiesCollection = collection(db, 'stories').withConverter(storyConverter);

  const constraints: QueryConstraint[] = [];

  // Adiciona filtro de categoria, se aplicável
  if (category && category !== 'All') {
    constraints.push(where('category', '==', category));
  }

  // Adiciona filtro de busca por título (simula "começa com")
  if (search) {
    constraints.push(where('title', '>=', search));
    constraints.push(where('title', '<=', search + '\uf8ff'));
  }

  // Adiciona a ordenação padrão por título
  constraints.push(orderBy('title'));

  const q = query(storiesCollection, ...constraints);

  const storiesSnapshot = await getDocs(q);
  const storiesList = storiesSnapshot.docs.map(doc => doc.data());
  return storiesList;
}

// A página agora lê os parâmetros da URL para buscar os dados
export default async function HomePage({
  searchParams,
}: {
  searchParams: { category?: string; search?: string };
}) {
  const category = searchParams.category;
  const search = searchParams.search;

  const stories = await getStories({ category, search });

  return <StoryGrid initialStories={stories} />;
}
