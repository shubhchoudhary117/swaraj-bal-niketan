import React from 'react'
import "./LandintPage.scss"
import PublicHeader from '../../shared/layouts/public-header/PublicHeader'
import { MoveRight, GraduationCap, Users, BookOpen, ShieldCheck, ArrowRight } from 'lucide-react'
import Courses from './sections/course/Courses'

import AwardIcon from "./images/states/awards.svg?react";
import ExcellenceIcon from "./images/states/excellence.svg?react"
import ModernIcon from "./images/states/modern.svg?react"
import TeachersIcon from "./images/states/teachers.svg?react"
import StudentsIcon from "./images/states/students.svg?react"
import StudentTestimonial from './sections/student-testimonials/StudentTestimonial'
import schoolBanner from "./images/carousel1-bg.png"
import PublicFooter from '../../shared/layouts/public-footer/PublicFooter'
import SchoolFacilities from './sections/school-facilities/SchoolFacilities'

const LandingPage = () => {


  return <>
    <section className="landing-p">
      <PublicHeader />
      <main className="landing-p__container">

        <div className="landing-p__carousel">
          <div className="landing-p__carousel-wrapper">
            <div className="landing-p__carousel-content">
              <div className="landing-p__carousel-welcome">Welcome to</div>
              <div className="landing-p__carousel-title">Swaraj Bal Niketan High School</div>
              <div className="landing-p__carousel-subheading">Nurturing Minds. Shaping Futures.</div>
              <div className="landing-p__carousel-desc">We provide a safe, inclusive and inspiring environment where every child is encouraged to learn, grow and achieve their full potential.</div>
              <button className="landing-p__know-more-btn">
                Apply Now
                <MoveRight className='icon' />
              </button>
            </div>
          </div>
        </div>

        <div className="landing-p__about">
          <div className="landing-p__about-banner" />

          <div className="landing-p__about-content">
            <div className="landing-p__about-school">
              <div className="landing-p__about-title">About our school</div>
              <div className="landing-p__about-heading">Excellence in Education Since Day One</div>
              <div className="landing-p__about-desc">
                At Swaraj Bal Niketan school, we believe in holistic development of every child. Our
                mission is to provide quality education with strong values and innovative teaching
                methodologies.
              </div>
            </div>

            <div className="landing-p__we-provides">
              <div className="landing-p__provide-block">
                <div className="landing-p__provide-icon-block">
                  <GraduationCap className='provider-icon' />
                </div>
                <div className="landing-p__provide-content">
                  <div className="landing-p__provide-title">Quality Education</div>
                  <div className="landing-p__provide-text">Focused on concept clarity and practical learning.</div>
                </div>
              </div>

              <div className="landing-p__provide-block">
                <div className="landing-p__provide-icon-block">
                  <Users className='provider-icon' />
                </div>
                <div className="landing-p__provide-content">
                  <div className="landing-p__provide-title">Experienced Faculty</div>
                  <div className="landing-p__provide-text">Dedicated and qualified teachers who care.</div>
                </div>
              </div>

              <div className="landing-p__provide-block">
                <div className="landing-p__provide-icon-block landing-p__provide-icon-block--orange">
                  <BookOpen className='provider-icon' />
                </div>
                <div className="landing-p__provide-content">
                  <div className="landing-p__provide-title">Modern Facilities</div>
                  <div className="landing-p__provide-text">Smart classrooms, labs, library and sports complex.</div>
                </div>

              </div>

              <div className="landing-p__provide-block">
                <div className="landing-p__provide-icon-block landing-p__provide-icon-block--blue">
                  <ShieldCheck className='provider-icon' />
                </div>
                <div className="landing-p__provide-content">
                  <div className="landing-p__provide-title">Safe Environment</div>
                  <div className="landing-p__provide-text">Student safety and well-being are our top priority.</div>
                </div>

              </div>
            </div>
          </div>
        </div>


        <Courses />
        <SchoolFacilities/>

        <div className="landing-p__stats-section">
          <div className="landing-p__stats">
            <div className="landing-p__stat-item">
              <div className="landing-p__stat-icon">
                <ExcellenceIcon />
              </div>
              <div className="landing-p__stat-content">
                <div className="landing-p__stat-number">25+</div>
                <div className="landing-p__stat-label">Years of Excellence</div>
              </div>
            </div>

            <div className="landing-p__stat-divider" />

            <div className="landing-p__stat-item">
              <div className="landing-p__stat-icon">
                <StudentsIcon />
              </div>
              <div className="landing-p__stat-content">
                <div className="landing-p__stat-number">1200+</div>
                <div className="landing-p__stat-label">Happy Students</div>
              </div>
            </div>

            <div className="landing-p__stat-divider" />

            <div className="landing-p__stat-item">
              <div className="landing-p__stat-icon">
                <TeachersIcon />
              </div>
              <div className="landing-p__stat-content">
                <div className="landing-p__stat-number">80+</div>
                <div className="landing-p__stat-label">Expert Teachers</div>
              </div>
            </div>

            <div className="landing-p__stat-divider" />

            <div className="landing-p__stat-item">
              <div className="landing-p__stat-icon">
                <ModernIcon />
              </div>
              <div className="landing-p__stat-content">
                <div className="landing-p__stat-number">15+</div>
                <div className="landing-p__stat-label">Modern Classrooms</div>
              </div>
            </div>

            <div className="landing-p__stat-divider" />

            {/* <div className="landing-p__stat-item">
              <div className="landing-p__stat-icon">
                <AwardIcon />
              </div>
              <div className="landing-p__stat-content">
                <div className="landing-p__stat-number">50+</div>
                <div className="landing-p__stat-label">Awards Won</div>
              </div>
            </div> */}
          </div>
        </div>


        <div className="admission-banner">
          <div className="admission-banner__content">
            <div className="admission-banner__text-block">
              <h2 className="admission-banner__heading">Admissions Open</h2>
              <p className="admission-banner__subheading">
                for Academic Year 2024-25
              </p>
              <p className="admission-banner__description">
                Give your child the best start for a bright and successful future.
              </p>
              <button className="admission-banner__cta">
                Enquire Now <span className="admission-banner__cta-arrow">→</span>
              </button>
            </div>
          </div>
          <div className="admission-banner__image-block">
            <img
              className="admission-banner__image"
              src={schoolBanner}
              alt="School campus"
            />
            <div className="admission-banner__image-overlay" />
          </div>
        </div>
         <StudentTestimonial />
        <PublicFooter />

      </main>
    </section>
  </>
}

export default LandingPage