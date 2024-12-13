import prisma from "@/lib/prismadb";
import servAuth from "@/lib/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";

export const movies = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    await servAuth(req, res);
    const movies = await prisma.movie.findMany();

    return res.status(200).json(movies);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
};

export default movies;
