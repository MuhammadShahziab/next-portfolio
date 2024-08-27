"use client";
import { TiTick } from "react-icons/ti";
import { useState } from "react";
import DeleteCard from "@/app/components/admin-view/deleteCard/Card";
import Link from "next/link";
import Image from "next/image";
import { MoveRight, Pencil, Trash } from "lucide-react";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
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
  console.log(selectedCardIndex);
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
      <>
        <motion.div
          initial="offscreen"
          whileInView={"onscreen"}
          variants={containerVariantsView((index + 1) * 0.1)}
          className="border min-h-[220px] bg-service_shape bg-no-repeat bg-cover bg-offwhite/70 rounded-lg relative mt-10"
          key={item._id}
        >
          <div className="flex justify-center rounded-md absolute -top-6 left-36 mb-0">
            <motion.div
              initial="offscreen"
              whileInView={"onscreen"}
              variants={imageVariant}
              className="border flex justify-center items-center w-16 h-16 rounded-full bg-white overflow-hidden"
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
                className="font-semibold text-xl text-black capitalize text-center mb-4"
              >
                {item.name}
              </motion.h1>
              <motion.p
                initial="offscreen"
                whileInView={"onscreen"}
                variants={desVariants}
                className="text-softtext text-[15px] 2xl:text-md mt-5  leading-5"
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
          <Dialog
            open={isSelectedIndex}
            onOpenChange={() => setSelectedCardIndex(null)}
          >
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-start">
                  {" "}
                  <motion.h1
                    initial="offscreen"
                    whileInView={"onscreen"}
                    variants={tittleVariants}
                    className="font-semibold capitalize text-xl  text-center text-orange"
                  >
                    {item.name}
                  </motion.h1>
                </DialogTitle>
                <DialogDescription>
                  <motion.div
                    initial="offscreen"
                    whileInView={"onscreen"}
                    variants={imageVariant}
                    className="border overflow-hidden w-[85px] h-[85px] mx-auto md:w-[100px] flex justify-center items-center p-2 md:h-[100px] rounded-full"
                  >
                    <Image
                      src={item?.image}
                      width={90}
                      height={90}
                      alt="service_image"
                      className="object-contain"
                    />
                  </motion.div>

                  <motion.p
                    initial="offscreen"
                    whileInView={"onscreen"}
                    variants={desVariants}
                    className="text-softtext text-start font-sans text-base px-4 mt-2 mb-5"
                  >
                    {item.description}
                  </motion.p>
                  <div className="max-h-[250px] text-start overflow-y-scroll p2-3 ">
                    <ul>
                      {item?.data?.map((point) => (
                        <motion.li
                          initial="offscreen"
                          whileInView={"onscreen"}
                          variants={desVariants}
                          className="flex items-start font-sans mb-1 gap-x-3 px-3"
                          key={point._id}
                        >
                          <span className="border mt-1 text-green-400 border-green-400 w-4 h-4 flex justify-center items-center rounded-full">
                            <TiTick />
                          </span>
                          <p className="md:text-[15px] leading-1 text-sm text-softtext ">
                            {point.points}
                          </p>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        )}
      </>
    );
  });
};

export default ServiceCard;
