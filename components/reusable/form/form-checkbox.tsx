"use client"

import { useFormContext } from "react-hook-form"

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"

import { Checkbox } from "@/components/ui/checkbox"

interface Props {
  name: string
  label: string
}

export function FormCheckbox({ name, label }: Props) {
  const { control } = useFormContext()

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex items-center space-x-3">

          <FormControl>
            <Checkbox
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          </FormControl>

          <FormLabel className="m-0">
            {label}
          </FormLabel>

          <FormMessage />

        </FormItem>
      )}
    />
  )
}