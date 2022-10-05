// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { exampleRouter } from "./example";
import { protectedExampleRouter } from "./protected-example-router";
import usersRouter from "./usersRouter";
import notesRouter from "./notesRouter";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("users.", usersRouter)
  .merge("notes.", notesRouter);
// export type definition of API
export type AppRouter = typeof appRouter;
