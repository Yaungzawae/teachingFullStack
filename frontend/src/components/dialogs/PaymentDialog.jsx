import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import StripeForm from "@/components/forms/StripeForm";

import { loadStripe } from "@stripe/stripe-js";

import { H1, H3, H4, P, Muted } from "../typography/typography";

import { Elements } from "@stripe/react-stripe-js";
import { useToast } from "../ui/use-toast";

import ManualPaymentForm from "@/components/forms/ManualPaymentForm";
import PromptPayForm from "../forms/PromptPayForm";
import PayPalForm from "../forms/PayPalForm";


const StripePromise = loadStripe("pk_test_51PjKPlRqzH8ZQ7Mc9KaWLMTlOxGPNwHJ4VQ68auhcbHNAmQwHwzsufd3g7J4A4nP83pkXsGlcnv38YRmXJa1v6nR00L1Eq960z");


const PaymentDialog = ({open, setOpen, selectedCourse, setSelectedCourse}) => {

    const {toast} = useToast();

    const type = selectedCourse.schedule == undefined ? "session"  : "class";

    const handlePaymentSuccess = () => {
        toast({ title: 'Course Registration successful!' });
        setOpen(false);
        setSelectedCourse(null);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>
                                <H1>
                                {selectedCourse.title}
                                    </H1></DialogTitle>
                            <DialogDescription>
                                <Muted>{selectedCourse.description}</Muted>
                            </DialogDescription>
                        </DialogHeader>
                        <div>
                            {selectedCourse?.schedule?.map((s) => (
                                <div className="" key={s._id}>
                                    <p>{type == "session" ? s.date : s.day} - {s.start_time} to {s.end_time}</p>
                                </div>
                            ))}
                        </div>
                        {selectedCourse.date ? <p>{selectedCourse.date} ||  {selectedCourse.start_time} - {selectedCourse.end_time}</p> : <></>}
                        <H3>Total: {selectedCourse.price}$</H3>

                        <Tabs defaultValue="stripe">
                            <TabsList className="flex">
                                <TabsTrigger value="paypal">PayPal</TabsTrigger>
                                <TabsTrigger value="stripe">Credit Card/Debit Card</TabsTrigger>
                                <TabsTrigger value="promptpay">PromptPay</TabsTrigger>
                                <TabsTrigger value="wise">Wise</TabsTrigger>
                                <TabsTrigger value="taiwanpay">中華郵政</TabsTrigger>
                            </TabsList>
                            <TabsContent value="paypal">
                                <PayPalForm courseId={selectedCourse._id} price={selectedCourse.price} type={type} onPaymentSuccess={handlePaymentSuccess}/>
                            </TabsContent>
                            <TabsContent value="stripe">
                                <Elements stripe={StripePromise}>
                                    <StripeForm courseId={selectedCourse._id} onPaymentSuccess={handlePaymentSuccess} type={type}/>
                                </Elements>
                            </TabsContent>
                            <TabsContent value="wise">
                                <ManualPaymentForm courseId={selectedCourse._id} price={selectedCourse.price} type={type} onPaymentSuccess={handlePaymentSuccess} paymentMethod="wise"/>
                            </TabsContent>
                            <TabsContent value="taiwanpay">
                                <ManualPaymentForm courseId={selectedCourse._id} price={selectedCourse.price} type={type} onPaymentSuccess={handlePaymentSuccess} paymentMethod="taiwanpay"/>
                            </TabsContent>
                            <TabsContent value="promptpay">
                                <Elements stripe={StripePromise}>
                                    <PromptPayForm courseId={selectedCourse._id} price={selectedCourse.price} onPaymentSuccess={handlePaymentSuccess} type={type}/>
                                </Elements>
                            </TabsContent>
                        </Tabs>
                    </DialogContent>
                </Dialog>
    )
}

export default PaymentDialog;