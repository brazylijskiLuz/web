import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useT } from "@/utils/hooks/useTranslation";
import Head from "next/head";
import HomeScreen from "@/features/user/home/screens/Home.screen";

export default function Home() {
  const { t } = useT();

  return (
    <>
      <Head>
        <title>{t("pages:searchSchool")}</title>
      </Head>
      <HomeScreen />
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  if (!locale) {
    throw new Error("locale is undefined");
  }

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "pages"])),
    },
  };
};
