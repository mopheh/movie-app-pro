import React from "react";
import Image from "next/image";

const Popular = () => {
  return (
    <div className={"flex flex-col gap-3 my-6"}>
      <h1
        className={
          "font-poppins uppercase font-semibold text-white my-3 text-2xl px-7 xs:px-12 md:px-20"
        }
      >
        New & Popular
      </h1>
      <div
        className={"flex gap-4 overflow-x-scroll scroll-smooth hide-scrollbar "}
      >
        <Image
          src={"/images/movie1.jpg"}
          alt={"movie"}
          className={"cursor-pointer"}
          width={200}
          height={300}
        />
        <Image
          src={"/images/movie2.jpg"}
          alt={"movie"}
          className={"cursor-pointer"}
          width={200}
          height={300}
        />
        <Image
          src={"/images/movie2.jpg"}
          alt={"movie"}
          className={"cursor-pointer"}
          width={200}
          height={300}
        />
        <Image
          src={"/images/movie2.jpg"}
          alt={"movie"}
          className={"cursor-pointer"}
          width={200}
          height={300}
        />
        <Image
          src={"/images/movie3.jpg"}
          alt={"movie"}
          className={"cursor-pointer"}
          width={200}
          height={300}
        />
        <Image
          src={"/images/movie4.jpg"}
          alt={"movie"}
          className={"cursor-pointer"}
          width={200}
          height={300}
        />
        <Image
          src={"/images/movie5.jpg"}
          alt={"movie"}
          className={"cursor-pointer"}
          width={200}
          height={300}
        />
        <Image
          src={"/images/movie6.jpg"}
          alt={"movie"}
          className={"cursor-pointer"}
          width={200}
          height={300}
        />{" "}
        <Image
          src={"/images/movie7.jpg"}
          alt={"movie"}
          className={"cursor-pointer"}
          width={200}
          height={300}
        />{" "}
        <Image
          src={"/images/movie8.jpg"}
          alt={"movie"}
          className={"cursor-pointer"}
          width={200}
          height={300}
        />
      </div>
    </div>
  );
};
export default Popular;
