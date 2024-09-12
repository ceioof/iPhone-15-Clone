"use client";

import Image from "next/image";
import Link from "next/link";
import { appleImg, bagImg, searchImg } from "../utils";
import { navLists } from "../constants";
import { useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleTrigger = () => {
    setIsOpen(!isOpen);
  };

  useGSAP(() => {
    gsap.to("#line-top", {
      duration: 0.24,
      attr: { points: isOpen ? "3.5 3.5, 15 15" : "2 5, 16 5" },
    });
    gsap.to("#line-bottom", {
      duration: 0.24,
      attr: { points: isOpen ? "3.5 15, 15 3.5" : "2 12, 16 12" },
    });
  }, [isOpen]);

  return (
    <header className="w-full p-5 sm:px-10  ">
      <nav className="h-[44px] ">
        <div className="container mx-auto">
          <div className="globalnav-content w-full mx-auto flex justify-between items-center relative max-w-[1120px]">
            <Link href="/" aria-label="Apple Home">
              <Image
                className={`${isOpen ? "max-sm:invisible" : ""}`}
                src={appleImg}
                alt="Home"
                width={14}
                height={18}
                priority
              />
            </Link>
            <div
              className={`globalnav-menu max-sm:w-full ${
                isOpen ? "max-sm:h-screen " : "max-sm:max-h-0"
              } max-sm:z-[9999] max-sm:bg-black max-sm:fixed top-0 right-0 left-0 max-sm:mt-[44px] max-sm:transition-all max-sm:overflow-hidden`}
            >
              <ul
                className={`list-none flex flex-1 justify-center max-sm:flex-col ${
                  !isOpen ? "max-sm:h-0 max-sm:overflow-hidden" : ""
                }`}
              >
                {navLists.map((navItem) => (
                  <li key={navItem} className="mx-2 max-sm:px-6 max-sm:py-2">
                    <Link
                      href={`/${navItem}`}
                      className="text-sm
                      max-sm:text-2xl text-gray-100 hover:text-white transition-colors "
                    >
                      {navItem}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/search" aria-label="Search">
                <Image
                  className={`${isOpen ? "max-sm:invisible" : ""}`}
                  src={searchImg}
                  alt="Search"
                  width={18}
                  height={18}
                />
              </Link>
              <Link href="/bag" aria-label="Shopping Bag">
                <Image
                  className={`${isOpen ? "max-sm:invisible" : ""}`}
                  src={bagImg}
                  alt="Bag"
                  width={18}
                  height={18}
                />
              </Link>
              <button
                className={`sm:hidden ${isOpen && "z-[9999] fixed right-5 "}`}
                onClick={handleTrigger}
                aria-label="Toggle Navigation Menu"
              >
                <svg width="18" height="18" viewBox="0 0 18 18">
                  <polyline
                    id="line-top"
                    points="2 5, 16 5"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <polyline
                    id="line-bottom"
                    points="2 12, 16 12"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>
      <div
        className={`bg-black  ${
          isOpen ? "fixed top-0 right-0 left-0 h-[44px] z-[9998]" : "h-0"
        }`}
      ></div>
    </header>
  );
};

export default Header;
