// "use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
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

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Card, CardTitle } from "../ui/card";
import axios from "axios";


  

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const scheduleSchema = z.array(
  z.object({
    day: z.string().nonempty("Day is required"), // Validates that day is a non-empty string
    start_time: z.string().nonempty("Start time is required"), // Validates that start_time is a non-empty string
    end_time: z.string().nonempty("End time is required"), // Validates that end_time is a non-empty string
  })
);

const formSchema = z.object({
  title: z.string().min(1, {
    message: "The course title cannot be empty",
  }),
  startDate: z.string({
    required_error: "Please select a date and time",
  }),
  description: z.string(),
  maxSeat: z.string({
    message: "Please give a number "
  }),
  price: z.string({
    message: "The price needs to be a number"
  }),
//   recurring: z.boolean("Please select if the class is recurring"),
  schedule: scheduleSchema,
});

function CourseCreateForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      schedule: [{ day: "", start_time: "", end_time: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "schedule",
  });

  const { register, handleSubmit, formState, setValue, reset } = form;

  const onSubmit = async(data) => {
    try{
        const response = await axios.post(
            "/api/class/create",
            JSON.stringify(data),
            {
                headers: {
                    "Content-Type": "application/json",
                }
            }
        )
        console.log(response);
        reset()
    } catch(err){
        console.log(err)
    }
  };

  return (
    <Card className="max-w-[1176px] mx-auto px-8 py-4 my-10">
      <CardTitle>Course Create Form</CardTitle>
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Course Title</FormLabel>
              <FormControl>
                <Input placeholder="Title" {...field} className="max-w-[500px]"/>
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="startDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Course Title</FormLabel>
              <FormControl>
                <Input placeholder="Start Date" {...field} type="date" className="max-w-[500px]"/>
              </FormControl>
              <FormDescription>
                The day when your class starts
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
                The day when your class starts
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="maxSeat"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Max Seat</FormLabel>
              <FormControl>
                <Input placeholder="Max Seats" {...field} type="number" className="max-w-[500px]"/>
              </FormControl>
              <FormDescription>
                The maximum number of students in each class
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
                <Input placeholder="Pricing" {...field} type="number" className="max-w-[500px]"/>
              </FormControl>
              <FormDescription>
                The price of the class
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-wrap justify-start">
        {fields.map((item, index) => (
            
          <FormItem key={item.id} className="px-6 py-3 w-full md:w-1/2 lg:w-1/3">
            <FormLabel>Day</FormLabel>
            <FormControl>
              {/* <Input placeholder="Day" {...register(`schedule.${index}.day`)} /> */}
              <Select
              onValueChange={(value) => setValue(`schedule.${index}.day`, value)}
              >
                <SelectTrigger>
                    <SelectValue placeholder="Day"/>
                </SelectTrigger>
                <SelectContent>
                    {
                        days.map(day=>{
                            return <SelectItem value={day}>{day}</SelectItem>
                        })
                    }
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage>{formState.errors.schedule?.[index]?.day?.message}</FormMessage>

            <FormLabel>Start Time</FormLabel>
            <FormControl>
              <Input placeholder="Start Time" {...register(`schedule.${index}.start_time`)} type="time"/>
            </FormControl>
            <FormMessage>{formState.errors.schedule?.[index]?.start_time?.message}</FormMessage>

            <FormLabel>End Time</FormLabel>
            <FormControl>
              <Input placeholder="End Time" {...register(`schedule.${index}.end_time`)} type="time"/>
            </FormControl>
            <FormMessage>{formState.errors.schedule?.[index]?.end_time?.message}</FormMessage>

            <Button type="button" onClick={() => remove(index)}>Remove</Button>
          </FormItem>
        ))}
        </div>

        <Button type="button" className="block w-full" onClick={() => append({ day: "", start_time: "", end_time: "" })}>
          Add Schedule
        </Button>

        <Button type="submit">Submit</Button>
      </form>
    </Form>
    </Card>
  );
}

export default CourseCreateForm;