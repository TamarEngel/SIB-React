import { Typography, Box, Avatar } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useState, useEffect } from "react";
import { CreationType } from "../../models/creation";
import { UserType } from "../../models/user";
import challengeStore from "../../store/challengeStore";
import CreationView2 from "./CreationView2";

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
            <Box sx={{ 
                width: "100%", 
                height: "100%", 
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                background: "rgba(8, 8, 8, 0.4)"
            }}>
                <Box sx={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    border: "2px solid rgba(50, 50, 50, 0.2)",
                    borderTop: "2px solid rgba(200, 200, 200, 0.7)",
                    animation: "spin 1s linear infinite",
                    mb: 3,
                    "@keyframes spin": {
                        "0%": { transform: "rotate(0deg)" },
                        "100%": { transform: "rotate(360deg)" },
                    }
                }} />
                <Typography sx={{ 
                    color: "rgba(255, 255, 255, 0.6)",
                    fontSize: "1rem",
                    fontWeight: 400
                }}>
                    Loading winner...
                </Typography>
            </Box>
        );
    }

    if (!winningCreation || !user) {
        return (
            <Box sx={{ 
                width: "100%", 
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                background: "rgba(8, 8, 8, 0.4)",
                padding: "20px"
            }}>
                <Typography variant="body1" sx={{ 
                    color: "rgba(255, 255, 255, 0.7)",
                    textAlign: "center",
                    mb: 2,
                    fontSize: "1.1rem"
                }}>
                    No winning creation found
                </Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ 
            width: "100%", 
            height: "100%", 
            position: "relative",
            display: "flex",
            flexDirection: "column"
        }}>
            {/* Trophy badge */}
            <Box sx={{
                position: "absolute",
                top: "20px",
                left: "20px",
                zIndex: 5,
                display: "flex",
                alignItems: "center",
                background: "rgba(0, 0, 0, 0.7)",
                borderRadius: "12px",
                padding: "8px 16px",
                gap: 1.5,
                border: "1.5px solid rgba(80, 80, 80, 0.3)"
            }}>
                <Typography 
                    component="span" 
                    sx={{ 
                        color: "#FFD700",
                        fontSize: "1.2rem",
                        display: "flex",
                        alignItems: "center"
                    }}
                >
                    🏆
                </Typography>
                <Typography sx={{
                    fontWeight: 500,
                    fontSize: "0.95rem",
                    color: "#ffffff",
                }}>
                    Winner
                </Typography>
            </Box>
            
            {/* Vote count */}
            <Box sx={{
                position: "absolute",
                top: "20px",
                right: "20px",
                zIndex: 5,
                background: "rgba(0, 0, 0, 0.7)",
                borderRadius: "12px",
                padding: "8px 16px",
                border: "1.5px solid rgba(80, 80, 80, 0.3)"
            }}>
                <Typography sx={{
                    fontWeight: 500,
                    fontSize: "0.95rem",
                    color: "#ffffff",
                }}>
                    {winningCreation.votes || 0} Votes
                </Typography>
            </Box>
            
            <Box sx={{ 
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                padding: "60px 20px 70px 20px", 
                overflow: "hidden",
            }}>
                <Box sx={{
                    width: "100%",
                    height: "100%",
                    maxWidth: "80%", 
                    maxHeight: "80%", 
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    "& img": {
                        maxWidth: "100%",
                        maxHeight: "100%",
                        objectFit: "contain"
                    }
                }}>
                    <CreationView2 fileName={winningCreation.fileName} />
                </Box>
            </Box>
            
            <Box sx={{ 
                width: "100%",
                background: "rgba(0, 0, 0, 0.8)",
                padding: "14px 20px",
                zIndex: 4,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0
            }}>
                <Box sx={{ 
                    display: "flex", 
                    alignItems: "center", 
                    gap: 2 
                }}>
                    <Avatar 
                        sx={{ 
                            width: 36, 
                            height: 36,
                            backgroundColor: "#1A1A1A",
                            color: "#fff",
                            fontWeight: 500
                        }}
                    >
                        {user.name.charAt(0)}
                    </Avatar>
                    
                    <Box>
                        <Typography sx={{ 
                            color: "#ffffff",
                            fontSize: "0.95rem",
                            fontWeight: 500,
                            mb: 0.3
                        }}>
                            {user.name}
                        </Typography>
                        <Typography sx={{ 
                            color: "rgba(200, 200, 200, 0.8)",
                            fontSize: "0.8rem"
                        }}>
                            Challenge #{challengeId}
                        </Typography>
                    </Box>
                </Box>
                
                {/* File name */}
                <Box sx={{
                    maxWidth: "40%",
                    textAlign: "right"
                }}>
                    <Typography sx={{ 
                        color: "rgba(255, 255, 255, 0.8)",
                        fontSize: "0.8rem",
                        direction: "rtl",
                        textAlign: "left",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap"
                    }}>
                        {winningCreation.fileName}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
});

export default WinningCreation;
