import { CreationType } from "./creation";

export enum ERole {
    Admin = "Admin",
    User = "User"
}
  
export type UserType =  {
    id: number; // מזהה יחודי
    userId: number; // מזהה משתמש
    name: string; // שם משתמש
    email: string; // אימייל ייחודי
    passwordHash: string; // סיסמה מוצפנת
    role: ERole; // תפקיד המשתמש
    createdAt: string; // תאריך הצטרפות (נשמור כ-ISO string)
    isDeleted: boolean; // סטטוס מחיקה
    userCreationList: CreationType[]; // רשימת היצירות של המשתמש
}