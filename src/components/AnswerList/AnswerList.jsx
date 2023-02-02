import React, { useEffect, useState } from 'react';
import { BiUpvote, BiDownvote } from 'react-icons/bi';
import { FaRegComment } from 'react-icons/fa';
import { TfiReload, TfiWrite } from 'react-icons/tfi';


const AnswerList = ({questionId}) => {

    const [upvote, setUpvote] = useState(false)
    const [downvote, setDownvote] = useState(false)


    const [answers, setAnswers] = useState('')

    useEffect(() => {
        fetch(`http://localhost:5000/answers/${questionId}`)
            .then(res => res.json())
            .then(data => setAnswers(data))
    }, [upvote, downvote])

    // console.log(answers[0].comments.length)

   
    
    const handleUpvote = (id) => {
        fetch(`http://localhost:5000/upvote/${id}`, {
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
        fetch(`http://localhost:5000/downvote/${id}`, {
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
        <div className='flex flex-col gap-5'>
            {
                answers &&
                answers.map(answer => 
                    <div className="card w-[1200px] bg-white shadow-xl" key={answer._id}>
                        <div className="card-body">
                            <h2 className="card-title text-lg"><div className="btn-sm bg-base-200 rounded-full flex items-center">Related</div> {answer.question}</h2>
                            <p className='py-5'>{answer.answer}</p>
                            <div className="card-actions justify-start">
                                <button onClick={()=>handleUpvote(answer._id)} className={`btn btn-outline text-xl hover:text-green-500 `}><BiUpvote />&nbsp;{answer.upvote}</button>
                                <button onClick={()=>handleDownvote(answer._id)} className={`btn btn-outline text-xl hover:text-red-500 `}><BiDownvote />&nbsp;{answer.downvote}</button>
                                <button className="btn btn-outline text-xl"><FaRegComment />&nbsp;{answer.comments.length}</button>
                                <button className="btn btn-outline text-xl"><TfiReload />&nbsp;{answer.share}</button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default AnswerList;