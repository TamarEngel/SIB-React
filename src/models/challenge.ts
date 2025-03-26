export type ChallengeType = {
    id: number;
    title: string;
    description: string;
    countCreations: number;
    isDeleted?: boolean;
    createdAt?: Date;
};
