import CheckReservations from "../pages/CheckReservations";
import Home from "../pages/Home";
import Restaurant from "../pages/Restaurant";

export const routeConfig = [
    {
        path: "/",
        component: <Home />
    },
    {
        path: "/:id",
        component: <Restaurant />
    },
    {
        path: "/check-reservations",
        component: <CheckReservations />
    },
];