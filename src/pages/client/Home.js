import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import NavBar from "../../components/client/NavBar";
import concessions from "../../assets/client/concessions.svg";
import merchandise from "../../assets/client/merchandise.svg";
import promotions from "../../assets/client/promotions.svg";
import heroHand from "../../assets/client/heroHand.png";
import nivyWebApp from "../../assets/client/nivyWebApp.png";
import pointicons2 from "../../assets/client/pointicons2.svg";
import areasicon01 from "../../assets/client/areasicon-01.svg";
import areasicon021 from "../../assets/client/areasicon-02-1.svg";
import areasicon031 from "../../assets/client/areasicon-03-1.svg";
import bgCover from "../../assets/client/bg-cover.webp";
import mobile from "../../assets/client/mobile.webp";
import juice from "../../assets/client/juice.webp";
import CustomSection from "../../components/client/CustomSection";
import Demo from "../../components/client/Demo";
import Footer from "../../components/client/Footer";

const Home = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  const industries = [
    {
      title: "Entertainment Venues",
      logo: areasicon01,
    },
    {
      title: "Sports Stadiums and Arenas",
      logo: areasicon021,
    },
    {
      title: "Event Spaces and Convention Centers",
      logo: areasicon031,
    },
  ];

  const customSections = [
    {
      index: 1,
      title: "Reimagine Your Guests' Experience",
      description:
        "With Nivy, your organization can interact with your guests like never before. Sell food and merchandise, run promotions, and more with direct access to your consumers.",
      icon: bgCover,
    },
    {
      index: 2,
      title: "Make Buying Convenient For Your Guests",
      description:
        "With access points available right where your guests are, they have convenient access to everything you have to offer. We will create access points that fit your organization.",
      icon: mobile,
    },
    {
      index: 3,
      title: "Easily Manage Customer Orders",
      description:
        "With the Nivy Pro mobile app, your organization can easily receive and fulfill orders to improve both guest experience and operations.",
      icon: juice,
    },
  ];

  return (
    <div>
      <NavBar />
      <div className="nivyBanner h-[750px] flex items-center relative">
        {/* <div> */}
        <div className="w-[870px] h-[546px] pl-32 mx-auto border-[#2E43FF] rounded-xl font-extrabold border-4 text-base md:text-4xl xl:text-5xl">
          <div className="text-white barlowCondensed pt-12">
            PUT EVERYTHING YOUR ORGANIZATION HAS TO OFFER AT YOUR AUDIENCE'S
            FINGERTIPS.
          </div>
          {/* <div>Concessions</div> */}
          <div className="flex space-x-4 pt-12">
            <img
              src={concessions}
              className="widgets hover:scale-105"
              width={175}
              height={175}
            />
            <img
              src={merchandise}
              className="widgets hover:scale-105"
              width={175}
              height={175}
            />
            <img
              src={promotions}
              className="widgets hover:scale-105"
              width={175}
              height={175}
              data-aos="fade-up" //Here you can use any of the AOS animations
              data-aos-delay="300"
              data-aos-easing="ease-in-out"
              data-aos-offset="200"
              data-aos-duration="300"
              data-aos-mirror="true"
              data-aos-once="true"
            />
          </div>
        </div>
        <img
          src={heroHand}
          className="absolute top-0"
          style={{
            position: "absolute",
            visibility: "visible",
            maxHeight: "none",
            height: "100%",
            width: "37%",
          }}
        />
      </div>

      <div className="">
        <section className="grid grid-cols-2 space-x-8 pt-16 md:pt-24 max-w-[1240px] mx-auto">
          <div className="flex flex-col items-center space-y-4 my-auto">
            <div className="text-[#172280] text-3xl text-center font-bold">
              Customizable Point of Sale Solutions for Your Venue
            </div>
            <img src={pointicons2} className="w-48 h-14" />
            <p className="text-[#616161]">
              At Nivy, we know your organization has a lot to offer your guests,
              but sometimes customers don’t know what items are available or
              where they are located. We want to bridge the gap between your
              business and your consumers by changing the guest experience for
              the better <i className="text-[#616161] font-bold">forever.</i>
            </p>
            <div className="!pt-12">
              <div className="text-white cursor-pointer rounded-full bg-[#2d43ff] h-12 w-56 flex items-center justify-center hover:bg-[#172280]">
                See How It Works <div className="pl-3"> &#8594;</div>
              </div>
            </div>
          </div>
          <div>
            <img src={nivyWebApp} />
          </div>
        </section>

        <section className=" bg-[#F8F9FF] py-16 md:py-24 flex items-center flex-col">
          <div className="text-center text-[#172280] text-3xl font-bold">
            Industries We Serve
          </div>
          <div className="bg-[#2E43FF] w-[260px] h-[2px] text-center my-4"></div>
          <div className="flex rounded space-x-4 items-center justify-center">
            {industries.map((industry) => (
              <div className="bg-white flex flex-col items-center justify-center boxShadow rounded-xl px-8 py-14 h-[350px] w-[400px]">
                <img src={industry.logo} className="w-[150px] h-[131px]" />
                <div className="text-xl text-[#162280] text-center">
                  {industry.title}
                </div>
              </div>
            ))}
          </div>
        </section>
        {customSections?.map((section, key) => (
          <CustomSection
            index={section?.index}
            title={section?.title}
            description={section?.description}
            icon={section?.icon}
          />
        ))}

        <Demo />
      </div>
      <Footer />
    </div>
  );
};

export default Home;