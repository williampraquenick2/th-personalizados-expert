
export enum Category {
  CANECAS = 'CANECAS',
  CANETAS = 'CANETAS',
  PERSONALIZADOS = 'PERSONALIZADOS',
  CADERNOS = 'CADERNOS'
}

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: Category;
}

export interface CartItem extends Product {
  quantity: number;
}
