"use client";
import React, { useEffect, useState } from "react";
import { Now } from "@/components/Now";
import SideContent from "@/components/SideContent";
import Upcoming from "@/components/Upcoming";

const Page = () => {
  const [movieId, setMovieId] = useState<number | null>(null);
  const [showTrailer, setShowTrailer] = useState<boolean>(false);
  useEffect(() => {
    if (showTrailer) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [showTrailer]);
  const close = () => {
    setShowTrailer(false);
  };
  return (
    <div>
      <Now setId={setMovieId} setShowTrailer={setShowTrailer} />
      <Upcoming setId={setMovieId} setShowTrailer={setShowTrailer} />
      {showTrailer && <SideContent id={movieId} onClose={close} />}
    </div>
  );
};
export default Page;
