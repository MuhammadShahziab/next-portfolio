"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { containerVariantsView } from "@/app/(services)/animation/animation";
import { FaGithub } from "react-icons/fa";
import { MdOutlineOpenInNew } from "react-icons/md";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";

const ProjectCard = ({ projects, loading, index }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      {loading ? (
        <motion.div
          initial="offscreen"
          whileInView={"onscreen"}
          variants={containerVariantsView((index + 1) * 0.1)}
          className="z-10 group relative "
        >
          <Card className="relative">
            <Skeleton className="absolute top-2 left-2 h-6 w-20" />
            <CardContent className="px-0 rounded-md">
              <div className="relative flex justify-center mt-5  items-end md:items-center w-full h-[250px] md:h-[270px] mb-4">
                <Skeleton className=" h-[215px] md:h-[230px] w-[250px]" />
              </div>
              <div className="flex justify-between items-center px-4">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-8 w-8" />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ) : (
        <motion.div
          initial="offscreen"
          whileInView={"onscreen"}
          variants={containerVariantsView((index + 1) * 0.1)}
          className="z-10 group relative w-full cursor-pointer"
          onClick={() => setOpen(true)}
        >
          <Card className="z-10 group w-full relative">
            <CardTitle>
              <Badge
                variant="outline"
                className="absolute z-10 bg-green-400/80 border-none capitalize text-sm text-white top-2 left-2"
              >
                {projects?.category}
              </Badge>
            </CardTitle>
            <CardContent className="px-0 rounded-md">
              <div className="relative flex justify-center xl:bg-[110%] bg-offwhite items-end md:items-center w-full h-[250px] md:h-[270px] mb-4">
                <Image
                  src={projects.image}
                  width={250}
                  height={230}
                  alt={projects.name}
                  className="shadow-2xl object-contain h-[215px] md:h-[230px] absolute bottom-0"
                />
              </div>
              <div className="flex justify-between items-center pt-2 px-4">
                <h1 className="font-semibold capitalize text-black">
                  {projects.name}
                </h1>
                <MdOutlineOpenInNew
                  onClick={() => setOpen(true)}
                  className="text-softtext text-2xl cursor-pointer"
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      <Dialog open={open} onOpenChange={() => setOpen(false)}>
        <DialogContent className="w-[92%] px-6 lg:max-w-[60%] lg:flex lg:flex-row flex-col space-y-4 lg:space-y-0 lg:space-x-4">
          {/* Left Side: Project Image */}
          <div className="lg:w-1/2 w-full ">
            <Image
              src={projects?.image}
              alt={projects?.name}
              width={500}
              height={400}
              className="rounded-md object-contain w-full h-full"
            />
          </div>

          {/* Right Side: Project Details */}
          <div className="lg:w-1/2 w-full flex flex-col justify-between  space-y-4">
            <div>
              <DialogHeader>
                <h2 className="text-2xl font-semibold text-start capitalize">
                  {projects.name}
                </h2>
              </DialogHeader>
              <DialogDescription>
                <p className="text-sm text-muted-foreground">
                  {projects?.description}
                </p>
              </DialogDescription>
              <div className="flex  space-x-4 mt-4 lg:mt-6">
                <button className="flex hover:bg-gray-50 hover:shadow-sm transition-all duration-400 items-center border rounded-full outline-none px-4 py-1 space-x-2">
                  <FaGithub className="text-lg" />
                  <span>GitHub</span>
                </button>
                <button className="flex hover:bg-gray-100 hover:shadow-sm transition-all duration-400 items-center border rounded-full outline-none px-4 py-1 space-x-2">
                  <MdOutlineOpenInNew className="text-lg"></MdOutlineOpenInNew>
                  <span>Preview</span>
                </button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProjectCard;
