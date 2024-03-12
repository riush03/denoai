import TextRecognitionPipeline from "@/components/TextRecognitionPipeline";
import { TopMainContent } from "@/components/TopMainContent";

export default async function TextRecognitionPipelinePage() {

  
  return (
    <div>
      <div className="flex flex-col h-full">
        <TopMainContent title="Text Recognition" step={2} />
        <TextRecognitionPipeline
        />
      </div>
    </div>
  );
}
