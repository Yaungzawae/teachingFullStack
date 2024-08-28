import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { websiteUrl } from "@/uitility/url";
import UserHoverCard from "../hoverCards/User";
import CourseHoverCard from "../hoverCards/Course";


const ManualPaymentCard = ({ entry, onSend, showButtons, showUser=true }) => {
    return (
        <Card className="py-4 my-2">
            <CardHeader>
                {showUser && <UserHoverCard userId={entry.studentId}/>}
                <CourseHoverCard courseId={entry.courseId} type={entry.type}/>
            </CardHeader>
            <CardContent>
                <p>Payment Method : {entry.paymentMethod}</p>
                {entry.paymentMethod == "Manual" ?
                <img src={`${websiteUrl}/${entry.img}`} width="400px" className="mx-auto" alt="Payment Proof" />
                : <></>
            }
            <p>Class Type : {entry.type}</p>
            <p>
  {
      new Date(parseInt(entry._id.toString().slice(0, 8), 16) * 1000)
      .toLocaleString('en-US', { 
          year: 'numeric', 
          month: '2-digit', 
          day: '2-digit', 
          hour: '2-digit', 
          minute: '2-digit', 
          second: '2-digit' 
        })
    }
</p>
            </CardContent>
            {showButtons && <CardFooter>
                <Button onClick={() => onSend(entry._id, "confirm")}>Accept</Button>
                <Button onClick={() => onSend(entry._id, "deny")}>Deny</Button>
            </CardFooter>}
        </Card>
    );
};

export default ManualPaymentCard;