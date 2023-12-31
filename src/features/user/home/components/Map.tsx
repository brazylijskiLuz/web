import { icon, divIcon } from "leaflet";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { Button } from "../../../common/Button";
import { motion } from "framer-motion";

import "leaflet/dist/leaflet.css";
import MarkerClusterGroup from "react-leaflet-cluster";
import { use, useEffect } from "react";
import { useGetLocations } from "@/api/queries/map.query";
import { ILocation } from "@/api/requests/map.req";
import { useGetSchoolInfo } from "@/api/queries/school.query";
import { useT } from "@/utils/hooks/useTranslation";
import { useRouter } from "next/router";

interface MarkerProps {
  position: [number, number];
  id: string;
}

const universityIcon = icon({
  iconUrl: "/images/UniversityIcon.png",
  iconSize: [32, 32],
});

const createClusterIcon = (cluster: any) => {
  return divIcon({
    html: `<div class="width: 100%">
            <image src="/images/UniversityIcon.png" style="width: 32px; height: 32px;"/>
            <p style="color: black; position: absolute; top: 0; right: 0; background: white; border-radius: 40%; padding-inline: 8px; transform: translate(10px, -10px)">
              ${cluster.getChildCount()}
            </p>
          </div>`,
    className: "custom-marker-cluster",
    iconSize: [32, 32],
  });
};

const SchoolInfo = ({ id }: { id: string }) => {
  const { data, isLoading, error } = useGetSchoolInfo(id);

  const { push } = useRouter();

  const { t } = useT();

  console.log("uhhuahwuid", data);

  return (
    <div className="flex translate-x-[-47px] translate-y-[-27px] flex-col rounded-lg bg-white ">
      <div className="h-[52px] w-full">
        <img
          src="/images/UniversityIcon.png"
          className="absolute left-[10px] top-[10px] h-[32px] w-[32px]"
        />
      </div>
      <div className="p-4">
        <h1 className="text-xl font-bold text-black">
          {data?.data && data?.data.institutionName}
        </h1>
        <p className="text-sm">{data?.data?.description}</p>
      </div>
      <Button className="m-[10px]" onClick={() => push(id)}>
        {t("seeMore")}
      </Button>
    </div>
  );
};

const ZoomControls = () => {
  const map = useMap();

  return (
    <div className="absolute bottom-0 right-0 z-[1000] flex flex-col">
      <Button
        glow="hard"
        className="mx-4 mb-2 text-xl "
        onClick={() => map.setZoom(map.getZoom() + 1)}
      >
        +
      </Button>
      <Button
        glow="hard"
        className="mx-4 mb-16 mt-2 text-xl"
        onClick={() => map.setZoom(map.getZoom() - 1)}
      >
        -
      </Button>
    </div>
  );
};

const CustomMarker = ({ position, id }: MarkerProps) => {
  return (
    <Marker
      position={position}
      icon={universityIcon}
      eventHandlers={{
        mouseover: (e: any) => {
          e.target.openPopup();
        },
      }}
    >
      <Popup className="z-0 bg-[transparent]">
        <SchoolInfo id={id} />
      </Popup>
    </Marker>
  );
};

const Map = ({
  singleSchool,
  x,
  y,
}: {
  singleSchool?: string;
  x?: string;
  y?: string;
}) => {
  const { data, isLoading, error } = useGetLocations();

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="h-full w-full">
      <MapContainer
        center={[52.1128, 19.2119]}
        zoom={6}
        scrollWheelZoom={true}
        zoomControl={false}
        style={{ width: "100%", height: "100%", zIndex: 0 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MarkerClusterGroup iconCreateFunction={createClusterIcon}>
          {!singleSchool && data?.data
            ? data.data.map((location) => (
                <CustomMarker
                  key={location.universityId}
                  id={location.universityId}
                  position={[+location.y, +location.x]}
                />
              ))
            : singleSchool &&
              x &&
              y && (
                <CustomMarker
                  key={singleSchool}
                  id={singleSchool}
                  position={[+y, +x]}
                />
              )}
        </MarkerClusterGroup>

        <ZoomControls />
      </MapContainer>
    </div>
  );
};

export default Map;
