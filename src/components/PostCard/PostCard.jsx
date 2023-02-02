import React, { useEffect, useState } from 'react';
import { BiUpvote, BiDownvote } from 'react-icons/bi';
import { FaRegComment } from 'react-icons/fa';
import {TfiReload,TfiWrite} from 'react-icons/tfi';
import { Link } from 'react-router-dom';

const PostCard = () => {
    const [upvote, setUpvote] = useState(false)
    const [downvote, setDownvote] = useState(false)

    const [questions, setQuestions] = useState('')

    useEffect(() => {
        fetch('http://localhost:5000/questions')
            .then(res => res.json())
            .then(data => setQuestions(data))
    }, [upvote,downvote])

    console.log(questions);

    
    const handleUpvote = (id) => {
        fetch(`http://localhost:5000/post-upvote/${id}`, {
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

    const handleDownvote = (id) => {
        fetch(`http://localhost:5000/post-downvote/${id}`, {
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



    const [comment, setComment] = useState(false)
 
    const [answers, setAnswers] = useState('')


    const handleComment = (id) => {
        setComment(!comment)
        fetch(`http://localhost:5000/answers/${id}`)
            .then(res => res.json())
            .then(data => setAnswers(data))
    }   

    return (
        <div>
            <div className="flex flex-col gap-5">
                {questions &&
                    questions.map(question =>
                    <div className="card w-[800px] bg-white shadow-xl" key={question._id}>
                        <Link to={`question/${question._id}`}>
                            <div className="card-body">
                                <h2 className="card-title">{question.question}</h2>
                            </div>
                        </Link>
                        <div className="card-actions justify-start p-5">
                            <button onClick={()=>handleUpvote(question._id)} className={`btn btn-outline text-xl hover:text-green-500}`}><BiUpvote />&nbsp;{question.upvote}</button>
                            <button onClick={()=>handleDownvote(question._id)} className={`btn btn-outline text-xl hover:text-red-500}`}><BiDownvote />&nbsp;{question.downvote}</button>
                            <button onClick={()=>handleComment(question._id)} className="btn btn-outline text-xl"><FaRegComment /></button>
                            <button className="btn btn-outline text-xl"><TfiReload />&nbsp;{question.share}</button> 
                            </div> 
                            {
                                comment &&
                                <div className="comment h-full">
                                    <div className="p-3 bg-white rounded-xl">
                                        {answers &&
                                            <div className='flex flex-col gap-5'>{answers.map(a =>
                                                <div className='bg-base-100 p-5 rounded-2xl'>
                                                    {
                                                        answers ? 
                                                            <div>
                                                                 <div className="avatar flex gap-2 items-center">
                                                                        <div className="w-10 h-10 rounded-full">
                                                                            <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png" />
                                                                        </div>
                                                                    <p>User</p>
                                                                    </div>
                                                                    <p>{a.answer}</p>
                                                            </div>
                                                            :
                                                            <p>No Comment yet</p>
                                                   }
                                                </div>
                                            
                                                )}
                                            </div>
                                        }
                                    </div>
                                </div> 
                            }
                    </div>
                    )
                }
            </div>
        </div>
    );
};

export default PostCard;