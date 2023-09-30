import { useA11yStore } from "@/stores/a11y.store";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  const fontSize = useA11yStore((state) => state.fontSize);

  return (
    <Html style={{ fontSize: fontSize }} lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
