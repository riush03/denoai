"use client"

import React, { useState} from "react";
import { api } from "@/convex/_generated/api";
import { Doc,Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import {
    useOrganization,
    useUser,
  } from "@clerk/nextjs";
import { DataTable } from "@/components/ui/data-table";
import {
  Extraction,
  categories,
  columns,
  columnsWithoutStatus,
  statuses,
} from "../app/(dash)/dashboard/columns";



export function FilesContainer() {
    const organization = useOrganization();
    const user = useUser();
    const [query, setQuery] = useState("");
    const [type, setType] = useState<Doc<"files">["type"] | "all">("all");
  
    let orgId: string | undefined = undefined;
    if (organization.isLoaded && user.isLoaded) {
      orgId = organization.organization?.id ?? user.user?.id;
    }
  
    const favorites = useQuery(
      api.files.getAllFavorites,
      orgId ? { orgId } : "skip"
    );

    const files = useQuery(
        api.files.getFiles,
        orgId
          ? {
              orgId,
              type: type === "all" ? undefined : type,
              query,
            }
          : "skip"
      );
      const isLoading = files === undefined;
    
      const modifiedFiles =
        files?.map((file) => ({
          ...file,
          isFavorited: (favorites ?? []).some(
            (favorite) => favorite.fileId === file._id
          ),
        })) ?? [];

    return (
    <>
      <div>
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
          data={modifiedFiles}
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
