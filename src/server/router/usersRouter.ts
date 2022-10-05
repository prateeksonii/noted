import { createProtectedRouter } from "./context";

const usersRouter = createProtectedRouter().query("me", {
  async resolve({ ctx }) {
    const userId = ctx.session.user.id;
    const user = await ctx.prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    return user;
  },
});

export default usersRouter;
