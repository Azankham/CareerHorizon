import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'
import UserHeader from '../UserHeader'

const Signup = () => {
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: "" // This starts as empty string
    });
    
    const { loading, user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        // 1. Frontend Safety Check: Prevent request if file is missing
        // Since your backend crashes if req.file is undefined, we block it here first.
        if (!input.file) {
            toast.error("Please select a profile picture.", { className: "text-[20px]" });
            return; 
        }

        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        
        // 2. THE CRITICAL FIX: 
        // If your backend route uses upload.single("profilePhoto"), this MUST be "profilePhoto".
        // If your backend route uses upload.single("file"), this MUST be "file".
        // Change "file" below to match your backend EXACTLY.
        formData.append("file", input.file); 

        try {
            dispatch(setLoading(true));
            const res = await axios.post(
                `${USER_API_END_POINT}/register`,
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                    withCredentials: true // Often needed if you use cookies/sessions
                }
            );

            if (res.data.success) {
                // store token
                localStorage.setItem("token", res.data.token);

                // set user in Redux
                dispatch(setUser(res.data.user));

                navigate("/");
                toast.success(res.data.message, { className: "text-[20px]" });
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Signup failed", {
                className: "text-[20px]"
            });
        } finally {
            dispatch(setLoading(false));
        }
    };

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user, navigate]);

    // ... (Your return JSX remains exactly the same)
    return (
        <div className='bg-[#F2F2F2] h-[100vh]'>
            <div className='conatiner'>
                <div className='navbar-conatiner'>
                    <Navbar />
                </div>
                <div className='false-nav'></div>
                <div className='router-container'>
                    <UserHeader />
                    <div className='flex items-center justify-center max-w-7xl mx-auto'>
                        <form onSubmit={submitHandler} className='w-1/2 border border-gray-200 rounded-md p-4 my-10 bg-white'>
                            <h1 className='font-bold text-xl mb-5'>Sign Up</h1>

                            <div className='my-2'>
                                <Label>Full Name</Label>
                                <Input
                                    type="text"
                                    value={input.fullname}
                                    name="fullname"
                                    onChange={changeEventHandler}
                                    placeholder="Enter Full Name"
                                    required // Good practice to add HTML5 validation
                                />
                            </div>

                            <div className='my-2'>
                                <Label>Email</Label>
                                <Input
                                    type="email"
                                    value={input.email}
                                    name="email"
                                    onChange={changeEventHandler}
                                    placeholder="Enter Email Address"
                                    required
                                />
                            </div>

                            <div className='my-2'>
                                <Label>Phone Number</Label>
                                <Input
                                    type="text"
                                    value={input.phoneNumber}
                                    name="phoneNumber"
                                    onChange={changeEventHandler}
                                    placeholder="Phone No"
                                    required
                                />
                            </div>

                            <div className='my-2'>
                                <Label>Password</Label>
                                <Input
                                    type="password"
                                    value={input.password}
                                    name="password"
                                    onChange={changeEventHandler}
                                    placeholder="Password"
                                    required
                                />
                            </div>

                            <div className='flex items-center justify-between'>
                                <RadioGroup className="flex items-center gap-4 my-5" required>
                                    <div className="flex items-center space-x-2">
                                        <Input
                                            type="radio"
                                            name="role"
                                            value="student"
                                            checked={input.role === 'student'}
                                            onChange={changeEventHandler}
                                            className="cursor-pointer"
                                        />
                                        <Label htmlFor="r1">Student</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Input
                                            type="radio"
                                            name="role"
                                            value="recruiter"
                                            checked={input.role === 'recruiter'}
                                            onChange={changeEventHandler}
                                            className="cursor-pointer"
                                        />
                                        <Label htmlFor="r2">Recruiter</Label>
                                    </div>
                                </RadioGroup>

                                <div className='flex items-center gap-2'>
                                    <Label>Profile</Label>
                                    <Input
                                        accept="image/*"
                                        type="file"
                                        onChange={changeFileHandler}
                                        className="cursor-pointer"
                                        required // Forces the user to pick a file before submitting
                                    />
                                </div>
                            </div>

                            {loading
                                ? <Button className="w-full my-4" disabled>
                                    <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait
                                  </Button>
                                : <Button type="submit" className="w-full my-4">Signup</Button>
                            }

                            <span className='text-sm'>
                                Already have an account? <Link to="/login" className='text-blue-600'>Login</Link>
                            </span>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup