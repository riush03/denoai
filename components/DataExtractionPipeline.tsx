"use client";

import { useEffect, useState } from "react";
import { Icons } from "./Icons";
import { ClassificationStep } from "./ClassificationStep";
import { ExtractionStep } from "./ExtractionStep";
import { SparkleIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export default function DataExtractionPipeline({
  data,
}: {
  data: {
    uuid: string;
    filename: string;
    text: string;
  };
}) {
  const categories = [
    {
      value: "receipts",
      name: "receipts",
    },
    {
      value: "credit card statements",
      name: "Card Statement",
    },
    {
      value: "invoices",
      name: "Invoice",
    },
  ];
  const [step, setStep] = useState(1);
  const [category, setCategory] = useState("other");
  const [llmCall, setLlmCall] = useState(true);

  useEffect(() => {
    if (category !== "other") {
      setStep(2);
    }
  }, [category]);
  return (
    <div className="flex flex-col flex-grow items-center justify-center mx-4">
      <SparkleIcon
        className={cn(
          llmCall ? "opacity-100" : "opacity-0",
          "w-16 h-auto mb-4 transition-opacity duration-500 2xl:-mt-72 -mt-36"
        )}
      ></SparkleIcon>
           <ExtractionStep
          uuid={data.uuid}
          text={data.text}
          setLlmCall={setLlmCall}
          category={categories.find((c) => c.value === category)! ?? "receipts"}
        />
      {step === 2 && (
        <ClassificationStep
        setLlmCall={setLlmCall}
        categories={categories}
        updateCategory={setCategory}
        text={data.text}
      />
      )}
    </div>
  );
}
