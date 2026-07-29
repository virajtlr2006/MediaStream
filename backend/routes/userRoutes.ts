import { db } from "..";
import { usersTable } from "../db/schema";


const server = Bun.serve({
  routes: {
    "/user": {
      POST: async (req) => {
        try {
          // Parse the JSON request body
          const body = (await req.json()) as {
            clerkID?: string;
            username?: string;
            email?: string;
          };

          const { clerkID, username, email } = body;

          if (!username || !email) {
            return Response.json(
              {
                created: false,
                error: "username and email are required",
              },
              {
                status: 400,
              }
            );
          }

          const newUser = db.insert(usersTable).values({username, email });

          return Response.json({
            created: true,
            clerkID,
            username,
            email,
          });
        } catch (error) {
          return Response.json(
            {
              created: false,
              error: "Invalid JSON request body",
            },
            {
              status: 400,
            }
          );
        }
      },
    },
  },

  // Fallback for unmatched routes
  fetch(req) {
    return new Response("Not Found", { status: 404 });
  },
});

console.log(`🚀 Server running at ${server.url}`);