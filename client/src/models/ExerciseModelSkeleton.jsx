import React from 'react'
import '../css/ExerciseModel.css'


export const ExerciseModelSkeleton = () => {

    return (
        <div className="exerciseModelSkeleton" >
            <div className='exerciseContainerSkeleton'>
                <span className="exerciseNameSkeleton"></span>
            </div>
            <div className="bodypartsContainerSkeleton">
                <span className="bodypartSkeleton"></span>
                <span className="bodypartSkeleton"></span>
            </div>
            
        </div>
    )
}


