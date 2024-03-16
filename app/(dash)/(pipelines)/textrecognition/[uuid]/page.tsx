import TextRecognitionPipeline from '@/components/TextRecognitionPipeline';
import { TopMainContent } from "@/components/TopMainContent";
import { RecognitionClient } from '@/components/RecognitionClient';
import { Doc } from '@/convex/_generated/dataModel';

export default async function TextRecognitionPipelinePage({
  params,
  file,
}: {
  params: { uuid: string };
  file: Doc<"files">
}) {

  return (
    <div>
      <div className="flex flex-col h-full">
        <RecognitionClient params={params.uuid} file={file}/>
      </div>
    </div>
  );
}
