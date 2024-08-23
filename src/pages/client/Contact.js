import CustomBanner from "../../components/client/CustomBanner";
import Demo from "../../components/client/Demo";
import Footer from "../../components/client/Footer";
import NavBar from "../../components/client/NavBar";


const Contact = () => {
  return (
    <div className="min-h-screen bg-white">
      <NavBar />
      <CustomBanner title={"CONTACT"} />
      <div className="flex py-24 flex-col max-w-[1240px] mx-auto space-y-4 my-auto">
        <div className="text-[#172280] text-3xl text-center font-medium">
          Get in Touch
          <div className="bg-[#2E43FF] w-[120px] h-[2px] text-center my-4 mx-auto"></div>
        </div>
        <div className="openSans text-xl font-thin text-[#333a60]">
          Please fill out the contact form below, and a member of our team will
          reach out to you shortly.
        </div>

        <div className="flex space-x-4 w-full">
          <input
            className="bg-[#F8F8F8] p-3 w-1/2 rounded-xl"
            type="text"
            name="input_1.3"
            id="input_1_1_3"
            value=""
            aria-required="false"
            placeholder="First Name"
          />
          <input
            className="bg-[#F8F8F8] p-3 w-1/2 rounded-xl"
            type="text"
            name="input_1.3"
            id="input_1_1_3"
            value=""
            aria-required="false"
            placeholder="Last Name"
          />
        </div>
        <input
          className="bg-[#F8F8F8] w-full p-3 rounded-xl"
          type="text"
          name="input_1.3"
          id="input_1_1_3"
          value=""
          aria-required="false"
          placeholder="Phone Number"
        />

        <input
          className="bg-[#F8F8F8] w-full p-3 rounded-xl"
          type="text"
          name="input_1.3"
          id="input_1_1_3"
          value=""
          aria-required="false"
          placeholder="example@email.com"
        />
        <textarea
          name="input_4"
          id="input_1_4"
          placeholder="Tell us about your company."
          aria-invalid="false"
          rows="10"
          cols="50"
          spellcheck="false"
          className="bg-[#F8F8F8] w-full p-3 rounded-xl"
          style={{ resize: "none" }}
        ></textarea>
        <div className="self-start space-y-3 flex flex-col">
          <div className="text-[#333a60]">
            How do you prefer we contact you?
          </div>
          <div>
            <ul>
              <li>
                <input name="input_5" type="radio" value="Phone" id="" />
                &nbsp;
                <label for="" id="label_1_5_0" className="font-thin">
                  Phone
                </label>
              </li>
              <li>
                <input name="input_5" type="radio" value="Email" />
                &nbsp;
                <label className="font-thin">Email</label>
              </li>
            </ul>
          </div>
        </div>
        <div className="!pt-2 flex items-center justify-center">
          <div className="text-white cursor-pointer rounded-full bg-[#2d43ff] h-12 w-56 flex items-center justify-center hover:bg-[#172280]">
            Submit
          </div>
        </div>
      </div>
      <Demo />
      <Footer />
    </div>
  );
};

export default Contact;
