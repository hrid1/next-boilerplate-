"use client"

import { useFormContext } from "react-hook-form"

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"

import { Textarea } from "@/components/ui/textarea"

interface Props {
  name: string
  label: string
  placeholder?: string
}

export function FormTextarea({
  name,
  label,
  placeholder,
}: Props) {

  const { control } = useFormContext()

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>

          <FormLabel>{label}</FormLabel>

          <FormControl>
            <Textarea
              placeholder={placeholder}
              {...field}
            />
          </FormControl>

          <FormMessage />

        </FormItem>
      )}
    />
  )
}