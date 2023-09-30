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

      <div className="mt-7 flex h-full">
        <div className="h-full w-1/2 px-7">
          <FiltersContainer />
          <SchoolList />
        </div>
        <div className="h-full w-1/2 pb-7 pr-4">
          <div className="h-full w-full overflow-hidden rounded-md">
            <Map />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
