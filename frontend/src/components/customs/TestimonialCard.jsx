import { Card, CardContent, CardHeader } from "../ui/card";



const TestimonialCard = (props) => {
    return (
        <Card className="bg-pink-200 m-0 border-0 rounded-none">
            <CardHeader>
                <img width="200px" height="200px" src={props.image} className="rounded-full mx-auto" />
                <h1 className="text-2xl my-2 text-center">{props.name}</h1>
            </CardHeader>
            <CardContent className="w-3/4 md:w-1/2 max-w-[800px] mx-auto">
                <p className="text-lg px-2 py-4 text-center">{props.text}</p>
            </CardContent>
        </Card>
    )
}

export default TestimonialCard;