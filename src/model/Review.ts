export interface Review {
  id: string;
  user: string;
  title: string;
  description: string;
  img: string;
  adviced: boolean;
  pizzeria: string;
  city_id: string;
  stars: number;
  created: Date;
}
