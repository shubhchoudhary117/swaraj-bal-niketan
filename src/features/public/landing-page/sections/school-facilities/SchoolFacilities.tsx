import { useState } from "react";
import "./SchoolFacilities.scss"
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import sportsImage from "./images/sports.png"
import busImage from "./images/bus.avif"
import laboratoryImage from "./images/laboritory.webp"
import { type Variants, motion } from "framer-motion";



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

// ─── JSON Data ───────────────────────────────────────────────────────────────
const facilitiesData = {
    badge: "PREMIUM FACILITIES",
    heading: "World-Class Facilities for Holistic Growth",
    viewAllLabel: "View All Facilities",
    items: [
        {
            id: 1,
            icon: "🏫",
            iconBg: "#3B82F6",
            name: "Smart Classrooms",
            description: "Technology enabled interactive learning",
            image:
                "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&q=80",
        },
        {
            id: 2,
            icon: "🔬",
            iconBg: "#3B82F6",
            name: "Science Laboratories",
            description: "Well equipped labs for practical learning",
            image: laboratoryImage,
        },
        {
            id: 3,
            icon: "📚",
            iconBg: "#F59E0B",
            name: "Library",
            description: "A wide range of books and digital resources",
            image:
                "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&q=80",
        },
        {
            id: 4,
            icon: "⚽",
            iconBg: "#10B981",
            name: "Sports Complex",
            description: "Indoor & outdoor sports facilities",
            image: sportsImage,
        },
        {
            id: 5,
            icon: "🚌",
            iconBg: "#F59E0B",
            name: "Transport Facility",
            description: "Safe and comfortable transportation",
            image: busImage,
        },
        {
            id: 6,
            icon: "📷",
            iconBg: "#3B82F6",
            name: "CCTV Security",
            description: "24/7 surveillance for complete safety",
            image:
                "https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=400&q=80",
        },
    ],
};



export default function SchoolFacilities({ data = facilitiesData }) {
    const [hovered, setHovered] = useState<number | any>(null);

    return (
        <>

            <section className="school-facilities">
                <div className="school-facilities__header">
                    <span className="school-facilities__title">{data.badge}</span>
                    <h2 className="school-facilities__subtitle">{data.heading}</h2>
                </div>

                {/* Grid */}
                <div className="school-facilities__swiper">
                    <Swiper
                        modules={[Pagination]}
                        spaceBetween={20}
                        slidesPerView={6} // default desktop
                        pagination={{ clickable: true }}
                        breakpoints={{
                            0: {
                                slidesPerView: 2, // mobile
                                spaceBetween: 12,
                            },
                            480: {
                                slidesPerView: 2,
                            },
                            768: {
                                slidesPerView: 3,
                            },
                            1024: {
                                slidesPerView: 4,
                            },
                            1280: {
                                slidesPerView: 6, // desktop full
                            },
                        }}
                    >
                        {data.items.map((facility) => (
                            <SwiperSlide key={facility.id}>
                                <motion.div
                                    className="school-facilities__card"
                                    onMouseEnter={() => setHovered(facility.id)}
                                    onMouseLeave={() => setHovered(null)}

                                    variants={cardVariants}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once:true, amount: 0.3 }}
                                    custom={facility.id}
                                >
                                    <div className="school-facilities__card-image-wrap">
                                        <img
                                            className="school-facilities__card-image"
                                            src={facility.image}
                                            alt={facility.name}
                                            loading="lazy"
                                        />

                                        <div
                                            className="school-facilities__card-icon"
                                            style={{ backgroundColor: facility.iconBg }}
                                        >
                                            {facility.icon}
                                        </div>
                                    </div>

                                    {/* Body */}
                                    <div className="school-facilities__card-body">
                                        <p className="school-facilities__card-name">
                                            {facility.name}
                                        </p>
                                        <p className="school-facilities__card-description">
                                            {facility.description}
                                        </p>
                                    </div>
                                </motion.div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </section>
        </>
    );
}