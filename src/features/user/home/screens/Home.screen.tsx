import dynamic from 'next/dynamic';

const Map = dynamic(() => import('@/features/user/home/components/Map'), {
  ssr: false,
});

const HomeScreen = () => {
  return (
    <>
      <div className="w-full w-full">
        <Map />
      </div>
    </>
  )
}

export default HomeScreen;
