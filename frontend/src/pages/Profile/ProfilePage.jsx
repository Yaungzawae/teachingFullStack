import ManualPaymentCard from "@/components/cards/ManualPaymentCard";
import { H4, Muted } from "@/components/typography/typography";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { websiteUrl } from "@/uitility/url";
import { Separator } from "@radix-ui/react-select";
import axios from "axios";
import { Car } from "lucide-react";
import { Fragment } from "react";
import { useLoaderData } from "react-router-dom";

const ProfilePage = (props) => {
    const { user_data, payments_data } = useLoaderData();

    return (
        <Card className="max-w-[1176px] mx-auto mt-8 p-6 shadow-lg rounded-lg">
            <CardHeader className="mb-4 border-b pb-4">
                <H4 className="text-2xl font-semibold">{user_data?.name || "Unknown User"}</H4>
                <Muted className="text-gray-600">{user_data?.email || "No email provided"}</Muted>
            </CardHeader>
            <CardContent>
                <CardTitle className="text-lg font-medium mb-4">Payment History</CardTitle>
                {
                    payments_data?.length > 0 ? (
                        payments_data.map((payment, index) => (
                            <Fragment>
                                <ManualPaymentCard entry={payment} showUser={false}/>
                                <hr className="my-10"/>
                            </Fragment>
                    ))) : (
                        <p className="text-center text-gray-500">No payment history available.</p>
                    )
                }
            </CardContent>
        </Card>
    );
}

export default ProfilePage;

export const ProfilePageLoader = async () => {
    try {
        const user_response = await axios.post("/api/user/get-one-user");
        const payments_response = await axios.post("/api/payment/get");

        return {
            user_data: user_response.data,
            payments_data: payments_response.data
        };
    } catch (err) {
        console.error("Error fetching profile data:", err);

        if (err.response && err.response.status === 400) {
            console.error("Bad Request Error:", err.response.data);
        } else if (err.code === "ERR_NETWORK") {
            console.error("Network Error: Please check your connection.");
        } else {
            console.error("Unexpected Error:", err);
        }

        // Return fallback data to prevent component from breaking
        return {
            user_data: {
                name: "Unknown User",
                email: "Please login to see info",
            },
            payments_data: []
        };
    }
}