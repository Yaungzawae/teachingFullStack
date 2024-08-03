import { useLoaderData } from "react-router-dom";
import { H3} from "@/components/typography/typography";
import { useState } from "react";

import axios from "axios";
import PaymentDialog from "@/components/dialogs/PaymentDialog";
import TeacherInfoCard from "@/components/cards/TeacherInfoCard";
import CourseInfoCard from "@/components/cards/CourseInfoCard";

function TeacherDetailPage() {
    const [open, setOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);;
    const { tr_data, courses_data } = useLoaderData();

    const onBook = (course) => {
        setSelectedCourse(course);
        setOpen(true);
    };

    return (
        <div className="mx-3">
            <TeacherInfoCard tr_data={tr_data} editable={true}/>

            <div className="max-w-[900px] mx-auto">
                <H3>Courses</H3>
            </div>

            <CourseInfoCard courses_data={courses_data} bookable={true} onBook={onBook}/>

            {selectedCourse && (
                <PaymentDialog open={open} setOpen={setOpen} selectedCourse={selectedCourse} setSelectedCourse={setSelectedCourse}/>
            )}
        </div>
    );
}

export default TeacherDetailPage;

export async function teacherDetailPageLoader({ params }) {
    try {
        const tr_response = await axios.post(
            "/api/teacher/get-one-teacher",
            { _id: params.name },
            {
                headers: {
                    "Content-Type": "application/json" },
            }
        );

        const courses_response = await axios.post(
            "/api/class/get",
            { _id: params.name },
            {
                headers: {
                    "Content-Type": "application/json" },
            }
        );

        return {
            tr_data: tr_response.data,
            courses_data: courses_response.data
        };
    } catch (err) {
        console.log(err);
    }
}