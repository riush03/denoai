
import { auth, clerkClient } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { TopMainContent } from "@/components/TopMainContent";
import {FilesContainer}  from "@/components/FilesContainer";


export default async function DashboardPage() {
  const { userId } = auth();


  if (!userId) {
    redirect("/");
  }

    return (
    <>
      <div className="h-full">
    
      <TopMainContent title="Dashboard" displayUploadButton />
        <FilesContainer/>
      </div>
    </>
  );
}
