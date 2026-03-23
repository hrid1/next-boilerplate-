"use client"

import { useFormContext } from "react-hook-form"

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"

import {
  RadioGroup,
  RadioGroupItem
} from "@/components/ui/radio-group"

interface Option {
  label: string
  value: string
}

interface Props {
  name: string
  label: string
  options: Option[]
}

export function FormRadioGroup({
  name,
  label,
  options
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
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="flex gap-4"
            >

              {options.map(option => (
                <FormItem
                  key={option.value}
                  className="flex items-center space-x-2"
                >
                  <FormControl>
                    <RadioGroupItem
                      value={option.value}
                    />
                  </FormControl>

                  <FormLabel className="m-0">
                    {option.label}
                  </FormLabel>

                </FormItem>
              ))}

            </RadioGroup>
          </FormControl>

          <FormMessage />

        </FormItem>
      )}
    />
  )
}