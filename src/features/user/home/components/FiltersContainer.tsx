import Container from "@/features/common/Container";
import Filter from "./Filter";
import { Select } from "@/features/common/Select";
import { useT } from "@/utils/hooks/useTranslation";
import Input from "@/features/common/Input";
import DoubleArrow from "@/assets/svgs/DoubleArrow";
import DegreeCourse from "./DegreeCourse";
import { useEffect, useState } from "react";

interface IFiltersContainerProps {
  onChange: (val: {
    type?: [number];
    mode?: number;
    min: string;
    max: string;
    minPoints: string;
  }) => void;
}

const FiltersContainer = ({ onChange }: IFiltersContainerProps) => {
  const { t } = useT();

  const types = t("home:filters.studyTypes", {
    returnObjects: true,
  }) as string[];

  const modes = t("home:filters.studyModes", {
    returnObjects: true,
  }) as string[];

  const [type, setType] = useState<string | undefined>(undefined);
  const [mode, setMode] = useState<string | undefined>(undefined);
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const [minPoints, setMinPoints] = useState("");

  useEffect(() => {
    onChange({
      max,
      mode: mode === modes[0] ? 1 : mode === modes[1] ? 2 : 0,
      min,
      type:
        type && type === types[0]
          ? [0]
          : type === types[1]
          ? [1]
          : type === types[2]
          ? [2]
          : type === types[3]
          ? [3]
          : undefined,
      minPoints,
    });
  }, [type, mode, min, max, minPoints]);

  return (
    <Container className="mb-4 flex flex-col">
      <div className="flex flex-col sm:flex-row">
        <div className="mr-2 flex w-full flex-col sm:w-1/2 ">
          <Filter label={t("home:filters.studyTypesTitle")} className="mb-4">
            <Select
              options={types}
              onSelect={(val) => setType(val)}
              placeholder={t("home:chooseOption")}
              // defaultValue={}
            />
          </Filter>
          <Filter label={t("home:filters.paymentsTitle")} className="mb-4">
            <div className="flex items-center">
              <Input
                placeholder={t("min")}
                className="mr-1 w-full"
                containerStyles="w-full"
                onChange={(e) => setMin(e.target.value)}
              />
              <DoubleArrow className="mx-2 h-8 w-8" />
              <Input
                placeholder={t("max")}
                className="ml-1 w-full"
                containerStyles="w-full"
                onChange={(e) => setMax(e.target.value)}
              />
            </div>
          </Filter>
        </div>
        <div className="ml-2 flex w-full flex-col sm:w-1/2">
          <Filter label={t("home:filters.studyModeTitle")} className="mb-4 ">
            <Select
              options={modes}
              onSelect={(val) => setMode(val)}
              // defaultValue={modes[0]}
              placeholder={t("home:chooseOption")}
            />
          </Filter>
          <Filter label={t("home:filters.minimumPoints")} className="mb-4">
            <Input
              placeholder={t("home:filters.typeMinimumPoints")}
              className="w-full"
              containerStyles="w-full"
              onChange={(e) => setMinPoints(e.target.value)}
            />
          </Filter>
        </div>
      </div>
      <Filter label={t("home:filters.degreeCourseTitle")}>
        <DegreeCourse name="awdaw" />
        <DegreeCourse name="awdaw" />
      </Filter>
    </Container>
  );
};

export default FiltersContainer;
