import Head from "next/head";
import {LoginScreen} from "@/features/admin/auth/screens/Login.Screen";
import {GetStaticProps} from "next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";

export default function Admin () {

    return (
        <>
            <Head>
                <title>test</title>
            </Head>
            <LoginScreen />
        </>

    );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    if (!locale) {
        throw new Error("locale is undefined");
    }

    return {
        props: {
            ...(await serverSideTranslations(locale, [
                "common",
                "auth"
            ])),
        },
    };
};
