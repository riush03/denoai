import { v } from "convex/values";
import { api,internal } from "./_generated/api";
import { internalAction } from "./_generated/server";
import { PromptTemplate } from 'langchain/prompts';
import { LLMChain, loadQARefineChain } from 'langchain/chains';
import {zodToJsonSchema} from "zod-to-json-schema";
import {JsonOutputToolsParser} from "langchain/output_parsers";
import { ChatOpenAI } from 'langchain/chat_models/openai';
import { jsonAnalysis } from "./constants/prompts";
import { z } from "zod";

import { url } from "inspector";
const OPENAI_MODEL = "gpt-3.5-turbo";

function classifyFilesCategories(): LLMChain{
    const llmModel = new ChatOpenAI({
      cache: true,
      maxConcurrency: 10,
      maxRetries:3,
      modelName: OPENAI_MODEL,
      openAIApiKey: process.env.OPENAI_API_KEY,
      temperature: 0,
    });
  
    const llmChain = new LLMChain({
      llm:llmModel,
      prompt:jsonAnalysis,
    });

    return llmChain;


   }



function getStructuredData(){
    const dataSchema = z.object({
        text: z.any().describe("THe extracted text"),
        jsonchema: z.any().describe("THe extracted text"),
        outformat: z.any().describe("THe extracted text"),
    })

const model = new ChatOpenAI({
    modelName: "gpt-3.5-turbo-1106",
    openAIApiKey: "",
    temperature: 0,
}).bind({
    tools: [
        {
            type: "function",
            function:{
                name:"Document",
                description:"A financial document either a receipt,invoice or bank card statemet",
                parameters: zodToJsonSchema(dataSchema),
            },
        },
    ],
});

const parser = new JsonOutputToolsParser();
const chain = jsonAnalysis.pipe(model).pipe(parser);

return chain;
}