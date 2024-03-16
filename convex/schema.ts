import { defineSchema,defineTable } from "convex/server";
import { v } from "convex/values";

export const fileTypes = v.union(
    v.literal("csv"),
    v.literal("pdf")
  );

export const fileCategories = v.union(
    v.literal("invoice"),
    v.literal("receipts"),
    v.literal("card statement")
  );


export const roles = v.union(v.literal("admin"), v.literal("member"));

export default defineSchema({
    files: defineTable({
        category: v.string(),
        status: v.number(),
        type: fileTypes,
        orgId: v.string(),
        fileId: v.id("_storage"),
        userId: v.id("users"),
        shouldDelete: v.optional(v.boolean()),
      })
        .index("by_orgId", ["orgId"])
        .index("by_shouldDelete", ["shouldDelete"]),
      favorites: defineTable({
        fileId: v.id("files"),
        orgId: v.string(),
        userId: v.id("users"),
      }).index("by_userId_orgId_fileId", ["userId", "orgId", "fileId"]),
      users: defineTable({
        tokenIdentifier: v.string(),
        name: v.optional(v.string()),
        image: v.optional(v.string()),
        orgIds: v.array(
          v.object({
            orgId: v.string(),
            role: roles,
          })
        ),
      }).index("by_tokenIdentifier", ["tokenIdentifier"]),
    extractions: defineTable({
        category: v.any(),
        text: v.string(),
        status: v.number(),
        orgId: v.string(),
        userId: v.id("users"),
        json: v.any(),
    }).index("by_userId_orgId",["userId","orgId"]),
});