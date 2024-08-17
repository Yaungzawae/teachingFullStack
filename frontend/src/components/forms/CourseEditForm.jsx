import React, { useEffect } from 'react';
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
import { Card, CardTitle } from "@/components/ui/card";
import axios from "axios";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const scheduleSchema = z.array(
  z.object({
    day: z.string().nonempty("Day is required"),
    start_time: z.string().nonempty("Start time is required"),
    end_time: z.string().nonempty("End time is required"),
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
  schedule: scheduleSchema,
  textBook: z.instanceof(File, {
    message: "Text Book should be a file"
  })
});

function CourseEditForm({ defaultValues, onCancel, editable=false, _id }) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...defaultValues,
      schedule: defaultValues?.schedule || [{ day: "", start_time: "", end_time: "" }],
      textBook: null
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "schedule",
  });

  const { register, handleSubmit, formState, setValue, reset } = form;

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues]);

  const onSubmit = async (data) => {
    const formData = new FormData();

    for (const key in data) {
      if (key === "textBook") {
        formData.append(key, data[key]);
      } else if (key === "schedule") {
        formData.append(key, JSON.stringify(data[key]));
      } else {
        formData.append(key, data[key]);
      }
    }
    formData.append("courseId", _id)

    try {
      const response = await axios.post(
        "/api/class/edit",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
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
    <Card className={`mx-auto px-8 py-4 my-10 w-full h-1/6l`}>
      <CardTitle>{defaultValues?._id ? "Edit Course" : "Create Course"}</CardTitle>
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
                <FormLabel>Start Date</FormLabel>
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
                  Description of the course
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

          <FormField
            control={form.control}
            name="textBook"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Text Book</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept=".pdf"
                    className="max-w-[500px]"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file && /\.pdf$/i.test(file.name)) {
                        field.onChange(file);
                      } else {
                        alert("Please upload a valid PDF file");
                        e.target.value = null; // Clear the invalid file input
                      }
                    }}
                  />
                </FormControl>
                <FormDescription>
                  Upload the textbook for the course
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
                  <Select
                    onValueChange={(value) => setValue(`schedule.${index}.day`, value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Day"/>
                    </SelectTrigger>
                    <SelectContent>
                      {days.map(day => (
                        <SelectItem key={day} value={day}>{day}</SelectItem>
                      ))}
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

          <Button type="submit">{defaultValues?._id ? "Update" : "Submit"}</Button>
          <Button type="button" onClick={onCancel}>Cancel</Button>
        </form>
      </Form>
    </Card>
  );
}

export default CourseEditForm;