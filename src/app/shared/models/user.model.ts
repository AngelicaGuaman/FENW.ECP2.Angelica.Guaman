export class User {
  constructor(username: string, email: string, password: string, repeatPassword: string, birthdate: number) {
  }

  username: string;
  email: string;
  password: string;
  repeatPassword: string;
  birthdate?: number;
}
