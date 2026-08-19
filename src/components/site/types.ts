export type LookItem = {
  id: string;
  name: string;
  category: string;
  year: string;
  note: string;
  image: string | null;
};

export type PostItem = {
  id: string;
  caption: string;
  image: string | null;
};

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};
