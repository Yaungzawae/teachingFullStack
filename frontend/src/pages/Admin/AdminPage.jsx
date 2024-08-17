import ManualPaymentCard from "@/components/cards/ManualPaymentCard";
import TeacherInfoCard from "@/components/cards/TeacherInfoCard";
import TeacherCreateForm from "@/components/forms/TeacherCreateForm";
import { H1, H3 } from "@/components/typography/typography";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import axios from "axios";
import { useEffect, useState } from "react";

const AdminPage = () => {
    const [[pending, accepted, denied], setData] = useState([[], [], []]);
    const [teachers, setTeachers] = useState([]);

    const fetchData = async () => {
        try {
            const response = await axios.post("/api/payment/manual/get");
            const response2 = await axios.post("/api/teacher/get-all-teachers")
            setData(response.data);
            setTeachers(response2.data)
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const send = async (payment_id, type) => {
        try {
            await axios.post(
                `/api/payment/manual/${type}`,
                { payment_id },
                { headers: { "Content-Type": "application/json" } }
            );
            fetchData();
        } catch (error) {
            console.error("Error sending data:", error);
        }
    };

    return (
        <div className="container mx-auto px-4">
            <Tabs defaultValue="manualPayments" className="mb-8">
                <TabsList className="flex">
                    <TabsTrigger value="manualPayments">Manual Payments</TabsTrigger>
                    <TabsTrigger value="teachers">Manage Teachers</TabsTrigger>
                    <TabsTrigger value="teacher">Create Teacher</TabsTrigger>
                </TabsList>

                <TabsContent value="manualPayments">
                    <Tabs defaultValue="pending" className="mt-4">
                        <TabsList className="flex">
                            <TabsTrigger value="pending">Pending</TabsTrigger>
                            <TabsTrigger value="accepted">Accepted</TabsTrigger>
                            <TabsTrigger value="denied">Denied</TabsTrigger>
                        </TabsList>

                        <TabsContent value="pending">
                            {pending.length === 0 ? (
                                <H3>There are no pending requests</H3>
                            ) : (
                                pending.map((entry) => (
                                    <ManualPaymentCard key={entry._id} entry={entry} onSend={send} showButtons={true} />
                                ))
                            )}
                        </TabsContent>

                        <TabsContent value="accepted">
                            {accepted.length === 0 ? (
                                <H3>There are no accepted payments</H3>
                            ) : (
                                accepted.map((entry) => (
                                    <ManualPaymentCard key={entry._id} entry={entry} onSend={send} />
                                ))
                            )}
                        </TabsContent>

                        <TabsContent value="denied">
                            {denied.length === 0 ? (
                                <H3>There are no denied payments</H3>
                            ) : (
                                denied.map((entry) => (
                                    <ManualPaymentCard key={entry._id} entry={entry} onSend={send} />
                                ))
                            )}
                        </TabsContent>
                    </Tabs>
                </TabsContent>

                <TabsContent value="teachers">
                    {teachers.map(teacher => {
                        return <TeacherInfoCard isEditable={false} isDeleteable={true} tr_data={teacher}/>
                    })}
                </TabsContent>

                <TabsContent value="teacher">
                    <TeacherCreateForm />
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default AdminPage;