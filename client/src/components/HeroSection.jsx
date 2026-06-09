import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button'; // Uncomment if you have this
import { Search } from 'lucide-react'; // Uncomment if you have this

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        if (!query) return;
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className='text-center'>
            <div className='flex flex-col gap-5 my-10'>
                <span className=' mx-auto px-4 py-2 rounded-full bg-white text-[#001F3F] font-bold'>
                    AI-Powered Job Matching Platform
                </span>
                <h1 className='text-5xl font-bold'>
                    Search, Apply & <br /> Secure Your <span className='text-[#2563eb]'>Dream Jobs</span>
                </h1>
                <p>
                    A smart job-finding platform connecting seekers with opportunities through AI-matching, <br /> 
                    real-time updates, and personalized career growth tools.
                </p>

                {/* Search Bar */}
                <div className='flex justify-center gap-2 mt-5'>
                    <input 
                        type="text" 
                        value={query} 
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search jobs..."
                        className="px-4 py-2 rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Button onClick={searchJobHandler} className="rounded-r-md flex items-center gap-2">
                        <Search className="w-4 h-4" /> Search
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default HeroSection;
