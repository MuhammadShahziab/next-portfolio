"use client";
import { TiTick } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
import { useState } from "react";
import DeleteCard from "@/app/components/admin-view/deleteCard/Card";
import Link from "next/link";
import Image from "next/image";
import { MoveRight, Pencil, Trash } from "lucide-react";
import { motion } from "framer-motion";
import {
  containerVariants,
  containerVariantsView,
  desVariants,
  imageVariant,
  leftToRight,
  tittleVariants,
} from "@/app/(services)/animation/animation";

const ServiceCard = ({ services, action }) => {
  const [selectedCardIndex, setSelectedCardIndex] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [deletedName, setDeletedName] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleToggle = (index) => {
    setSelectedCardIndex(index);
  };

  const confirmDelete = (Id, Name) => {
    setDeleteId(Id);
    setDeletedName(Name);
  };
  return services?.map((item, index) => {
    const isSelectedIndex = index === selectedCardIndex;
    return (
      <div key={item._id}>
        <motion.div
          initial="offscreen"
          whileInView={"onscreen"}
          variants={containerVariantsView((index + 1) * 0.1)}
          className="border min-h-[220px] rounded-lg relative mt-10"
          key={item._id}
        >
          <div className="flex justify-center rounded-md absolute -top-6 left-36 mb-0">
            <motion.div
              initial="offscreen"
              whileInView={"onscreen"}
              variants={imageVariant}
              className="border flex justify-center items-center w-16 h-16 rounded-full overflow-hidden"
            >
              <Image
                src={item.image}
                width={55}
                height={55}
                alt="icon"
                className="rounded-full object-cover"
              />
            </motion.div>
          </div>
          <div className="px-5 flex flex-col justify-between mt-3 min-h-[220px]">
            <div className=" mb-auto pt-11">
              <motion.h1
                initial="offscreen"
                whileInView={"onscreen"}
                variants={tittleVariants}
                className="font-bold text-xl text-black capitalize text-center mb-4"
              >
                {item.name}
              </motion.h1>
              <motion.p
                initial="offscreen"
                whileInView={"onscreen"}
                variants={desVariants}
                className="text-soft text-[15px] 2xl:text-md mt-5  leading-5"
              >
                {item.description.slice(0, 125)}...
              </motion.p>
            </div>
            <div className="flex justify-between max-md:py-2 flex-wrap">
              <motion.div
                initial="offscreen"
                whileInView={"onscreen"}
                variants={leftToRight}
                className="  py-4 flex-wrap  flex  mb-0 gap-4 group justify-center md:justify-start text-softtext items-center cursor-pointer"
                onClick={() => handleToggle(index)}
              >
                View more
                <span className="text-orange text-xl group-hover:translate-x-3 transition-all">
                  <MoveRight></MoveRight>
                </span>
              </motion.div>

              {action && (
                <div className="flex  items-end pb-3 justify-center">
                  <Link href={`/dashboard/services/edit/${item._id}`}>
                    <button className="mr-2 bg-blue-200 rounded-full w-8 h-8 flex justify-center items-center text-blue-500">
                      <Pencil size={20} />
                    </button>
                  </Link>
                  <button
                    onClick={() => confirmDelete(item._id, item.name)}
                    className="mr-2 bg-red-200 rounded-full w-8 h-8 flex justify-center items-center text-red-500"
                  >
                    <Trash size={20} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </motion.div>
        {deletedName && (
          <DeleteCard
            deleteId={deleteId}
            deletedName={deletedName}
            setDeletedName={setDeletedName}
            routeName="services"
            setDeleteLoading={setDeleteLoading}
            deleteLoading={deleteLoading}
          />
        )}
        {isSelectedIndex && (
          <div
            className={
              "fixed top-0 left-0 right-0 bottom-0 z-10 flex justify-center items-center px-4 py-8 bg-[rgba(0,0,0,0.1)] opacity-100"
            }
          >
            <motion.div
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1, type: "spring" }}
              className="card overflow-scroll  w-[350px] md:w-[500px] h-5/6 rounded-lg py-6 md:px-7 px-4  bg-white  shadow-md"
            >
              <div
                className="sticky top-0 bg-white w-10 flex justify-center items-center h-10 rounded-full  right-28 z-10 cursor-pointer "
                onClick={() => setSelectedCardIndex(null)}
              >
                <RxCross2 size={25}></RxCross2>
              </div>
              <div className="flex justify-center items-center mb-3  ">
                <motion.div
                  initial="offscreen"
                  whileInView={"onscreen"}
                  variants={imageVariant}
                  className="border overflow-hidden w-[85px] h-[85px] md:w-[100px] flex justify-center items-center p-2 md:h-[100px]  rounded-full"
                >
                  <Image
                    src={item?.image}
                    width={90}
                    height={90}
                    alt="service_image"
                    className=" object-contain "
                  ></Image>
                </motion.div>
              </div>
              <motion.h1
                initial="offscreen"
                whileInView={"onscreen"}
                variants={tittleVariants}
                className="font-bold capitalize text-xl mb-4 text-center "
              >
                {/* web designing */}
                {item.name}
              </motion.h1>
              <motion.p
                initial="offscreen"
                whileInView={"onscreen"}
                variants={desVariants}
                className="text-softtext text-base mb-5"
              >
                {item.description}
              </motion.p>
              <ul className="">
                {item?.data?.map((point) => {
                  return (
                    <motion.li
                      initial="offscreen"
                      whileInView={"onscreen"}
                      variants={desVariants}
                      className="flex items-center mb-1 gap-x-3"
                      key={point._id}
                    >
                      <span className="border text-orange border-orange w-4 h-4 flex  justify-center items-center rounded-full">
                        <TiTick></TiTick>
                      </span>{" "}
                      <p className="md:text-[17px] text-[17px] text-softtext leading-normal">
                        {point.points}
                      </p>{" "}
                    </motion.li>
                  );
                })}
              </ul>
            </motion.div>
          </div>
        )}
      </div>
    );
  });
};

export default ServiceCard;
