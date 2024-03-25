export interface User {
  id: number;
  name: string;
  paternalSurname: string;
  maternalSurname: string;
  image: string;
  username: string;
  password: string;
}

export interface UserBasic {
  id: number;
  name: string;
  paternalSurname: string;
  maternalSurname: string;
  image: string;
}

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
  lists: UserListDto[];
  username: string;
  password: string;
  authorities: string[];
  isAccountNonExpired: boolean;
  isAccountNonLocked: boolean;
  isCredentialsNonExpired: boolean;
  isEnabled: boolean;
}

export interface UserListRequest {
  userId: number;
  listName: string;
}

export interface ListUser {
  userId: number;
  lists: ListUserTalent[];
}

export interface ListUserTalent {
  id: number;
  name: string;
  talentIds: number[];
}

export interface UserTalentListRequest {
  id: number | null;
  listId: number;
  talentId: number;
}


export interface UserListDto {
  id: number;
  talent: TalentIdDto;
}

export interface TalentIdDto {
  id: number;
}
