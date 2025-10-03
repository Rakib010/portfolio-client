"use client";

import { useState } from "react";
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

// Validation schema
const projectSchema = z.object({
  title: z.string().min(2, "Title is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  thumbnail: z.string().url().optional(),
  features: z.string().min(1, "Enter at least one feature"),
  liveLink: z.string().url().optional(),
  repoLink: z.string().url().optional(),
});

type ProjectFormValues = z.infer<typeof projectSchema>;

export default function ProjectForm() {
  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: "",
      description: "",
      thumbnail: "",
      features: "",
      liveLink: "",
      repoLink: "",
    },
  });

  const onSubmit = async (values: ProjectFormValues) => {
    try {
      const payload = {
        ...values,
        features: values.features.split(",").map((f) => f.trim()),
      };

      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/project`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      console.log("✅ Project Created:", data);
      alert("Project Created Successfully!");
      form.reset();
    } catch (err) {
      console.error("❌ Error:", err);
      alert("Failed to create project");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-[#0d1b2a] p-8 rounded-2xl shadow-xl border border-gray-700">
      <h2 className="text-2xl font-bold mb-8 text-white text-center">
        Create Project
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
                  <Input placeholder="Enter project title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-200">Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter project description"
                    {...field}
                    rows={4}
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

          {/* Features */}
          <FormField
            control={form.control}
            name="features"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-200">
                  Features (comma separated)
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Feature1, Feature2, Feature3"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Live Link */}
          <FormField
            control={form.control}
            name="liveLink"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-200">Live Link</FormLabel>
                <FormControl>
                  <Input placeholder="https://live-project.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Repo Link */}
          <FormField
            control={form.control}
            name="repoLink"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-200">Repository Link</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://github.com/user/repo"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button type="submit" className="w-full">
            submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
