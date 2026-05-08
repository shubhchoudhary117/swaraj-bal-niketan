import React from "react";
import "./SchoolDirectors.scss";
import { motion, type Variants } from "framer-motion";

import lakshman from "./images/lakshmansir.png";
import dinesh from "./images/dineshsir.png";

const directorsData = {
  badge: "OUR LEADERSHIP",
  heading: "The Visionaries Behind",
  headingHighlight: "Our School's Success",
  subtitle:
    "Our directors bring decades of experience in education, shaping a nurturing environment where every child thrives and achieves their true potential.",
  directors: [
    {
      id: 1,
      name: "Mr. Lakshman Patil",
      position: "Director",
      qualification: "Ph.D. in Education Management",
      experience: "25+ Years Experience",
      message:
        "Our mission is to create an environment where curiosity is celebrated and every child discovers their unique potential.",
      image: lakshman,
      social: { email: "director@swarajbalniketan.in" },
    },
    {
      id: 2,
      name: "Mr. Dinesh Choudhary",
      position: "Sub Director",
      qualification: "M.Ed. in Child Psychology",
      experience: "18+ Years Experience",
      message:
        "We believe that holistic education goes beyond textbooks — it's about building character, confidence and compassion.",
      image: dinesh,
      social: { email: "subdirector@swarajbalniketan.in" },
    },
  ],
};

// 🎯 Variants
const container: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const zoomIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5 },
  },
};

const SchoolDirectors = () => {
  return (
    <motion.section
      className="school-directors"
      initial="hidden"
      whileInView="visible"
      viewport={{ once:true, amount: 0.3 }}
    >
      {/* Background decoration */}
      <div className="school-directors__bg-circle school-directors__bg-circle--1" />
      <div className="school-directors__bg-circle school-directors__bg-circle--2" />

      <div className="school-directors__container">

        {/* Header */}
        <motion.div
          className="school-directors__header"
          variants={container}
        >
          <motion.span className="school-directors__title" variants={fadeUp}>
            {directorsData.badge}
          </motion.span>

          <motion.h2 className="school-directors__heading" variants={fadeUp}>
            {directorsData.heading}{" "}
            <span className="school-directors__heading--highlight">
              {directorsData.headingHighlight}
            </span>
          </motion.h2>

          <motion.p className="school-directors__subtitle" variants={fadeUp}>
            {directorsData.subtitle}
          </motion.p>
        </motion.div>

        {/* Cards */}
        <motion.div
          className="school-directors__grid"
          variants={container}
        >
          {directorsData.directors.map((director, index) => (
            <motion.div
              key={director.id}
              className={`school-directors__card school-directors__card--${
                index === 0 ? "primary" : "secondary"
              }`}
              variants={zoomIn}
              whileHover={{
                y: -10,
                scale: 1.02,
                boxShadow: "0px 20px 40px rgba(0,0,0,0.1)",
              }}
            >
              {/* Top accent */}
              <div className="school-directors__card-accent" />

              {/* Avatar */}
              <div className="school-directors__avatar-wrap">
                <motion.div
                  className="school-directors__avatar-ring"
                  whileHover={{ rotate: 3 }}
                >
                  <img
                    className="school-directors__avatar"
                    src={director.image}
                    alt={director.name}
                    loading="lazy"
                  />
                </motion.div>

                <span className="school-directors__position-badge">
                  {director.position}
                </span>
              </div>

              {/* Body */}
              <div className="school-directors__card-body">
                <h3 className="school-directors__name">{director.name}</h3>
                <p className="school-directors__qualification">
                  {director.qualification}
                </p>

                <div className="school-directors__exp-badge">
                  <span className="school-directors__exp-dot" />
                  {director.experience}
                </div>

                <div className="school-directors__divider" />

                <blockquote className="school-directors__quote">
                  <span className="school-directors__quote-mark">"</span>
                  {director.message}
                </blockquote>

                <a
                  className="school-directors__email"
                  href={`mailto:${director.social.email}`}
                >
                  <svg viewBox="0 0 20 20" fill="none">
                    <path
                      d="M3 5h14a1 1 0 011 1v8a1 1 0 01-1 1H3a1 1 0 01-1-1V6a1 1 0 011-1z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M2 6l8 6 8-6"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                  </svg>
                  {director.social.email}
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default SchoolDirectors;