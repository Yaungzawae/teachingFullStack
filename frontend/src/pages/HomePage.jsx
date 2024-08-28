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


function HomePage() {

  const teachers = useLoaderData();

  const teachersRef = useRef(null);

  const scroll = () => teachersRef.current.scrollIntoView();

  const lang = localStorage.getItem("language");

  const testimonials = [
    {
      id: 1,
      image: 'https://picsum.photos/200',
      quote: lang === "en" 
        ? "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat." 
        : "最小的不重要的不要，带有少量的短暂疼痛。官方的面料免除爱好者的带有任何的疼痛。练习的最高豁免。",
      name: lang === "en" ? "Jenny" : "珍妮",
      title: lang === "en" ? "Student one" : "学生一",
      align: 'left'
    },
    {
      id: 2,
      image: 'https://picsum.photos/200',
      quote: lang === "en" 
        ? "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." 
        : "在痛苦中，所有爱心都会带来各种痛苦。持续时间下的工作和疼痛。",
      name: lang === "en" ? "John" : "约翰",
      title: lang === "en" ? "Student two" : "学生二",
      align: 'right'
    },
    {
      id: 3,
      image: 'https://picsum.photos/200',
      quote: lang === "en" 
        ? "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." 
        : "为了提供豁免，我想免除豁免责任。",
      name: lang === "en" ? "Jame" : "詹姆斯",
      title: lang === "en" ? "Student three" : "学生三",
      align: 'left'
    }
  ];
  

  return (
    <div className="bg-pink-800 text-black">
      <div className="mx-auto">
        <div className="w-full aspect-square lg:h-[90vh]  bg-[url('./assets/bg.jpg')] bg-no-repeat bg-cover bg-right bg-opacity-50 flex justify-start align-bottom">
          <div className="w-1/2 h-full flex justify-center align-middle">
            <div className="md:w-1/2 ml-6 z-10 my-auto text-md md:text-lg lg:text-2xl xl:text-4xl flex flex-col justify-center text-white rounded-lg gap-2">
              <h5>
                {lang == "en" ? "Welcome" : "欢迎"}
              </h5>
              <h1>
                {lang == "en" ? "Kru Cho Official" : "Kru Cho 官方"}
              </h1>
              <h5>
                {lang == "en" ? "Language Education Center" : "语言教育中心"}
              </h5>

              <Button className="mt-2 sm:mt-3 md:mt-4 lg:mt-6 xl:mt-8 bg-pink-900" onClick={scroll}>
                {lang == "en" ? "GET STARTED" : "开始"}
              </Button>

            </div>
          </div>
        </div>

        <Card className="bg-pink-700 m-0 border-0" ref={teachersRef}>
          <CardHeader className="text-white">
            <H1 className="text-white my-8 text-center">
              {lang == "en" ? "Meet Our Teachers" : "认识我们的老师"}
            </H1>
          </CardHeader>
          <CardContent>
            <Carousel className="w-[95%] mx-auto">
              <CarouselContent>
                {teachers.map((teacher, index) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                    <TeacherCard 
                      image="https://picsum.photos/200" 
                      name={teacher.name} 
                      description={teacher.description} 
                      img={teacher.img} 
                      link={`/tr/${teacher._id}`}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </CardContent>
        </Card>
      </div>

      <div className="p-8 max-w-[800px] mx-auto">
        <H1 className="text-white text-center my-8">
          {lang == "en" ? "Testimonials" : "推荐"}
        </H1>
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
      </div>
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