import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useState } from "react";
import { QueryClient } from "@tanstack/query-core";
import { Hydrate, QueryClientProvider } from "@tanstack/react-query";
import { appWithTranslation } from "next-i18next";
import Layout from "@/features/layout/Layout";
import { Inter } from "next/font/google";
import { AuthProvider } from "@/features/admin/auth/AuthProvider";
import { NextComponentType } from "next";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "next-themes";

const inter = Inter({ subsets: ["latin"] });

type CustomAppProps = AppProps & {
  Component: NextComponentType & {
    auth?: {
      role: "ADMIN";
    };
  };
};

function App({ Component, pageProps }: CustomAppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          className: `font-bold p-6 flex flex-col gap-2 text-xl text-center break-all ${inter.className}`,
        }}
      />
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Layout>
            {Component.auth ? (
              <AuthProvider role={Component.auth.role}>
                <Component {...pageProps} />
              </AuthProvider>
            ) : (
              <Component {...pageProps} />
            )}
          </Layout>
        </Hydrate>
      </QueryClientProvider>
    </>
  );
}

export default appWithTranslation(App);
