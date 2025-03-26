import { useEffect, useState } from "react";
import { Button, Typography } from "@mui/material";
import axios from "axios";
import { getUserDataFromToken } from "../../utils/authUtils";
const apiUrl=import.meta.env.VITE_APP_API_URL ;    // קישור לשרת

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
                setUserHasVoted(response.data); // אם true - המשתמש כבר הצביע
            } catch (error) {
                console.error("Error checking vote status", error);
            }
        };
        checkUserVote();
    }, [id, creationId, token]);

    // הוספת הצבעה
    const clickAddVote = async () => {
        const token = sessionStorage.getItem("token");
        if (!token) {
            alert("עליך להתחבר כדי להצביע");
            return;
        }
        if (!id) {
            alert("אירעה שגיאה בטעינת הנתונים, נסה לרענן את הדף.");
            return;
        }
        try {
            await axios.post('https://localhost:7143/api/Vote', {
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
                alert(error.response.data);  // הצגת הודעת שגיאה מותאמת מהשרת
            } else {
                alert("שגיאה בהצבעה, נסה שוב מאוחר יותר.");
            }
        }
    };

    // ביטול הצבעה
    const clickDeleteVote = async () => {
        const token = sessionStorage.getItem("token");
        if (!token) {
            alert("עליך להתחבר כדי להצביע");
            return;
        }
        if (!id) {
            alert("אירעה שגיאה בטעינת הנתונים, נסה לרענן את הדף.");
            return;
        }
        try {
            await axios.delete('https://localhost:7143/api/Vote/deleteVote', {
                data: {
                    userId: id,
                    creationId: creationId
                },
                headers: {
                    'Authorization': `Bearer ${token}`, // אם נדרש טוקן גישה
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
                alert(error.response.data);  // הצגת הודעת שגיאה מותאמת מהשרת
            } else {
                alert("שגיאה בביטול ההצבעה, נסה שוב מאוחר יותר.");
            }
        }
    };

    return (
        <>
            <Typography variant="h6" sx={{color:"white"}}>count #{voteCount}</Typography>
            <Button onClick={clickAddVote} disabled={userHasVoted} sx={{ fontSize: "1.4rem" }}>👍</Button>
            <Button onClick={clickDeleteVote} disabled={!userHasVoted} sx={{ fontSize: "1.4rem" }}>👎</Button>
        </>
    );
};

export default CreationRating;
