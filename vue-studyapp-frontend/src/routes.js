import Home from './components/Home.vue';
import ListEvent from './components/ListEvent.vue';
import AddEvent from './components/AddEvent.vue';
import Users from "./components/Users.vue";
import User from "./components/User.vue";
import Blog from "./components/Blog.vue";
import QuizGame from "./components/QuizGame.vue";
import LoginForm from "./components/LoginForm.vue";

const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/list', name: 'ListEvent', component: ListEvent },
    { path: '/add', name: 'AddEvent', component: AddEvent },
    { path: '/users', name: 'Users', component: Users },
    { path: '/user/:id', name: 'User', component: User },
    { path: '/blog/:id', name: 'Blog', component: Blog },
    { path: '/quiz/:id', name: 'QuizGame', component: QuizGame },
    { path: '/login', name: 'LoginForm', component: LoginForm },
];

export default routes;