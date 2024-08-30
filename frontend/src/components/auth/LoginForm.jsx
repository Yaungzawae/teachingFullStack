import React, { Fragment } from "react";
import {
    Form,
    FormControl,
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

const LoginForm = ({ type }) => {
    const { toast } = useToast();
    const navigate = useNavigate();

    let url = "/api/auth/login";
    let nav_url = "/";

    if(type === "teacher"){
        url = "/api/teacher/login"
        nav_url = "/teacher"
    }

    const form = useForm({
        defaultValues: {
            email: '',
            password: ''
        },
        mode: 'onChange',
    });

    const { setError } = form;

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
                title: `${type} Login Successful`,
                description: `Welcome, ${data.email}`
            });
            navigate(nav_url); // Example route, replace with your  path
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
                    title: "Login Error",
                    description: "An unexpected error occurred.",
                    status: "error",
                });
            }
        }
    };

    return (
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
                    name="password"
                    rules={{ required: 'Password is required' }}
                    render={({ field, fieldState: { error } }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input placeholder="Password" type="password" {...field} />
                            </FormControl>
                            <FormMessage>
                                {error ? error.message : null}
                            </FormMessage>
                        </FormItem>
                    )}
                />
                <Button type="submit" className="block mx-auto px-8 bg-pink-700 hover:bg-pink-800">Submit</Button>
                {type === "student" && (
                    <Fragment>
                        <Link to="/register" className="text-center">
                            <p className="mt-4 underline">Don't Have An Account? Create One!</p>
                        </Link>
                        <Link to="/forgot-password" className="text-center">
                            <p className="mt-4 underline">Forgot password?</p>
                        </Link>
                    </Fragment>
                    
                )}
            </form>
        </Form>
    );
}

export default LoginForm;