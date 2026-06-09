import { setSingleCompany } from '@/redux/companySlice';
import { COMPANY_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const useGetCompanyById = (companyId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSingleCompany = async () => {
      try {
        const token = localStorage.getItem("token"); // ✅ get token
        if (!token) return;

        const res = await axios.get(`${COMPANY_API_END_POINT}/get/${companyId}`, {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ send token
          },
        });

        console.log(res.data.company);
        if (res.data.success) {
          dispatch(setSingleCompany(res.data.company));
        }
      } catch (error) {
        console.error("Error fetching company:", error);
      }
    };

    if (companyId) {
      fetchSingleCompany();
    }
  }, [companyId, dispatch]);
};

export default useGetCompanyById;
