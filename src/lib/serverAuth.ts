import { NextApiRequest } from "next";
import { getSession } from "next-auth/react";
import prisma from "./prismadb";

const serverAuth = async (req: NextApiRequest) => {
  const session = await getSession({ req });
  if (!session?.user?.email) {
    throw new Error("Not signed in");
  }
  const user = await prisma.user.findUnique({
    where: {
      email: session.user?.email as string,
    },
  });
  if (!user) {
    throw new Error("Not signed in");
  }
  return { user };
};

export default serverAuth;
