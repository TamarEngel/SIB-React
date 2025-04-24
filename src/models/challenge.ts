export type ChallengeType = {
    id: number;
    title: string;
    description: string;
    countCreations: number;
    endDate: Date;
    isDeleted?: boolean;
    createdAt?: Date;
};
