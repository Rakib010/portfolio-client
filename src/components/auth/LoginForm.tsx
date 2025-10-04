"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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

// Validation schema
const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." }),
});

function LoginForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API}/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          // credentials: "include", // cookie handle
          body: JSON.stringify(values),
        }
      );

      const data = await res.json();

      console.log("Login response:", data);
      alert("Login successful!");

      // redirect or success toast
      window.location.href = "/dashboard";
    } catch (err) {
      alert("Something went wrong!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-md rounded-2xl shadow-xl p-8 space-y-6 border border-gray-200"
        >
          {/* Title */}
          <div className="text-center">
            <h2 className="text-2xl font-bold ">Admin Login</h2>
            <p className="text-sm  mt-1">Please sign in to continue</p>
          </div>

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-100">Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="admin@example.com"
                    {...field}
                    className=""
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-100">Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="********"
                    {...field}
                    className=""
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Button */}
          <Button
            type="submit"
            className="w-full bg-teal-700 transition-all text-white py-2 rounded-lg"
          >
            Login
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default LoginForm;
