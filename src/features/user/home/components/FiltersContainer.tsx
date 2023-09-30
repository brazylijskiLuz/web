import Container from "@/features/common/Container";
import Filter from "./Filter";
import { Select } from "@/features/common/Select";
import { useT } from "@/utils/hooks/useTranslation";

const FiltersContainer = () => {
  const { t } = useT();
  const levels = t("home:filters.studyLevels", {
    returnObjects: true,
  }) as string[];
  const modes = t("home:filters.studyModes", {
    returnObjects: true,
  }) as string[];

  return (
    <Container className="mb-4">
      <div className="w-1/2">
        <Filter label={t("home:filters.studyModeTitle")} className="mb-4">
          <Select
            options={levels}
            onSelect={() => null}
            defaultValue={levels[0]}
          />
        </Filter>
      </div>
      <div className="w-1/2">
        <Filter label={t("home:filters.studyModeTitle")} className="mb-4">
          <Select
            options={modes}
            onSelect={() => null}
            defaultValue={modes[0]}
          />
        </Filter>
      </div>
    </Container>
  );
};

export default FiltersContainer;
