import React from 'react';
import PostCard from '../../components/PostCard/PostCard';
import WritePost from '../../components/WritePost/WritePost';

const Home = () => {
    return (
        <div className='h-screen'>
            <div className="container mx-auto py-10">
                <div className="flex flex-col justify-center items-center">
                    <div className="w-[800px] h-32 flex flex-col  ">
                        <WritePost/>
                    </div> 
                    <div className="flex items-center justify-center">
                        <PostCard/>
                    </div>
               </div>
                    
            </div>
        </div>
    );
};

export default Home;