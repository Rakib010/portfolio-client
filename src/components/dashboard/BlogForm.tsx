"use client";

import { useForm } from "react-hook-form";
import { success, z } from "zod";
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
import toast from "react-hot-toast";
import { tr } from "zod/v4/locales";

// Validation schema
const blogSchema = z.object({
  title: z.string().min(2, "Title is required"),
  content: z.string().min(10, "Content must be at least 10 characters"),
  thumbnail: z.string().url().optional(),
  tags: z.string().min(1, "Enter at least one tag"),
});

type BlogFormValues = z.infer<typeof blogSchema>;

export default function BlogForm() {
  const form = useForm<BlogFormValues>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: "",
      content: "",
      thumbnail: "",
      tags: "",
    },
  });

  const onSubmit = async (values: BlogFormValues) => {
    try {
      // tags string to array
      const payload = {
        ...values,
        tags: values.tags.split(",").map((t) => t.trim()),
      };

      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blog`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Blog Created Successfully!");
        form.reset();
      }
    } catch (err) {
      console.error("❌ Error:", err);
      toast.error("Failed to create blog");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-[#0d1b2a] p-8 rounded-2xl shadow-xl border border-gray-700">
      <h2 className="text-2xl font-bold mb-8 text-white text-center">
        Create Blog
      </h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Title */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-200">Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter blog title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Content */}
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-200">Content</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Write your blog content..."
                    {...field}
                    rows={6}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Thumbnail */}
          <FormField
            control={form.control}
            name="thumbnail"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-200">Thumbnail URL</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://example.com/thumbnail.jpg"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Tags */}
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-200">
                  Tags (comma separated)
                </FormLabel>
                <FormControl>
                  <Input placeholder="e.g. React, Next.js, WebDev" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button type="submit" className="w-full bg-gray-700">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
