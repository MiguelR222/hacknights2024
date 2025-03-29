"use client";
import React from "react";
import { useState } from "react";
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from "@headlessui/react";
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  PhoneIcon,
  PlayCircleIcon,
} from "@heroicons/react/20/solid";
import { LoginButton } from "./login-button";

const callsToAction = [
  { name: "Watch demo", href: "#", icon: PlayCircleIcon },
  { name: "Contact sales", href: "#", icon: PhoneIcon },
];

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-emerald-700 w-full z-10">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-1 lg:px-8"
      >
        <div className="flex items-center justify-between px-2 p-1 lg:px-8">
          <a href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img alt="" src="/props/logo_blanco_h.svg" className="size-3/5 " />
          </a>
          <div className="flex ml-5 items-center">
          </div>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          <a
            href="#"
            className="flex text-sm/6 font-semibold text-white items-center hover:text-orange-200"
          ></a>
          <a
            href="/"
            className="flex text-sm/6 font-semibold text-white items-center hover:text-orange-200"
          >
            Inicio
          </a>
          <a
            href="/feed"
            className="flex text-sm/6 font-semibold text-white items-center hover:text-orange-200"
          >
            Catalogo
          </a>

          <LoginButton />
        </PopoverGroup>
      </nav>
      <div></div>
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-emerald-700 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gr-900/10">
          <div className="flex items-center justify-between w-full ">
            <a href="#" className="-m-1.5 p-1.5 ">
              <span className="sr-only">Your Company</span>
              <img
                alt=""
                src="/props/logo_blanco_h.svg"
                className="h-16 w-auto"
              />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700 bg-white"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10 ">
              <div className="space-y-4 py-6 flex flex-col items-cente w-full ">

                <a
                  href="/"
                  className="-mx-3 block  px-3 py-2 text-base/7 font-semibold text-white outline text-center "
                >
                  Inicio
                </a>
                <a
                  href="/feed"
                  className="-mx-3 block  px-3 py-2 text-base/7 font-semibold text-white  outline text-center"
                >
                  Catalogo
                </a>
                <div className="flex justify-center mt-4">
                  <LoginButton />
                </div>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
};

export default Header;
