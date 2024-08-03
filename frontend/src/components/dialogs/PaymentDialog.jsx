import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import StripeForm from "@/components/forms/StripeForm";

import { loadStripe } from "@stripe/stripe-js";

import { H1, H3, H4, P, Muted } from "../typography/typography";

import { Elements } from "@stripe/react-stripe-js";
import { useToast } from "../ui/use-toast";





const StripePromise = loadStripe("pk_test_51PjKPlRqzH8ZQ7Mc9KaWLMTlOxGPNwHJ4VQ68auhcbHNAmQwHwzsufd3g7J4A4nP83pkXsGlcnv38YRmXJa1v6nR00L1Eq960z");


const PaymentDialog = ({open, setOpen, selectedCourse, setSelectedCourse}) => {

    const {toast} = useToast();

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
                            {selectedCourse.schedule.map((s) => (
                                <div className="" key={s._id}>
                                    <H4>{s.day} - {s.start_time} to {s.end_time}</H4>
                                </div>
                            ))}
                        </div>
                        <H1>Total: {selectedCourse.price}$</H1>

                        <Tabs defaultValue="stripe">
                            <TabsList className="flex">
                                <TabsTrigger value="paypal">PayPal</TabsTrigger>
                                <TabsTrigger value="stripe">Stripe</TabsTrigger>
                                <TabsTrigger value="promptpay">PromptPay</TabsTrigger>
                            </TabsList>
                            <TabsContent value="paypal">Make changes to your account here.</TabsContent>
                            <TabsContent value="stripe">
                                <Elements stripe={StripePromise}>
                                    <StripeForm courseId={selectedCourse._id} onPaymentSuccess={handlePaymentSuccess} />
                                </Elements>
                            </TabsContent>
                        </Tabs>
                    </DialogContent>
                </Dialog>
    )
}

export default PaymentDialog;