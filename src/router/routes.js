import Home from "../views/Home";

export const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/city',
        name: 'City',
        component: () => import(/* webpackChunkName: "about" */ '../views/City.vue')
    }
]
