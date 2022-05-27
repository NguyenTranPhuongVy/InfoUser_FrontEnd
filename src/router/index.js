import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

//* auth
import SignUp from '../views/auth/SignUp.vue'
import SignIn from '../views/auth/SignIn.vue'

//* 404
import ERR404 from '../views/ERR404.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'home',
        component: HomeView
    },
    //* auth
    {
        path: '/dang_ky',
        name: 'SignUp',
        component: SignUp
    },
    {
        path: '/dang_nhap',
        name: 'SignIn',
        component: SignIn
    },
    //* 404
    {
        path: '/404',
        name: 'ERR404',
        component: ERR404
    },
    {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/AboutView.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router