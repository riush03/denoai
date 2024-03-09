
import { TopMainContent } from "@/components/TopMainContent";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";

export default async function VerificationPage() {
var alphas;
alphas = ["1", "2", "3", "4"];
  
  return (
    <>
      <TopMainContent title="Verification" displayUploadButton />
      <div className="m-8 flex flex-col flex-grow items-center justify-center space-y-12 2xl:space-y-20">
        <DataTable
          title="Documents in Current Pipeline"
          pageSize={10}
          emptyMessage="No documents in Verification Pipeline"
          filterColumn={{
            columnId: "filename",
            placeholder: "Filter by file name",
          }}
          columns={columns}
          data={alphas}
        />
      </div>
    </>
  );
}