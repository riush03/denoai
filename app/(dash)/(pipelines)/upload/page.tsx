import { TopMainContent } from "@/components/TopMainContent";
import UploadPipeline from '@/components/UploadPipeline'

export default function UploadPipelinePage() {
  return (
    <>
      <TopMainContent title="Upload" step={1} />
      <UploadPipeline />
    </>
  );
}
