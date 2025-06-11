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

interface HomePageProps {
  searchParams: {
    category?: string;
    search?: string;
  };
}

interface GetStoriesParams {
  category?: string;
  search?: string;
}

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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...data } = story;
    return data;
  },
};

async function getStories({ category, search }: GetStoriesParams): Promise<Story[]> {
  try {
    const storiesCollection = collection(db, 'stories').withConverter(storyConverter);
    const constraints: QueryConstraint[] = [orderBy('title')];

    if (category && category !== 'All') {
      constraints.push(where('category', '==', category));
    }

    if (search) {
      constraints.push(where('title', '>=', search));
      constraints.push(where('title', '<=', search + '\uf8ff'));
    }

    const q = query(storiesCollection, ...constraints);
    const storiesSnapshot = await getDocs(q);
    
    return storiesSnapshot.docs.map(doc => doc.data());
  } catch (error) {
    console.error('Error fetching stories:', error);
    return [];
  }
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const stories = await getStories({
    category: searchParams.category,
    search: searchParams.search
  });

  return <StoryGrid initialStories={stories} />;
}