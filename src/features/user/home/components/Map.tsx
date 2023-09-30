import { icon, MarkerCluster, divIcon } from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import { Button } from '../../../common/Button';
import { motion } from 'framer-motion';

import 'leaflet/dist/leaflet.css';
import MarkerClusterGroup from 'react-leaflet-cluster';

interface MarkerProps {
  position: [number, number];
}

const universityIcon = icon({
  iconUrl: '/UniversityIcon.png',
  iconSize: [32, 32],
});

const createClusterIcon = (cluster: MarkerCluster) => {
  return divIcon({
    html: `<div class="">
            <image src="/UniversityIcon.png" style="width: 32px; height: 32px;"/>
            <p style="position: absolute; top: 0; right: 0; background: white; border-radius: 40%; padding-inline: 8px; transform: translate(10px, -10px)">
              ${cluster.getChildCount()}
            </p>
          </div>`,
    className: 'custom-marker-cluster',
    iconSize: [32, 32],
  });
};

const SchoolInfo = () => {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 20,
      }}
      className="flex flex-col bg-white translate-x-[-47px] translate-y-[-27px] rounded-lg ">
      <div className="h-[52px] w-full">
        <img
          src="/UniversityIcon.png"
          className="absolute top-[10px] left-[10px] w-[32px] h-[32px]"
        />
      </div>
      <div className="p-4">
        <h1 className="text-2xl font-bold">Jem KUPE</h1>
        <p className="text-sm">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vel varius
          nisl. Aliquam quam lacus, porttitor nec nisl nec, dignissim ultricies
          augue.
        </p>
        <p className="text-sm">Adolf Hitler</p>
      </div>
    </motion.div>
  );
};

const ZoomControls = () => {
  const map = useMap();

  return (
    <div className="flex flex-col absolute bottom-0 right-0 z-[1000]">
      <Button
        glow="hard"
        className="mx-4 mb-2 text-xl "
        onClick={() => map.setZoom(map.getZoom() + 1)}>
        +
      </Button>
      <Button
        glow="hard"
        className="mx-4 mt-2 mb-16 text-xl"
        onClick={() => map.setZoom(map.getZoom() - 1)}>
        -
      </Button>
    </div>
  );
};

const CustomMarker = ({ position }: MarkerProps) => {
  return (
    <Marker
      position={position}
      icon={universityIcon}
      eventHandlers={{
        mouseover: (e: any) => {
          e.target.openPopup();
        },
      }}>
      <Popup className="z-0 bg-[transparent]">
        <SchoolInfo />
      </Popup>
    </Marker>
  );
};

const Map = () => {
  return (
    <div className="w-full h-full">
      <MapContainer
        center={[52.1128, 19.2119]}
        zoom={6}
        scrollWheelZoom={true}
        zoomControl={false}
        style={{ width: '100%', height: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <ZoomControls />
      </MapContainer>
    </div>
  );
};

//        <MarkerClusterGroup iconCreateFunction={createClusterIcon}>
//        <CustomMarker position={[50.046286, 19.918216]} />
//      <CustomMarker position={[50.096286, 19.928616]} />
//    <CustomMarker position={[50.066286, 19.948616]} />
//</MarkerClusterGroup>

export default Map;
