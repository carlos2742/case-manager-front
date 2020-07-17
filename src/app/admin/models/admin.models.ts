export enum USER_ROLES{
  DEVELOPER,
  ADMIN,
  COLLABORATOR
}

export interface IUser {
  id: string;
  rol: USER_ROLES;
}

export interface IClient {
  id: string;
}
