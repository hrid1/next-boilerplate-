"use client"

import { useFormContext } from "react-hook-form"

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"

import { Switch } from "@/components/ui/switch"

interface Props {
  name: string
  label: string
}

export function FormSwitch({ name, label }: Props) {
  const { control } = useFormContext()

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex items-center justify-between">

          <FormLabel>{label}</FormLabel>

          <FormControl>
            <Switch
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          </FormControl>

          <FormMessage />

        </FormItem>
      )}
    />
  )
}