"use client";

import Image, { StaticImageData } from "next/image";
import React from "react";
import { useRouter } from "next/navigation"; // Import useRouter

interface ButtonProps {
  variant?: "primary" | "secondary";
  text: string;
  icon?: StaticImageData;
}

function Button({ text, icon, variant }: ButtonProps) {
  const router = useRouter(); // Initialize useRouter

  const handleCreateAccountClick = () => {
    router.push("/login"); // Navigate to /login
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
        <Image src={icon} alt="Ver funcionalidade" /> {text}
      </button>
    );
  } else {
    return <></>;
  }
}

export default Button;
