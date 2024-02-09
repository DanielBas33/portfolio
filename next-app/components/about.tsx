"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";

export default function About() {
  const { ref } = useSectionInView("About");

  return (
    <motion.section
      ref={ref}
      className="mb-28 max-w-[45rem] text-center leading-8 sm:mb-40 scroll-mt-28"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
      id="about"
    >
      <SectionHeading>About me</SectionHeading>
      <p className="mb-3">
        With a degree in <span className="font-medium">Computer Science</span>,
        my journey as a software developer began. Now, my fascination lies in
        roles that intertwine cloud technology and data. After successfully
        earning my{" "}
        <span className="font-medium">AWS Solutions Architect Associate</span>{" "}
        certification, I decided to channel my energy into enhancing my cloud
        skills through meaningful projects.
        <span className="italic"> Passionate about</span> not just the
        technology but also the impact it serves over people. Currently on the
        lookout for a <span className="font-medium"> position</span> as an AWS
        Solutions Architect Or Cloud Engineer, my objective is to bring
        technical expertise and deliver substantial{" "}
        <span className="font-medium">Business Value</span>.
      </p>

      <p>
        <span className="italic">When I'm not improving my tech skills</span>, I
        enjoy playing video games, reading and writting. I also enjoy{" "}
        <span className="font-medium">learning new things</span>. I am currently
        learning about <span className="font-medium">psychology</span>.
      </p>
    </motion.section>
  );
}
