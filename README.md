
# **CareerHorizon** 🚀

A full-stack, AI-driven platform that intelligently connects students with job opportunities and empowers recruiters with a powerful management dashboard.

---

## 💡 **Introduction**

**CareerHorizon** is a comprehensive platform designed to streamline the job search and recruitment process within academic and professional environments. It bridges the gap between aspiring students and hiring companies by leveraging **Artificial Intelligence** to provide personalized job recommendations, resume analysis, and a robust set of tools for both job-seekers and recruiters.

---

## ✨ **Key Features**

### **1. Intelligent Job Matching**

A proprietary AI engine calculates a **skill-based match percentage** between a user's profile and job requirements, providing personalized job recommendations to enhance the career discovery process.

### **2. AI Resume Analyzer**

An integrated AI tool provides:

* **Estimated ATS (Applicant Tracking System) compatibility score**
* **Interactive suggestions and chat**, enabling users to instantly improve their resumes to align with specific job descriptions.

### **3. Multi-Role User System**

Distinct dashboards for different user types:

**Students:**

* Manage profile and upload resumes
* Analyze resume compatibility
* Track job applications
* View personalized job recommendations

**Recruiters (Professors):**

* Post and manage job openings
* Add and manage companies
* Handle application pipelines efficiently

### **4. Dynamic Content Management**

* Recruiters can manage all job and company information
* Users securely manage their profiles and resumes
* Media assets are stored safely via **Cloudinary**

---

## 🛠 **Tech Stack**

**Backend:**

* Node.js
* Express.js
* MongoDB
* Cloudinary (for image & resume storage)

**Frontend:**

* React (Vite)
* Tailwind CSS

**AI Integration:**

* Gemini API for resume analysis and personalized recommendations

---

## 🎯 **Why CareerHorizon?**

* Simplifies the recruitment process for professors and recruiters
* Enhances students' job search experience with AI-powered suggestions
* Provides data-driven insights into applications and candidate skills
* Offers a secure and interactive platform for resume management

---

## 🚀 **Getting Started**

**1. Clone the repository:**

```bash
git clone https://github.com/your-username/careerhorizon.git
cd careerhorizon
```

**2. Install dependencies:**

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

**3. Configure environment variables:**

* Create a `.env` file in backend and frontend
* Example for backend:

```env
PORT=5000
MONGO_URI=your_mongodb_uri
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
SECRET_KEY=your_jwt_secret
```

**4. Start the application:**

```bash
# Backend
cd backend
npm run dev

# Frontend
cd ../frontend
npm run dev
```

**5. Visit the app:**
Frontend will be available at `http://localhost:5173` (Vite default)

---

## 📈 **Future Enhancements**

* Advanced AI algorithms for skill extraction and job matching
* Email notifications for job updates and application status
* Mobile-friendly interface for students and recruiters

---

## 💖 **Contributing**

Contributions are welcome! Please open an issue or submit a pull request.

---

## 📄 **License**

MIT License






        
