import Container from "@/features/common/Container";
import Filter from "./Filter";
import { Select } from "@/features/common/Select";
import { useT } from "@/utils/hooks/useTranslation";
import Input from "@/features/common/Input";
import DoubleArrow from "@/assets/svgs/DoubleArrow";
import DegreeCourse from "./DegreeCourse";

const FiltersContainer = () => {
  const { t } = useT();
  const levels = t("home:filters.studyLevels", {
    returnObjects: true,
  }) as string[];
  const modes = t("home:filters.studyModes", {
    returnObjects: true,
  }) as string[];

  return (
    <Container className="mb-4 flex flex-col">
      <div className="flex flex-col sm:flex-row">
        <div className="mr-2 flex w-full flex-col sm:w-1/2 ">
          <Filter label={t("home:filters.studyModeTitle")} className="mb-4">
            <Select
              options={levels}
              onSelect={() => null}
              defaultValue={levels[0]}
            />
          </Filter>
          <Filter label={t("home:filters.paymentsTitle")} className="mb-4">
            <div className="flex items-center">
              <Input
                placeholder={t("min")}
                className="mr-1 w-full"
                containerStyles="w-full"
              />
              <DoubleArrow className="mx-2 h-8 w-8" />
              <Input
                placeholder={t("max")}
                className="ml-1 w-full"
                containerStyles="w-full"
              />
            </div>
          </Filter>
        </div>
        <div className="ml-2 flex w-full flex-col sm:w-1/2">
          <Filter label={t("home:filters.studyModeTitle")} className="mb-4 ">
            <Select
              options={modes}
              onSelect={() => null}
              defaultValue={modes[0]}
            />
          </Filter>
          <Filter label={t("home:filters.minimumPoints")} className="mb-4">
            <Input
              placeholder={t("home:filters.typeMinimumPoints")}
              className="w-full"
              containerStyles="w-full"
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
