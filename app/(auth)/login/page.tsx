"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const schema = z.object({
  email:    z.string().email("Invalid email"),
  password: z.string().min(6, "Minimum 6 characters"),
});

type LoginForm = z.infer<typeof schema>;

function LoginForm() {
  const { login } = useAuth();
  const router    = useRouter();
  const params    = useSearchParams();
  const from      = params.get("from") ?? "/dashboard";

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({ resolver: zodResolver(schema) });

  async function onSubmit(values: LoginForm) {
    try {
      await login(values.email, values.password);
      router.push(from);        // redirect back to where they came from
    } catch (err: any) {
      const status  = err?.response?.status;
      const message = err?.response?.data?.message;

      if (status === 401) {
        setError("root", { message: "Invalid email or password" });
      } else if (status === 422) {
        const fieldErrors = err?.response?.data?.errors ?? {};
        Object.entries(fieldErrors).forEach(([field, msg]) => {
          setError(field as keyof LoginForm, { message: msg as string });
        });
      } else {
        setError("root", { message: message ?? "Something went wrong" });
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/40">
      <div className="w-full max-w-sm space-y-6 bg-background p-8 rounded-xl border shadow-sm">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold">Sign in</h1>
          <p className="text-sm text-muted-foreground">Enter your credentials to continue</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {errors.root && (
            <div className="text-sm text-destructive bg-destructive/10 px-3 py-2 rounded-md">
              {errors.root.message}
            </div>
          )}

          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" autoComplete="email" {...register("email")} />
            {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" autoComplete="current-password" {...register("password")} />
            {errors.password && <p className="text-xs text-destructive">{errors.password.message}</p>}
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Signing in…" : "Sign in"}
          </Button>
        </form>
      </div>
    </div>
  );
}

import React, { Suspense } from 'react'

export default function LoginPage() {
  return (
    <Suspense fallback={<>Loading...</>}>
      <LoginForm/>
    </Suspense>
  )
}
