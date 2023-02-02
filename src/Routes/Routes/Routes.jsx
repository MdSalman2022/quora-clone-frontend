import React from 'react';
import { createBrowserRouter } from 'react-router-dom';  
import Main from '../../Layout/Main';
import Home from '../../Pages/Home/Home';
import PostPage from '../../Pages/PostPage/PostPage';


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
                path: '/question/:id',
                loader: ({ params }) => fetch(`http://localhost:5000/question/${params.id}`),
                element: <PostPage></PostPage>
            },
        ]
    }
])