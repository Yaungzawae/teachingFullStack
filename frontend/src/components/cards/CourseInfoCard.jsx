import React, { useState } from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { H3, H4, Muted } from "@/components/typography/typography";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChair } from "@fortawesome/free-solid-svg-icons";
import CourseEditForm from '../forms/CourseEditForm';

import axios from 'axios';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from '../ui/button';
import PaymentDialog from '../dialogs/PaymentDialog';

const CourseInfoCard = ({ courses_data, editable = false, bookable = false, onBook }) => {
  const [editCourse, setEditCourse] = useState(null);
  const [showStudents, setShowStudents] = useState(false);
  const [students, setStudents] = useState([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);

  const onEdit = (course) => {
    setEditCourse(course);
  };

  const viewStudents = async (students) => {
    try {
      const response = await axios.post(
        "/api/class/get-students",
        { students: students },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setStudents(response.data);
      setShowStudents(true);
    } catch (err) {
      console.error(err);
    }
  };

  const confirmDelete = (courseId) => {
    setCourseToDelete(courseId);
    setShowDeleteConfirm(true);
  };

  const onDelete = async () => {
    if (!courseToDelete) return;
    try {
      await axios.post(
        "/api/class/delete-class",
        { class_id: courseToDelete },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // Optionally refresh the courses list or remove the deleted course from the state
      setShowDeleteConfirm(false);
      setCourseToDelete(null);
    } catch (err) {
      console.error(err);
    }
  };
  const currentLang = localStorage.getItem("language");
  return (
    <Card className="max-w-[1176px] mx-auto px-8 py-4 my-10">
      <CardContent className="flex flex-col gap-x-8 gap-y-1">
        {courses_data.map((course) => (
          <React.Fragment key={course._id}>
            {editCourse && editCourse._id === course._id ? (
              <CourseEditForm
                defaultValues={editCourse}
                onCancel={() => setEditCourse(null)}
                _id={course._id}
              />
            ) : (
              <>
                <div className="flex justify-between items-center">
                  <div className="max-w-[66%]">
                    <H3>{currentLang == "en" ? course.title : course.title}</H3>
                    <Muted>{currentLang == "en" ? course.description : course.description}</Muted>
                    <div className="my-4">
                      {course.schedule.map((s) => (
                        <div className="my-2" key={s._id}>
                          <H4>
                            {currentLang == "en" ? `${s.day} - ${s.start_time} to ${s.end_time}` : `${s.day} - ${s.start_time} 到 ${s.end_time}`}
                          </H4>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <H4>{currentLang == "en" ? `${course.price}$` : `${course.price}$`}</H4>
                    <FontAwesomeIcon icon={faChair} />
                    <label>{currentLang == "en" ? `${course.booked_seat} / ${course.max_seat}` : `${course.booked_seat} / ${course.max_seat}`}</label>
                  </div>
                </div>
                {editable && (
                  <div className="mb-6 flex gap-4">
                    <Button onClick={() => onEdit(course)}>
                      {currentLang == "en" ? "Edit" : "編輯"}
                    </Button>
                    <Dialog open={showStudents} onOpenChange={setShowStudents}>
                      <DialogTrigger asChild>
                        <Button onClick={() => viewStudents(course.students)}>
                          {currentLang == "en" ? "View Students" : "查看學生"}
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>{currentLang == "en" ? "Students Enrolled" : "已註冊的學生"}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-2">
                          {students.map((student) => (
                            <div key={student._id} className="flex flex-col">
                              <H4>{currentLang == "en" ? student.name : student.name}</H4>
                              <Muted>{currentLang == "en" ? student.email : student.email}</Muted>
                            </div>
                          ))}
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
                      <DialogTrigger asChild>
                        <Button onClick={() => confirmDelete(course._id)}>
                          {currentLang == "en" ? "Delete" : "刪除"}
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>{currentLang == "en" ? "Confirm Deletion" : "確認刪除"}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-2">
                          <p>{currentLang == "en" ? "Are you sure you want to delete this course?" : "您確定要刪除此課程嗎？"}</p>
                          <div className="flex justify-end gap-4">
                            <Button variant="outline" onClick={() => setShowDeleteConfirm(false)}>
                              {currentLang == "en" ? "Cancel" : "取消"}
                            </Button>
                            <Button variant="destructive" onClick={onDelete}>
                              {currentLang == "en" ? "Delete" : "刪除"}
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                )}
                 {
                    bookable &&  <div className="mb-6">
                        <Button className="bg-green-600 hover:bg-green-700 mr-2 w-auto" onClick={() => onBook(course)}>{currentLang == "en" ? "Enroll" : "報名"}</Button>
                    </div>
                    }
              </>
            )}
            <hr />
          </React.Fragment>
        ))}
      </CardContent>
      {bookable && (
        <CardFooter>
          <Button className="bg-pink-900">{currentLang == "en" ? "Contact Teacher" : "聯繫教師"}</Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default CourseInfoCard;
