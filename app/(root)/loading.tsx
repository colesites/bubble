import Image from "next/image";

export default function Loading() {
  return (
    <section className="col-flex justify-center items-center bg-black w-full min-h-screen">
      <Image
        src="/assets/images/bubble-svg.svg"
        width={120}
        height={120}
        alt="Bubble logo"
      />
      <div className="absolute col-flex gap-4 bottom-10">
        <p className="text-white">from</p>
        <Image
          src="/assets/images/ctech.svg"
          width={30}
          height={30}
          alt="C Tech Logo"
        />
      </div>
    </section>
  );
}
