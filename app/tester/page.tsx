import React from 'react';
import { TopMainContent } from '@/components/TopMainContent';
import  VerificationPipeline  from '@/components/VerificationPipeline';
import TextRecognitionPipeline from '@/components/TextRecognitionPipeline';
import DataExtractionPipeline from '@/components/DataExtractionPipeline';
import { UploadInfo } from '@/components/UploadPipeline';
import CardWithForm from '@/components/DialogSelect';

const page = () => {
  return (
    <div  className="flex flex-col h-full">
       <TopMainContent title="Verification" step={4} />
      <CardWithForm/>
    </div>
  )
}

export default page