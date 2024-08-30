import TeacherCard from "../customs/TeacherCard"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
  } from "@/components/ui/carousel"
import { H1 } from "../typography/typography"


export const TeacherSection = ({teachers, teachersRef}) => {
    const lang = localStorage.getItem("language");
    return (
    <Card className="bg-pink-700 border-0 pb-16 rounded-none" ref={teachersRef}>
        <CardHeader className="text-white">
        <H1 className="text-white my-8 text-center">{lang == "en" ? "Meet Our Teacher":"認識我們的老師"}</H1>
        </CardHeader>
        <CardContent>
        <Carousel className="w-[95%] mx-auto">
        <CarouselContent>
            {teachers.map((teacher, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                <TeacherCard name={teacher.name} description={teacher.description} img={teacher.img} link={`/tr/${teacher._id}`}/>
            </CarouselItem>
            ))}
        </CarouselContent>
        </Carousel>
        </CardContent>
  </Card>
    )
}


