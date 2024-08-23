// import CustomBanner from "@/components/CustomBanner";
// import Demo from "@/components/Demo";
// import Footer from "@/components/Footer";
// import NavBar from "@/components/NavBar";
import React from "react";
import NavBar from "../../components/client/NavBar";
import CustomBanner from "../../components/client/CustomBanner";
import Demo from "../../components/client/Demo";
import Footer from "../../components/client/Footer";
import aboutMobile from "../../assets/client/about-mobile.png";
const About = () => {
  return (
    <div className="min-h-screen bg-white">
      <NavBar />
      <CustomBanner title={"OUR STORY"} />

      <section className="grid grid-cols-2 space-x-8 pt-16 md:pt-24 pb-8 max-w-[1240px] mx-auto">
        <div>
          <img src={aboutMobile} />
        </div>
        <div className="flex flex-col items-center space-y-4 my-auto">
          <div className="text-[#172280] text-3xl text-center font-medium">
            About Nivy
            <div className="bg-[#2E43FF] w-[60px] h-[2px] text-center my-4 mx-auto"></div>
          </div>
          <p className="text-[#616161] font-light text-lg text-center">
            We created Nivy as a way to connect organizations with their
            customers and put everything an organization has to offer at the
            customer’s fingertips. We are a company founded on honesty,
            collaboration, and hard work. We partner with organizations to
            provide the best possible experience for guests and ultimately
            increase the organization’s revenue.
          </p>
          <div className="!pt-12">
            <div className="text-white cursor-pointer rounded-full bg-[#2d43ff] h-12 w-56 flex items-center justify-center hover:bg-[#172280]">
              See How It Works <div className="pl-3"> &#8594;</div>
            </div>
          </div>
        </div>
      </section>
      <section className="flex flex-col items-center bg-[#F8F9FF] py-20">
        <div className="text-[#172280] text-3xl font-medium">Our Mission </div>
        <div className="bg-[#2E43FF] w-[80px] h-[2px] text-center my-4"></div>
        <div className="max-w-[800px] mx-auto text-center text-[#616161] font-light text-lg">
          We aim to provide the best value and customer service in the industry,
          and we are constantly improving our own products and processes to
          benefit you. We value teamwork and want to help you take your
          organization to the next level.
        </div>
      </section>
      <Demo />
      <Footer />
    </div>
  );
};

export default About;
