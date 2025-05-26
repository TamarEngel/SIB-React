import { useEffect, useState } from "react";
import { Button, Typography } from "@mui/material";
import axios from "axios";
import { getUserDataFromToken } from "../../utils/authUtils";
const apiUrl = import.meta.env.VITE_APP_API_URL;

const CreationRating = ({ creationId, initialVotes }: { creationId: number; initialVotes: number }) => {

    const { id } = getUserDataFromToken();
    const token = sessionStorage.getItem("token");
    const [voteCount, setVoteCount] = useState<number>(initialVotes);
    const [userHasVoted, setUserHasVoted] = useState<boolean>(false);

    useEffect(() => {
        if (!id || !token) return;
        const checkUserVote = async () => {
            try {
                console.log({ userId: id, creationId: creationId });
                const response = await axios.get(`${apiUrl}/api/Vote/hasVoted`, {
                    params: { userId: id, creationId: creationId },
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    }

                });
                setUserHasVoted(response.data);
            } catch (error) {
                console.error("Error checking vote status", error);
            }
        };
        checkUserVote();
    }, [id, creationId, token]);

    const clickAddVote = async () => {
        const token = sessionStorage.getItem("token");
        if (!token) {
            alert("You must be logged in to vote.");
            return;
        }
        if (!id) {
            alert("An error occurred while loading data. Please refresh the page and try again.");
            return;
        }
        try {
            await axios.post(`${apiUrl}/api/Vote`, {
                UserId: id,
                CreationId: creationId
            },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    }
                })
                .then(response => {
                    console.log("Vote successful", response.data);
                    setVoteCount((prevVoteCount) => prevVoteCount + 1);
                    setUserHasVoted(true);
                })
        } catch (error: any) {
            if (error.response?.status === 400) {
                alert(error.response.data);
            } else {
                alert("An error occurred while voting. Please try again later.");
            }
        }
    };

    const clickDeleteVote = async () => {
        const token = sessionStorage.getItem("token");
        if (!token) {
            alert("You must be logged in to vote.");
            return;
        }
        if (!id) {
            alert("An error occurred while loading data. Please refresh the page and try again.");
            return;
        }
        try {
            await axios.delete(`${apiUrl}/api/Vote/deleteVote`, {
                data: {
                    userId: id,
                    creationId: creationId
                },
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    console.log("Vote deleted successfully", response.data);
                    setVoteCount((prevVoteCount) => prevVoteCount - 1);
                    setUserHasVoted(false);
                })

        } catch (error: any) {
            if (error.response?.status === 400) {
                alert(error.response.data);
            } else {
                alert("An error occurred while canceling the vote. Please try again later.");
            }
        }
    };

    return (
        <>
            <Typography variant="h6" sx={{ color: "white" }}>count #{voteCount}</Typography>
            <Button onClick={clickAddVote} disabled={userHasVoted} sx={{ fontSize: "1.4rem" }}>👍</Button>
            <Button onClick={clickDeleteVote} disabled={!userHasVoted} sx={{ fontSize: "1.4rem" }}>👎</Button>
        </>
    );
};

export default CreationRating;
