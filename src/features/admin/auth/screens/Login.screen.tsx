import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/features/common/Input";
import { Button } from "@/features/common/Button";
import { useAuthStore } from "@/stores/auth.store";
import { useCallback, useEffect } from "react";
import { AuthStorage } from "@/features/admin/auth/auth-storage";
import { useRouter } from "next/router";
import { useT } from "@/utils/hooks/useTranslation";
import { toast } from "@/utils/toast/toast";
import { parseError } from "@/utils/error/parseError";
import { useLoginMutation } from "@/api/queries/auth.query";

export const LoginScreen = () => {
  const { t } = useT();

  const router = useRouter();

  const setToken = useAuthStore((state) => state.setToken);

  const { mutateAsync } = useLoginMutation();

  const retrieveToken = useCallback((): string | null => {
    const fromStorage = AuthStorage.getToken();
    setToken(fromStorage);
    return fromStorage;
  }, [setToken]);

  useEffect(() => {
    const token = retrieveToken();
    if (token) {
      router.push("/admin/dashboard");
    }
  }, [retrieveToken]);

  const schema = z.object({
    email: z.string().email("nazwa errora1"),
    password: z.string().min(9, "nazwa errora2"),
  });

  type LoginSchema = z.infer<typeof schema>;

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<LoginSchema>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(schema),
  });

  const onSubmit = handleSubmit(async (formData) => {
    try {
      const { data } = await mutateAsync(formData);
      setToken(data?.jwt || null);
      if (data?.jwt) {
        setToken(data.jwt);
        router.push("/admin/dashboard");
      } else {
        setToken(null);
        router.push("/");
      }
    } catch (e) {
      toast.error(parseError(e).message);
    }
  });

  return (
    <div className={"flex h-screen items-center justify-center"}>
      <form
        onSubmit={onSubmit}
        className={"flex w-full rounded-3xl bg-gray px-3 pb-4 pt-7 md:w-1/2"}
      >
        <div className={"w-full lg:w-1/2"}>
          <h1 className="text-gray-700 mb-6 text-center text-xl font-bold">
            {t("auth:login")}
          </h1>
          <div className="flex flex-col gap-4">
            <Input
              intent={"white"}
              {...register("email")}
              placeholder={t("auth:email")}
              error={errors.email?.message}
            />
            <Input
              intent={"white"}
              type={"password"}
              {...register("password")}
              placeholder={t("auth:password")}
              error={errors.password?.message}
            />
          </div>
          <div className="mt-6 xl:mt-12">
            <Button type="submit" className={"w-full"}>
              {t("auth:login")}
            </Button>
          </div>
        </div>
        <div className={"hidden lg:block lg:w-1/2"}>
          <p>image</p>
        </div>
      </form>
    </div>
  );
};
