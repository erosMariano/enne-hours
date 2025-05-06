import React from "react";
import Image from "next/image";
import Link from "next/link";

import Button from "../Button";

import Logo from "@/images/logo.svg";

function Header() {
  return (
    <header>
      <div className="flex items-center justify-between mx-auto mt-10 container left-1/2 -translate-x-1/2 absolute z-10">
        <Link href="/">
          <Image alt="Enne hours" height={38} src={Logo} width={81} />
        </Link>

        <nav>
          <ul className="flex items-center justify-center gap-10">
            <li>
              <a
                className="text-white/60 text-xs hover:text-white transition-all ease-linear"
                href="https://teste.com"
              >
                products
              </a>
            </li>
            <li>
              <a
                className="text-white/60 text-xs hover:text-white transition-all ease-linear"
                href="https://teste.com"
              >
                features
              </a>
            </li>
            <li>
              <a
                className="text-white/60 text-xs hover:text-white transition-all ease-linear"
                href="https://teste.com"
              >
                community
              </a>
            </li>
          </ul>
        </nav>

        <div className="flex items-center gap-4">
          <Button route="/login" text="Entrar" variant="primary" />
          <Button
            border
            route="/register"
            text="Cadastrar"
            variant="tertiary"
          />
        </div>
      </div>
    </header>
  );
}

export default Header;
