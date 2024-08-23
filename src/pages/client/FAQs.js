// import CustomBanner from "@/components/CustomBanner";
// import Demo from "@/components/Demo";
// import Footer from "@/components/Footer";
// import NavBar from "@/components/NavBar";
// import React from "react";

import CustomBanner from "../../components/client/CustomBanner";
import Demo from "../../components/client/Demo";
import Footer from "../../components/client/Footer";
import NavBar from "../../components/client/NavBar";

const FAQs = () => {
  return (
    <div className="min-h-screen bg-white">
      <NavBar />
      <CustomBanner title={"FAQS"} />
      <div className="flex py-24 flex-col items-center space-y-4 my-auto">
        <div className="text-[#172280] text-3xl text-center font-medium">
          Frequently Asked Questions
          <div className="bg-[#2E43FF] w-[120px] h-[2px] text-center my-4 mx-auto"></div>
        </div>
      </div>

      <div className="max-w-[80%] mx-auto text-[#666] text-lg pl-12">
        <div className="py-4 pl-8 px-4 text-black font-medium bg-[#F0F0F0] rounded-full cursor-pointer">
          What is an access point?
        </div>
        <div className="text-[16px] px-8 py-3 font-thin">
          Access points provide your customers with a conveniently-located,
          simple way to access your organization’s platform. That could be be a
          sticker with a QR code, a seat number with NFC technology, or anything
          in between. We would love to share our options with you and find what
          works best for you and your organization.
        </div>
      </div>

      <div className="max-w-[80%] mx-auto text-[#666] text-lg pl-12">
        <div className="py-4 pl-8 px-4 text-black font-medium bg-[#F0F0F0] rounded-full cursor-pointer">
          Where do we begin?
        </div>
        <div className="text-[16px] px-8 py-3 font-thin">
          Access points provide your customers with a conveniently-located,
          simple way to access your organization’s platform. That could be be a
          sticker with a QR code, a seat number with NFC technology, or anything
          in between. We would love to share our options with you and find what
          works best for you and your organization.
        </div>
      </div>

      <div className="mx-auto flex items-center justify-center py-4 !pt-12">
        <div className="text-white cursor-pointer rounded-full bg-[#2d43ff] h-12 w-56 flex items-center justify-center hover:bg-[#172280]">
          Contact Us <div className="pl-3"> &#8594;</div>
        </div>
      </div>
      <Demo />
      <Footer />
    </div>
  );
};

export default FAQs;
