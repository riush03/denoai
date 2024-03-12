"use client";
import MultiStep from "./Multisteps";

import Link from "next/link";
import { cn } from "../lib/utils";
import { Button, buttonVariants } from "./ui/button";
import { headers } from "next/headers";

import dynamic from "next/dynamic";
import { Textarea } from "./ui/textarea";
import { useState } from "react";
import { Icons } from "./Icons";
import Balancer from "react-wrap-balancer";
import { useRouter } from "next/navigation";

export default function TextRecognitionPipeline() {
 
  return (
    <div className="mb-10 flex-grow flex flex-col mx-4">
      <div className="flex flex-1 items-center justify-center gap-x-10">
        {/* <PdfViewer url={url} scaleValue={1} /> */}
        
        <div className="w-3/8 h-[500px] 2xl:w-3/10 2xl:h-3/4 flex flex-col justify-between">
          <div className="w-full h-3/4">
            <h1 className="mb-1 text-sm text-slate-700 overflow-hidden">
              Text from{" "}
              <span className="text-ellipsis font-semibold">denis.pdf</span>
            </h1>
            <Textarea
              value="some text"
              
              className={cn(
                 
                "w-full h-full rounded-lg"
              )}
            />
           
            <div className="flex gap-2 items-center justify-center w-full mt-4">
              <Icons.help
                width={20}
                height={20}
                className="inline-block text-slate-500 flex-none"
              />
              <Balancer>
                <p className="text-sm text-slate-500">
                  Please make sure that the text above matches the text in the
                  PDF. Feel free to remove or edit any part of the text.
                </p>
              </Balancer>
            </div>
          </div>
          <div className="flex gap-2 justify-end">
            <Link
              className={cn(
                buttonVariants({
                  variant: "secondary",
                })
              )}
              href={`/data-extraction/`}
            >
              Cancel
            </Link>
            <Button
              
              className="w-48"
             
            >
              
              Confirm & Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
