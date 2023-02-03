import React from 'react';
import { createBrowserRouter } from 'react-router-dom';  
import Main from '../../Layout/Main';
import Home from '../../Pages/Home/Home'; 
import Login from '../../Pages/Login/Login';
import PostPage from '../../Pages/PostPage/PostPage';  
import Register from '../../Pages/Register/Register';


export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>, 
        children: [
            {
                path: '/',
                element: <Home></Home>
            }, 
            {
                path: '/login',
                element: <Login></Login>
            }, 
            {
                path: '/register',
                element: <Register></Register>
            }, 
            {
                path: '/question/:id',
                loader: ({ params }) => fetch(`http://localhost:5000/question/${params.id}`),
                element: <PostPage></PostPage>
            },
        ]
    }
])