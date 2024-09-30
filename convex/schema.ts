// NOTE: You can remove this file. Declaring the shape
// of the database is entirely optional in Convex.
// See https://docs.convex.dev/database/schemas.

import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema(
  {
    users: defineTable({
      username: v.string(),
      imageUrl: v.string(),
      clerkId: v.string(),
      email: v.string(),
    }).index('by_email', ['email']).index('by_clerkId', ['clerkId']),
    requests: defineTable({
      sender: v.id('users'),
      receiver: v.id('users'),
    }).index("by_receiver", ['receiver']).index("by_receiver_sender", ['receiver', 'sender'])
  },
  // If you ever get an error about schema mismatch
  // between your data and your schema, and you cannot
  // change the schema to match the current data in your database,
  // you can:
  //  1. Use the dashboard to delete tables or individual documents
  //     that are causing the error.
  //  2. Change this option to `false` and make changes to the data
  //     freely, ignoring the schema. Don't forget to change back to `true`!
  { schemaValidation: true }
);
