import React from "react";
import { CgWorkAlt } from "react-icons/cg";
import { FaReact } from "react-icons/fa";
import { LuGraduationCap } from "react-icons/lu";
import corpcommentImg from "@/public/corpcomment.png";
import rmtdevImg from "@/public/rmtdev.png";
import wordanalyticsImg from "@/public/wordanalytics.png";

export const links = [
  {
    name: "Home",
    hash: "#home",
  },
  {
    name: "About",
    hash: "#about",
  },
  {
    name: "Skills",
    hash: "#skills",
  },
  {
    name: "Experience",
    hash: "#experience",
  },
  {
    name: "Contact",
    hash: "#contact",
  },
] as const;

export const experiencesData = [
  {
    title: "CTO",
    location: "Sleepzzone, Madrid",
    description:
      "Led the strategic management and orchestrated the development and maintenance of robust cloud infrastructures of a dynamic SleepTech startup.",
    icon: React.createElement(CgWorkAlt),
    date: "01/2023 - 01/2024",
  },
  {
    title: "Advanced App Engineer",
    location: "Accenture, Madrid",
    description:
      "Development of features for multiple clients. These projects where based in Java using the Spring framework.",
    icon: React.createElement(CgWorkAlt),
    date: "09/2022 - 10/2023",
  },
  {
    title: "Full-Stack Developer",
    location: "Selectra, Madrid",
    description:
      "Development and improvement of Drupal modules using PHP as the back-end language as well as JS, HTML5 and CSS/SCSS for the front-end.",
    icon: React.createElement(CgWorkAlt),
    date: "09/2021 - 09/2022",
  },
  {
    title: "Back-End Developer",
    location: "Univ Carlos III, Madrid",
    description:
      "Development of several applications using tools such as spring-mvc, mongoDB, PHP, MySQL and Laravel.",
    icon: React.createElement(CgWorkAlt),
    date: "06/2020 - 09/2020",
  },
  {
    title: "Software Developer",
    location: "HI Iberia, Madrid",
    description:
      "Development and implementation of software in the following functional areas: e-health, security, education, mobility, etc.",
    icon: React.createElement(CgWorkAlt),
    date: "06/2019 - 07/2019",
  },
] as const;

export const projectsData = [
  {
    title: "CorpComment",
    description:
      "I worked as a full-stack developer on this startup project for 2 years. Users can give public feedback to companies.",
    tags: ["React", "Next.js", "MongoDB", "Tailwind", "Prisma"],
    imageUrl: corpcommentImg,
  },
  {
    title: "rmtDev",
    description:
      "Job board for remote developer jobs. I was the front-end developer. It has features like filtering, sorting and pagination.",
    tags: ["React", "TypeScript", "Next.js", "Tailwind", "Redux"],
    imageUrl: rmtdevImg,
  },
  {
    title: "Word Analytics",
    description:
      "A public web app for quick analytics on text. It shows word count, character count and social media post limits.",
    tags: ["React", "Next.js", "SQL", "Tailwind", "Framer"],
    imageUrl: wordanalyticsImg,
  },
] as const;

export const skillsData = [
  "Java",
  "SQL",
  "MongoDB",
  "PostgreSQL",
  "Git",
  "AWS",
  "GCP",
  "Jenkins",
  "Github Actions",
  "Python",
  "Node.js",
  "Express",
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
] as const;
