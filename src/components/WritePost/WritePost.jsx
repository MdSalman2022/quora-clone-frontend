import React from 'react';
import toast, { Toaster } from 'react-hot-toast';


const WritePost = () => {


    const handleBooking = event => {
        event.preventDefault()
        const form = event.target
        const question = form.question.value 
        // const email = user.email
        // const name = user.displayName
        // const photo = user.photoURL
        let upvote = 0
        let downvote = 0
        let share = 0
        let comments = []


        const blogpost = {
            question: question,
            date: new Date(),
            upvote,
            downvote,
            share,
            comments
        }

        fetch('http://localhost:5000/question', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(blogpost)
        })
            .then(res => res.json())
            .then(result => {
                console.log(result);
                toast.success(`Question posted successfully`)
            })
        console.log(blogpost)

    }

    return (
        <div className='flex flex-col'>
            <div className="flex gap-3 items-center">
                        <div className="avatar">
                            <div className="w-10 h-10 rounded-full">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Sundar_pichai.png/220px-Sundar_pichai.png" />
                            </div>
                        </div>
           
                            <label htmlFor="my-modal-3" className="btn w-[750px] bg-base-100 text-left text-neutral hover:bg-base-100">What do you want to ask or share?</label>
                                <input type="checkbox" id="my-modal-3" className="modal-toggle " />
                                <div className="modal">
                                <div className="modal-box relative space-y-3">
                                    <form onSubmit={handleBooking} >
                                    <label htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                                        <p className="text-xl font-semibold">Ask your Question</p>                 
                                        <input htmlFor="my-modal-3" type="text" name='question' placeholder="Type here" className="input input-bordered w-full" />
                                        <div className="flex justify-end gap-5 py-2">
                                            <label htmlFor="my-modal-3" className="btn bg-base-100 hover:btn-outline border-none text-neutral">Cancel</label>
                                            <input type="submit" value="Add Question"  className="btn btn-primary"/>
                                        </div>
                                    </form>
                                </div>
                            </div>
                    </div>
                        <div className="flex my-5">
                            <p className='border-r px-3'>Ask</p>
                            <p className='border-r px-3'>Answer</p>
                            <p className='border-r px-3'>Post</p>
                        </div>
        </div>
    );
};

export default WritePost;