import { Card, CardHeader, CardContent, CardTitle, CardFooter } from "@/components/ui/card";
import { Fragment } from "react";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleRight, faChair, faCheck, faCircle, faMessage, faStar, faUser, faXmark } from "@fortawesome/free-solid-svg-icons";

import { H1, H3, H4, Muted, P } from "@/components/typography/typography";
import { Button } from "../ui/button";




const CourseInfoCard = ({courses_data, editable=false, bookable=false, onBook, onEdit}) => {
    return (
        <Card className="max-w-[900px] mx-auto px-8 py-4 my-10">
        <CardContent className="flex flex-col gap-x-8 gap-y-1">
            {courses_data.map((course) => (
                <Fragment key={course._id}>
                    <div className="flex justify-between items-center">
                        <div className="max-w-[66%]">
                            <H3>{course.title}</H3>
                            <Muted>{course.description}</Muted>
                            <div className="my-4">
                                {course.schedule.map((s) => (
                                    <div className="my-2" key={s._id}>
                                        <H4>{s.day} - {s.start_time} to {s.end_time}</H4>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <H4>{course.price}$</H4>
                            <FontAwesomeIcon icon={faChair} />
                            <label>{course.booked_seat} / {course.max_seat}</label>
                        </div>
                    </div>
                    {
                    bookable &&  <div className="mb-6">
                        <Button className="bg-green-600 hover:bg-green-700 mr-2 w-auto" onClick={() => onBook(course)}>Enroll Now</Button>
                    </div>
                    }
                    {
                    editable && <div className="mb-6">
                        <Button>Edit</Button>
                        <Button>View Students</Button>
                    </div>
                    }
                    <hr />
                </Fragment>
            ))}
        </CardContent>
        <CardFooter>
            <Button className="bg-pink-900"> Contact Teacher </Button>
        </CardFooter>
    </Card>
    )
}

export default CourseInfoCard;