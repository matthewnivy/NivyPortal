import React from "react";

const CustomHowItWorkCards = ({ data }) => {
  return (
    <div className="max-w-[462px] h-[650px] boxShadow rounded-xl bg-white">
      <img src={data?.icon} className="rounded-t-xl" />
      <div className="p-4" style={{ padding: "30px 30px 40px 30px !important" }}>
        <div className="text-[#2d43ff] border-[#2d43ff] rounded-full border-4 text-3xl flex items-center justify-center w-[50px] h-[50px] font-medium mb-5">
          {data?.id}
        </div>
        <div className="font-semibold text-[22px] montserrat text-[#222]">
          {data?.title}
        </div>
        <div className="bg-[#2E43FF] w-[60px] h-[3px] text-center my-4"></div>
        <p className={`text-[#82879E] text-[16px] font-light openSans`}>
          {data?.description}
        </p>
      </div>
    </div>
  );
};

export default CustomHowItWorkCards;
