import { ConvexError, v } from "convex/values";
import {
  MutationCtx,
  QueryCtx,
  internalMutation,
  mutation,
  query,
} from "./_generated/server";
import { getUser } from "./users";
import { fileTypes } from "./schema";
import { fileCategories } from "./schema";
import { Doc, Id } from "./_generated/dataModel";

export async function hasAccessToOrg(
    ctx: QueryCtx | MutationCtx,
    orgId: string
  ) {
    const identity = await ctx.auth.getUserIdentity();
  
    if (!identity) {
      return null;
    }
  
  
    const user = await ctx.db
      .query("users")
      .withIndex("by_tokenIdentifier", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier)
      )
      .first();
  
    if (!user) {
      return null;
    }
  
    const hasAccess =
      user.orgIds.some((item) => item.orgId === orgId) ||
      user.tokenIdentifier.includes(orgId);
  
    console.log(user.orgIds);
    console.log(user.tokenIdentifier,identity.tokenIdentifier)
  
    if (!hasAccess) {
      return null;
    }
  
    return { user };
  }


  export const createStructuredData = mutation({
    args: {
      category: v.any(),
      text: v.string(),
      status: v.number(),
      orgId: v.string(),
      json: v.any(),
    },
    async handler(ctx, args) {
      const identity = await ctx.auth.getUserIdentity();
      const hasAccess = await hasAccessToOrg(ctx, args.orgId);
  
      console.log(hasAccess);
  
      if (!hasAccess) {
        throw new ConvexError("you do not have access to this org");
      }
  
      await ctx.db.insert("extractions", {
        category: args.category,
        text: args.text,
        status: args.status,
        orgId: args.orgId,
        json: args.json,
        userId: hasAccess.user._id,
      });
    },
  });


  export const getStructuredData = query({
    args: {
      orgId: v.string(),
      query: v.optional(v.string()),
    },
    async handler(ctx, args) {
      const hasAccess = await hasAccessToOrg(ctx, args.orgId);
  
      if (!hasAccess) {
        return [];
      }
  
  
      let extractions = await ctx.db
        .query("extractions")
        .withIndex("by_userId_orgId", (q) =>
          q.eq("userId", hasAccess.user._id).eq("orgId", args.orgId)
        )
        .collect();
  
      const query = args.query;
  
      if (query) {
        extractions = extractions.filter((extraction) =>
          extraction.category.toLowerCase().includes(query.toLowerCase())
        );
      }
  
      return extractions;
    },
  });