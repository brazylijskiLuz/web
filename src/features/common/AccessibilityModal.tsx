import { Inter } from "next/font/google";
import Container from "./Container";
import { createPortal } from "react-dom";
import { useT } from "@/utils/hooks/useTranslation";
import Input from "./Input";
import { Button } from "./Button";
import { use, useEffect, useState } from "react";
import { useA11yStore } from "@/stores/a11y.store";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";

const inter = Inter({ subsets: ["latin"] });

const AccessibilityModal = () => {
  const { t } = useT();
  const [fontSize, setFontSize] = useState(16);
  const [contrast, setContrast] = useState(false);

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}px`;
    document.body.style.fontSize = `${fontSize}px`;
  }, [fontSize]);

  const makeContrast = () => {
    if (document.documentElement.getAttribute("data-theme") === "contrast") {
      document.documentElement.setAttribute("data-theme", "default");
      setContrast(false);
    } else {
      document.documentElement.setAttribute("data-theme", "contrast");
      setContrast(true);
    }
  };

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
        <Button onClick={makeContrast} className="mt-4 w-full">
          {!contrast ? t("enableContrast") : t("disableContrast")}
        </Button>
      </div>
    </Container>
  );
};

export default AccessibilityModal;
