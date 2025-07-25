import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function MyCourses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('http://localhost:5000/api/my-courses', {
        headers: { Authorization: `Bearer ${token}` }
      }).then(res => {
        setCourses(res.data);
      });
    }
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">My Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {courses.map(course => (
          <div key={course._id} className="border p-4 rounded shadow">
            <img src={course.thumbnail} alt={course.title} className="mb-2" />
            <h3 className="text-lg">{course.title}</h3>
            <p>{course.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}