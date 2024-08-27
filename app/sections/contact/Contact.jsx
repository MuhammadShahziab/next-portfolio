"use client";
import Card from "@/app/components/contactCard/Card";
import React, { useRef, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { IoMdPerson } from "react-icons/io";
import { MdMessage } from "react-icons/md";
import emailjs from "@emailjs/browser";
import toast, { Toaster } from "react-hot-toast";
import { LuSend } from "react-icons/lu";
import { HashLoader } from "react-spinners";
import { MailOpen, Twitter, TwitterIcon } from "lucide-react";
import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";

import {
  desVariants,
  leftToRight,
  rightToLeft,
  tagVariants,
  tittleVariants,
} from "@/app/(services)/animation/animation";

const Contact = ({ contactData }) => {
  const formRef = useRef();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const { twitter, phone, email } = contactData[0];

  const handleInputChange = (value, name) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const sendEmail = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill all the fields");
      return;
    }

    try {
      setLoading(true);
      emailjs
        .sendForm(
          "service_i1cqp6s",
          "template_31cf6wk",
          formRef.current,
          "4xWVUvmuW9TvNbC7Y"
        )
        .then((result) => {
          toast.success("Message Sent");
          setLoading(false);
        });
    } catch (e) {
      setLoading(false);

      toast.error(e);
    }
  };

  return (
    <section className="padding max-container h-100vh overflow-x-hidden">
      <div className="flex flex-col justify-center items-center relative">
        <motion.h1
          initial="offscreen"
          whileInView={"onscreen"}
          variants={tagVariants}
          className="section-title"
        >
          Contact Me
        </motion.h1>

        <motion.h5
          initial="offscreen"
          whileInView={"onscreen"}
          variants={tittleVariants}
          className="font-palanquin font-bold text-orange ms-6"
        >
          Get in touch
        </motion.h5>
      </div>

      <div className="flex flex-col md:flex-row gap-x-5 mt-11 py-3">
        <div className="flex-1 flex justify-center md:justify-start">
          <div className="flex flex-col gap-y-2 md:w-[300px]">
            <div className="flex pr-2 gap-2">
              <motion.div
                initial="offscreen"
                whileInView={"onscreen"}
                variants={leftToRight}
                className="w-1/2"
              >
                <Card
                  icon={<FaWhatsapp size={30} />}
                  color="text-green-600"
                  bg="bg-green-100"
                  name="whatsapp"
                  contact={phone}
                />
              </motion.div>
              <motion.div
                initial="offscreen"
                whileInView={"onscreen"}
                variants={rightToLeft}
                className="w-1/2"
              >
                <Card
                  icon={<Twitter className="text-2xl" />}
                  color="text-sky-500"
                  bg="bg-sky-100"
                  name="Twitter"
                  contact={twitter}
                />
              </motion.div>
            </div>
            <motion.div
              initial="offscreen"
              whileInView={"onscreen"}
              variants={tittleVariants}
              className="w-full px-1 md:px-0 "
            >
              <Card
                icon={<MailOpen size={30} />}
                color="text-red-600"
                bg="bg-red-100"
                name="G-Mail"
                contact={email}
              />
            </motion.div>
          </div>
        </div>
        <div className="flex-1 mt-11 md:mt-0">
          <form
            ref={formRef}
            onSubmit={sendEmail}
            className="w-full max-w-[850px]  h-[400px] flex flex-col gap-y-4"
          >
            <motion.div
              initial="offscreen"
              whileInView={"onscreen"}
              variants={tittleVariants}
              className="relative  h-[50px] lg:h-14 px-2 py-1  2xl:h-20 rounded-lg "
            >
              <label className="inputLabel">Name</label>
              <input
                className="h-full"
                onChange={(e) => handleInputChange(e.target.value, "name")}
                type="text"
                name="name"
                value={formData.name}
                placeholder="Insert your Name"
              />
              <span className="absolute right-6 top-5 lg:top-6 text-lg text-softtext">
                <IoMdPerson />
              </span>
            </motion.div>
            <motion.div
              initial="offscreen"
              whileInView={"onscreen"}
              variants={tittleVariants}
              className="relative px-2 py-1  h-[50px] lg:h-14 2xl:h-20 rounded-lg "
            >
              <label className="inputLabel">Email</label>
              <input
                type="text"
                onChange={(e) => handleInputChange(e.target.value, "email")}
                name="email"
                value={formData.email}
                className="h-full "
                placeholder="Insert your Email"
              />
              <span className="absolute right-6 top-5 lg:top-6 text-lg text-softtext">
                <SiGmail />
              </span>
            </motion.div>
            <motion.div
              initial="offscreen"
              whileInView={"onscreen"}
              variants={tittleVariants}
              className="relative px-2 h-14 rounded-lg "
            >
              <label className="inputLabel">Message</label>
              <textarea
                type="text"
                placeholder="Insert your Message"
                rows={3}
                name="message"
                value={formData.message}
                onChange={(e) => handleInputChange(e.target.value, "message")}
                className="border"
              />
              <span className="absolute right-6 lg:top-6 top-9 text-lg text-softtext">
                <MdMessage />
              </span>
            </motion.div>
            <motion.div
              initial="offscreen"
              whileInView={"onscreen"}
              variants={desVariants}
              className="mt-[70px] flex justify-center items-center"
            >
              <button
                type="submit"
                className="bg-green-400 text-lg flex justify-center items-center group py-2 w-full mx-2 shadow-md text-white rounded-full"
              >
                {loading ? (
                  <HashLoader color="#ffffff" size={25} />
                ) : (
                  <span className="flex justify-center gap-x-4 items-center">
                    Send Message
                    <span className="group-hover:animate-bounce">
                      <LuSend />
                    </span>
                  </span>
                )}
              </button>
            </motion.div>
          </form>
        </div>
      </div>
      <Toaster />
    </section>
  );
};

export default Contact;
