import { Card } from "../ui/card";

const TestimonialCard = ({ image, quote, name, title, align }) => {
    return (
      <Card className={`flex ${align === 'right' ? 'flex-row-reverse' : 'flex-row'} justify-center gap-6 items-center mb-8 bg-white px-8 py-16 flex-wrap`}>
        <img src={image} alt={name} className="w-[200px] aspect-square rounded-full shadow-md mr-4" />
        <div className="md:w-[50%] sm:w-[80%]">
          <p className="text-lg font-medium mb-2">"{quote}"</p>
          <p className="font-bold">{name}</p>
          <p className="text-gray-600">{title}</p>
        </div>
      </Card>
    );
  };

export default TestimonialCard;