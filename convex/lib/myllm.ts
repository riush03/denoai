"use node"

import { v } from "convex/values";
import { ChatOpenAI } from 'langchain/chat_models/openai';
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { CheerioWebBaseLoader } from "langchain/document_loaders/web/cheerio";
import { CacheBackedEmbeddings } from "langchain/embeddings/cache_backed";
import { PDFLoader } from "langchain/document_loaders/fs/pdf"
import { ChainValues } from 'langchain/dist/schema';
import { LLMChain, loadQARefineChain } from 'langchain/chains';
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { ConvexKVStore } from "langchain/storage/convex";
import { ConvexVectorStore } from "langchain/vectorstores/convex";
import { BaseLanguageModel } from 'langchain/dist/base_language';
import { Document } from 'langchain/document';
import { PromptTemplate } from 'langchain/prompts';
import { jsonClassification ,jsonAnalysis,jsonOneShotExtraction,jsonZeroShotSchemaExtractionTemplate,jsonZeroShotSchemaExtractionRefine} from "../constants/prompts";
import { internal } from "../_generated/api";
import { action, internalAction } from "../_generated/server";
import { Schema } from "zod";

const OPENAI_MODEL = "gpt-3.5-turbo";
const sampleTemplate = new PromptTemplate({
  template:'{pageDescription} in the style of a children book ilustration',
  inputVariables: ["pageDescription"],
});
//data ingestion
export const ingest = action({
  args:{},
  handler: async (ctx) => {}
})

//data splitting
 const fetchAndEmbedSingle = internalAction({
    args: {
      url: v.string(),
    },
    handler: async (ctx, { url }) => {
      const loader = new CheerioWebBaseLoader(url);
      const data = await loader.load();
      const textSplitter = new RecursiveCharacterTextSplitter({
        chunkSize: 1000,
        chunkOverlap: 200,
      });
  
      const splitDocs = await textSplitter.splitDocuments(data);
  
      const embeddings = new CacheBackedEmbeddings({
        underlyingEmbeddings: new OpenAIEmbeddings(),
        documentEmbeddingStore: new ConvexKVStore({ ctx }),
      });
  
      await ConvexVectorStore.fromDocuments(splitDocs, embeddings, { ctx });
    },
  });

  //generate output
function extract(){

}

  //generate refine output


 async function generateOutput(chainValues: ChainValues): Promise<ChainValues> {
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

  try{
    const output = llmChain.call(chainValues);
    const response = JSON.stringify(output);
    return {response};
  } catch(e){
    throw e;
  }
 }


