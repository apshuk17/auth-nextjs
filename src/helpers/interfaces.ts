export interface JWTPayload {
    id: String;
    username: String;
    email: String;
}

export enum EmailType {
   VERIFY = 'VERIFY',
   RESET = 'RESET'
}