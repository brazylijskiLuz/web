import PreviewScreen from "@/features/user/schoolPreview/screens/PreviewScreen";
import { useT } from "@/utils/hooks/useTranslation";
import { GetStaticPaths, GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";

const SchoolPreview = () => {
  const { t } = useT();
  return (
    <>
      <Head>
        <title>{t("pages:schoolPreview")}</title>
      </Head>
      <PreviewScreen />
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  if (!locale) {
    throw new Error("locale is undefined");
  }

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "pages", "preview"])),
    },
  };
};

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export default SchoolPreview;
