//import React from 'react'
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux'; 

// const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8];

const LatestJobs = () => {
    const {allJobs} = useSelector(store=>store.job);
    const { user } = useSelector(store => store.auth);
   
    return (
        <div className='max-w-7xl mx-auto my-20'>
            <h1 className='text-4xl font-bold'>New Job Openings</h1>
            <div className='grid grid-cols-3 gap-4 my-5'>
                 {
                    !user ? (   // 👈 if user is not logged in
                        <span>Please Login First...</span>
                    ) : allJobs?.length > 0 ? (   // 👈 logged in & jobs available
                        allJobs.slice(0, 6).map((job) => (
                            <LatestJobCards key={job._id} job={job} />
                        ))
                    ) : (
                        <span>No jobs available...</span>   // 👈 logged in but no jobs
                    )
                }
            </div>
        </div>
    )
}

export default LatestJobs
