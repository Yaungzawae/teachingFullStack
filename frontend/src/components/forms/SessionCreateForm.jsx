import React from 'react';
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
import { Card, CardTitle } from "@/components/ui/card";
import axios from "axios";
import TimePicker from 'react-time-picker';
import TimeInput from '../ui/TimeInput';



const formSchema = z.object({
  title: z.string().min(1, {
    message: "The session title cannot be empty",
  }),
  date: z.string({
    required_error: "Please select a date",
  }),
  start_time: z.string({
    required_error: "Please select a time",
  }),
  end_time: z.string({
    required_error: "Please select a time",
  }),
  description: z.string(),
  price: z.string({
    message: "The price needs to be a number",
  }),
});

function SessionCreateForm() {
    const form = useForm({
      resolver: zodResolver(formSchema),
      defaultValues: {
        title: "",
        date: "",
        start_time: "1:00 AM",
        end_time: "1:00 AM",
        description: "",
        price: "",
      },
    });
  
    const { handleSubmit, reset } = form;
  
    const onSubmit = async (data) => {
      try {
        const response = await axios.post(
          "/api/session/create",
          data,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response);
        reset();
      } catch (err) {
        console.log(err);
      }
    };
  
    return (
      <Card className="max-w-[1176px] mx-auto px-8 py-4 my-10">
        <CardTitle>Session Create Form</CardTitle>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Session Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Title" {...field} className="max-w-[500px]" />
                  </FormControl>
                  <FormDescription>
                    The title of the one-on-one session.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
  
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date</FormLabel>
                  <FormControl>
                    <Input placeholder="Date" {...field} type="date" className="max-w-[500px]" />
                  </FormControl>
                  <FormDescription>
                    The date of the session.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
  
            <FormField
              control={form.control}
              name="start_time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Time</FormLabel>
                  <FormControl>
                    <TimeInput name="start_time" />
                  </FormControl>
                  <FormDescription>
                    The start time of the session.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
  
            <FormField
              control={form.control}
              name="end_time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>End Time</FormLabel>
                  <FormControl>
                    <TimeInput name="end_time" />
                  </FormControl>
                  <FormDescription>
                    The end time of the session.
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
                    <Input placeholder="Description" {...field} className="max-w-[500px]" />
                  </FormControl>
                  <FormDescription>
                    A brief description of the session.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
  
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pricing</FormLabel>
                  <FormControl>
                    <Input placeholder="Pricing" {...field} type="number" className="max-w-[500px]" />
                  </FormControl>
                  <FormDescription>
                    The price of the session.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
  
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </Card>
    );
  }
  
  export default SessionCreateForm;