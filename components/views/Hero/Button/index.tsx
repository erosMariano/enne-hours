"use client";

import Image, { StaticImageData } from "next/image";
import React from "react";
import { useRouter } from "next/navigation"; // Import useRouter

interface ButtonProps {
  variant?: "primary" | "secondary" | "tertiary";
  text: string;
  icon?: StaticImageData;
  route?: string; // Optional route prop
  border?: boolean;
}

function Button({ text, icon, variant, route, border }: ButtonProps) {
  const router = useRouter(); // Initialize useRouter

  const handleCreateAccountClick = () => {
    if (route) router.push(route); // Navigate to /cadastro
  };

  if (variant === "primary") {
    return (
      <button
        className="text-neutral-950 bg-white font-semibold border border-white rounded py-3 px-5 text-xs cursor-pointer transition-all ease-linear hover:bg-transparent hover:text-white"
        onClick={handleCreateAccountClick} // Add onClick handler
      >
        {text}
      </button>
    );
  } else if (variant === "secondary" && icon) {
    return (
      <button
        className="flex gap-2 items-center justify-center text-white bg-transparent font-semibold border border-transparent rounded py-3 px-5 text-xs cursor-pointer transition-all ease-linear hover:border-white"
        onClick={handleCreateAccountClick} // Add onClick handler
      >
        <Image alt="Ver funcionalidade" src={icon} /> {text}
      </button>
    );
  } else if (variant === "tertiary") {
    return (
      <button
        className={`${
          border && "border border-white"
        } text-white font-semibold rounded py-3 px-5 text-xs cursor-pointer transition-all ease-linear hover:bg-white hover:text-neutral-950`}
        onClick={handleCreateAccountClick}
      >
        {icon && <Image alt="Ver funcionalidade" src={icon} />}
        {text}
      </button>
    );
  } else {
    return <></>;
  }
}

export default Button;
