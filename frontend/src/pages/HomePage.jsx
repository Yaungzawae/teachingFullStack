import { Button } from "@/components/ui/button"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import TeacherCard from "@/components/customs/TeacherCard"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import Autoplay from "embla-carousel-autoplay"
import { Link, useLoaderData } from "react-router-dom"
import axios from "axios"
import TestimonialCard from "@/components/cards/TestimonialCard"
import { H1 } from "@/components/typography/typography"
import { useRef } from "react"
import PromoSection from "@/components/sections/PromoSection"
import ContactSection from "@/components/sections/ContactSection"
import { TestmonialSection } from "@/components/sections/TestmonialSection"
import BookSection from "@/components/sections/BookSection"
import { TeacherSection } from "@/components/sections/TeachersSection"

function HomePage() {

  const teachers = useLoaderData();

  const teachersRef = useRef(null);
  const lang = localStorage.getItem("language");

  return (
    <div className="bg-gray-100 text-black">
      <div className="mx-auto">
        <div className="w-full aspect-square lg:h-[90vh]  bg-[url('./assets/bg.jpg')] bg-no-repeat bg-cover bg-left bg-opacity-50 flex justify-start align-bottom">
          {/* <div className="w-1/2 h-full flex justify-center align-middle">
            <div className="md:w-1/2 ml-6 z-10 my-auto text-md md:text-lg lg:text-2xl xl:text-4xl flex flex-col justify-center text-white rounded-lg gap-2">
              <h5>
                {lang == "en" ? "Welcome" : "歡迎"}
              </h5>
              <h1>Kru Cho Official </h1>
              <h5>語言教育中心</h5>

              <Button className="mt-2 sm:mt-3 md:mt-4 lg:mt-6 xl:mt-8 bg-pink-900" onClick={scroll}>
              {lang == "en" ? "GET STARTED" : "開始使用"}
              </Button>

          </div>
          </div> */}
        </div>
        
        <PromoSection teachersRef={teachersRef}/>
        <div className="max-w-[600px] mx-auto border-t-2 border-red-300 bg-white my-8"/>
        <ContactSection/>
        <div className="max-w-[600px] mx-auto border-t-2 border-red-300 my-8"/>
        <BookSection/>
        <div className="max-w-[600px] mx-auto border-t-2 border-red-300 my-8"/>
        <TestmonialSection/>

        <TeacherSection teachers={teachers} teachersRef={teachersRef}/>


        </div>

        {/* <Card className="bg-pink-700 m-0 border-0" ref={teachersRef}>
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
        </Card> */}


        {/* <div className="p-8 max-w-[800px] mx-auto">
          <H1 className="text-white text-center my-8">{lang == "en" ? "Testmonials":"感言"}</H1>
      {testimonials.map(testimonial => (
        <TestimonialCard
          key={testimonial.id}
          image={testimonial.image}
          quote={testimonial.quote}
          name={testimonial.name}
          title={testimonial.title}
          align={testimonial.align}
        />
      ))}
    </div> */}
    </div>
  )
}

export default HomePage;

export async function HomaepageLoader(){
  try{
      const response = await axios.post(
        "/api/teacher/get-all-teachers",
        {},
        {
            headers: {
                "Content-Type": "application/json",
            }
        }
    )
    console.log(response.data)
    return response.data
  } catch(err){
    console.log(err)
  }
}
