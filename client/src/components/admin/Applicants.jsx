import { useEffect } from 'react';
import Navbar from '../shared/Navbar';
import ApplicantsTable from './ApplicantsTable';
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAllApplicants } from '@/redux/applicationSlice';
import UserHeader from '../UserHeader';

const Applicants = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { applicants } = useSelector(store => store.application);

  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const token = localStorage.getItem("token"); // ✅ get token
        if (!token) return;

        const res = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`, {
          headers: {
            Authorization: `Bearer ${token}` // ✅ send token
          }
        });

        dispatch(setAllApplicants(res.data.job));
      } catch (error) {
        console.error("Error fetching applicants:", error);
      }
    };

    if (params.id) {
      fetchAllApplicants();
    }
  }, [params.id, dispatch]);

  return (
    <div className='bg-[#F2F2F2] min-h-[100vh]'>
      <div className='conatiner'>
        <div className='navbar-conatiner'>
          <Navbar />
        </div>
        <div className='false-nav'></div>
        <div className='router-container'>
          <UserHeader />
          <div className='max-w-7xl mx-auto'>
            <h1 className='font-bold text-xl my-5'>Applicants {applicants?.applications?.length}</h1>
            <ApplicantsTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Applicants;
