import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
  description: z.string().optional(),
  password: z.string().optional(),
  img: z.instanceof(File).optional(),
});

function TeacherCreateForm({ defaultValues, onCancel }) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: defaultValues?.email || "",
      name: defaultValues?.name || "",
      description: defaultValues?.description || "",
      password: defaultValues ? "" : "", // For edit mode, leave password blank
      img: null, // Resetting image input
    },
  });

  const { handleSubmit, reset } = form;

  const onSubmit = async (data) => {
    const formData = new FormData();
    for (const key in data) {
      if (data[key]) {
        formData.append(key, data[key]);
      }
    }

    try {
      let response;
      if (defaultValues) {
        // Update logic
        response = await axios.post(
          "/api/teacher/edit", // Sample URL for update
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("Teacher details updated:", response.data);
      } else {
        // Create logic
        response = await axios.post(
          "/api/teacher/create", // Sample URL for create
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("New teacher created:", response.data);
      }

      reset(); // Reset the form after successful submission
      if (onCancel) onCancel(); // Close the editing/creating mode
    } catch (err) {
      console.error("Error in form submission:", err);
    }
  };

  return (
    <Card className="max-w-[1176px] mx-auto px-8 py-4 my-10">
      <CardHeader>
        <CardTitle className="text-center">
          {defaultValues ? "Edit Teacher Details" : "Teacher Create Form"}
        </CardTitle>
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
                  <Input placeholder="Email" {...field} className="max-w-[500px]" />
                </FormControl>
                <FormDescription>Please enter the teacher's email</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {defaultValues ? null : (
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Password" {...field} className="max-w-[500px]" />
                  </FormControl>
                  <FormDescription>Please enter the password for the teacher account</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Name" {...field} className="max-w-[500px]" />
                </FormControl>
                <FormDescription>Please enter the teacher's name</FormDescription>
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
                <FormDescription>Please enter the description about the teacher</FormDescription>
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
                <FormDescription>Please upload an image of the teacher</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="block mx-auto">
            {defaultValues ? "Update" : "Create"}
          </Button>
          {onCancel && (
            <Button onClick={onCancel} variant="outline" className="block mx-auto mt-2">
              Cancel
            </Button>
          )}
        </form>
      </Form>
    </Card>
  );
}

export default TeacherCreateForm;