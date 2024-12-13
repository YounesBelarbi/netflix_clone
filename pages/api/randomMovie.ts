import prisma from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    await serverAuth(req, res);

    const movieCount = await prisma.movie.count();
    const randomIndex = Math.floor(Math.random() * movieCount);
    const randomMovies = await prisma.movie.findMany({
      take: 1, // Limit to 1 movie
      skip: randomIndex, // Skip to the random index
    });

    if (randomMovies.length === 0) {
      return res.status(404).json({ message: "No movies found" });
    }

    return res.status(200).json(randomMovies[0]);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
};

export default handler;
