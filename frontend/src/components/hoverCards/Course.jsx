import React, { useState } from 'react';
import axios from 'axios';
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import TeacherInfoCard from '../cards/TeacherInfoCard';

function CourseCard({ course }) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>{course.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 mb-2">{course.description}</p>
          <div className="mb-2">
            <strong>Start Date:</strong> {new Date(course.start_date).toLocaleDateString()}
          </div>
          <div className="mb-2">
            <strong>Price:</strong> ${course.price}
          </div>
          <div className="mb-2">
            <strong>Schedule:</strong> {course.schedule.map(s => (
              <div key={s._id}>{s.day}: {s.start_time} - {s.end_time}</div>
            ))}
          </div>
          <div className="mb-2">
            <strong>Status:</strong> {course.status}
          </div>
          <div className="mb-2">
            <strong>Seats:</strong> {course.booked_seat}/{course.max_seat}
          </div>
        </CardContent>
      </Card>
    );
}

function SessionCard({ session }) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>{session.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 mb-2">{session.description}</p>
          <div className="mb-2">
            <strong>Date:</strong> {new Date(session.date).toLocaleDateString()}
          </div>
          <div className="mb-2">
            <strong>Time:</strong> {session.start_time} - {session.end_time}
          </div>
          <div className="mb-2">
            <strong>Price:</strong> ${session.price}
          </div>
          <div className="mb-2">
            <strong>Status:</strong> {session.isBooked ? "Booked" : "Available"}
          </div>
        </CardContent>
      </Card>
    );
}

const CourseHoverCard = ({ courseId, type }) => {
  const [courseDetails, setCourseDetails] = useState(null);
  const [teacherDetails, setTeacherDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCourseDetails = async () => {
    setLoading(true);
    setError(null);
    try {
      const url = type === "session" ? '/api/session/get-one' : '/api/class/get-one';
      const course_response = await axios.post(url, { _id: courseId });
      const teacher_response = await axios.post("/api/teacher/get-one-teacher", {
        _id: course_response.data.teacher
      });
      setCourseDetails(course_response.data);
      setTeacherDetails(teacher_response.data);
      console.log(teacherDetails, teacher_response.data);
    } catch (err) {
      setError('Error fetching course details');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <Card className="bg-white shadow-md rounded-lg p-4 cursor-pointer" onClick={fetchCourseDetails}>
        <h2 className="text-xl font-bold mb-2">Click to see the course details</h2>
        {loading && <p className="text-gray-500">Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {teacherDetails && (
          <TeacherInfoCard tr_data={teacherDetails} isDeleteable={false} isEditable={false} fullScreen={true}/>
        )}
        {courseDetails && (
          type === "session" ? <SessionCard session={courseDetails} /> : <CourseCard course={courseDetails} />
        )}
      </Card>
    </div>
  );
};

export default CourseHoverCard;