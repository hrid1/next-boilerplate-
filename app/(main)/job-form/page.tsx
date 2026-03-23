import JobForm from '@/features/jobs/components/job-form'
import React from 'react'

export default function page() {
  return (
    <div className='flex items-center justify-center h-screen'>
     <div className='w-100'>
         <JobForm />
     </div>
    </div>
  )
}
