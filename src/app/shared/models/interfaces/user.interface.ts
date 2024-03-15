export interface User {
  id: number;
  name: string;
  paternalSurname: string;
  maternalSurname: string;
  image: string;
  username: string;
  password: string;
}

// export interface UserFake {
//   id: number;
//   name: string;
//   paternalSurname: string;
//   maternalSurname: string;
//   image: string;
//   username: string;
//   password: string;
// }

export interface UserResponse {
  userDto: User;
  token: string;
}
