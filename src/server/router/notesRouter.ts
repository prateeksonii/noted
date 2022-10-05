import { z } from "zod";
import { createProtectedRouter } from "./context";

const notesRouter = createProtectedRouter().mutation("create", {
  input: z.object({
    note: z.string().min(1),
  }),
  async resolve({ ctx, input }) {
    await ctx.prisma.note.create({
      data: {
        note: input.note,
        userId: ctx.session.user.id,
      },
    });

    return {
      code: "CREATED",
    };
  },
});

export default notesRouter;
