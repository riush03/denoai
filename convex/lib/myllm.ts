"use node"

import { v } from "convex/values";
import { ChatOpenAI } from 'langchain/chat_models/openai';
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { CheerioWebBaseLoader } from "langchain/document_loaders/web/cheerio";
import { CacheBackedEmbeddings } from "langchain/embeddings/cache_backed";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { ConvexKVStore } from "langchain/storage/convex";
import { ConvexVectorStore } from "langchain/vectorstores/convex";
import { internal } from "../_generated/api";
import { action, internalAction } from "../_generated/server";

//data ingestion
export const ingest = action({
  args:{},
  handler: async (ctx) => {}
})

//data splitting
export const fetchAndEmbedSingle = internalAction({
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

  //generate refine output