import { Inter } from "next/font/google";
import Container from "./Container";
import { createPortal } from "react-dom";
import { useT } from "@/utils/hooks/useTranslation";
import Input from "./Input";
import { Button } from "./Button";
import { use, useEffect, useState } from "react";
import { useA11yStore } from "@/stores/a11y.store";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

const AccessibilityModal = () => {
  const { t } = useT();

  const { reload } = useRouter();

  const [fontSize, setFontSize] = useState(16);

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}px`;
    document.body.style.fontSize = `${fontSize}px`;
  }, [fontSize]);

  return (
    <Container
      className={`absolute right-[5%] top-1/4 z-50  ${inter.className}`}
    >
      <div>
        <p className="font-light text-darkGray">{t("adjustFontSize")}</p>
        <div className="flex items-center">
          <Input className="w-5/6" type="number" value={fontSize} />
          <Button onClick={() => setFontSize(fontSize + 1)}>+</Button>
          <Button onClick={() => setFontSize(fontSize - 1)}>-</Button>
        </div>
      </div>
    </Container>
  );
};

export default AccessibilityModal;
