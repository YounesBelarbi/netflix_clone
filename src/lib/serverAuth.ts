import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../../pages/api/auth/[...nextauth]";
import prisma from "./prismadb";

const serverAuth = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);
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
