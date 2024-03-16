import DataExtractionPipeline from "@/components/DataExtractionPipeline";
import { TopMainContent } from "@/components/TopMainContent";
import getExtractionData  from "@/lib/requests";
import { ExtractionPipelineClient } from "@/components/ExtractionPipelineClient";

export default async function DataExtractionUUIDPage({
  params,
}: {
  params: { uuid: string };
})  {
 const uuid = "12344"
 const data = [{filename:"data.txt",}]
  return (
    <div className="flex flex-col h-full">
      <TopMainContent title="Data Extraction" step={3} />
      <ExtractionPipelineClient params={params.uuid}/>
    </div>
  );
}
