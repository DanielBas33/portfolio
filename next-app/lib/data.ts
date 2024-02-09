import React from "react";
import { CgWorkAlt } from "react-icons/cg";
import portfolioImage from "@/public/portoflioImg.png";

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
    name: "Projects",
    hash: "#projects",
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
    title: "Cloud Portfolio",
    description:
      "I created a portfolio website using multiple AWS services as well as an IaC approach with Terraform. ",
    tags: [
      "Next.js",
      "CloudFront",
      "Lambda",
      "S3",
      "Api Gateway",
      "Route53",
      "Certificate Manager",
      "Terraform",
    ],
    imageUrl: portfolioImage,
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
] as const;
