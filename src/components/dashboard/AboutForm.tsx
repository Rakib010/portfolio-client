"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

// Validation Schema
const aboutSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  location: z.string().min(2, "Location is required"),
  profileImage: z.string().url().optional(),
  skills: z.string().min(1, "Enter at least one skill"),
  bio: z.string().min(10, "Bio must be at least 10 characters"),
});

type AboutFormValues = z.infer<typeof aboutSchema>;

export default function AboutForm() {
  const form = useForm<AboutFormValues>({
    resolver: zodResolver(aboutSchema),
    defaultValues: {
      name: "",
      email: "",
      location: "",
      profileImage: "",
      skills: "",
      bio: "",
    },
  });

  const onSubmit = async (values: AboutFormValues) => {
    try {
      // skills string to array
      const payload = {
        ...values,
        skills: values.skills.split(",").map((s) => s.trim()),
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API}/user/about`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      const data = await res.json();
      alert("About Created Successfully!");
    } catch (err) {
      console.error("❌ Error:", err);
      alert("Failed to create about");
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 bg-[#0d1b2a] p-8 rounded-2xl shadow-xl border border-gray-700">
      <h2 className="text-2xl font-bold mb-8 text-white text-center">
        Create About Section
      </h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-200">Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-200">Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Location */}
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-200">Location</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your location" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Profile Image */}
            <FormField
              control={form.control}
              name="profileImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-200">
                    Profile Image URL
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://example.com/image.jpg"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Skills */}
            <FormField
              control={form.control}
              name="skills"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-200">
                    Skills (comma separated)
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="React, Next.js, Node.js" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Bio */}
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel className="text-gray-200">Bio</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write a short bio..."
                      {...field}
                      rows={4}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full mt-6">
            submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
