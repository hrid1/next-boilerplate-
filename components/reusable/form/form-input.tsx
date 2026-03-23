"use client"

import { useFormContext } from "react-hook-form"
import { cn } from "@/lib/utils"

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"

interface Props
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "name"> {
  name: string
  label?: string
  inputClassName?: string
  labelClassName?: string
  containerClassName?: string
}

export function FormInput({
  name,
  label,
  inputClassName,
  labelClassName,
  containerClassName,
  ...props
}: Props) {

  const { control } = useFormContext()

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (

        <FormItem className={cn(containerClassName)}>

          {label && (
            <FormLabel className={cn(labelClassName)}>
              {label}
            </FormLabel>
          )}

          <FormControl>
            <Input
              {...field}
              {...props}
              className={cn(inputClassName)}
            />
          </FormControl>

          <FormMessage />

        </FormItem>

      )}
    />
  )
}