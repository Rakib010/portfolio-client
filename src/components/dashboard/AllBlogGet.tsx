/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { AllBlogGetProps } from "@/types";
import { Edit, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
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
import { useState } from "react";
import { fi } from "zod/v4/locales";

const blogSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  thumbnail: z.string().optional(),
  tags: z.string().optional(),
});

function AllBlogGet({ post }: AllBlogGetProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  // delete blog
  const handleDelete = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API}/blog/${post._id}`,
        {
          method: "DELETE",
        }
      );
      if (res.ok) {
        toast.success("Blog deleted successfully");
        router.refresh();
      } else {
        toast.error("Failed to delete blog");
      }
    } catch (err) {
      toast.error("An error occurred");
    }
  };

  const form = useForm({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: post.title,
      content: (post as any).content || "",
      thumbnail: (post as any).thumbnail || "",
      tags: (post as any).tags?.join(", ") || "",
    },
  });

  // update blog
  const handleUpdateSubmit = async (
    values: z.infer<typeof blogSchema>,
    close: () => void
  ) => {
    try {
      setIsDeleting(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API}/blog/${post._id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...values,
            tags: values.tags?.split(",").map((tag) => tag.trim()),
          }),
        }
      );

      const data = await res.json();
      //console.log("Update response:", data);

      if (res.ok) {
        toast.success("Blog updated successfully");
        close();
        router.refresh();
      } else {
        toast.error(data.message || "Failed to update blog");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <tr className="grid grid-cols-2 border-2 border-gray-400 rounded-lg mb-4">
      {/* Title */}
      <td className="px-6 py-4 text-sm text-gray-200 font-medium text-left">
        {post.title}
      </td>

      {/* Actions */}
      <td className="px-6 py-4 text-sm">
        <div className="flex justify-end gap-2">
          {/* Update with Modal Form */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button className="inline-flex items-center gap-1 px-3 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition">
                <Edit size={16} />
                <span>Update</span>
              </button>
            </AlertDialogTrigger>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className="text-gray-900">
                  Update Blog
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Edit the blog details below.
                </AlertDialogDescription>
              </AlertDialogHeader>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit((values) =>
                    handleUpdateSubmit(values, () =>
                      document.activeElement?.blur()
                    )
                  )}
                  className="space-y-4 text-gray-900"
                >
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Content</FormLabel>
                        <FormControl>
                          <Textarea rows={6} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="thumbnail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Thumbnail URL</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tags (comma separated)</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <AlertDialogFooter className="flex justify-between">
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <Button type="submit" className="bg-green-600 text-white">
                      Update
                    </Button>
                  </AlertDialogFooter>
                </form>
              </Form>
            </AlertDialogContent>
          </AlertDialog>

          {/* Delete */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button className="inline-flex items-center gap-1 px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition">
                <Trash2 size={16} />
                <span>Delete</span>
              </button>
            </AlertDialogTrigger>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className="text-gray-700">
                  Are you sure?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. The blog will be permanently
                  removed.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete}>
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </td>
    </tr>
  );
}

export default AllBlogGet;
