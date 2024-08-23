// import Link from "next/link";
import React from "react";
import { Link } from "react-router-dom";

const Demo = () => {
  return (
    <div
      className="nivyWeb"
      data-aos="fade-up" //Here you can use any of the AOS animations
      data-aos-delay="500"
      data-aos-easing="ease-in-out"
      data-aos-offset="200"
      data-aos-duration="300"
      data-aos-mirror="true"
      data-aos-once="false"
    >
      <div className="max-w-[1240px] grid grid-cols-2 text-white py-24 mx-auto">
        <div>
          <div className="text-3xl mavenPro">Schedule a Free Demo Today</div>
          <div className="bg-[#2E43FF] w-[160px] h-[3px] text-center my-4"></div>
          <div>
            See first hand how Nivy can provide your business with the tools it
            needs to serve any crowd with ease.
          </div>
          <div className="!pt-12">
            <Link to="/schedule-a-demo">
              <div className="text-white cursor-pointer rounded-full bg-[#2d43ff] h-12 w-56 flex items-center justify-center hover:bg-[#7988ff]">
                Schedule a Demo <div className="pl-3"> &#8594;</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Demo;
