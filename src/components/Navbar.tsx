"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { BsBell, BsChevronDown, BsSearch } from "react-icons/bs";
import AccountMenu from "./AccountMenu";
import MobileMenu from "./MobileMenu";
import NavbarItem from "./NavbarItem";

const TOP_OFFSTET = 66;

const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showBackgroundMenu, setShowBackgroundMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= TOP_OFFSTET) {
        setShowBackgroundMenu(false);
      } else {
        setShowBackgroundMenu(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setShowMobileMenu((current) => !current);
  }, []);

  const toggleAccountMenu = useCallback(() => {
    setShowAccountMenu((current) => !current);
  }, []);

  return (
    <nav className="fixed z-40 w-full">
      <div
        className={`flex flex-row items-center px-4 py-6 transition duration-500 md:px-16 ${
          showBackgroundMenu ? "bg-zinc-900 bg-opacity-90" : ""
        }`}
      >
        <Image src="/images/logo.png" alt="Logo" width={100} height={100} />
        <div className="ml-8 hidden flex-row gap-7 lg:flex">
          <NavbarItem label="Accueil" />
          <NavbarItem label="Series" />
          <NavbarItem label="Films" />
          <NavbarItem label="Nouveaux et populaires" />
          <NavbarItem label="Ma liste" />
          <NavbarItem label="Parcourir" />
        </div>
        <div
          onClick={toggleMobileMenu}
          className="relative ml-8 flex cursor-pointer flex-row items-center gap-2 lg:hidden"
        >
          <p className="text-sm text-white ">Menu</p>
          <BsChevronDown
            className={`text-white transition ${
              showMobileMenu ? "rotate-180" : ""
            }`}
          />
          <MobileMenu visible={showMobileMenu} />
        </div>
        <div className="ml-auto flex flex-row items-center gap-7">
          <div className="cursor-pointer text-gray-200 transition hover:text-gray-300">
            <BsSearch />
          </div>
          <div className="cursor-pointer text-gray-200 transition hover:text-gray-300">
            <BsBell />
          </div>
          <div
            onClick={toggleAccountMenu}
            className="relative flex cursor-pointer flex-row items-center gap-2"
          >
            <div className="size-6 overflow-hidden rounded-md lg:size-10">
              <Image
                src="/images/default-blue.png"
                alt="Profile"
                width={40}
                height={40}
              />
            </div>
            <BsChevronDown
              className={`transitio text-white ${
                showAccountMenu ? "rotate-180" : ""
              }`}
            />
            <AccountMenu visible={showAccountMenu} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
