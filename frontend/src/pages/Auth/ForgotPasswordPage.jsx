import React, { useState } from "react";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"
import { isEmailValid } from "@/uitility/email";


const ForgotPasswordPage = ({ type }) => {
    const { toast } = useToast();
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const togglePassword = () => {
        setShowPassword(!showPassword);
    }

    let url = "/api/auth/forgot-password";
    let nav_url = "/login";

    const form = useForm({
        defaultValues: {
            email: '',
            otp: '',
            password: ''
        },
        mode: 'onChange',
    });

    const { setError } = form;

    const getOtp = (data) => {
        const email = form.getValues("email");
        if(!isEmailValid(email)){
            setError("email", {message: "Please enter a valid email"})
            return
        }
        axios.post(
            "/api/auth/getOtp",
            JSON.stringify({email}),
            {
                headers: {
                    "Content-Type": "application/json",
                }
            }
        )
        toast({
            title: "Requesting OTP",
            description: "Sent OTP to " + email
        })
    }

    const onSubmit = async (data) => {
        console.log(data);
        try {
            const response = await axios.post(
                url,
                JSON.stringify(data),
                {
                    headers: {
                        "Content-Type": "application/json",
                    }
                }
            );
            toast({
                title: `Forgot Password Successful`,
                description: `Please login with your credentials now`
            });
            navigate(nav_url);

        } catch (err) {
            if (err.response && err.response.data) {
                const data = err.response.data;
                const errors = data?.errors ? data.errors : {};
                console.log(errors);
                Object.keys(errors).forEach(field => {
                    setError(field, {
                        message: errors[field],
                    });
                });
            } else {
                toast({
                    title: "Forgot Password Error",
                    description: "An unexpected error occurred.",
                    status: "error",
                });
            }
        }
    };

    return (

        <div className="h-[90vh] flex justify-center items-center bg-[url('@/assets/bkk.jpg')] bg-cover">
        <Card className="w-[90%] sm:w-1/2 lg:w-1/3 min-h-[400px] shadow-lg">
            <CardHeader>
                <CardTitle className="text-center">
                    Reset Password
                </CardTitle>
            </CardHeader>
            <CardContent className="w-3/4 mx-auto h-full mt-10">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                    <FormField
                    control={form.control}
                    name="email"
                    rules={{ required: 'Email is required' }}
                    render={({ field, fieldState: { error } }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="Email" {...field} />
                            </FormControl>
                            <FormMessage>
                                {error ? error.message : null}
                            </FormMessage>
                        </FormItem>
                    )}
                />

                    <FormField
                    control={form.control}
                    name="otp"
                    rules={{ required: 'Otp is required' }}
                    render={({ field, fieldState: { error } }) => (
                        <FormItem>
                            <FormLabel>OTP</FormLabel>
                            <FormControl>
                                <div className="flex">
                                    <Input placeholder="6 Digit Code"  {...field} />
                                    <Button 
                                    onClick={(e) => {
                                        e.preventDefault();
                                        getOtp();
                                    }}
                                    >GET OTP</Button>
                                </div>
                            </FormControl>
                            <FormDescription>
                                Please type the 6 digit code sent to your email.
                            </FormDescription>
                            <FormMessage>
                                {error ? error.message : null}
                            </FormMessage>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="password"
                    rules={{ required: 'Password is required' }}
                    render={({ field, fieldState: { error } }) => (
                        <FormItem>
                            <FormLabel>New Password</FormLabel>
                            <FormControl>
                                <div className="flex">
                                    <Input placeholder="New Password" type={showPassword ? "text" : "password"} {...field} />
                                    <Button
                                    onClick={(e)=>{
                                        e.preventDefault();
                                        togglePassword();
                                    }}
                                    >
                                        {showPassword ?
                                        <FontAwesomeIcon icon={faEyeSlash}/> :
                                        <FontAwesomeIcon icon={faEye}/>
                                        
                                    }
                                    </Button>
                                </div>
                            </FormControl>
                            <FormMessage>
                                {error ? error.message : null}
                            </FormMessage>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="password-confirm"
                    rules={{
                        required: 'Password is required',
                        validate: (val) => {
                            if (form.watch('password') != val) {
                                return "Your passwords do no match";
                            }
                        }
                    }}
                    render={({ field, fieldState: { error } }) => (
                        <FormItem>
                            <FormLabel>Password Confirm</FormLabel>
                            <FormControl>
                                <div className="flex">
                                    <Input placeholder="Password" type={showPassword ? "text" : "password"} {...field} />
                                    <Button
                                    onClick={(e)=>{
                                        e.preventDefault();
                                        togglePassword();
                                    }}
                                    >
                                        {showPassword ?
                                        <FontAwesomeIcon icon={faEyeSlash}/> :
                                        <FontAwesomeIcon icon={faEye}/>
                                        
                                    }
                                    </Button>
                                </div>
                            </FormControl>
                            <FormMessage>
                                {error ? error.message : null}
                            </FormMessage>
                        </FormItem>
                    )}
                />

                        <Button type="submit" className="block mx-auto px-8 bg-pink-700 hover:bg-pink-800">Submit</Button>
                        {type === "student" && (
                            <Link to="/register" className="text-center">
                                <p className="mt-4 underline">Don't Have An Account? Create One!</p>
                            </Link>
                        )}
                    </form>
                </Form>
            </CardContent>
        </Card>
    </div>
    );


}

export default ForgotPasswordPage;