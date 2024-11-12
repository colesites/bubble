import Image from "next/image";

export default function Loading() {
  return (
    <section className="col-flex justify-center items-center bg-black w-full min-h-screen">
      <div className="flex justify-center items-center flex-grow">
        <Image
          src="/assets/images/bubble-svg.svg"
          width={120}
          height={120}
          alt="Bubble logo"
          priority
        />
      </div>
      
      <div className="col-flex gap-4 mb-2 mt-auto">
        <p className="text-white">from</p>
        <Image
          src="/assets/images/ctech.svg"
          width={30}
          height={30}
          alt="C Tech Logo"
          priority
        />
      </div>
    </section>
  );
}
