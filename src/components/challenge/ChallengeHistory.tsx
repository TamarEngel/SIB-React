import { observer } from "mobx-react-lite";
import { Box, Typography, Grid, Paper } from "@mui/material";
import challengeStore from "../../store/challengeStore";
import WinningCreation from "../creation/WinningCreation";

const ChallengeHistory = observer(() => {    
    const notActiveCallenges = challengeStore.getNotActiveCallenges;

    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h4">Challenge History</Typography>
            <Grid container spacing={3} sx={{ marginTop: 2 }}>
                {notActiveCallenges.length > 0 ? (
                    notActiveCallenges.map((challenge) => (
                        <Grid item xs={12} sm={6} md={4} key={challenge.id}>
                            <Paper sx={{ padding: 2, textAlign: "center" }}>
                                <Typography variant="h5">{challenge.title}</Typography>
                                <Typography variant="body1">כמות משתתפים: {challenge.countCreations}</Typography>
                                
                                {/* שליפת התמונה הזוכה */}
                                <WinningCreation challengeId={challenge.id} />
                            </Paper>
                        </Grid>
                    ))
                ) : (
                    <Grid item xs={12}>
                        <Typography sx={{ padding: 2 }}>לא נמצאו אתגרים לא פעילים</Typography>
                    </Grid>
                )}
            </Grid>
        </Box>
    );
});
export default ChallengeHistory