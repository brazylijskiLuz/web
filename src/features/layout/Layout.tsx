import React, { PropsWithChildren, useMemo, useRef, useState } from "react";
import LogoSvg from "@/assets/svgs/Logo.svg";
import { useT } from "@/utils/hooks/useTranslation";
import Link from "next/link";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";
import { clsx } from "clsx";
import { useUserStore } from "@/stores/user.store";
import { useOutsideClick } from "@/utils/hooks/useOutsideClick";
import { Select } from "../common/Select";
import AccessibilitySvg from "@/assets/svgs/Accessibiliy.svg";
import AccessibilityModal from "../common/AccessibilityModal";

interface ILayoutProps extends PropsWithChildren {}

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const Layout = ({ children }: ILayoutProps) => {
  const { t } = useT();

  const { asPath, push } = useRouter();
  const container = useRef(null);

  const grayscale = useUserStore((state) => state.grayscale);

  const [showModal, setShowModal] = useState(false);

  const menuList = [{ name: t("schoolList"), href: "/" }];

  useOutsideClick(container, () => {
    setShowModal(false);
  });

  return (
    <>
      <header
        className={`fixed left-0 top-0 z-50 flex h-24 w-full items-center justify-between border-b-2 border-light bg-white px-4 text-sm xs:px-14 xs:text-base ${inter.className}`}
      >
        <LogoSvg />
        <nav className={"flex items-center gap-4"}>
          {menuList.map((item) => (
            <Link
              href={item.href}
              key={item.name}
              className={clsx([
                "text-darkGray sm:mr-6",
                asPath === item.href && "!text-black",
              ])}
            >
              {item.name}
            </Link>
          ))}
          <div className={"flex items-center"}>
            <div className="flex h-full items-center justify-center pr-5 xs:border-l xs:border-l-primary xs:pl-5">
              <Select
                className="!w-20 rounded-full border-2 border-gray bg-white !font-semibold !text-black"
                defaultValue="PL"
                onSelect={(state) =>
                  push(asPath, asPath, { locale: state.toLowerCase() })
                }
                options={["PL", "EN"]}
              />
            </div>
            <div className="flex h-full  items-center border-l  border-l-primary pl-4">
              <button onClick={() => setShowModal((state) => !state)}>
                <AccessibilitySvg className="h-10 w-10 " />
              </button>
            </div>
          </div>
        </nav>
      </header>
      <main
        className={`mx-auto min-h-screen bg-light pt-24 ${
          grayscale && "grayscale"
        } ${inter.className}`}
      >
        <div ref={container}>{showModal && <AccessibilityModal />}</div>
        {children}
      </main>
    </>
  );
};

export default Layout;
