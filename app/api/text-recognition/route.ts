"use client"
import { auth, clerkClient } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { useOrganization, useUser } from "@clerk/nextjs";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";

enum Status {
    TO_RECOGNIZE,
    TO_EXTRACT,
    TO_VERIFY,
  }

export async function PUT(req: Request) {
    const { userId } = auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const organization = useOrganization();
  const user = useUser();

  
  let orgId: string | undefined = undefined;
  if (organization.isLoaded && user.isLoaded) {
    orgId = organization.organization?.id ?? user.user?.id;
  }
  const { uuid, text ,category, json} = await req.json();

  if (!uuid || !text) {
    return NextResponse.json(
      { error: "No UUID nor text provided" },
      { status: 400 }
    );
  }


  const createExtractions = useMutation(api.extractions.createStructuredData);

  const updateExtraction = await createExtractions({
    text,
    category,
    status: Status.TO_EXTRACT,
    orgId: userId,
    json
  });




  if (!updateExtraction) {
    return NextResponse.json(
      { error: "Extraction not found or not updated" },
      { status: 404 }
    );
  }

  return NextResponse.json({ message: "Extraction updated" }, { status: 200 });
}
