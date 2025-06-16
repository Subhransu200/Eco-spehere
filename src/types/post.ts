
export interface User {
  name: string;
  avatar: string;
}

export interface Post {
  id: number;
  user: User;
  community: string;
  date: string;
  content: string;
  image?: string | null;
  likes: number;
  comments: number;
  shares: number;
}

export interface GreenProductAd {
  id: number;
  title: string;
  description: string;
  image: string;
  price: string;
  link: string;
}
