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
  userPrincipal: UserPrincipal;
  bearer: string;
  token: string;
}

export interface UserPrincipal {
  id: number;
  name: string;
  paternalSurname: string;
  maternalSurname: string;
  image: string;
  roles: string[];
  username: string;
  password: string;
  authorities: string[];
  isAccountNonExpired: boolean;
  isAccountNonLocked: boolean;
  isCredentialsNonExpired: boolean;
  isEnabled: boolean;
}

// export interface UserResponseTwo {
//   userDetails: UserDetails;
//   token: string;
// }
