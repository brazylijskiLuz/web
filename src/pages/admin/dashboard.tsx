import {GetStaticProps} from "next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {Button} from "@/features/common/Button";
import {useAuthStore} from "@/stores/auth.store";
import {useRouter} from "next/router";
import {useQueryClient} from "@tanstack/react-query";

export default function Dashboard () {
    const { reload } = useRouter()

    const queryClient = useQueryClient()

    const setToken = useAuthStore(s => s.setToken)
    const handleLogout = () => {
        setToken(null);
        queryClient.removeQueries();
        reload();
    }

    return (
        <div>
            <p>You re logged in as ADMIN</p>
            <Button onClick={handleLogout} >logout</Button>
        </div>
    );
};

Dashboard.auth = {
    role: "ADMIN"
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    if (!locale) {
        throw new Error("locale is undefined");
    }

    return {
        props: {
            ...(await serverSideTranslations(locale, [
                "common",
            ])),
        },
    };
};