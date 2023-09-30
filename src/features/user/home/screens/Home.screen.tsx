import React from "react";
import SearchInputs from "@/features/user/home/components/SearchInputs";
import { useT } from "@/utils/hooks/useTranslation";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
    <div>
      <Controller
        name={"query"}
        control={control}
        render={({ field: { onChange } }) => (
          <SearchInputs onChangeInputs={onChange} />
        )}
      />
    </div>
  );
};

export default HomeScreen;
