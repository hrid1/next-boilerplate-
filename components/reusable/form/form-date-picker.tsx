"use client"

import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { useFormContext } from "react-hook-form"
import { cn } from "@/lib/utils"

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"

import { Button } from "@/components/ui/button"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { Calendar } from "@/components/ui/calendar"

interface Props {
  name: string
  label?: string
  containerClassName?: string
  labelClassName?: string
  inputClassName?: string
}

export function FormDatePicker({
  name,
  label,
  containerClassName,
  labelClassName,
  inputClassName,
}: Props) {
  const { control } = useFormContext()

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (

        <FormItem className={containerClassName ?? "flex flex-col"}>

          {label && (
            <FormLabel className={labelClassName}>
              {label}
            </FormLabel>
          )}

          <Popover>

            <PopoverTrigger asChild>

              <FormControl>
                <Button
                  variant="outline"
                  className={cn(
                    "justify-start text-left font-normal",
                    !field.value && "text-muted-foreground",
                    inputClassName
                  )}
                >
                  {field.value ? (
                    format(new Date(field.value), "PPP")
                  ) : (
                    "Pick a date"
                  )}

                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>

            </PopoverTrigger>

            <PopoverContent
              className="w-auto p-0"
              align="start"
            >

              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                initialFocus
              />

            </PopoverContent>

          </Popover>

          <FormMessage />

        </FormItem>

      )}
    />
  )
}