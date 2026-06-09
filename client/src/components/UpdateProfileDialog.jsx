import { useState } from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';
import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

const predefinedSkills = [
  "JavaScript", "React", "Python", "Machine Learning", "TensorFlow", "Node.js",
  // ... other skills
];

const UpdateProfileDialog = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector(store => store.auth);
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills?.join(", ") || "",
    file: user?.profile?.resume || ""
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const extractSkills = async (file) => {
    setLoading(true);
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = async () => {
      try {
        const pdf = await pdfjsLib.getDocument({ data: reader.result }).promise;
        let text = "";
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          text += content.items.map(item => item.str).join(" ") + " ";
        }
        const detectedSkills = predefinedSkills.filter(skill =>
          text.toLowerCase().includes(skill.toLowerCase())
        );
        setInput(prev => ({ ...prev, skills: detectedSkills.join(", ") }));
      } catch (error) {
        console.error("Error extracting text from PDF:", error);
        toast.error("Failed to extract skills from the resume.");
      } finally {
        setLoading(false);
      }
    };
  };

  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput({ ...input, file });
      extractSkills(file);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);
    if (input.file) formData.append("file", input.file);

    try {
      setLoading(true);

      // ✅ fetch token from localStorage
      const token = localStorage.getItem("token");

      const res = await axios.post(
        `${USER_API_END_POINT}/profile/update`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${token}` // ✅ send token here
          }
        }
      );

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-[800px]" onInteractOutside={() => setOpen(false)}>
        <DialogHeader>
          <DialogTitle>Update Profile</DialogTitle>
        </DialogHeader>
        <form onSubmit={submitHandler}>
          <div className='grid gap-4 py-4'>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor="fullname" className="text-right">Name</Label>
              <Input id="fullname" name="fullname" type="text" value={input.fullname} onChange={changeEventHandler} className="col-span-3" />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor="email" className="text-right">Email</Label>
              <Input id="email" name="email" type="email" value={input.email} onChange={changeEventHandler} className="col-span-3" />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor="phoneNumber" className="text-right">Number</Label>
              <Input id="phoneNumber" name="phoneNumber" value={input.phoneNumber} onChange={changeEventHandler} className="col-span-3" />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor="bio" className="text-right">Bio</Label>
              <Input id="bio" name="bio" value={input.bio} onChange={changeEventHandler} className="col-span-3" />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor="skills" className="text-right">Skills</Label>
              <Input id="skills" name="skills" value={input.skills} onChange={changeEventHandler} className="col-span-3" />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor="file" className="text-right">Resume</Label>
              <Input id="file" name="file" type="file" accept="application/pdf" onChange={fileChangeHandler} className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            {loading ? 
              <Button disabled className="w-full">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...
              </Button> 
              : <Button type="submit" className="w-full">Update</Button>}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

// Add PropTypes for props validation
UpdateProfileDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired
};

export default UpdateProfileDialog;
