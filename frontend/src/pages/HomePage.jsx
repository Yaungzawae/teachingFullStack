import { Button } from "@/components/ui/button"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import TeacherCard from "@/components/customs/TeacherCard"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import Autoplay from "embla-carousel-autoplay"
import { useLoaderData } from "react-router-dom"
import axios from "axios"
import TestimonialCard from "@/components/cards/TestimonialCard"
import { H1 } from "@/components/typography/typography"


const testimonials = [
  {
    id: 1,
    image: 'https://picsum.photos/200',
    quote: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat.",
    name: "Jenny",
    title: "Student one",
    align: 'left'
  },
  {
    id: 2,
    image: 'https://picsum.photos/200',
    quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    name: "John",
    title: "Student two",
    align: 'right'
  },
  {
    id: 3,
    image: 'https://picsum.photos/200',
    quote: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    name: "Jame",
    title: "Student three",
    align: 'left'
  }
];


function HomePage() {

  const teachers = useLoaderData();

  return (
    <div className="bg-pink-800 text-black">
      <div className="mx-auto">
        <div className="w-full aspect-square lg:h-[90vh]  bg-[url('./assets/bg.jpg')] bg-no-repeat bg-cover bg-right bg-opacity-50 flex justify-start align-bottom">
          <div className="w-1/2 h-full flex justify-center align-middle">
            <div className="md:w-1/2 ml-6 z-10 my-auto text-md md:text-lg lg:text-2xl xl:text-4xl flex flex-col justify-center text-white rounded-lg gap-2">
              <h5>歡迎來到</h5>
              <h1>Kru Cho Official </h1>
              <h5>語言教育中心</h5>

              <Button className="mt-2 sm:mt-3 md:mt-4 lg:mt-6 xl:mt-8 bg-pink-900">GET STARTED</Button>

          </div>
          </div>
        </div>

        <Card className="bg-pink-700 m-0 border-0">
          <CardHeader className="text-white">
            <H1 className="text-white my-8 text-center">Meet Our Teachers</H1>
          </CardHeader>
          <CardContent>
          <Carousel className="w-[95%] mx-auto">
            <CarouselContent>
              {teachers.map((teacher, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                    <TeacherCard image="https://picsum.photos/200" name={teacher.name} description={teacher.description} img={teacher.img} link={`/tr/${teacher._id}`}/>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          </CardContent>
        </Card>


        {/* <Card className="bg-pink-200 m-0 border-0 rounded-none">
          <CardHeader>
            <h1 className="text-3xl text-center">Testimonials</h1>
          </CardHeader>
          <CardContent>
          <Carousel className="w-[95%] mx-auto" 
          opts={{ align: "start", loop: true}}
          plugins={[
            Autoplay({
              delay: 4000,
            }),
          ]}
          >
            <CarouselContent>
              {Array.from({ length: 6 }).map((_, index) => (
                <CarouselItem key={index}>
                    <TestimonialCard name="MIKE" image="https://picsum.photos/200" text="
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio, similique, harum atque dolorem doloribus omnis aliquam accusamus magni nemo, praesentium minima eos eligendi iste ratione voluptatem est quos facilis architecto!
                    "/>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          </CardContent>
          
        </Card> */}


      </div>
        <div className="p-8 max-w-[800px] mx-auto">
          <H1 className="text-white text-center my-8">Testmonials</H1>
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
