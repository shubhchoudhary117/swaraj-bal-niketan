import React from "react";
import "./SchoolDirectors.scss";

import lakshman from "./images/lakshmansir.png";

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
      image: "",
      social: {
        email: "director@swarajbalniketan.in",
      },
    },
    {
      id: 2,
      name: "Mr. Dinesh Choudhary",
      position: "Sub Director",
      qualification: "M.Ed. in Child Psychology",
      experience: "18+ Years Experience",
      message:
        "We believe that holistic education goes beyond textbooks — it's about building character, confidence and compassion.",
      image: "",
      social: {
        email: "subdirector@swarajbalniketan.in",
      },
    },
  ],
};

const SchoolDirectors=()=> {
  return (
    <section className="school-directors">
      {/* Background decoration */}
      <div className="school-directors__bg-circle school-directors__bg-circle--1" />
      <div className="school-directors__bg-circle school-directors__bg-circle--2" />

      <div className="school-directors__container">
        {/* Header */}
        <div className="school-directors__header">
          <span className="school-directors__title">{directorsData.badge}</span>
          <h2 className="school-directors__heading">
            {directorsData.heading}{" "}
            <span className="school-directors__heading--highlight">
              {directorsData.headingHighlight}
            </span>
          </h2>
          <p className="school-directors__subtitle">{directorsData.subtitle}</p>
        </div>

        {/* Cards */}
        <div className="school-directors__grid">
          {directorsData.directors.map((director, index) => (
            <div
              key={director.id}
              className={`school-directors__card school-directors__card--${index === 0 ? "primary" : "secondary"}`}
            >
              {/* Top accent bar */}
              <div className="school-directors__card-accent" />

              {/* Avatar */}
              <div className="school-directors__avatar-wrap">
                <div className="school-directors__avatar-ring">
                  <img
                    className="school-directors__avatar"
                    src={director.image}
                    alt={director.name}
                    loading="lazy"
                  />
                </div>
                <span className="school-directors__position-badge">
                  {director.position}
                </span>
              </div>

              {/* Info */}
              <div className="school-directors__card-body">
                <h3 className="school-directors__name">{director.name}</h3>
                <p className="school-directors__qualification">
                  {director.qualification}
                </p>

                <div className="school-directors__exp-badge">
                  <span className="school-directors__exp-dot" />
                  {director.experience}
                </div>

                {/* Divider */}
                <div className="school-directors__divider" />

                {/* Quote */}
                <blockquote className="school-directors__quote">
                  <span className="school-directors__quote-mark">"</span>
                  {director.message}
                </blockquote>

                {/* Email */}
                <a
                  className="school-directors__email"
                  href={`mailto:${director.social.email}`}
                >
                  <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M3 5h14a1 1 0 011 1v8a1 1 0 01-1 1H3a1 1 0 01-1-1V6a1 1 0 011-1z"
                      stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"
                    />
                    <path d="M2 6l8 6 8-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  {director.social.email}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SchoolDirectors;