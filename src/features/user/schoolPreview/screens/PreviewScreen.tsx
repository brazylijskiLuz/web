import { useT } from "@/utils/hooks/useTranslation";
import { useRouter } from "next/router";
import React from "react";

export default function PreviewScreen() {
  const { query } = useRouter();

  return (
    <div className="mt-4 rounded-md bg-white px-14 py-7">
      <h1 className="text-2xl font-bold">{`Nazwa uczelni [${query.id}]`}</h1>
      <hr className="mt-4  border-darkGray" />
      <div className="mt-4 flex gap-8">
        <SchoolData />
        <DeegreeCourses />
      </div>
    </div>
  );
}

function SchoolData() {
  const { t } = useT();

  return (
    <div className="w-full bg-primary">
      <h2 className="text-2xl font-bold">{t("preview:data")}</h2>
    </div>
  );
}

function DeegreeCourses() {
  return (
    <div className="w-full bg-secondary">
      <h2 className="text-2xl font-bold">Dostępne kierunki</h2>
    </div>
  );
}
