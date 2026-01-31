export interface Car {
  id: number;
  name: string;
  production_start: string | null;
  production_end: string | null;
  image_url?: string | null;
  tags?: string[];
  models?: any[];
  description?: string | null;
  engine?: string | null;
  fuel_type?: string | null;
  country?: string | null;
  category?: string | null;
}
