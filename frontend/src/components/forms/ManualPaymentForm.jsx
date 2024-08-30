import { z } from "zod";
import { Muted } from "../typography/typography";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import axios from "axios";
import { useState } from "react";

const formSchema = z.object({
    img: z.instanceof(File, {
        message: "Please upload the screenshot of the transaction."
    })
});

const ManualPaymentForm = ({ courseId, price, type, onPaymentSuccess, paymentMethod }) => {
    const [error, setError] = useState(null);
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            img: null
        }
    });

    const { handleSubmit, reset, register } = form;

    const onSubmit = async (data) => {
        setError(null);
        const formData = new FormData();
        formData.append("courseId", courseId);
        formData.append("amount", price);
        formData.append("type", type);
        formData.append("img", data.img);

        try {
            const response = await axios.post(
                "/api/payment/manual/register",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    }
                }
            );
            reset();
            onPaymentSuccess();
        } catch (err) {
            setError(err.response?.data?.errors?.message || 'An error occurred during payment.');
            console.log(err);
        }
    };

    return (
        <Form {...form}>
            {paymentMethod == "wise" ? 
            <h2 className="my-3">For Wise, please transfer to this account: <b>liyangcho09@gmail.com</b></h2> :
            <h2 className="my-3">中華郵政（700）轉入帳號: <b>0101628-0264815</b></h2> 
            }
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 max-w-[500px] mx-auto">
                <FormField
                    control={form.control}
                    name="img"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>請上傳付款證明</FormLabel>
                            <FormControl>
                                <Input
                                    type="file"
                                    accept=".png, .jpg, .jpeg"
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        if (file && /\.(png|jpe?g)$/i.test(file.name)) {
                                            field.onChange(file);
                                        } else {
                                            alert("Please upload a valid image file (PNG, JPG, or JPEG)");
                                            e.target.value = null; // Clear the invalid file input
                                        }
                                    }}
                                    className="max-w-[500px]"
                                />
                            </FormControl>
                            <FormDescription>
                                <Muted>This might take some time for the admins to confirm the transactions</Muted>
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {error && <p className="text-red-500">{JSON.stringify(error)}</p>}
                <Button type="submit" className="block mx-auto">提交</Button>
            </form>
        </Form>
    );
}

export default ManualPaymentForm;