"use client";
import { useEffect, useState } from "react";

import MenuTitle from "../home/MenuTitle";
import ContainerMenu from "./ContainerMenu";
import ItemMovieCinematic from "./ItemMovieCinematic";
import DescriptionCinematic from "./DescriptionCinematic";
import BoxFastBooking from "./BoxFastBooking";
import ShowingMovie from "../book/ShowingMovie";
import ButtonWatchMore from "../common/ButtonWatchMore";
import { IGenre } from "@/app/types/frontend";

interface IProps {
  genres: IGenre[];
}

const ContentCinematic: React.FC<IProps> = ({ genres }) => {



  
  return (
    <div className="pb-10">
      <div className="flex gap-6">
        <div className="flex-7">
          <MenuTitle size="sm" title={"PHIM ĐIỆN ẢNH"} />

          <ContainerMenu genres={genres} />

          <ul className="mt-8">
            <ItemMovieCinematic />
            <ItemMovieCinematic />
            <ItemMovieCinematic />
          </ul>
        </div>

        <div className="flex-3">
          <BoxFastBooking />

          {/* <ShowingMovie data={moviesShowing} /> */}

          <div className="flex justify-end mt-4">
            <ButtonWatchMore />
          </div>
        </div>
      </div>

      <DescriptionCinematic />
    </div>
  );
};

export default ContentCinematic;
