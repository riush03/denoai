"use client"

import React, { useState} from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import {
    useOrganization,
    useUser,
    auth, 
    clerkClient
  } from "@clerk/nextjs";
import DataExtractionPipeline from "@/components/DataExtractionPipeline";
import { TopMainContent } from "@/components/TopMainContent";
import getExtractionData  from "@/lib/requests";



export  function ExtractionPipelineClient({
  params,
}: {
  params: { uuid: string };
}) {
    const organization = useOrganization();
    const user = useUser();
    const [query, setQuery] = useState("");
    let orgId: string | undefined = undefined;
    if (organization.isLoaded && user.isLoaded) {
      orgId = organization.organization?.id ?? user.user?.id;
    }

    const extractions = useQuery(api.extractions.getStructuredData ,
           orgId? {
            orgId,
            query,
          } : "skip"
          ) || [];
          
  return (
    <div>
      {extractions.map((data) => (
                <DataExtractionPipeline
                data={{ 
                  uuid: params.uuid,
                  filename: data.orgId,
                  text: data.text,
                }}
          />
      ))}
 

    </div>
  );
}
