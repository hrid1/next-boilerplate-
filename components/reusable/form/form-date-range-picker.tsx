"use client"

import { useFormContext } from "react-hook-form"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
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
}

export function FormDateRangePicker({
  name,
  label,
  containerClassName,
}: Props) {
  const { control } = useFormContext()

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {

        const value = field.value

        return (
          <FormItem className={containerClassName}>

            {label && <FormLabel>{label}</FormLabel>}

            <Popover>
              <PopoverTrigger asChild>

                <FormControl>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />

                    {value?.from ? (
                      value.to ? (
                        <>
                          {format(value.from, "PPP")} -{" "}
                          {format(value.to, "PPP")}
                        </>
                      ) : (
                        format(value.from, "PPP")
                      )
                    ) : (
                      "Pick a date range"
                    )}
                  </Button>
                </FormControl>

              </PopoverTrigger>

              <PopoverContent className="w-auto p-0">

                <Calendar
                  mode="range"
                  selected={value}
                  onSelect={field.onChange}
                  numberOfMonths={2}
                />

              </PopoverContent>
            </Popover>

            <FormMessage />

          </FormItem>
        )
      }}
    />
  )
}