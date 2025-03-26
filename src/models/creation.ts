export type CreationType = {
    id?: number; // מזהה יצירה
    fileName: string; // שם הקובץ
    fileType: string; // סוג הקובץ
    userId: number; // מזהה המשתמש היוצר
    challengeId: number; // מזהה האתגר אליו שייכת היצירה
    imageUrl: string; // קישור לתמונה
    votes?: number; // כמות הצבעות
    createdAt?: Date; // תאריך יצירה (כמובן שיכול להיות גם מסוג Date, תלוי בשימוש שלך)
    isDeleted?: boolean; // האם היצירה נמחקה
};
