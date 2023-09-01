export interface Review {
  id: string;
  user: string;
  title: string;
  description: string;
  img: string;
  pizzeria: string;
  city: string;
  stars: number;
  created: Date;
}
