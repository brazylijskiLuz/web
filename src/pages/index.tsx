import Image from "next/image";
import { Inter } from "next/font/google";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useT } from "@/utils/hooks/useTranslation";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { t } = useT();

  return (
    <main
      className={`flex min-h-screen flex-col items-center p-24 ${inter.className}`}
    >
      <p>web</p>
      <p>{t("test")}</p>
    </main>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  if (!locale) {
    throw new Error("locale is undefined");
  }

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
};
