import { observer } from "mobx-react-lite";
import { Box, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import challengeStore from "../../store/challengeStore";
import WinningCreation from "../creation/WinningCreation";
import { ChallengeType } from "../../models/challenge";

const ChallengeHistory = observer(() => {
    const notActiveCallenges = challengeStore.getNotActiveCallenges;
    const [selectedChallenge, setSelectedChallenge] = useState<ChallengeType>();
    const [hoverIndex, setHoverIndex] = useState(null as number | null);

    // Set first challenge as selected by default
    useEffect(() => {
        if (notActiveCallenges.length > 0 && !selectedChallenge) {
            setSelectedChallenge(notActiveCallenges[0]);
        }
    }, [notActiveCallenges, selectedChallenge]);

    return (
        <Box sx={{
            width: "100%",
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#000000",
            color: "#ffffff",
        }}>
            {/* Main container with top margin */}
            <Box sx={{
                marginTop: { xs: 10, sm: 12, md: 14 },
                flex: 1,
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                width: "100%",
                maxWidth: "1200px",
                margin: "0 auto",  // Center horizontally
                padding: { xs: 2, md: 5 },
                gap: { xs: 3, md: 3 },
                paddingBottom: 5,  // Add bottom padding
            }}>
                {/* Left side - Challenge list */}
                <Box sx={{
                    flex: { xs: "1 1 100%", md: "0 0 300px" },
                    display: "flex",
                    flexDirection: "column",
                    maxHeight: { xs: "300px", md: "600px" },  // Set maximum height
                    overflow: "auto",
                    paddingRight: 1,
                    scrollbarWidth: "thin",
                    scrollbarColor: "rgba(100, 100, 100, 0.3) transparent",
                    "&::-webkit-scrollbar": {
                        width: "4px",
                    },
                    "&::-webkit-scrollbar-track": {
                        background: "rgba(0, 0, 0, 0.1)",
                    },
                    "&::-webkit-scrollbar-thumb": {
                        background: "rgba(100, 100, 100, 0.3)",
                        borderRadius: "3px",
                    }
                }}>
                    {notActiveCallenges.length > 0 ? (
                        notActiveCallenges.map((challenge, index) => (
                            <Box
                                key={challenge.id}
                                onClick={() => setSelectedChallenge(challenge)}
                                onMouseEnter={() => setHoverIndex(index)}
                                onMouseLeave={() => setHoverIndex(null)}
                                sx={{
                                    borderRadius: "12px",
                                    backgroundColor: selectedChallenge?.id === challenge.id
                                        ? "rgba(25, 25, 25, 0.9)"
                                        : "rgba(15, 15, 15, 0.5)",
                                    padding: "16px 20px",
                                    margin: "0 0 12px 0",
                                    cursor: "pointer",
                                    border: selectedChallenge?.id === challenge.id
                                        ? "1px solid rgba(80, 80, 80, 0.3)"
                                        : "1px solid rgba(50, 50, 50, 0.3)",
                                    position: "relative",
                                    transition: "all 0.2s ease",
                                    transform: hoverIndex === index ? "translateY(-2px)" : "translateY(0)",
                                    boxShadow: hoverIndex === index || selectedChallenge?.id === challenge.id
                                        ? "0 4px 12px rgba(0, 0, 0, 0.2)"
                                        : "none",
                                    flexShrink: 0,
                                }}
                            >
                                {/* Challenge number */}
                                <Box sx={{
                                    position: "absolute",
                                    top: "14px",
                                    right: "14px",
                                    fontSize: "0.75rem",
                                    color: "rgba(150, 150, 150, 0.7)",
                                }}>
                                    #{challenge.id}
                                </Box>

                                {/* Title */}
                                <Typography sx={{
                                    color: "rgba(255, 255, 255, 0.95)",
                                    fontWeight: 500,
                                    fontSize: "1rem",
                                    mb: 1,
                                    pr: 3
                                }}>
                                    {challenge.title}
                                </Typography>

                                {/* Info row */}
                                <Box sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    mt: 1
                                }}>
                                    <Typography sx={{
                                        color: "rgba(200, 200, 200, 0.8)",
                                        fontSize: "0.8rem"
                                    }}>
                                        {challenge.countCreations} Entries
                                    </Typography>

                                    <Typography sx={{
                                        fontSize: "0.8rem",
                                        color: "rgba(200, 200, 200, 0.8)"
                                    }}>
                                        Completed
                                    </Typography>
                                </Box>
                            </Box>
                        ))
                    ) : (
                        <Box sx={{
                            padding: "30px",
                            textAlign: "center",
                            backgroundColor: "rgba(15, 15, 15, 0.5)",
                            borderRadius: "12px",
                            border: "1px solid rgba(50, 50, 50, 0.3)"
                        }}>
                            <Typography sx={{
                                color: "rgba(255, 255, 255, 0.7)",
                                fontSize: "0.9rem"
                            }}>
                                No completed challenges found
                            </Typography>
                        </Box>
                    )}
                </Box>

                {/* Right side - Winning showcase with fixed dimensions */}
                <Box sx={{
                    flex: { xs: "1 1 100%", md: "1 1 calc(100% - 320px)" },
                    height: { xs: "400px", sm: "500px", md: "500px" },  // Fixed height
                    maxHeight: { md: "600px" },  // Maximum height
                    width: "100%",
                    borderRadius: "16px",
                    backgroundColor: "rgba(10, 10, 10, 0.7)",
                    border: "1px solid rgba(40, 40, 40, 0.3)",
                    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                    position: "relative"
                }}>
                    {selectedChallenge ? (
                        <WinningCreation challengeId={selectedChallenge.id} />
                    ) : (
                        <Box sx={{
                            textAlign: "center",
                            padding: "40px",
                            maxWidth: "400px"
                        }}>
                            <Typography sx={{
                                color: "rgba(255, 255, 255, 0.7)",
                                fontSize: "1.1rem",
                                mb: 2
                            }}>
                                Select a challenge to view its winning creation
                            </Typography>
                        </Box>
                    )}
                </Box>
            </Box>
        </Box>
    );
});

export default ChallengeHistory;
