export enum RoleType {
  NEW_USER = 'NEW_USER',
  USER = 'USER',
  DOCTOR = 'DOCTOR',
  ADMIN = 'ADMIN',
}

export enum AuthMethod {
  EMAIL_AND_PASSWORD = 'EMAIL_AND_PASSWORD',
  GOOGLE = 'GOOGLE',
}

export enum AdminPermission {
  UPDATE_USER = 'UPDATE_USER',
  GET_USER = 'GET_USER',
  PAYOUT = 'PAYOUT',
  VIEW_APPOINTEMENTS = 'VIEW_APPOINTEMENTS',
}
