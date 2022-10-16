import React from 'react'
import '../css/ExerciseModel.css'
import { useState, useEffect } from 'react';



export const ExerciseModel = ({excName,excDesc,bodyparts, id}) => {

    const [liked, setLiked] = useState(false);
    const [hasBackground, sethasBackground] = useState(false);


    const returnParts = [];
    for (let i = 0; i < bodyparts.length; i++) {
        const element = bodyparts[i];
        returnParts.push(<span className="bodypart" key={i}>{element}</span>)
    }

    useEffect(() => {
        if (!hasBackground) {
            const exercises = document.querySelectorAll('.exerciseContainer');
            exercises.forEach(exercise => {
                exercise.style.backgroundImage = "url('https://images.unsplash.com/photo-1620188467120-5042ed1eb5da?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80')";
        });
    }
        }, []);
    return (
        <div className="exerciseModel">
            <div className='exerciseContainer'>
                <div className="containerGradient">

                    <span className="exerciseName">{excName}</span>
                    <div className="exerciseDescription">
                        {excDesc}
                    </div>
                    {liked ?
                        <i className="fa-solid fa-heart fa-heart1 liked" onClick={() => setLiked(!liked)}></i>
                        :
                        <i className="fa-solid fa-heart fa-heart1" onClick={() => setLiked(!liked)}></i>
                    }
                </div>
            </div>
            <div className="bodypartsContainer">
            {returnParts}
        </div>
        </div>
    )
}


