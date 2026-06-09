import { setAllAdminJobs } from '@/redux/jobSlice';
import { JOB_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useGetAllAdminJobs = () => {
  const dispatch = useDispatch();
  const { allAdminJobs } = useSelector((store) => store.job);

  useEffect(() => {
    const fetchAllAdminJobs = async () => {
      try {
        const token = localStorage.getItem("token"); // ✅ get token from localStorage
        if (!token) return;

        const res = await axios.get(`${JOB_API_END_POINT}/getadminjobs`, {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ attach token
          },
        });

        if (res.data.success) {
          dispatch(setAllAdminJobs(res.data.jobs));
        }
      } catch (error) {
        console.error("Error fetching admin jobs:", error);
      }
    };

    fetchAllAdminJobs();
  }, [dispatch]);

  return allAdminJobs; // can still use from redux directly
};

export default useGetAllAdminJobs;
