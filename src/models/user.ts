import { CreationType } from "./creation";

export enum ERole {
    Admin = "Admin",
    User = "User"
}
  
export type UserType =  {
    id: number; 
    userId: number; 
    name: string; 
    email: string; 
    passwordHash: string; 
    role: ERole;
    createdAt: string; 
    isDeleted: boolean; 
    userCreationList: CreationType[]; 
}