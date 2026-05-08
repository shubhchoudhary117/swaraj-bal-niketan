import "./WhyChooseUs.scss";
import { motion, type Variants } from "framer-motion";

const whyChooseData = {
  badge: "WHY CHOOSE US?",
  heading: "We Focus on Your Child's",
  headingHighlight: "Overall Development",
  image: "https://plus.unsplash.com/premium_photo-1661391725488-6ef483483877?w=700&auto=format&fit=crop&q=60",
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


const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const slideLeft: Variants = {
  hidden: { opacity: 0, x: -80 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6 },
  },
};

const slideRight: Variants = {
  hidden: { opacity: 0, x: 80 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function WhyChooseUs({ data = whyChooseData }) {
  return (
    <motion.section
      className="why-choose-us"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      style={{ willChange: "transform" }}
    >
      <div className="why-choose-us__container">

        {/* Left — Image */}
        <motion.div
          className="why-choose-us__image-col"
          variants={slideLeft}
        >
          <div className="why-choose-us__image-wrap">
            <motion.img
              className="why-choose-us__image"
              src={data.image}
              alt={data.imageAlt}
              loading="lazy"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </motion.div>

        {/* Right — Content */}
        <motion.div
          className="why-choose-us__content"
          variants={slideRight}
        >
          <motion.span
            className="why-choose-us__badge"
            variants={fadeUp}
          >
            {data.badge}
          </motion.span>

          <motion.h2
            className="why-choose-us__heading"
            variants={fadeUp}
          >
            {data.heading}{" "}
            <span className="why-choose-us__heading--highlight">
              {data.headingHighlight}
            </span>
          </motion.h2>

          {/* Points List */}
          <motion.ul
            className="why-choose-us__list"
            variants={containerVariants}
          >
            {data.points.map((point) => (
              <motion.li
                key={point.id}
                className="why-choose-us__list-item"
                variants={fadeUp}
                whileHover={{ x: 8 }}
              >
                <span className="why-choose-us__list-icon">
                  <svg viewBox="0 0 20 20" fill="none">
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
              </motion.li>
            ))}
          </motion.ul>

          {/* CTA */}
          <motion.a
            className="why-choose-us__cta"
            href={data.cta.href}
            variants={fadeUp}
            whileHover={{ scale: 1.05 }}
          >
            {data.cta.label}
            <span className="why-choose-us__cta-arrow">→</span>
          </motion.a>
        </motion.div>

      </div>
    </motion.section>
  );
}