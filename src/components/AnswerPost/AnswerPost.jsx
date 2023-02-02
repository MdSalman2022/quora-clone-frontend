import React from 'react';
import toast from 'react-hot-toast';


const AnswerPost = ({questionId,question}) => {


    const handleBooking = event => {
        event.preventDefault()
        const form = event.target
        const answer = form.answer.value 
        // const email = user.email
        // const name = user.displayName
        // const photo = user.photoURL
        let upvote = 0
        let downvote = 0
        let share = 0 
        let comments = []
        
        const blogpost = {
            answer,
            date: new Date(),
            upvote,
            downvote,
            share,
            comments,
            question,
            questionId: questionId
        }

        fetch('http://localhost:5000/answer', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(blogpost)
        })
            .then(res => res.json())
            .then(result => {
                console.log(result);
                toast.success(`Answer posted successfully`)
            })
        console.log(blogpost)

    }

    return (
        <div className='flex flex-col'>
            <div className="flex gap-3 items-center">           
                <label htmlFor="my-modal-3" className="btn w-full bg-base-100 text-left text-neutral hover:bg-base-100">Answer</label>
                    <input type="checkbox" id="my-modal-3" className="modal-toggle " />
                    <div className="modal">
                    <div className="modal-box relative space-y-3">
                        <form onSubmit={handleBooking} >
                        <label htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                            <p className="text-xl font-semibold mb-2">Answer question</p>                 
                            <textarea type="text" name='answer' placeholder="Type here" className="textarea textarea-primary w-full" />
                            <div className="flex justify-end gap-5 py-2">
                                <label htmlFor="my-modal-3" className="btn bg-base-100 hover:btn-outline border-none text-neutral">Cancel</label>
                                <input type="submit" value="Add Answer" className="btn btn-primary"/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnswerPost;