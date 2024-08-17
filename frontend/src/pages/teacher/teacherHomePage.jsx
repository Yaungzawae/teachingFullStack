import { useLoaderData, useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { H1, H4, P } from "@/components/typography/typography";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faUser, faMessage } from "@fortawesome/free-solid-svg-icons";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import CourseCreateForm from "@/components/forms/CourseCreateForm";
import SessionCreateForm from "@/components/forms/SessionCreateForm";
import CourseInfoCard from "@/components/cards/CourseInfoCard";
import SessionInfoCard from "@/components/cards/SessionInfoCard";
import axios from "axios";
import { websiteUrl } from "@/uitility/url";
import { useState } from "react";
import TeacherInfoCard from "@/components/cards/TeacherInfoCard";

function TeacherHomepage(props) {
    const params = useParams();
    const { tr_data, courses_data, sessions_data } = useLoaderData();
    const [showCourseForm, setShowCourseForm] = useState(false);
    const [showSessionForm, setShowSessionForm] = useState(false);

    const toggleCourseForm = () => setShowCourseForm(!showCourseForm);
    const toggleSessionForm = () => setShowSessionForm(!showSessionForm);

    return (
        <div className="mx-3">
            {/* <Card className="max-w-[1176px] mx-auto px-8 py-4 my-10">
                <div className="flex">
                    <img src={`${websiteUrl}/${tr_data.img}`} className="w-[125px] rounded-3xl" alt="Teacher" />
                    <div className="flex flex-col justify-between ml-4">
                        <div>
                            <H1>{tr_data.name}</H1>
                            <p className="text-lg text-muted-foreground">{tr_data.email}</p>
                        </div>
                        <div className="flex items-center justify-center gap-4 text-md">
                            <div className="flex flex-col sm:flex-row justify-center items-center">
                                <FontAwesomeIcon icon={faStar} className="text-yellow-500 text-lg mr-1" />
                                <p>4.9/5</p>
                            </div>
                            <div className="flex flex-col sm:flex-row justify-center items-center">
                                <FontAwesomeIcon icon={faUser} className="text-yellow-500 text-lg mr-1" />
                                <span>500</span>
                            </div>
                            <div className="flex flex-col sm:flex-row justify-center items-center">
                                <FontAwesomeIcon icon={faMessage} className="text-yellow-500 text-lg mr-1" />
                                <span>99.9%</span>
                            </div>
                        </div>
                    </div>
                </div>

                <H4 className="mt-8">About Me</H4>
                <P>{tr_data.description}</P>
                <Button>Edit</Button>
            </Card> */}

            <TeacherInfoCard isEditable={true} tr_data={tr_data} />

            <Tabs defaultValue="courses" className="my-10">
                <TabsList className="flex">
                    <TabsTrigger value="courses">Courses</TabsTrigger>
                    <TabsTrigger value="sessions">Sessions</TabsTrigger>
                </TabsList>

                <TabsContent value="courses">
                    <div className="mb-4">
                        <Button onClick={toggleCourseForm} className="mx-auto block">
                            {showCourseForm ? "Hide Course Form" : "Create New Course"}
                        </Button>
                        {showCourseForm && (
                            <div className="mt-4">
                                <CourseCreateForm />
                            </div>
                        )}
                    </div>
                    <CourseInfoCard courses_data={courses_data} editable={true} />
                </TabsContent>

                <TabsContent value="sessions">
                    <div className="mb-4">
                        <Button onClick={toggleSessionForm} className="mx-auto block">
                            {showSessionForm ? "Hide Session Form" : "Create New Session"}
                        </Button>
                        {showSessionForm && (
                            <div className="mt-4">
                                <SessionCreateForm />
                            </div>
                        )}
                    </div>
                    <SessionInfoCard sessions_data={sessions_data} bookable={false} />
                </TabsContent>
            </Tabs>
        </div>
    );
}

export default TeacherHomepage;

export async function teacherHomePageLoader() {
    try {
        const tr_response = await axios.post(
            "/api/teacher/get-one-teacher",
            {},
            {
                headers: {
                    "Content-Type": "application/json",
                }
            }
        );

        const courses_response = await axios.post(
            "/api/class/get",
            {},
            {
                headers: {
                    "Content-Type": "application/json",
                }
            }
        );

        const session_response = await axios.post(
            "/api/session/get",
            {},
            {
                headers: {
                    "Content-Type": "application/json",
                }
            }
        );

        return {
            tr_data: tr_response.data,
            courses_data: courses_response.data,
            sessions_data: session_response.data,
        };
    } catch (err) {
        console.log(err);
    }
}
