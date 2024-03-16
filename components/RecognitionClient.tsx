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
import TextRecognitionPipeline from "@/components/TextRecognitionPipeline";
import { TopMainContent } from "@/components/TopMainContent";
import { getFileUrl ,getText} from "@/lib/requests";
import { Doc } from "@/convex/_generated/dataModel";

export  function RecognitionClient({
  params,
  file,
}: {
  params: { uuid: string };
  file:Doc<"files">
}) {
    const organization = useOrganization();
    const user = useUser();
    const [query, setQuery] = useState("");
    let orgId: string | undefined = undefined;
    if (organization.isLoaded && user.isLoaded) {
      orgId = organization.organization?.id ?? user.user?.id;
    }

    

    const url = 'https://benevolent-avocet-845.convex.cloud/api/storage/kg2enqz2a0zz565wd2fm8kxbd16n6vec';

    console.log(url);

    const text = getText(url);

    const filename = "invoice";

  return (
    <div>
      <div className="flex flex-col h-full">
        <TopMainContent title="Text Recognition" step={2} />
        
                <TextRecognitionPipeline
                uuid={params.uuid}
                url={url}
                text={text}
                filename={filename}
              />
     
    
      </div>
    </div>
  );
}
