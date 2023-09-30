import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import HomeScreen from "@/features/user/home/screens/Home.screen";


export default function Home() {
  return <HomeScreen/> ;
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
