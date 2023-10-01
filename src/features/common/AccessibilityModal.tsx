import { Inter, Lexend } from "next/font/google";
import Container from "./Container";
import { createPortal } from "react-dom";
import { useT } from "@/utils/hooks/useTranslation";
import Input from "./Input";
import { Button } from "./Button";
import { use, useEffect, useState } from "react";
import { useA11yStore } from "@/stores/a11y.store";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import { useUserStore } from "@/stores/user.store";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const AccessibilityModal = () => {
  const { t } = useT();
  const [fontSize, setFontSize] = useState(16);
  const [contrast, setContrast] = useState(false);
  const [accessibleFont, setAccessibleFont] = useState(false);

  const grayscale = useUserStore((state) => state.grayscale);
  const setGrayscale = useUserStore((state) => state.setGrayscale);

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

  const setGrayscaleHandler = () => {
    setGrayscale(!grayscale);
  };

  return (
    <Container
      className={`absolute right-[5%] top-1/4 z-[10000] shadow-lg ${inter.className}`}
    >
      <div>
        <p className="font-light text-darkGray">{t("adjustFontSize")}</p>
        <div className="flex items-center">
          <Input className="mr-auto w-5/6" type="number" value={fontSize} />
          <Button className="ml-auto" onClick={() => setFontSize(fontSize + 1)}>
            +
          </Button>
          <Button onClick={() => setFontSize(fontSize - 1)}>-</Button>
        </div>
        <div>
          <Button onClick={makeContrast} className="mt-4 w-full">
            {!contrast ? t("enableContrast") : t("disableContrast")}
          </Button>
          <Button onClick={setGrayscaleHandler} className="mt-4 w-full">
            {!grayscale ? t("enableGrayscale") : t("disableGrayscale")}
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default AccessibilityModal;
