// "use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
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

import { Card, CardHeader, CardTitle } from "../ui/card";
import axios from "axios";



const formSchema = z.object({
    email: z.string().min(1, {
        message: "Email cannot be empty",
}),
  name: z.string().min(1, {
    message: "Name cannot be empty",
  }),
  description: z.string(),
  password: z.string({
    message: "Password cannot be empty"
  }),
  img: z.string(),
});

function TeacherCreateForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
        email: "",
        name: "",
        description: "",
        password: "",
        img: ""
    }
  });

  const { handleSubmit, reset } = form;

  const onSubmit = async(data) => {
    try{
        const response = await axios.post(
            "/api/teacher/create",
            JSON.stringify(data),
            {
                headers: {
                    "Content-Type": "application/json",
                }
            }
        )
        reset();
    } catch(err){
        console.log(err)
    }
  };

  return (
    <Card className="max-w-[1176px] mx-auto px-8 py-4 my-10">
        <CardHeader>
            <CardTitle className="text-center">Teacher Create Form</CardTitle>

        </CardHeader>
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 max-w-[500px] mx-auto">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} className="max-w-[500px]"/>
              </FormControl>
              <FormDescription>
                Please enter the teacher's email
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
            <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
                <Input placeholder="Password" {...field} className="max-w-[500px]"/>
            </FormControl>
            <FormDescription>
                Please enter the password about the teacher account
            </FormDescription>
            <FormMessage />
            </FormItem>
        )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} className="max-w-[500px]"/>
              </FormControl>
              <FormDescription>
                Please enter the teacher's name
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />


        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Description" {...field} className="max-w-[500px]"/>
              </FormControl>
              <FormDescription>
                Please enter the description about the teacher
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="img"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <Input placeholder="Image" {...field} className="max-w-[500px]"/>
              </FormControl>
              <FormDescription>
                Please enter the url of the image
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit" className="block mx-auto">Submit</Button>
      </form>
    </Form>
    </Card>
  );
}

export default TeacherCreateForm;