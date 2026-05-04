import "./WhyChooseUs.scss";

import whyChooseUsImage from "./images/why-choose-us.avif"

const whyChooseData = {
  badge: "WHY CHOOSE US?",
  heading: "We Focus on Your Child's",
  headingHighlight: "Overall Development",
  image: "https://plus.unsplash.com/premium_photo-1661391725488-6ef483483877?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEzOXx8fGVufDB8fHx8fA%3D%3D",
  imageAlt: "Happy student with books",
  points: [
    { id: 1, text: "Student-centered learning approach" },
    { id: 2, text: "Low student-teacher ratio" },
    { id: 3, text: "Digital classrooms & modern labs" },
    { id: 4, text: "Sports, arts and cultural activities" },
    { id: 5, text: "Personalized attention for every child" },
  ],
  cta: {
    label: "Know More About Us",
    href: "#",
  },
};

export default function WhyChooseUs({ data = whyChooseData }) {
  return (
    <section className="why-choose-us">
      <div className="why-choose-us__container">

        {/* Left — Student image */}
        <div className="why-choose-us__image-col">
          <div className="why-choose-us__image-wrap">
            <img
              className="why-choose-us__image"
              src={data.image}
              alt={data.imageAlt}
              loading="lazy"
            />
          </div>
        </div>

        {/* Right — Content */}
        <div className="why-choose-us__content">
          <span className="why-choose-us__badge">{data.badge}</span>

          <h2 className="why-choose-us__heading">
            {data.heading}{" "}
            <span className="why-choose-us__heading--highlight">
              {data.headingHighlight}
            </span>
          </h2>

          <ul className="why-choose-us__list">
            {data.points.map((point) => (
              <li key={point.id} className="why-choose-us__list-item">
                <span className="why-choose-us__list-icon">
                  <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="10" cy="10" r="10" fill="#F2B100" fillOpacity="0.15" />
                    <path
                      d="M6 10.5L8.5 13L14 7.5"
                      stroke="#F2B100"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className="why-choose-us__list-text">{point.text}</span>
              </li>
            ))}
          </ul>

          <a className="why-choose-us__cta" href={data.cta.href}>
            {data.cta.label}
            <span className="why-choose-us__cta-arrow">→</span>
          </a>
        </div>

      </div>
    </section>
  );
}