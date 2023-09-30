import React from "react";
import SearchInputs from "@/features/user/home/components/SearchInputs";
import { useT } from "@/utils/hooks/useTranslation";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import dynamic from "next/dynamic";
import Filters from "../components/FiltersContainer";
import SchoolList from "../components/SchoolList";
import FiltersContainer from "../components/FiltersContainer";

const Map = dynamic(() => import("@/features/user/home/components/Map"), {
  ssr: false,
});

const HomeScreen = () => {
  const { t } = useT();

  const schema = z.object({
    query: z.string().optional(),
    radius: z.string().optional(),
    city: z.string().optional(),
  });

  type InputsValues = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
    watch,
  } = useForm<InputsValues>({
    defaultValues: {
      query: "",
    },
    resolver: zodResolver(schema),
  });
  console.log(watch());

  return (
    <div className="flex h-full flex-col">
      <Controller
        name={"query"}
        control={control}
        render={({ field: { onChange } }) => (
          <SearchInputs onChangeInputs={onChange} />
        )}
      />

      <div className="flex h-full flex-col-reverse px-2 sm:px-14 sm:pt-7 md:flex-row">
        <div className="h-full w-full sm:w-[40%]">
          <FiltersContainer />
          <SchoolList />
        </div>
        <div className="right-0 mt-4 h-40 w-full pb-7 sm:fixed sm:ml-7 sm:mt-0 sm:h-[calc(100vh-11.75rem)] sm:w-[calc(60%-1.75rem)] sm:pr-14">
          <div className="h-full w-full overflow-hidden rounded-md">
            <Map />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
