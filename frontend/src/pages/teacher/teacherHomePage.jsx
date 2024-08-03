import { useLoaderData, useParams } from "react-router-dom";

import { Card, CardHeader, CardContent, CardTitle, CardFooter } from "@/components/ui/card";
import { H1, H3, H4, Muted, P } from "@/components/typography/typography";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleRight, faChair, faCheck, faCircle, faMessage, faStar, faUser, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Fragment, useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button";
import { TimeTableCell } from "@/components/timetable/TimeTable";
import CourseCreateForm from "@/components/forms/CourseCreateForm";
import axios from "axios";






function teacherHomepage(props){
    const params = useParams();
    const {tr_data, courses_data} = useLoaderData();


    return (
        <div className="mx-3">

            <Card className="max-w-[1176px] mx-auto px-8 py-4 my-10">
                <div className="flex">
                    <img width="125px" height="125px" src={tr_data.img} className="rounded-full w-[125px]" />
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
            </Card>

            <CourseCreateForm/>

            <div className="flex flex-wrap gap-4 max-w-[1176px] mx-auto py-4 my-10 justify-stretch">
                {courses_data.map((course)=>{
                    return (
                        <Card className="w-full sm:w-1/2 md:w-1/3 lg:w-auto px-8 py-4">
                            <CardHeader>
                                <CardTitle>{course.title}</CardTitle>
                                <Muted>{course.description}</Muted>
                                
                            </CardHeader>
                            <CardContent>
                                    {course.schedule.map(t => {
                                        // return <H4>{t.day} {t.start_time} to {t.end_time}</H4>
                                        return <div className="my-4">
                                            <H3>{t.day}</H3>
                                            <H4>{t.start_time} to {t.end_time}</H4>
                                        </div>
                                    })}
                                    <FontAwesomeIcon icon={faChair}/>
                                    <label>{course.booked_seat} / {course.max_seat}</label>
                            </CardContent>
                            <CardFooter>
                                    <H3>{course.price}$</H3>
                            </CardFooter>
                        </Card>
                    )
                })}
            </div>

           

            
        </div>
        )
    }


export default teacherHomepage;

export async function teacherHomePageLoader(){
    try{
        const tr_response = await axios.post(
            "/api/teacher/get-one-teacher",
            {},
            {
                headers: {
                    "Content-Type": "application/json",
                }
            }
        )
        console.log(tr_response.data);

        const courses_response = await axios.post(
            "/api/class/get",
            {},
            {
                headers: {
                    "Content-Type": "application/json",
                }
            }
        )
        console.log(courses_response.data)

        return {
            tr_data: tr_response.data, 
            courses_data: courses_response.data
        };
    } catch(err){
        console.log(err)
    }


    // return {
    //     profile_img: "https://picsum.photos/200",
    //     name: "Mike",
    //     position: "Thai Teacher",
    //     text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel accusantium minima corrupti id, dolores tenetur soluta voluptas facilis reprehenderit eos commodi impedit ut, perspiciatis labore assumenda dignissimos quas consequuntur necessitatibus.",
    //     video: "this is the video",
    // }

}

