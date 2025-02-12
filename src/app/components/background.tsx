import React from "react";
import bgLight from "../../../public/images/bg-light-theme.png";
import bgDark from "../../../public/images/bg-dark-theme.png";
import Image from "next/image";

export default function Background() {
  return (
    <>
      <Image
        alt="background light theme"
        src={bgLight}
        placeholder="blur"
        quality={100}
        fill
        sizes="100vw"
        className="-z-50 block object-cover dark:hidden"
      />
      <Image
        alt="background dark theme"
        src={bgDark}
        placeholder="blur"
        quality={100}
        fill
        sizes="100vw"
        className="-z-50 hidden object-cover dark:block"
      />
    </>
  );
}
