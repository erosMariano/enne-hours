import React from "react";
import Logo from "@/images/logo.svg";
import Image from "next/image";
import Link from "next/link";
import Button from "../Button";

function Header() {
  return (
    <header className="">
      <div className="flex items-center justify-between mx-auto mt-10 container left-1/2 -translate-6/12 absolute z-10">
        <Link href="/">
          <Image src={Logo} alt="Enne hours" height={38} width={81} />
        </Link>

        <nav>
          <ul className="flex items-center justify-center gap-10">
            <li>
              <a
                href=""
                className="text-white/60 text-xs hover:text-white transition-all ease-linear"
              >
                products
              </a>
            </li>
            <li>
              <a
                href=""
                className="text-white/60 text-xs hover:text-white transition-all ease-linear"
              >
                features
              </a>
            </li>
            <li>
              <a
                href=""
                className="text-white/60 text-xs hover:text-white transition-all ease-linear"
              >
                community
              </a>
            </li>
          </ul>
        </nav>

        <div className="flex items-center gap-4">
          <Button text="Entrar" variant="primary" route="/login" />
          <Button
            text="Cadastrar"
            variant="tertiary"
            route="/register"
            border
          />
        </div>
      </div>
    </header>
  );
}

export default Header;
