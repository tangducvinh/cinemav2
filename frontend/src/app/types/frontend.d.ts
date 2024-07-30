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
}

export interface IFormSignIn {
  email: string;
  password: string;
}

export interface IFormSignUp {
  email: string;
  password: string;
  phone: string;
}
