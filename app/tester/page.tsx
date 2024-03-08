import React from 'react'
import UploadPipeline from '@/components/UploadPipeline'
import { TopMainContent } from '@/components/TopMainContent'

const page = () => {
  return (
    <div>
      <TopMainContent title="Upload" step={1} />
        <UploadPipeline/>
    </div>
  )
}

export default page