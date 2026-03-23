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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Props {
  name: string
  label?: string
  containerClassName?: string
}

const hours = Array.from({ length: 24 }, (_, i) =>
  i.toString().padStart(2, "0")
)

const minutes = ["00", "15", "30", "45"]

export function FormTimePicker({
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

        const [hour, minute] = field.value
          ? field.value.split(":")
          : ["", ""]

        function handleChange(h: string, m: string) {
          if (h && m) {
            field.onChange(`${h}:${m}`)
          }
        }

        return (
          <FormItem className={containerClassName}>

            {label && <FormLabel>{label}</FormLabel>}

            <div className="flex gap-2">

              {/* Hour */}
              <Select
                value={hour}
                onValueChange={(h) => handleChange(h, minute)}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="HH" />
                  </SelectTrigger>
                </FormControl>

                <SelectContent>
                  {hours.map((h) => (
                    <SelectItem key={h} value={h}>
                      {h}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Minute */}
              <Select
                value={minute}
                onValueChange={(m) => handleChange(hour, m)}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="MM" />
                  </SelectTrigger>
                </FormControl>

                <SelectContent>
                  {minutes.map((m) => (
                    <SelectItem key={m} value={m}>
                      {m}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

            </div>

            <FormMessage />

          </FormItem>
        )
      }}
    />
  )
}