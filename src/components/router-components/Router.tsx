import { createBrowserRouter } from "react-router";
import ChallengeList from "../challenge/ChallengeList";
import AppLayout from "./AppLayout";
import ChallengeDetails from "../challenge/ChallengeDetails";
import HomePage from "../homePage/HomePage";
import ChallengeHistory from "../challenge/ChallengeHistory";

export const myRouter = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout />,
        children: [
            { index: true, element: <HomePage /> }, // יטען כשנכנסים ל־"/"
            {path: 'allChallenges', element: <ChallengeList />},
            {path: "allChallenges/:id", element: <ChallengeDetails />},
            {path: "challengeHistory", element: <ChallengeHistory />}
        ]
    }
])

