import { createBrowserRouter, Navigate } from 'react-router-dom';
import ErrorPage from './views/ErrorPage';
import Login from './views/Login';
import Signup from './views/Signup';
import Users from './views/Users';
import App from './layouts/App';
import Guest from './layouts/Guest';
import Dashboard from './views/Dashboard';
import ContextProvider from './context/ContextProvider';
import UserForm from './views/UserForm';
import UserProfile from './views/UserProfile';


const routes = createBrowserRouter([
    {
        path: '/',
        element: <ContextProvider>
            <App />
        </ContextProvider>,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <Navigate to={'/users'} />
            },
            {
                path: '/users',
                element: <Users />
            },
            {
                path: '/users/new',
                element: <UserForm />
            },
            {
                path: '/users/:id',
                element: <UserProfile />
            },
            {
                path: '/users/:id/edit',
                element: <UserForm />
            },
            {
                path: '/dashboard',
                element: <Dashboard />
            },
        ]
    },
    {
        path: '/',
        element: <ContextProvider>
            <Guest />
        </ContextProvider>,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/signup',
                element: <Signup />
            },
        ]
    },
])

export default routes;