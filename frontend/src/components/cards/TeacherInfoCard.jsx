import { Card } from "../ui/card";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleRight, faChair, faCheck, faCircle, faMessage, faStar, faUser, faXmark } from "@fortawesome/free-solid-svg-icons";
import { H1, H4, P } from "../typography/typography";

const TeacherInfoCard = ({tr_data}) => {
    return (
        <Card className="max-w-[900px] mx-auto px-8 py-4 my-10">
                <div className="flex">
                    <img width="125px" height="125px" src={tr_data.img} className="rounded-full w-[125px]" />
                    <div className="flex flex-col justify-between ml-4">
                        <div>
                            <H1>{tr_data.name}</H1>
                            <p className="text-lg text-muted-foreground">{tr_data.email}</p>
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
                <P>{tr_data.description}</P>
            </Card>
    )
}

export default TeacherInfoCard;