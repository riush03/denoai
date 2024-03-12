import { auth, clerkClient } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { TopMainContent } from "@/components/TopMainContent";
import { DataTable } from "@/components/ui/data-table";
import {
  Extraction,
  categories,
  columns,
  columnsWithoutStatus,
  statuses,
} from "./columns";



export default async function DashboardPage() {
  const { userId } = auth();

  if (!userId) {
    redirect("/");
  }

    return (
    <>
      <div className="h-full">
    
      <TopMainContent title="Dashboard" displayUploadButton />
        <DataTable
          title="Documents in Pipelines"
          emptyMessage="No documents in pipelines"
          filterColumn={{
            columnId: "filename",
            placeholder: "Filter by file name",
          }}
          columns={columns}
          categories={categories}
          statuses={statuses}
          data={1}
        />
        <DataTable
          title="Latest Data Extractions"
          emptyMessage="No data extractions"
          filterColumn={{
            columnId: "filename",
            placeholder: "Filter by file name",
          }}
          columns={columnsWithoutStatus}
          categories={categories}
          statuses={statuses}
          data={2}
        />
      </div>
    </>
  );
}
