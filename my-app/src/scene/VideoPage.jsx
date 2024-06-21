import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import data from './HomeData';
import Navbar from '../components/Navbar'


const VideoPage = () => {
    const { courseId } = useParams();
    const [course, setCourse] = useState(null);

    useEffect(() => {
        const fetchData = () => {
            const courseIdNum = parseInt(courseId, 10); // Convert courseId to number
            const foundCourse = data.find(item => item.id === courseIdNum);
            if (foundCourse) {
                setCourse(foundCourse);
            } else {
                console.log("Data not found");
            }
        };

        fetchData();
    }, [courseId]);

    return (
        <div>
        <Navbar/>
            {course ? (
                <div>
                    <iframe
                        width="560"
                        height="315"
                        src={course.url}
                        title="YouTube video player"
                        // frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                    >yousef</iframe>
                    <h2>{course.title}</h2>
                    <p>{course.channel}</p>
                    <p>{course.views} • {course.createdAt}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default VideoPage;
