"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import { useAuth } from "../hooks/useAuth";
import {
  RegisterAdvisorInput,
  RegisterSmeInput,
  registerAdvisorSchema,
  registerSmeSchema,
} from "../validators/authValidator";

type Role = "pyme" | "advisor";

export function RegisterForm() {
  const [role, setRole] = useState<Role>("pyme");

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-2 rounded-md border-2 border-zinc-800 p-1">
        {(["pyme", "advisor"] as const).map((r) => (
          <button
            key={r}
            type="button"
            onClick={() => setRole(r)}
            className={`rounded py-2 text-sm font-medium transition-colors ${
              role === r ? "bg-teal-500 text-white" : "text-zinc-500 hover:bg-zinc-100"
            }`}
          >
            {r === "pyme" ? "I'm a PYME" : "I'm an Advisor"}
          </button>
        ))}
      </div>

      {role === "pyme" ? <PymeForm /> : <AdvisorForm />}
    </div>
  );
}

function PymeForm() {
  const { registerPyme, isRegisteringPyme, registerPymeError } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSmeInput>({ resolver: zodResolver(registerSmeSchema) });

  return (
    <form onSubmit={handleSubmit((data) => registerPyme(data))} className="space-y-3" noValidate>
      <Input id="owner_name" label="Owner name" error={errors.owner_name?.message} {...register("owner_name")} />
      <Input id="business_email" label="Business email" type="email" error={errors.business_email?.message} {...register("business_email")} />
      <Input id="phone" label="Phone" error={errors.phone?.message} {...register("phone")} />
      <Input id="cedula_juridica" label="Cédula jurídica" error={errors.cedula_juridica?.message} {...register("cedula_juridica")} />
      <Input id="company_name" label="Company name" error={errors.company_name?.message} {...register("company_name")} />
      <div className="space-y-1">
        <label htmlFor="company_size" className="block text-sm font-medium text-zinc-700">
          Company size
        </label>
        <select
          id="company_size"
          className="w-full rounded-md border-2 border-zinc-800 bg-white px-3 py-2 text-sm text-zinc-900 focus:border-teal-500 focus:outline-none"
          {...register("company_size")}
        >
          <option value="small">Small (≤30)</option>
          <option value="medium">Medium (31–100)</option>
          <option value="large">Large (100+)</option>
        </select>
      </div>
      <Input id="password" label="Password" type="password" error={errors.password?.message} {...register("password")} />
      {registerPymeError && <p className="text-sm text-red-600">{registerPymeError.message}</p>}
      <Button type="submit" isLoading={isRegisteringPyme} className="w-full">
        Create PYME account
      </Button>
    </form>
  );
}

function AdvisorForm() {
  const { registerAdvisor, isRegisteringAdvisor, registerAdvisorError } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterAdvisorInput>({ resolver: zodResolver(registerAdvisorSchema) });

  return (
    <form onSubmit={handleSubmit((data) => registerAdvisor(data))} className="space-y-3" noValidate>
      <Input id="full_name" label="Full name" error={errors.full_name?.message} {...register("full_name")} />
      <Input id="personal_email" label="Email" type="email" error={errors.personal_email?.message} {...register("personal_email")} />
      <Input id="phone" label="Phone" error={errors.phone?.message} {...register("phone")} />
      <Input id="linkedin_url" label="LinkedIn URL" placeholder="https://linkedin.com/in/…" error={errors.linkedin_url?.message} {...register("linkedin_url")} />
      <Input id="base_rate" label="Base rate (₡, optional)" type="number" error={errors.base_rate?.message} {...register("base_rate")} />
      <Input id="password" label="Password" type="password" error={errors.password?.message} {...register("password")} />
      {registerAdvisorError && <p className="text-sm text-red-600">{registerAdvisorError.message}</p>}
      <Button type="submit" isLoading={isRegisteringAdvisor} className="w-full">
        Create Advisor account
      </Button>
    </form>
  );
}
