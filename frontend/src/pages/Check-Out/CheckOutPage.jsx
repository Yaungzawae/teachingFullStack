import { H3, H4, Muted } from "@/components/typography/typography";

const CheckOutPage = (prop) => {
    const { course } = prop;
    return <div className="flex w-[800px]">
        <H3>{course.title}</H3>
        <Muted>{course.description}</Muted>

        <div className="my-4">
            {course.schedule.map(s => {
                return (
                    <div className="my-2">
                        <H4>{s.day} - {s.start_time} to {s.end_time}</H4>

                    </div>
                )
            })}
        </div>
    </div>
}


export default CheckOutPage;


