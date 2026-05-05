import React from "react";
import "./StudentTestimonial.scss";
import { motion, type Variants } from "framer-motion";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const StudentTestimonial = () => {
  const testimonials = [
    {
      id: 1,
      name: "Neha Verma",
      role: "Parent",
      avatar: "https://i.pravatar.cc/80?img=5",
      rating: 5,
      text:
        "The school focuses on overall development of children. We are proud to be a part of the Sunrise family."
    },
    {
      id: 2,
      name: "Rohit Sharma",
      role: "Parent",
      avatar: "https://i.pravatar.cc/80?img=12",
      rating: 5,
      text:
        "Excellent teaching staff and a very nurturing environment. My child has grown so much since joining this school."
    },
    {
      id: 3,
      name: "Priya Mehta",
      role: "Parent",
      avatar: "https://i.pravatar.cc/80?img=9",
      rating: 4,
      text:
        "Wonderful experience overall. The teachers are very attentive and caring. Highly recommend this school to all parents."
    }
  ];

  // 🎯 Variants
  const container: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const cardAnim: Variants = {
    hidden: { opacity: 0, y: 60, scale: 0.95 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.15,
        duration: 0.5
      }
    })
  };

  return (
    <motion.section
      className="stu-tes"
      initial="hidden"
      whileInView="visible"
      viewport={{ once:true, amount: 0.3 }}
    >
      <main className="stu-tes__container">

        {/* Header */}
        <motion.div className="stu-tes__header" variants={container}>
          <motion.div className="stu-tes__title" variants={fadeUp}>
            What people say
          </motion.div>
          <motion.div className="stu-tes__subtitle" variants={fadeUp}>
            Voices of our students and parents
          </motion.div>
        </motion.div>

        {/* Swiper */}
        <Swiper
          modules={[Pagination, Autoplay]}
          loop={true}
          spaceBetween={24}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false
          }}
          pagination={{ clickable: true }}
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1100: { slidesPerView: 3 }
          }}
          className="stu-tes__swiper"
        >
          {testimonials.map((item, index) => (
            <SwiperSlide key={item.id}>
              <motion.div
                className="stu-tes__card"
                variants={cardAnim}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once:true, amount: 0.2 }}
                whileHover={{
                  y: -10,
                  scale: 1.02,
                  boxShadow: "0px 20px 40px rgba(0,0,0,0.1)"
                }}
              >
                {/* Quote Icon */}
                <motion.div
                  className="stu-tes__quote-icon"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <svg viewBox="0 0 40 40">
                    <path d="M12 18c0-3.866 3.134-7 7-7V7C10.82 7 5 12.82 5 21v12h14V18H12zm16 0c0-3.866 3.134-7 7-7V7c-8.18 0-14 5.82-14 14v12h14V18h-7z" />
                  </svg>
                </motion.div>

                <div className="stu-tes__top">
                  <div className="stu-tes__left">
                    <motion.img
                      className="stu-tes__avatar"
                      src={item.avatar}
                      alt={item.name}
                      whileHover={{ scale: 1.1 }}
                    />

                    <div className="stu-tes__info">
                      <div className="stu-tes__name-row">
                        <h3 className="stu-tes__name">{item.name}</h3>
                        <span className="stu-tes__dropdown">▾</span>
                      </div>

                      <p className="stu-tes__role">{item.role}</p>
                      <span className="stu-tes__divider" />
                    </div>
                  </div>

                  {/* Stars */}
                  <div className="stu-tes__stars">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <motion.svg
                        key={i}
                        className={`stu-tes__star ${
                          i < item.rating ? "filled" : ""
                        }`}
                        viewBox="0 0 20 20"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <path d="M10 15.27L16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19z" />
                      </motion.svg>
                    ))}
                  </div>
                </div>

                {/* Text */}
                <motion.p className="stu-tes__text" variants={fadeUp}>
                  {item.text}
                </motion.p>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </main>
    </motion.section>
  );
};

export default StudentTestimonial;