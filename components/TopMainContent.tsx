"use client";

import { useOrganization, useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Icons } from "./Icons";
import MultiStep from "./Multisteps";
import { useEffect } from "react";
import { FileUploadDialog } from "./UploadDialog";
import { useStepStore } from "@/lib/store";

export function TopMainContent({
  title,
  displayUploadButton = false,
  step = undefined,
}: {
  title: string;
  displayUploadButton?: boolean;
  step?: number;
}) {
  const organization = useOrganization();
  const user = useUser();

  
  let orgId: string | undefined = undefined;
  if (organization.isLoaded && user.isLoaded) {
    orgId = organization.organization?.id ?? user.user?.id;
  }


  useEffect(() => {
    useStepStore.setState(() => ({
      current: step ?? 0,
      status: "active",
    }));
  }, [step]);
  return (
    <div className="h-32 relative flex-none border-slate-200 border-b-2 flex items-end justify-center">
      <h1
        className={cn(
          step !== undefined ? "lg:text-3xl" : "lg:text-4xl",
          "hidden lg:block mb-6 ml-10 absolute left-0 bottom-0"
        )}
      >
        {title}
      </h1>
      {step !== undefined && <MultiStep />}
      {displayUploadButton && (
        <FileUploadDialog/>
      )}
    </div>
  );
}
