"use client"

import React, {useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import Balancer from 'react-wrap-balancer';
import { Switch } from "@radix-ui/react-switch";
import { Label } from "@radix-ui/react-label";
import { HelpTooltip } from "./ui/help-tooltip";
import { Icons } from "./Icons";
import { cn } from "@/lib/utils";


const Dropzone = ({className}:{className?: string;}) => {
  return (
    <div className={cn(className,"flex flex-col items-center justify-center")}>
        <div className="flex items-center gap-2">
            <Switch 
               id="bulk-processing"
               disabled/>
            <Label htmlFor="bulk-processing">Bulk Processing</Label>
            <HelpTooltip>
                <Balancer>
                    <p className="mb-4">
                        Bulk processing allows you to upload multiple files at once
                    </p>
                    <p>
                    It will automatically process the files and stop at its current
                    pipeline when it encounters an error.
                    </p>
                </Balancer>
            </HelpTooltip>
        </div>
        <div className="border border-dashed rounded-xl border-slate-300 bg-slate-50 px-16 py-10 text-slate-600 cursor-pointe">
            <input type="file" /> {" "}
            <div>
                <Icons.upload 
                   width={40}
                   height={40}
                   strokeWidth={1.5}
                   className="mx-auto text-slate-400"
                />
                <div className="text-center">
                    <p>Drag & drop or <span className="font-semibold"> browse files</span></p>
                    <em className="text-xs text-slate-500">
                        Up to 5MB
                    </em>
                </div>
            </div>
        </div>

    </div>
  )
}

export default Dropzone
