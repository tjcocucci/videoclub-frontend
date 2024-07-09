export interface Genre {
  id?: number;
  name: string;
}

export interface Book {
  id: number;
  isbn: string;
  title: string;
  author: string;
  stock: number;
  price: number;
  genres: Genre[];
}

export interface UpdateBookRequest {
  id: number;
  title?: string;
  isbn?: string;
  author?: string;
  stock?: number;
  price?: number;
  genres?: Genre[];
}

export interface AddBookRequest {
  title: string;
  isbn?: string;
  author: string;
  stock?: number;
  price?: number;
  genres?: Genre[];
}
