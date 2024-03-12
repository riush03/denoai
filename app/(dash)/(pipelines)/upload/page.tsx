import { TopMainContent } from "@/components/TopMainContent";
import UploadPipeline from '@/components/UploadPipeline'
import { Dropzone } from "@/components/Dropzone";

export default function UploadPipelinePage() {
  return (
    <>
      <div className="h-full">
      <TopMainContent title="Upload" step={1} />
      <div>
         <UploadPipeline/>
      </div>
    </div>
      
    </>
  );
}
