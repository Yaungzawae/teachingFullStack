import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { websiteUrl } from "@/uitility/url";

const TeacherCard = (props) => {
    return (
        <Card className="max-w-[400px] mx-auto aspect-square text-2xl select-none flex flex-col">
            <CardHeader className="flex justify-center text-center">
                <img width="200px" height="200px" src={`${websiteUrl}/${props.img}`} className="max-w-[500px] w-1/2 md:w-3/4 mx-auto block rounded-full"/>
                <h1 className="text-2xl lg:text-3xl pt-2"> {props.name}</h1>
            </CardHeader>
            {props.link && (
                <CardFooter className="mt-auto">
                    <Button asChild className="w-full bg-pink-500">
                        <a href={props.link}>See More</a>
                    </Button>
                </CardFooter>
            )}
        </Card>
    );
}

export default TeacherCard;