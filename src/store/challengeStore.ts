import { makeAutoObservable, action } from "mobx";
import axios from "axios";
import { ChallengeType } from "../models/challenge";
const apiUrl=import.meta.env.VITE_APP_API_URL ;   
class ChallengeStore {
    challenges: ChallengeType[] = [];
    sortChallenges:ChallengeType[] = [];
    activeChallenges: ChallengeType[] = [];
    notActiveChallenges: ChallengeType[] = [];

    constructor() {
        makeAutoObservable(this);
        this.fetchChallenges();
        this.fetchActiveChallenges();
        this.fetchNotActiveChallenges();
        this.fetchSortedChallenges();
    }

    fetchChallenges = action(async () => {
        try {
            const res = await axios.get(`${apiUrl}/api/challenge`);
            this.challenges = res.data;
        } catch (e) {
            console.error("Error fetching challenges:", e);
        }
    });

    fetchActiveChallenges = action(async () => {
        try {
            const res = await axios.get(`${apiUrl}/api/challenge/active`);
            this.activeChallenges = res.data;
        } catch (e) {
            console.error("Error fetching active challenges:", e);
        }
    });

    fetchNotActiveChallenges = action(async () => {
        try {
            const res = await axios.get(`${apiUrl}/api/Challenge/notActive`);
            this.notActiveChallenges = res.data;
        } catch (e) {
            console.error("Error fetching not active challenges:", e);
        }
    });

    fetchChallengeById = action(async (id: number) => {
        try {
            const res = await axios.get(`${apiUrl}/api/challenge/${id}`);
            return res.data;
        } catch (e) {
            console.error("Error fetching challenge by ID:", e);
        }
    });

    fetchSortedChallenges = action(async () => {
        try {
            const res = await axios.get(`${apiUrl}/api/challenge/sort`);
            this.sortChallenges = res.data;
        } catch (e) {
            console.error("Error fetching sorted challenges:", e);
        }
    });
    

    getSortedCreationsByChallenge = action(async (challengeId: number) => {
        try {
            const res = await axios.get(`${apiUrl}/api/challenge/creationByChallenge/${challengeId}`);
            return res.data;
        } catch (e) {
            console.error("Error fetching sorted creations:", e);
            return [];
        }
    });

    getUserByIdentityAsync = action(async (id: number) => {
        try {
            const res = await axios.get(`${apiUrl}/api/User/userTz/${id}`);
            return res.data;
        } catch (e) {
            console.error("Error fetching winning creation:", e);
            return null;
        }
    });

    getWinningCreation = action(async (challengeId: number) => {
        try {
            const res = await axios.get(`${apiUrl}/api/challenge/winner/${challengeId}`);
            return res.data;
        } catch (e) {
            console.error("Error fetching winning creation:", e);
            return null;
        }
    });

    addChallenge = action(async (newChallenge: ChallengeType) => {
        try {
            await axios.post(`${apiUrl}/api/challenge`, newChallenge);
            this.fetchChallenges();
        } catch (e) {
            console.error("Error adding challenge:", e);
        }
    });

    updateChallenge = action(async (id: number, updatedData: Partial<ChallengeType>) => {
        try {
            await axios.put(`${apiUrl}/api/challenge/${id}`, updatedData);
            this.fetchChallenges();
        } catch (e) {
            console.error("Error updating challenge:", e);
        }
    });

    incrementCountCreations = action(async (id: number) => {
        try {
            await axios.patch(`${apiUrl}/api/challenge/update-count/${id}`);
            this.fetchChallenges();
        } catch (e) {
            console.error("Error increment count creations:", e);
        }
    });

    deleteChallenge = action(async (id: number) => {
        try {
            await axios.delete(`${apiUrl}/api/challenge/${id}`);
            this.fetchChallenges();
        } catch (e) {
            console.error("Error deleting challenge:", e);
        }
    });


    get getAllCallenges() {
        return this.challenges;
    }
    get getSortCallenges() {
        return this.sortChallenges;
    }
    get getActiveCallenges() {
        return this.activeChallenges;
    }
    get getNotActiveCallenges() {
        return this.notActiveChallenges;
    }
}

export default new ChallengeStore();
