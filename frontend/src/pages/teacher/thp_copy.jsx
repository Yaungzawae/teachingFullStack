import { useLoaderData, useParams } from "react-router-dom";

import { Card, CardHeader, CardContent, CardTitle, CardFooter } from "@/components/ui/card";
import { H1, H3, H4, Muted, P } from "@/components/typography/typography";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleRight, faCheck, faCircle, faMessage, faStar, faUser, faXmark } from "@fortawesome/free-solid-svg-icons";
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




function teacherHomepage(props){
    const params = useParams();
    const data = useLoaderData();

    const [timeTable, setTimetable] = useState(data.timeTable);
    const [transposed, setTransposed] =  useState(transposeTimeTable(timeTable));

    const [removedStudents, setRemovedStudents] = useState([]);

    useEffect(() => {
        setTransposed(transposeTimeTable(timeTable));
    }, [timeTable]);
    

    const changeTimeTable = (date, periodIndex, newValue) => {
        setTimetable(prevState => ({
            ...prevState,
            [date]: prevState[date].map((value, index) => index === periodIndex ? newValue : value)
        }));
    };

    function removeStudent(date, periodIndex, id){
        changeTimeTable(date, periodIndex, "A");
        setRemovedStudents(prev => ([...prev, id]))
    }
    return (
        <div className="mx-3">

            <Card className="max-w-[1176px] mx-auto px-8 py-4 my-10">
                <div className="flex">
                    <img width="125px" height="125px" src={data.profile_img} className="rounded-full w-[125px]" />
                    <div className="flex flex-col justify-between ml-4">
                        <div>
                            <H1>Kru Cho</H1>
                            <p className="text-lg text-muted-foreground">{data.position}</p>
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
                <P>{data.text}</P>
                <Button>Edit</Button>
            </Card>


            <div className="max-w-[1176px] mx-auto">
                <H3>Schedules</H3>
            </div>

            <Card className="max-w-[1176px] mx-auto px-8 py-4 my-10">

                <CardContent>
                    <Table className="border-spacing-2">
                        <TableCaption>
                            <div className="flex gap-2 items-center ">
                                <div className="w-4 h-4 bg-green-300" />
                                <p> - Available Slots</p>
                            </div>
                            <div className="flex gap-2 items-center">
                                <div className="w-4 h-4 bg-red-500" />
                                <p> - Booked by others</p>
                            </div>
                            <div className="flex gap-2 items-center">
                                <div className="w-4 h-4 bg-black" />
                                <p> - Unavailable Slots</p>
                            </div>
                            <div className="flex gap-2 items-center">
                                <FontAwesomeIcon icon={faCircle} className="w-4 h-4 text-white bg-green-300" />
                                <p> - Not Selected By You</p>
                            </div>
                            <div className="flex gap-2 items-center">
                                <FontAwesomeIcon icon={faCheck} className="w-4 h-4 text-green-700" />
                                <p> - Selected By You</p>
                            </div>

                        </TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead></TableHead>
                                {Object.keys(timeTable).map(x => {
                                    return <TableHead className="text-center">{x}</TableHead>
                                })}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                transposed.map((x, index1) => {
                                    return (
                                        <Fragment>
                                            <TableRow>
                                                <TableHead className="min-w-[50px]">{index1 + 8} - {index1 + 9}</TableHead>
                                                {Object.entries(x).map(([key, value], index) => (
                                                    <TimeTableCell type={value} day={key} time={index1} key={key+index} userId="1" changeTimeTable={changeTimeTable} removeStudent={removeStudent} removedStudents={removedStudents} setRemovedStudents={setRemovedStudents} role="teacher"/>
                                                    // <TableCell key={index}>{key}: {value}</TableCell>
                                                ))}
                                            </TableRow>
                                        </Fragment>
                                    )
                                })
                            }
                        </TableBody>
                    </Table>
                </CardContent>

            </Card>

            {removedStudents.map(student => {
                return <P>{student}</P>
            })}

        </div>
    )
}

export default teacherHomepage;

export async function teacherHomePageLoader(){

    const timeTable = {
        "21": ["2", "1", "U", "1", "1", "2", "U", "A", "1", "2", "U", "A", "1", "2"],
        "22": ["1", "2", "U", "A", "1", "2", "U", "A", "1", "2", "U", "A", "1", "2"],
        "23": ["1", "2", "U", "2", "1", "2", "U", "A", "1", "2", "U", "A", "1", "2"],
        "24": ["1", "2", "U", "A", "1", "2", "U", "A", "1", "2", "U", "A", "1", "2"],
        "25": ["1", "2", "U", "A", "1", "2", "U", "A", "1", "2", "U", "A", "1", "2"],
        "26": ["1", "2", "U", "A", "1", "2", "U", "A", "1", "2", "U", "A", "1", "2"],
        "27": ["1", "2", "U", "A", "1", "2", "U", "A", "1", "2", "U", "A", "1", "2"],
    }

    return {
        profile_img: "https://picsum.photos/200",
        name: "Mike",
        position: "Thai Teacher",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel accusantium minima corrupti id, dolores tenetur soluta voluptas facilis reprehenderit eos commodi impedit ut, perspiciatis labore assumenda dignissimos quas consequuntur necessitatibus.",
        video: "this is the video",
        timeTable
    }

}

function transposeTimeTable(timeTable) {
    // Extract dates (keys) and the number of periods (length of arrays)
    const dates = Object.keys(timeTable);
    const periodsCount = timeTable[dates[0]].length;

    // Initialize the transposed timetable
    const transposedTable = [];

    // Iterate over each period
    for (let i = 0; i < periodsCount; i++) {
        const row = {};

        // For each period, iterate over each date and collect the data
        dates.forEach(date => {
            row[date] = timeTable[date][i];
        });

        // Add the row to the transposed table
        transposedTable.push(row);
    }

    return transposedTable;
}

