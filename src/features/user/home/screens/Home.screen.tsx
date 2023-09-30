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

      <div className="mt-24 flex h-full flex-col-reverse px-2 xs:mt-16 sm:px-14 sm:pt-7 md:flex-row">
        <div className="h-full w-full md:w-[40%]">
          <FiltersContainer />
          <SchoolList />
          <SchoolList />
        </div>
        <div className="right-0 mt-4 h-40 w-full pb-7 md:fixed md:ml-7 md:mt-0 md:h-[calc(100vh-11.75rem)] md:w-[calc(60%-1.75rem)] md:pr-14">
          <div className="h-full w-full overflow-hidden rounded-md">
            <Map />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
