
import Landing from "../pages/pages/Landing";
import Item from "../pages/pages/Item";
import Quizz from "../pages/pages/Quizz";
import Check from "../pages/pages/Check"

// Landing page
const landingRoutes = {
    path: "/",
    component: Landing,
    children: null,
}

const itemRoutes = {
    path: "/:category",
    component: Item,
    children: null
}

const quizzRoutes = {
    path: "/quizz",
    children: [
        {
            path:"/quizz/:itemId",
            component: Quizz
        }
    ]
}

const checkRoutes = {
    path: "/check/result",
    component: Check,
    children: null,
}

export const landing = [landingRoutes]
export const item = [itemRoutes]
export const quizz = [quizzRoutes]
export const check = [checkRoutes]


export default [landingRoutes, itemRoutes, quizzRoutes, checkRoutes]