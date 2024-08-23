"use client";
import React from "react";

const CustomSection = ({ index, title, description, icon }) => {
  return (
    <div>
      <section
        className="grid grid-cols-2 space-x-8 py-16 md:py-24 max-w-[1240px] mx-auto"
        data-aos="fade-left" //Here you can use any of the AOS animations
        data-aos-delay="500"
        // data-aos="fade-up"
        data-aos-easing="ease-in-out"
        data-aos-offset="200"
        data-aos-duration="300"
        data-aos-mirror="true"
        data-aos-once="false"
      >
        <div className={`${index % 2 == 0 ? "order-2" : "order-1"}`}>
          <img src={icon} className="h-[430px]" />
        </div>
        <div className="order-1 flex flex-col space-y-4 my-auto">
          <div className="text-[#172280] text-3xl w-[340px] mavenPro font-medium">
            {title}
          </div>
          <div className="bg-[#2E43FF] w-[160px] h-[3px] text-center my-4"></div>

          <p
            className={`${
              index % 2 == 0 ? "order-1" : "order-2"
            } text-[#82879E] text-lg font-light openSans`}
          >
            {description}
          </p>
        </div>
      </section>
      <div className="max-w-[1240px] mx-auto">
        <hr />
      </div>
    </div>
  );
};

export default CustomSection;
