export enum USER_ROLES{
  DEVELOPER,
  ADMIN,
  COLLABORATOR
}

export interface IUser {
  id: string;
  rol: USER_ROLES;
  authenticationToken: string;
}

export interface IClient {
  id: string;
}
