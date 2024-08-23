// import CustomBanner from "@/components/CustomBanner";
// import CustomHowItWorkCards from "@/components/CustomHowItWorkCards";
// import CustomSection from "@/components/CustomSection";
// import Demo from "@/components/Demo";
// import Footer from "@/components/Footer";
// import NavBar from "@/components/NavBar";
// import React from "react";
import howitworkssec1 from "../../assets/client/how-it-works-sec-1.png";
import howitworkssec2 from "../../assets/client/how-it-works-sec-2.png";
import howitworkssec31 from "../../assets/client/how-it-works-sec-3-1.webp";
import howitworkssec32 from "../../assets/client/how-it-works-sec-3-2.webp";
import howitworkssec33 from "../../assets/client/how-it-works-sec-3-3.webp";
// import howitworkssec31 from "../../assets/client/how-it-works-sec-3-1";
import CustomBanner from "../../components/client/CustomBanner";
import CustomHowItWorkCards from "../../components/client/CustomHowItWorkCards";
import CustomSection from "../../components/client/CustomSection";
import Demo from "../../components/client/Demo";
import Footer from "../../components/client/Footer";
import NavBar from "../../components/client/NavBar";

const HowItWorks = () => {
  const customSections = [
    {
      index: 1,
      title: "Everything Seamlessly Integrated",
      description:
        "In just a few steps, we can completely upgrade your guest experience and put everything you offer at their fingertips.",
      icon: howitworkssec1,
    },
    {
      index: 2,
      title: "Partner With Us",
      description:
        "Your organization is unique. We treat it as such and aim to create the best solution for you. We do the heavy lifting. You reap the rewards.",
      icon: howitworkssec2,
    },
  ];

  const howItWorkCards = [
    {
      id: 1,
      title: "Custom Access Points",
      description:
        "Access points give your customers instant access to your organization’s platform. We will work with you to create a custom access point to grow your brand and put your products and offers directly in front of your target audience.",
      icon: howitworkssec31,
    },
    {
      id: 2,
      title: "Add Goods and Services",
      description:
        "Want to create and add everything your organization has to offer? No problem! Simply use the Nivy Pro mobile app to create vendors and product lists, or let us do the heavy lifting to get your organization setup from start to finish.",
      icon: howitworkssec32,
    },
    {
      id: 3,
      title: "Sell, Sell, Sell!",
      description:
        "We told you it was easy! Once your organization is set up, you are ready to begin taking orders. You can keep track of your inventory with ease by receiving reports to let you know what is selling, where it is selling, and for how much.",
      icon: howitworkssec33,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <NavBar />
      <CustomBanner title={"HOW IT WORKS"} />
      {customSections?.map((section, key) => (
        <CustomSection
          key={key}
          index={section?.index}
          title={section?.title}
          description={section?.description}
          icon={section?.icon}
        />
      ))}
      <div className="bg-[#F8F9FF] flex flex-col py-20 items-center justify-center">
        <div className="text-[#172280] text-3xl w-[340px] mavenPro font-medium">
          Getting Started With Nivy
        </div>
        <div className="bg-[#2E43FF] w-[160px] h-[3px] text-center my-4"></div>
        <div className="flex space-x-6">
          {howItWorkCards?.map((data, index) => (
            <CustomHowItWorkCards data={data} index={index} />
          ))}
        </div>
      </div>
      <Demo />
      <Footer />
    </div>
  );
};

export default HowItWorks;
