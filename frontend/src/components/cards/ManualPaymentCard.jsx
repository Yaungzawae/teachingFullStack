import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { websiteUrl } from "@/uitility/url";
import UserHoverCard from "../hoverCards/User";


const ManualPaymentCard = ({ entry, onSend, showButtons }) => {
    return (
        <Card className="py-4 my-2">
            <CardHeader>
                <UserHoverCard userId={entry.studentId}/>
            </CardHeader>
            <CardContent>
                <img src={`${websiteUrl}/${entry.img}`} width="400px" className="mx-auto" alt="Payment Proof" />
            </CardContent>
            {showButtons && <CardFooter>
                <Button onClick={() => onSend(entry._id, "confirm")}>Accept</Button>
                <Button onClick={() => onSend(entry._id, "deny")}>Deny</Button>
            </CardFooter>}
        </Card>
    );
};

export default ManualPaymentCard;