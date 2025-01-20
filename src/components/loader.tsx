import Spinner from './spinner';

export default function Loader() {
  return (
    <div className="absolute bg-white w-full h-screen z-[1000] flex justify-center items-center">
      <Spinner />
    </div>
  );
}
