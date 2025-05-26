export type CreationType = {
    id?: number; 
    fileName: string; 
    fileType: string; 
    userId: number; 
    challengeId: number;
    imageUrl: string; 
    votes?: number; 
    createdAt?: Date; 
    isDeleted?: boolean;
};
