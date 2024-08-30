import React, { Fragment } from "react";
import ClassImage from "../../assets/ClassImage.jpg";
import { Button } from "../ui/button";
import { H1, H3 } from "../typography/typography";


const PromoSection = ({teachersRef}) => {

  const lang = localStorage.getItem("language");
  const scroll = () => teachersRef.current.scrollIntoView();

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center py-16 px-4 lg:px-1 mx-auto bg-gray-100">
      <div className="text-center lg:text-left lg:max-w-md">
        <h2 className="text-2xl font-bold text-black mb-4">週日免費泰語課</h2>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          每週不同主題 <br />
          跟著母語老師學道地泰語
        </h3>
        <p className="text-gray-600 mb-6">
          課程時間為每週日台灣時間早上10點，每週課程主題請看下方link
        </p>
        <Button className="mt-2 sm:mt-3 md:mt-4 lg:mt-6 xl:mt-8 px-4 py-4 bg-pink-900 w-full" onClick={scroll}>
            <H3 className="px-4 py-16">
              {lang == "en" ? "GET STARTED" : "開始使用"}
            </H3>
        </Button>
      </div>

        <img src={ClassImage} className="w-[400px] mt-8 lg:mt-0 lg:ml-16 grid grid-cols-2 gap-4"/>
    </div>
  );
};

export default PromoSection;