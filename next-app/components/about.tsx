"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";
import { useTranslation } from "next-export-i18n";

export default function About() {
  const { ref } = useSectionInView("About");
  const { t } = useTranslation();

  return (
    <motion.section
      ref={ref}
      className="mb-28 max-w-[45rem] text-center leading-8 sm:mb-40 scroll-mt-28"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
      id="about"
    >
      <SectionHeading>{t("about.heading")}</SectionHeading>
      <p className="mb-3">
        {t("about.1")}
        <span className="font-medium">{t("about.2")}</span>
        {t("about.3")}
        <a
          target="_blank"
          href="https://www.credly.com/badges/7429d1fb-f92a-4ae1-8c54-ed0a4b1e963c/public_url"
        >
          <span className="font-medium">{t("about.4")}</span>
        </a>
        {t("about.5")}
      </p>
    </motion.section>
  );
}
