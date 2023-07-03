import { createWebHistory, createRouter } from 'vue-router';
import homePage from './components/homePage.vue'
import edit from './components/EditUser.vue'
import create from './components/createUser.vue'


const routes = [{
    name: 'homePage',
    path: '/',
    component: homePage
},
{
    name: 'create',
    path: '/create',
    component: create
},
{
    name: 'edit',
    path: '/edit/:id',
    component: edit,
    props: true
}
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;