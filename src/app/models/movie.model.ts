// src/app/models/movie.model.ts

import { Thumbnail } from './thumbnail.model';

export interface Movie {
  title: string; 
  thumbnail: Thumbnail; 
  year: number; 
  category: string; 
  rating: string; 
  isBookmarked: boolean; 
  isTrending: boolean; 
  // description:string
}
