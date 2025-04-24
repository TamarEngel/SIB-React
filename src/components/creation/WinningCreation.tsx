// import { Typography, Box } from "@mui/material";
// import { observer } from "mobx-react-lite";
// import { useState, useEffect } from "react";
// import { CreationType } from "../../models/creation";
// import { UserType } from "../../models/user";
// import challengeStore from "../../store/challengeStore";
// import CreationView from "./CreationView";


// // קומפוננטה להצגת התמונה הזוכה
// const WinningCreation = observer(({ challengeId }: { challengeId: number }) => {
//     const [winningCreation, setWinningCreation] = useState<CreationType | null>(null);
//     const [user, setUser] = useState<UserType | null>(null);

//     useEffect(() => {
//         const fetchWinningCreation = async () => {
//             const creation = await challengeStore.getWinningCreation(challengeId);
//             setWinningCreation(creation);

//             if (creation) {
//                 const userData = await challengeStore.getUserByIdentityAsync(creation.userId);
                
//                 setUser(userData);
//             }
//         };
//         fetchWinningCreation();
//     }, [challengeId]);

//     if (!winningCreation || !user) {
//         return <Typography variant="body2">טוען את התמונה הזוכה...</Typography>;
//     }

//     return (
//         <Box sx={{ marginTop: 2, textAlign: "center" }}>
//             <CreationView fileName={winningCreation.fileName} />
//             {/* <img src={winningCreation.imageUrl} alt={winningCreation.fileName} style={{ width: "100%", borderRadius: "8px" }} /> */}
//             <Typography variant="body2">{winningCreation.fileName}</Typography>
//             <Typography variant="body2">יוצר: {user.name}</Typography>
//             <Typography variant="body2">אימייל: {user.email}</Typography>
//             <Typography variant="body2">כמות דירוגים: {winningCreation.votes || 0}</Typography>
//         </Box>
//     );
// });

// export default WinningCreation;


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
                        bgcolor: 'rgba(255, 255, 255, 0.05)',
                        borderRadius: '8px',
                        mb: 1
                    }}
                />
                <Skeleton 
                    variant="text" 
                    width="70%" 
                    sx={{ 
                        bgcolor: 'rgba(255, 255, 255, 0.05)',
                        mx: 'auto'
                    }}
                />
                <Skeleton 
                    variant="text" 
                    width="50%" 
                    sx={{ 
                        bgcolor: 'rgba(255, 255, 255, 0.05)',
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
                background: "rgba(0, 0, 0, 0.3)",
                borderRadius: "8px"
            }}>
                <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
                    No winning creation found
                </Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ width: "100%", position: "relative", height: "100%" }}>
            {/* תצוגת התמונה עצמה */}
            <Box sx={{ position: "relative", width: "100%", mb: 1.5 }}>
                <CreationView fileName={winningCreation.fileName} />
                
                {/* תווית מספר הצבעות */}
                <Chip 
                    label={`${winningCreation.votes || 0} Votes`}
                    size="small"
                    sx={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        backgroundColor: "rgba(0, 0, 0, 0.7)",
                        color: "#ffffff",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                        backdropFilter: "blur(4px)",
                        fontWeight: 500,
                        fontSize: "0.7rem",
                        '& .MuiChip-label': {
                            px: 1
                        }
                    }}
                />
            </Box>
            
            {/* מידע על התמונה הזוכה והיוצר */}
            <Box sx={{ 
                background: "rgba(0, 0, 0, 0.5)",
                backdropFilter: "blur(8px)",
                borderRadius: "6px",
                padding: "8px 12px",
                transition: "opacity 0.3s ease",
                textAlign: "left",
                border: "1px solid rgba(255, 255, 255, 0.05)"
            }}>
                {/* שם הקובץ */}
                <Typography 
                    variant="body2" 
                    sx={{ 
                        color: "rgba(255, 255, 255, 0.9)",
                        fontWeight: 500,
                        fontSize: "0.85rem",
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
                    gap: 1,
                    mb: 0.5
                }}>
                    <Avatar 
                        sx={{ 
                            width: 24, 
                            height: 24,
                            background: "linear-gradient(135deg, #f1535d, #edc106)",
                            fontSize: "0.75rem"
                        }}
                    >
                        {user.name.charAt(0)}
                    </Avatar>
                    <Typography 
                        variant="body2" 
                        sx={{ 
                            color: "rgba(255, 255, 255, 0.9)",
                            fontSize: "0.8rem",
                            fontWeight: 500,
                            lineHeight: 1.2
                        }}
                    >
                        {user.name}
                    </Typography>
                </Box>
                
                {/* אימייל */}
                <Typography 
                    variant="body2" 
                    sx={{ 
                        color: "rgba(255, 255, 255, 0.6)",
                        fontSize: "0.75rem",
                        mb: 0.5,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                    }}
                >
                    {user.email}
                </Typography>
            </Box>
        </Box>
    );
});

export default WinningCreation;