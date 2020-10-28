export enum USER_ROLES{
  DEVELOPER,
  ADMIN,
  COLLABORATOR
}

export enum USER_TITLES{
  ATTORNEY,
  PARALEGAL,
  STAFF
}

export enum CASE_STAGES{
  DISCOVERY,
  IN_TRIAL,
  ON_HOLD
}

export enum PRACTICE_AREAS{
  INJURIES,
  IMMIGRATION,
  FAMILY,
  WILLS,
  FORECLOSURE
}

export enum BILLING_METHODS{
  HOURLY,
  CONTINGENCY,
  FLAT_FEE,
  PRO_BONO,
  FLAT_FEE_HOURLY
}

export enum DIALOG_ACTION_TYPE{
  CREATE,
  EDIT,
  REMOVE
}

export interface IUser {
  id: string;
  rol: USER_ROLES;
  name: string;
  authenticationToken: string;
}

export interface IClient {
  id: string;
  firstName: string;
  lastName: string;
}

export interface ICase {
  id: string;
  name?: string;
  number?: string;
}
