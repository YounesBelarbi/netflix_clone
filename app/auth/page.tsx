"use client";

import { Input } from "@/components/Input";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useCallback, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import logo from "../../public/images/logo.png";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [variant, setVariant] = useState("login");

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === "login" ? "register" : "login"
    );
  }, []);

  const login = useCallback(async () => {
    try {
      await signIn("credentials", {
        email,
        password,
        callbackUrl: "/profile",
      });
    } catch (error) {
      console.log(error);
    }
  }, [email, password]);

  const register = useCallback(async () => {
    try {
      await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify({ email, name, password }),
      });

      login();
    } catch (error) {
      console.log(error);
    }
  }, [email, name, password, login]);

  return (
    <div className="relative size-full bg-[url('/images/hero.jpg')] bg-cover bg-fixed bg-center bg-no-repeat">
      <div className="size-full bg-black lg:bg-opacity-50">
        <nav className="px-12">
          <Image src={logo} alt="alt" width={150} height={15} />
        </nav>
        <div className="flex justify-center">
          <div className="bg-opacity/70 mt-2 w-full self-center rounded-md bg-black p-16 lg:w-2/5 lg:max-w-md">
            <h2 className="mb-8 text-4xl font-semibold text-white">
              {variant === "login" ? "se connecter" : "créer un compte"}
            </h2>
            <div className="flex flex-col gap-4">
              {variant === "register" && (
                <Input
                  id="userName"
                  label="userName"
                  type="text"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setName(event.target.value);
                  }}
                  value={name}
                />
              )}
              <Input
                id="email"
                label="email"
                type="email"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setEmail(event.target.value);
                }}
                value={email}
              />
              <Input
                id="password"
                label="password"
                type="password"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setPassword(event.target.value);
                }}
                value={password}
              />
            </div>
            <button
              onClick={variant === "login" ? login : register}
              className="mt-10 w-full rounded-md bg-red-600 py-3 text-white transition hover:bg-red-700"
            >
              {variant === "login" ? "se connecter" : "créer un compte"}
            </button>
            <div className="mt-8 flex flex-row items-center justify-center gap-4">
              <div
                onClick={() => signIn("google", { callbackUrl: "/profile" })}
                className="flex size-10 cursor-pointer items-center justify-center rounded-full bg-white transition hover:opacity-80"
              >
                <FcGoogle size={30} />
              </div>
              <div
                onClick={() => signIn("github", { callbackUrl: "/profile" })}
                className="flex size-10 cursor-pointer items-center justify-center rounded-full bg-white transition hover:opacity-80"
              >
                <FaGithub size={30} />
              </div>
            </div>
            <p className="mt-12 text-neutral-500">
              {variant === "login"
                ? "Première fois sur Netflix ?"
                : "Vous avez deja un compte ?"}
              <span
                onClick={toggleVariant}
                className="ml-1 cursor-pointer text-white hover:underline"
              >
                {variant === "login" ? "créer un compte" : "se connecter"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
