import prisma from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    return res.status(405).end();
  }
  try {
    const { user } = await serverAuth(req, res);
    console.log("🚀 ~ handler ~ user:", user);
    const favoriteMovies = await prisma.movie.findMany({
      where: {
        id: {
          in: user?.favoriteIds,
        },
      },
    });
    return res.status(200).json(favoriteMovies);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
};

export default handler;
