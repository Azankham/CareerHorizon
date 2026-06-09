import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { setSingleCompany } from '@/redux/companySlice';
import UserHeader from '../UserHeader';

const CompanyCreate = () => {
    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState('');
    const dispatch = useDispatch();

    const registerNewCompany = async () => {
        try {
            const token = localStorage.getItem("token"); // ✅ get token from localStorage
            if (!token) {
                toast.error("You are not authenticated.");
                return;
            }

            const res = await axios.post(
                `${COMPANY_API_END_POINT}/register`,
                { companyName },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}` // ✅ send token in header
                    }
                }
            );

            if (res?.data?.success) {
                dispatch(setSingleCompany(res.data.company));
                toast.success(res.data.message);
                const companyId = res?.data?.company?._id;
                navigate(`/admin/companies/${companyId}`);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Failed to create company");
        }
    };

    return (
        <div className='bg-[#F2F2F2] min-h-[100vh]'>
            <div className='conatiner'>
                <div className='navbar-conatiner'>
                    <Navbar />
                </div>
                <div className='false-nav'></div>
                <div className='router-container'>
                    <UserHeader />
                    <div className='max-w-4xl mx-auto'>
                        <div className='my-10'>
                            <h1 className='font-bold text-2xl'>Your Company Name</h1>
                            <p className='text-gray-500'>
                                What would you like to give your company name? You can change this later.
                            </p>
                        </div>

                        <Label>Company Name</Label>
                        <Input
                            type="text"
                            className="my-2"
                            placeholder="JobHunt, Microsoft etc."
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                        />
                        <div className='flex items-center gap-2 my-10'>
                            <Button variant="outline" onClick={() => navigate("/admin/companies")}>Cancel</Button>
                            <Button onClick={registerNewCompany}>Continue</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompanyCreate;
