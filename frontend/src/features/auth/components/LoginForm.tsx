"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import { useAuth } from "../hooks/useAuth";
import { LoginInput, loginSchema } from "../validators/authValidator";

export function LoginForm() {
  const { login, isLoggingIn, loginError } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({ resolver: zodResolver(loginSchema) });

  return (
    <form onSubmit={handleSubmit((data) => login(data))} className="space-y-4" noValidate>
      <Input
        id="email"
        label="Email"
        type="email"
        placeholder="you@company.cr"
        autoComplete="email"
        error={errors.email?.message}
        {...register("email")}
      />
      <Input
        id="password"
        label="Password"
        type="password"
        placeholder="••••••••"
        autoComplete="current-password"
        error={errors.password?.message}
        {...register("password")}
      />
      {loginError && <p className="text-sm text-red-600">{loginError.message}</p>}
      <Button type="submit" isLoading={isLoggingIn} className="w-full">
        Sign in
      </Button>
    </form>
  );
}
