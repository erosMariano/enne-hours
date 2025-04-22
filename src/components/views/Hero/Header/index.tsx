import React from "react";
import Logo from "@/images/logo.svg";
import Image from "next/image";

function Header() {
  return (
    <header className="flex items-center justify-between mx-auto mt-10">
      <Image src={Logo} alt="Logo Enne Hours" quality={100} />

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

      <button className="text-white font-semibold border border-white rounded py-3 px-5 text-xs cursor-pointer transition-all ease-linear hover:bg-white hover:text-neutral-950">
        Criar conta Grátis
      </button>
    </header>
  );
}

export default Header;
