import prisma from "@/lib/prismadb";
import bcrypt from "bcrypt";
import type { NextApiRequest, NextApiResponse } from "next";

export const register = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Méthode non autorisée" });
  }

  try {
    const { email, name, password } = JSON.parse(req.body);
    if (!email || !name || !password) {
      return res
        .status(400)
        .json({ message: "Tous les champs sont obligatoires" });
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      return res.status(400).json({ message: "L'utilisateur existe déjà" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        image: "",
        emailVerified: new Date(),
      },
    });

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Quelque chose n'a pas fonctionné" });
  }
};

export default register;
