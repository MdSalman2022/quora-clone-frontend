import React, { useEffect, useState } from 'react';
import { useLoaderData, useParams } from 'react-router-dom';
import { BiUpvote, BiDownvote } from 'react-icons/bi';
import { FaRegComment } from 'react-icons/fa';
import { TfiReload, TfiWrite } from 'react-icons/tfi';
import AnswerPost from '../../components/AnswerPost/AnswerPost';
import AnswerList from '../../components/AnswerList/AnswerList';


const PostPage = () => {

    const [upvote, setUpvote] = useState(false)

    const [downvote, setDownvote] = useState(false)


    const postdetails = useLoaderData();

    console.log(postdetails)

    const { _id } = postdetails;

    console.log(_id);

    // let {_id} = useParams(); 

    const [ques, setQues] = useState('')
    const [answers, setAnswers] = useState('')


    useEffect(() => {
        fetch(`https://quora-clone-backend.vercel.app/question/${_id}`)
            .then(res => res.json())
            .then(data => setQues(data))
    }, [upvote, downvote, _id])
    
    console.log(ques)
    
    useEffect(() => {
        fetch(`https://quora-clone-backend.vercel.app/answers/${_id}`)
            .then(res => res.json())
            .then(data => setAnswers(data))
    }, [_id])

    
    console.log(answers);

    
    const handleUpvote = (_id) => {
        fetch(`https://quora-clone-backend.vercel.app/post-upvote/${_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ upvote: upvote ? -1 : 1 })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data) {
                    setUpvote(!upvote)
                }
            })
    }

    const handleDownvote = (_id) => {
        fetch(`https://quora-clone-backend.vercel.app/post-downvote/${_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ downvote: downvote ? -1 : 1 })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data) {

                    setDownvote(!downvote)
                }
            })
    }
 
 

    return (
        <div className='py-20 w-[1200px] mx-auto'>
            <div className="flex flex-col">
                {
                    ques &&
                    <div className="card w-[1200px] bg-white shadow-xl">
                            <div className="card-body">
                                <h2 className="card-title">{ques.question}</h2>
                               <div className="card-actions justify-start p-5">
                                    <button onClick={()=>handleUpvote(ques._id)} className={`btn btn-outline text-xl hover:text-green-500 `}><BiUpvote />&nbsp;{ques.upvote}</button>
                                    <button onClick={()=>handleDownvote(ques._id)} className={`btn btn-outline text-xl hover:text-red-500 `}><BiDownvote />&nbsp;{ques.downvote}</button>
                                    <button className="btn btn-outline text-xl"><FaRegComment /></button>
                                    <button className="btn btn-outline text-xl"><TfiReload />&nbsp;{ques.share}</button> 
                                </div>                             
                            </div>
                    </div>
                }

                <div className="flex justify-between py-10">
                    <div className="btn">All related</div>
                    {<AnswerPost questionId={_id} question={ques.question} />}
                    <div className="btn">Sort</div>
                </div>
                
                {
                    <AnswerList questionId={_id} />
                }

            </div>
            
        </div>
    );
};

export default PostPage;