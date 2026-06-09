import { useSelector } from "react-redux";
import Job from "./Job";

const Recommended = () => {
    const { allJobs } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth);

    if (!user || !allJobs) return null;

    // Normalize user skills into lowercase array
    let userSkills = [];
    if (Array.isArray(user?.profile?.skills)) {
        userSkills = user.profile.skills.map(skill => skill.toLowerCase().trim());
    } else if (typeof user?.profile?.skills === "string") {
        userSkills = user.profile.skills.split(",").map(skill => skill.toLowerCase().trim());
    }

    // Map jobs with match percentage
    const recommendedJobsWithMatch = allJobs.map(job => {
        let jobRequirements = [];
        if (Array.isArray(job?.requirements)) {
            jobRequirements = job.requirements.map(req => req.toLowerCase().trim());
        } else if (typeof job?.requirements === "string") {
            jobRequirements = job.requirements.split(",").map(req => req.toLowerCase().trim());
        }

        const matchedSkills = jobRequirements.filter(req =>
            userSkills.some(skill => req.includes(skill) || skill.includes(req))
        );

        const matchPercentage = jobRequirements.length
            ? Math.round((matchedSkills.length / jobRequirements.length) * 100)
            : 0;

        return { ...job, matchPercentage };
    });

    // Filter out jobs with 0% match and sort descending by match percentage
    const recommendedJobs = recommendedJobsWithMatch
        .filter(job => job.matchPercentage > 0)
        .sort((a, b) => b.matchPercentage - a.matchPercentage);

    return (
        <div className='pb-5 pr-4'>
            <h1 className='text-4xl font-bold mb-5'>Recommended Jobs</h1>
            <div className='grid grid-cols-3 gap-4'>
                {recommendedJobs.length > 0 ? (
                    recommendedJobs.map(job => (
                        <div key={job._id} className="relative">
                            <Job job={job} />
                            <span className="absolute top-2 right-2 text-sm font-semibold text-blue-600">
                                {job.matchPercentage}% match
                            </span>
                        </div>
                    ))
                ) : (
                    <p>No Recommended Jobs Found</p>
                )}
            </div>
        </div>
    );
};

export default Recommended;
