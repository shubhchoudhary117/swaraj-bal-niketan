import {
  ArrowRight,
  Book,
  GraduationCap,
  Microscope,
  MoveRight,
  Notebook
} from "lucide-react";
import "./Courses.scss";
import React from "react";
import { motion, type Variants  } from "framer-motion";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import primaryClassBanner from "./images/primary-class.avif";
import middleClassBanner from "./images/middle-class1.png";
import secondaryClassBanner from "./images/secondary-class.webp";
import highSecondaryClassBanner from "./images/high-secondary-class.avif";

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 60
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut"
    }
  })
};
const Courses = () => {
  const coursesData = [
    {
      id: 1,
      type: "primary",
      title: "Primary Education",
      grade: "Nursery to 5th",
      desc: "Building a strong foundation with fun activities, creativity and care.",
      image: primaryClassBanner,
      icon: <Book className="icon" />
    },
    {
      id: 2,
      type: "middle",
      title: "Middle School",
      grade: "6th to 8th",
      desc: "Encouraging curiosity, building skills and boosting confidence.",
      image: middleClassBanner,
      icon: <Notebook className="icon" />
    },
    {
      id: 3,
      type: "secondary",
      title: "Secondary Education",
      grade: "9th to 10th",
      desc: "Preparing for board exams with focused guidance and support.",
      image: secondaryClassBanner,
      icon: <Microscope className="icon" />
    },
    {
      id: 4,
      type: "senior",
      title: "Senior Secondary",
      grade: "11th to 12th",
      desc: "Stream-based learning to achieve career and life goals.",
      image: highSecondaryClassBanner,
      icon: <GraduationCap className="icon" />
    }
  ];

  return (
    <div className="courses">
      <div className="courses__header">
        <div className="courses__title">Our Courses</div>
        <div className="courses__subtitle">Programs we offer</div>
      </div>

      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={20}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false
        }}
        pagination={{
          clickable: true,
          el: ".custom-pagination"
        }}
        breakpoints={{
          0: {
            slidesPerView: 1
          },
          768: {
            slidesPerView: 2
          },
          1024: {
            slidesPerView: 4
          }
        }}

        className="courses__swiper"
      >
        {coursesData.map((item) => (
          <SwiperSlide key={item.id}>
            <motion.div
              className="courses__card"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.4 }}
              custom={item.id}
            >
              <div className="courses__card-image-wrap">
                <img
                  src={item.image}
                  alt={item.title}
                  className="courses__card-image"
                />
              </div>

              <div className="courses__card-body">
                <div className={`courses__course-icon-wrap ${item.type}`}>
                  {item.icon}
                </div>

                <div className="courses__card-title">{item.title}</div>
                <div className="courses__card-grade">{item.grade}</div>
                <div className="courses__card-desc">{item.desc}</div>

                <div className="courses__card-arrow">
                  <ArrowRight className="courses__card-arrow-icon" />
                </div>
              </div>
           </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* <div className="courses__row">
        <button className="courses__view-all-btn">
          View All Course <MoveRight />
        </button>
      </div> */}
    </div>
  );
};

export default Courses;