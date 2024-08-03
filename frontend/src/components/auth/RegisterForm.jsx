import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"
import axios from "axios"



const RegisterForm = ({ type }) => {

    const [showPassword, setShowPassword] = useState(false);
    const togglePassword = () => {
        setShowPassword(!showPassword);
    }

    const { toast } = useToast();
    const navigate = useNavigate(); 

    const form = useForm({
        defaultValues: {
            email: '',
            password: ''
        },
        mode: 'onChange',
    });

    const { setError } = form;

    const getOtp = (data) => {
        console.log("hello")
        const email = form.getValues("email");
        if(email == ""){
            setError("email", {message: "Please enter your email first"})
        }
        console.log(email)
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
                "/api/auth/register",
                JSON.stringify(data),
                {
                    headers: {
                        "Content-Type": "application/json",
                    }
                }
            );
            navigate('/'); // Example route, replace with your  path
            toast({
                title: `${type} Login Successful`,
                description: `Welcome, ${data.email}`
            });
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
                    name="name"
                    rules={{ required: 'Name is required' }}
                    render={({ field, fieldState: { error } }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Name" {...field} />
                            </FormControl>
                            <FormMessage>
                                {error ? error.message : null}
                            </FormMessage>
                        </FormItem>
                    )}
                />

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



                <Button type="submit" className="block mx-auto px-8 bg-pink-700 hover:bg-pink-800">Submit</Button>
                {type == "student" && (
                    <Link to="/login" className="text-center">
                        <p className="mt-4 underline">Already have an account? Login Now!</p>
                    </Link>
                )}
            </form>
        </Form>
    )
}

export default RegisterForm;