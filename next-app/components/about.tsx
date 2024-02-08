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
        After graduating with a degree in{" "}
        <span className="font-medium">Computer Science</span>, I decided to try
        out different roles as a developer. I know find cloud and data related
        roles fascinating and would love to transition. After passing my{" "}
        <span className="font-medium">AWS Solutions Architect Associate</span>
        exam I decided to dedicate some time to improving my cloud skills
        through profitable projects.{" "}
        <span className="italic">Im passionate about</span> helping others
        understand all of the pros the cloud has as well as create architectures
        based on the{" "}
        <span className="underline">Well Architected Framework</span>. I am
        currently looking for a{" "}
        <span className="font-medium">full-time position</span> as a AWS
        solutions architect.
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
