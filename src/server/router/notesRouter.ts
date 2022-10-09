import { z } from "zod";
import { createProtectedRouter } from "./context";

const notesRouter = createProtectedRouter()
  .query("all", {
    async resolve({ ctx }) {
      return ctx.prisma.note.findMany({
        where: {
          userId: ctx.session.user.id,
        },
      });
    },
  })
  .mutation("create", {
    input: z.object({
      note: z.string().min(1),
    }),
    async resolve({ ctx, input }) {
      const note = await ctx.prisma.note.create({
        data: {
          note: input.note,
          userId: ctx.session.user.id,
        },
      });

      return {
        code: "CREATED",
        note,
      };
    },
  })
  .mutation("delete", {
    input: z.object({
      noteId: z.string().cuid(),
    }),
    async resolve({ ctx, input }) {
      await ctx.prisma.note.delete({
        where: {
          id: input.noteId,
        },
      });

      return {
        code: "OK",
      };
    },
  })
  .mutation("update", {
    input: z.object({
      noteId: z.string().cuid(),
      note: z.string(),
    }),
    async resolve({ ctx, input }) {
      if (input.note.length <= 0) {
        await ctx.prisma.note.delete({
          where: {
            id: input.noteId,
          },
        });
      } else {
        await ctx.prisma.note.update({
          where: {
            id: input.noteId,
          },
          data: {
            note: input.note,
          },
        });
      }

      return {
        code: "OK",
      };
    },
  });

export default notesRouter;
