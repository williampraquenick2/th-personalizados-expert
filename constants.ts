
import { Category, Product } from './types';

export const STORE_NAME = 'TH Personalizados';
export const STORE_SUBTITLE = 'PAPELARIA FOFA / PERSONALIZADA';
export const INSTAGRAM_LINK = 'https://www.instagram.com/thpersonalizados/';
export const WHATSAPP_LINK = 'https://api.whatsapp.com/send/?phone=5582993862545&text&type=phone_number&app_absent=0&utm_source=ig';
export const VIMEO_VIDEO_ID = '1151253348';

export const PRODUCTS: Product[] = [
  // CANECAS
  { id: 1, name: 'Caneca Coleção Especial 01', price: 20.0, image: 'https://i.imgur.com/IlXDZ2Y.png', category: Category.CANECAS },
  { id: 2, name: 'Caneca Coleção Especial 02', price: 20.0, image: 'https://i.imgur.com/DgBSn61.png', category: Category.CANECAS },
  { id: 3, name: 'Caneca Coleção Especial 03', price: 20.0, image: 'https://i.imgur.com/2x6EaqV.png', category: Category.CANECAS },
  { id: 19, name: 'Caneca Coleção Especial 04', price: 20.0, image: 'https://i.imgur.com/IlXDZ2Y.png', category: Category.CANECAS },
  
  // CANETAS
  { id: 4, name: 'Caneta Fofa Personagens 01', price: 20.0, image: 'https://i.imgur.com/XxQzIjN.png', category: Category.CANETAS },
  { id: 5, name: 'Caneta Fofa Personagens 02', price: 20.0, image: 'https://i.imgur.com/b7X0q9e.png', category: Category.CANETAS },
  { id: 6, name: 'Caneta Fofa Personagens 03', price: 20.0, image: 'https://i.imgur.com/8t0S7hp.png', category: Category.CANETAS },
  { id: 7, name: 'Caneta Fofa Personagens 04', price: 20.0, image: 'https://i.imgur.com/Yg4HlJL.png', category: Category.CANETAS },

  // CADERNOS
  { id: 8, name: 'Caderno Temático 01', price: 20.0, image: 'https://i.imgur.com/cp80Fc1.png', category: Category.CADERNOS },
  { id: 9, name: 'Caderno Temático 02', price: 20.0, image: 'https://i.imgur.com/eC49u1Y.png', category: Category.CADERNOS },
  { id: 10, name: 'Caderno Temático 03', price: 20.0, image: 'https://i.imgur.com/QYqhGiR.png', category: Category.CADERNOS },

  // PERSONALIZADOS
  { id: 11, name: 'Personalizado Exclusivo 01', price: 20.0, image: 'https://i.imgur.com/B64Ka1o.png', category: Category.PERSONALIZADOS },
  { id: 12, name: 'Personalizado Exclusivo 02', price: 20.0, image: 'https://i.imgur.com/VZHvT9K.png', category: Category.PERSONALIZADOS },
  { id: 13, name: 'Personalizado Exclusivo 03', price: 20.0, image: 'https://i.imgur.com/LYcSVuU.png', category: Category.PERSONALIZADOS },
  { id: 14, name: 'Personalizado Exclusivo 04', price: 20.0, image: 'https://i.imgur.com/VcT2jTu.png', category: Category.PERSONALIZADOS },
  { id: 15, name: 'Personalizado Exclusivo 05', price: 20.0, image: 'https://i.imgur.com/uB6oV0m.png', category: Category.PERSONALIZADOS },
  { id: 16, name: 'Personalizado Exclusivo 06', price: 20.0, image: 'https://i.imgur.com/jPzh0HT.png', category: Category.PERSONALIZADOS },
  { id: 17, name: 'Personalizado Exclusivo 07', price: 20.0, image: 'https://i.imgur.com/zZcBegi.png', category: Category.PERSONALIZADOS },
  { id: 18, name: 'Personalizado Exclusivo 08', price: 20.0, image: 'https://i.imgur.com/CHtQO0M.png', category: Category.PERSONALIZADOS },
];

export const SPECIAL_OFFER_PRODUCT = {
  id: 999,
  name: 'Lápis de Cor Redondo 24 Cores Faber-Castell',
  price: 27.90,
  image: 'https://i.imgur.com/Go960vL.png',
  originalPrice: 41.00
};
