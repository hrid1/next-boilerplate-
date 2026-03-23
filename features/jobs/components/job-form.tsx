"use client"

import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"

import { jobSchema, JobFormValues } from "../schemas/job.schema"  
import { FormInput } from "@/components/reusable/form/form-input"
import { FormSelect } from "@/components/reusable/form/form-select"
import { FormTextarea } from "@/components/reusable/form/form-textarea"
import { FormCheckbox } from "@/components/reusable/form/form-checkbox"
import { FormSwitch } from "@/components/reusable/form/form-switch"
import { FormRadioGroup } from "@/components/reusable/form/form-radio-group"
import { FormDatePicker } from "@/components/reusable/form/form-date-picker"

export default function JobForm() {


  const methods = useForm<JobFormValues>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      title: "",
      location: "",
      description: "",
      experience: "mid",
      isRemote: false,
      isPublished: false,
    },
  })

  function onSubmit(data: JobFormValues) {
    console.log("Job Data:", data)
  }

  return (
    <FormProvider {...methods}>
      <Form {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="space-y-6 max-w-xl"
        >

          {/* Title */}
          <FormInput
            name="title"
            label="Job Title"
            placeholder="Frontend Developer"
            inputClassName="ring-0 focus:border-blue-500"

          />

          {/* Location */}
          <FormSelect
            name="location"
            label="Location"
            placeholder="Select location"
            options={[
              { label: "Remote", value: "remote" },
              { label: "New York", value: "ny" },
              { label: "London", value: "london" },
            ]}
          />

          {/* Experience */}
          <FormRadioGroup
            name="experience"
            label="Experience Level"
            options={[
              { label: "Junior", value: "junior" },
              { label: "Mid", value: "mid" },
              { label: "Senior", value: "senior" },
            ]}
          />

          {/* Description */}
          <FormTextarea
            name="description"
            label="Job Description"
            placeholder="Write job details..."
          />

          {/* Deadline */}
          <FormDatePicker
            name="deadline"
            label="Application Deadline"
       
          />

          {/* Remote */}
          <FormCheckbox
            name="isRemote"
            label="Remote Job"
          />

          {/* Publish */}
          <FormSwitch
            name="isPublished"
            label="Publish Job"
          />

          <Button type="submit">
            Create Job
          </Button>

        </form>
      </Form>
    </FormProvider>
  )
}