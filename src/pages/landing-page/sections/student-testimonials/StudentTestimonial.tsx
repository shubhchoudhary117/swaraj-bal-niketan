import React from "react";
import "./StudentTestimonial.scss";

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
      text: "The school focuses on overall development of children. We are proud to be a part of the Sunrise family."
    },
    {
      id: 2,
      name: "Rohit Sharma",
      role: "Parent",
      avatar: "https://i.pravatar.cc/80?img=12",
      rating: 5,
      text: "Excellent teaching staff and a very nurturing environment. My child has grown so much since joining this school."
    },
    {
      id: 3,
      name: "Priya Mehta",
      role: "Parent",
      avatar: "https://i.pravatar.cc/80?img=9",
      rating: 4,
      text: "Wonderful experience overall. The teachers are very attentive and caring. Highly recommend this school to all parents."
    }
  ];

  return (
    <section className="stu-tes">
      <main className="stu-tes__container">
        <div className="stu-tes__header">
          <div className="stu-tes__title">What people say</div>
          <div className="stu-tes__subtitle">
            Voices of our students and parents
          </div>
        </div>

        <Swiper
          modules={[Pagination, Autoplay]}
          loop={true}
          spaceBetween={24}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false
          }}
          pagination={{
            clickable: true
          }}
          breakpoints={{
            0: {
              slidesPerView: 1
            },
            768: {
              slidesPerView: 2
            },
            1100: {
              slidesPerView: 3
            }
          }}
          className="stu-tes__swiper"
        >
          {testimonials.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="stu-tes__card">
                <div className="stu-tes__quote-icon">
                  <svg viewBox="0 0 40 40">
                    <path d="M12 18c0-3.866 3.134-7 7-7V7C10.82 7 5 12.82 5 21v12h14V18H12zm16 0c0-3.866 3.134-7 7-7V7c-8.18 0-14 5.82-14 14v12h14V18h-7z" />
                  </svg>
                </div>

                <div className="stu-tes__top">
                  <div className="stu-tes__left">
                    <img
                      className="stu-tes__avatar"
                      src={item.avatar}
                      alt={item.name}
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

                  <div className="stu-tes__stars">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg
                        key={i}
                        className={`stu-tes__star ${
                          i < item.rating ? "filled" : ""
                        }`}
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 15.27L16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19z" />
                      </svg>
                    ))}
                  </div>
                </div>

                <p className="stu-tes__text">{item.text}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </main>
    </section>
  );
};

export default StudentTestimonial;