export interface IMovie {
  id: number;
  name: string;
  overview: string;
  poster: string;
  release: Date;
  runtime: number;
  status: string;
  video: string;
  country: string;
  slug: string;
  backdrop: string;
}

export interface IDirector {
  id: number;
  name: string;
  slug: string;
  avatar: string;
  birthday: Date;
  nation: string;
  description: string;
}

export interface IDetailMovie {
  id: number;
  name: string;
  overview: string;
  poster: string;
  release: Date;
  runtime: string;
  status: string;
  backdrop: string;
  video: string;
  country: string;
  genres: { id: number; name: string; slug: string }[];
  directors: IDirector[];
  actors: IDirector[];
}

export interface IFormSignIn {
  email: string;
  password: string;
}

export interface IFormSignUp {
  email: string;
  password: string;
  phone: string;
  fullName: string;
  passwordAgain: string;
  sex: string;
  birthday: string;
}

export interface ICity {
  id: number;
  name: string;
}

export interface ICinema {
  id: number;
  name: string;
  address: string;
  cityId: number;
}

export interface IShowSearch {
  movieId: number;
  date: string;
  cinemaId?: number;
  cityId?: number;
}

interface ISeatSelected {
  id: number;
  ticketPrice: number;
  name: string;
  showId: number;
}
