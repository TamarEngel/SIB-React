import { Typography, Box, Avatar, Chip, Skeleton } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useState, useEffect } from "react";
import { CreationType } from "../../models/creation";
import { UserType } from "../../models/user";
import challengeStore from "../../store/challengeStore";
import CreationView from "./CreationView";

// קומפוננטה להצגת התמונה הזוכה
const WinningCreation = observer(({ challengeId }: { challengeId: number }) => {
    const [winningCreation, setWinningCreation] = useState<CreationType | null>(null);
    const [user, setUser] = useState<UserType | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchWinningCreation = async () => {
            setIsLoading(true);
            try {
                const creation = await challengeStore.getWinningCreation(challengeId);
                setWinningCreation(creation);

                if (creation) {
                    const userData = await challengeStore.getUserByIdentityAsync(creation.userId);
                    setUser(userData);
                }
            } catch (error) {
                console.error("Error fetching winning creation:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchWinningCreation();
    }, [challengeId]);

    if (isLoading) {
        return (
            <Box sx={{ width: "100%", height: "100%", minHeight: "200px" }}>
                <Skeleton 
                    variant="rectangular" 
                    width="100%" 
                    height="150px" 
                    animation="wave"
                    sx={{ 
                        bgcolor: 'rgba(255, 255, 255, 0.03)',
                        borderRadius: '4px',
                        mb: 1
                    }}
                />
                <Skeleton 
                    variant="text" 
                    width="70%" 
                    sx={{ 
                        bgcolor: 'rgba(255, 255, 255, 0.03)',
                        mx: 'auto'
                    }}
                />
                <Skeleton 
                    variant="text" 
                    width="50%" 
                    sx={{ 
                        bgcolor: 'rgba(255, 255, 255, 0.03)',
                        mx: 'auto'
                    }}
                />
            </Box>
        );
    }

    if (!winningCreation || !user) {
        return (
            <Box sx={{ 
                width: "100%", 
                height: "100%",
                minHeight: "200px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(15, 15, 15, 0.5)",
                borderRadius: "4px"
            }}>
                <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.5)" }}>
                    No winning creation found
                </Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ width: "100%", position: "relative", height: "100%" }}>
            {/* תצוגת התמונה עצמה */}
            <Box sx={{ position: "relative", width: "100%", height: "100%" }}>
                <CreationView fileName={winningCreation.fileName} />
                
                {/* תווית מספר הצבעות בעיצוב מינימליסטי */}
                <Chip 
                    label={`${winningCreation.votes || 0} Votes`}
                    size="small"
                    sx={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        backgroundColor: "rgba(0, 0, 0, 0.6)",
                        color: "#fff",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        fontWeight: 400,
                        fontSize: "0.7rem",
                        height: "20px",
                        '& .MuiChip-label': {
                            px: 1
                        }
                    }}
                />
                
                {/* אזור פרטי היוצר בתחתית התמונה */}
                <Box sx={{ 
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: "12px 10px",
                    background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.6) 70%, rgba(0,0,0,0) 100%)",
                    textAlign: "left",
                    zIndex: 2
                }}>
                    {/* שם קובץ */}
                    <Typography 
                        variant="body2" 
                        sx={{ 
                            color: "rgba(255, 255, 255, 0.95)",
                            fontWeight: 500,
                            fontSize: "0.8rem",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            mb: 0.5
                        }}
                    >
                        {winningCreation.fileName}
                    </Typography>
                    
                    {/* פרטי היוצר */}
                    <Box sx={{ 
                        display: "flex", 
                        alignItems: "center", 
                        gap: 1
                    }}>
                        <Avatar 
                            sx={{ 
                                width: 22, 
                                height: 22,
                                border: "1px solid rgba(255, 255, 255, 0.2)",
                                backgroundColor: "rgba(255, 255, 255, 0.1)",
                                color: "#fff",
                                fontSize: "0.7rem",
                                fontWeight: 500
                            }}
                        >
                            {user.name.charAt(0)}
                        </Avatar>
                        <Typography 
                            variant="body2" 
                            sx={{ 
                                color: "rgba(255, 255, 255, 0.8)",
                                fontSize: "0.75rem",
                                fontWeight: 400,
                                lineHeight: 1.2,
                                flex: 1,
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap"
                            }}
                        >
                            {user.name}
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
});

export default WinningCreation;