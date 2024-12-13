import prisma from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";
import { without } from "lodash";
import { NextApiRequest, NextApiResponse } from "next";

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST" && req.method !== "DELETE") {
    return res.status(405).end();
  }

  try {
    const { movieId } = req.body;
    console.log("🚀 ~ handler ~ movieId:", movieId);
    const { user } = await serverAuth(req, res);
    const existingMovie = await prisma.movie.findUnique({
      where: {
        id: movieId,
      },
    });
    console.log("🚀 ~ handler ~ existingMovie:", existingMovie);

    if (!existingMovie) {
      throw new Error("Invalid ID");
    }

    if (req.method === "POST") {
      const updatedFavoriteIds = await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          favoriteIds: {
            push: movieId,
          },
        },
      });
      console.log("🚀 ~ handler ~ updatedFavoriteIds:", updatedFavoriteIds);

      return res.status(200).json(updatedFavoriteIds);
    }

    if (req.method === "DELETE") {
      const updatedFavoriteIds = without(user.favoriteIds, movieId);

      const updatedUser = await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          favoriteIds: updatedFavoriteIds,
        },
      });
      return res.status(200).json(updatedUser);
    }
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
};

export default handler;
