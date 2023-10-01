import React, {
  ComponentProps,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Input from "@/features/common/Input";
import { Select } from "@/features/common/Select";
import { useT } from "@/utils/hooks/useTranslation";
import AccessibilitySvg from "@/assets/svgs/Accessibiliy.svg";
import AccessibilityModal from "@/features/common/AccessibilityModal";
import { useOutsideClick } from "@/utils/hooks/useOutsideClick";
import LanguageSvg from "@/assets/svgs/language.svg";
import { useGetCities } from "@/api/queries/city.query";
import { CityApi } from "@/api/requests/city.req";
import { SpinnerSvg } from "@/assets/svgs/Spinner.svg";
import { useRouter } from "next/router";

interface ISearchInputsProps {
  onChangeInputs: (val: {
    query: string;
    radius: string;
    city?: CityApi.IGetCityRes | null;
  }) => void;
  errors?: {
    city?: {
      message: string;
    };
  };
}

const SearchInputs = ({ onChangeInputs, errors }: ISearchInputsProps) => {
  const { t } = useT();

  const container = useRef(null);
  const { asPath, push } = useRouter();

  const [showModal, setShowModal] = useState(false);

  //undefined -> empty, null -> have val, but didn't chosen city from list, object -> chosen
  const [city, setCity] = useState<undefined | null | CityApi.IGetCityRes>(
    undefined,
  );
  const [query, setQuery] = useState("");
  const [radius, setRadius] = useState("5");

  useOutsideClick(container, () => {
    setShowModal(false);
  });

  useEffect(() => {
    onChangeInputs({
      query: query,
      radius: radius,
      city: city,
    });
  }, [query, radius, city]);

  return (
    <div
      ref={container}
      className={
        "fixed top-24 z-50 flex h-40 w-full flex-col justify-between gap-2 border-b-2 border-light bg-white px-2 py-2 text-sm xs:h-28 sm:flex-row sm:items-center sm:gap-4 sm:px-4 sm:text-base md:h-16 md:px-14"
      }
    >
      <Input
        showSearchIcon
        onChange={(e) => setQuery(e.target.value)}
        className={"sm:w-40 md:w-64"}
        placeholder={`${t("home:search")}...`}
      />
      <div className={"flex flex-col gap-4 xs:flex-row"}>
        <div className={"flex w-full items-center gap-4 sm:w-auto"}>
          <CitySearch
            customOnChange={(val) => setCity(val)}
            // error={errors?.city?.message}
          />
          <Select
            className={"!max-w-[5rem]"}
            options={[`5 ${t("km")}`, `10 ${t("km")}`]}
            defaultValue={`5 ${t("km")}`}
            onSelect={(val) => setRadius(val.trim().split(t("km"))[0])}
          />
        </div>
        <div className={"flex items-center"}>
          <div className="flex h-full items-center justify-center pr-5 xs:border-l xs:border-l-primary xs:pl-5">
            <Select
              className="!w-20 rounded-full border-2 border-gray bg-white !font-semibold !text-black"
              defaultValue="PL"
              onSelect={(state) =>
                push(asPath, asPath, { locale: state.toLowerCase() })
              }
              options={["PL", "EN"]}
            />
          </div>
          <div className="flex h-full  items-center border-l  border-l-primary pl-4">
            <button onClick={() => setShowModal((state) => !state)}>
              <AccessibilitySvg className="h-10 w-10 " />
            </button>
          </div>
        </div>
      </div>
      {showModal && <AccessibilityModal />}
    </div>
  );
};

export default SearchInputs;

interface ICitySearchProps extends Omit<ComponentProps<"input">, "ref"> {
  customOnChange: (val: CityApi.IGetCityRes | null | undefined) => void;
  error?: string;
}

const CitySearch = ({ customOnChange, ...props }: ICitySearchProps) => {
  const { t } = useT();

  const ref = useRef(null);

  const [query, setQuery] = useState("");
  const [chosenAddress, setChosenAddress] = useState<
    undefined | CityApi.IGetCityRes
  >(undefined);
  const [isClickedOutside, setIsClickedOutside] = useState(false);

  const { data } = useGetCities({
    query,
    page: "0",
  });

  useOutsideClick(ref, () => setIsClickedOutside(true));

  const isVisible = useMemo(
    () => query.length !== 0 && data && !chosenAddress && !isClickedOutside,
    [query, data, chosenAddress, isClickedOutside],
  );

  const handleEnter = (val: string) => {
    setQuery(val);
    setIsClickedOutside(false);
    setChosenAddress(undefined);
    if (val.length === 0) {
      customOnChange(undefined);
      return;
    }

    customOnChange(null);
  };

  return (
    <div className={"relative"} ref={ref}>
      <Input
        containerStyles={"w-full md:w-auto"}
        onChange={(e) => handleEnter(e.target.value)}
        placeholder={t("home:enterCity")}
        value={chosenAddress?.name || query}
        error={props.error}
        {...props}
      />
      {isVisible && (
        <div
          className={
            "absolute top-10 z-[9999] flex max-h-[9rem] w-full flex-col overflow-scroll bg-light"
          }
        >
          {data!.data!.length === 0 ? (
            <p className={"px-2 py-1 text-darkGray"}>{t("home:emptyCities")}</p>
          ) : (
            data!.data!.map((city) => (
              <span
                key={city.id}
                onClick={() => {
                  setChosenAddress(city);
                  customOnChange(city);
                }}
                className={"px-2 py-1 text-darkGray"}
              >
                {city.name}
              </span>
            ))
          )}
        </div>
      )}
    </div>
  );
};
