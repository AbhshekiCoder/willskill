import CoursesBanner from "./Courses/CoursesBanner";
import Navbar from "../Components/Navbar";
import '../CSS/course.css'
import CoursesCriteria from "./Courses/CoursesCriteria";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiBookOpen, FiHome, FiMail } from "react-icons/fi";

function Courses({sidebar_open, profile, logout}) {
    const url = import.meta.env.VITE_URL;
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const fetchCourse = async() => {
        try {
            const id = localStorage.getItem('id');
            if (!id) {
                setError("No course selected");
                setLoading(false);
                return;
            }
            
            const result = await axios.get(`${url}course_detail/${id}/course_detail/${id}`);
            setData(result.data);
        } catch (err) {
            setError("Failed to load course details");
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchCourse();
    }, []);

    if (loading) {
        return (
            <>
                <Navbar sidebar_open={sidebar_open} profile={profile} logout={logout}/>
                <motion.div 
                    className="course-status-container"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    <motion.div 
                        className="loading-spinner"
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    />
                    <p>Loading course details...</p>
                </motion.div>
            </>
        );
    }

    if (error || !data) {
        return (
            <>
                <Navbar sidebar_open={sidebar_open} profile={profile} logout={logout}/>
                <motion.div 
                    className="course-status-container"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <motion.div 
                        className="no-course-illustration"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <FiBookOpen size={80} color="#6B7280" />
                    </motion.div>
                    
                    <h2>No Course Available</h2>
                    <p className="subtext">We couldn't find any course associated with your account.</p>
                    
                    <div className="action-buttons">
                        <motion.button
                            className="primary-button"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => navigate('/')} // Redirect to home
                        >
                            <FiHome className="button-icon" />
                            Browse Courses
                        </motion.button>
                        
                        <motion.button
                            className="secondary-button"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                        >
                            <FiMail className="button-icon" />
                            Contact Support
                        </motion.button>
                    </div>
                </motion.div>
            </>
        );
    }

    return (
        <>
            <Navbar sidebar_open={sidebar_open} profile={profile} logout={logout}/>
            <CoursesBanner data={data}/>
            <CoursesCriteria data={data}/>
        </>
    );
}

export default Courses;