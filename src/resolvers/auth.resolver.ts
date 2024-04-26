const authResolver = {
    Query: {
      
      authUser: async (_, __, { req, prisma }) => {
        try {
          const userId = req.session.userId;
          if (!userId) {
            throw new Error("User not authenticated");
          }
          const user = await prisma.user.findUnique({ where: { id: userId } });
          return user;
        } catch (err) {
          console.error("Error in authUser resolver: ", err);
          throw new Error(err.message || "Internal server error");
        }
      },
    },
  };
  
  export default authResolver;
  