import React, { PropsWithChildren, useMemo } from "react";
import LogoSvg from "@/assets/svgs/Logo.svg";
import { useT } from "@/utils/hooks/useTranslation";
import Link from "next/link";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";
import { clsx } from "clsx";

interface ILayoutProps extends PropsWithChildren {}

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const Layout = ({ children }: ILayoutProps) => {
  const { t } = useT();

  const { asPath } = useRouter();

  const menuList = [
    { name: t("schoolList"), href: "/" },
    { name: t("contact"), href: "/contact" },
  ];
  console.log(asPath);

  return (
    <>
      <header
        className={`fixed left-0 top-0 z-50 flex h-24 w-full items-center justify-between border-b-2 border-light bg-white px-4 text-sm xs:px-14 xs:text-base ${inter.className}`}
      >
        <LogoSvg />
        <nav className={"flex gap-4"}>
          {menuList.map((item) => (
            <Link
              href={item.href}
              key={item.name}
              className={clsx([
                "text-darkGray",
                asPath === item.href && "!text-black",
              ])}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </header>
      <main
        className={`mx-auto min-h-screen bg-light pt-24 ${inter.className}`}
      >
        {children}
      </main>
    </>
  );
};

export default Layout;
