import React from 'react'
import "./StudentProfile.scss"
import { BadgeCheck, BookOpen, Calendar, Camera, Edit2, GraduationCap, Phone, ShieldCheck, Users } from 'lucide-react'
import Breadcrumb from '../../../../shared/common/breadcrumb/Breadcrumb'

const StudentProfile = () => {
  return <>
    <section className="stu-profile">
      <main className="stu-profile__container">
        <Breadcrumb title='My Profile' pageName='My Profile' />
        <div className="stu-profile__row">
          <div className="stu-profile__stu-info-box">
            <div className="stu-profile__stu-avtar-section">
              <div className="stu-profile__stu-avtar">
                <img src="/assets/comman/student-avtar.avif" alt="" className="stu-profile__stu-avtar-img" />
              </div>
              <button className="stu-profile__update-avtar">
                <Camera className='icon' /> Change Photo
              </button>
            </div>
            <div className="stu-profile__student-right">

              <div className="stu-profile__student-header">

                <div>
                  <div className="stu-profile__student-name-row">
                    <h2 className="stu-profile__student-name">
                      Ananya Sharma
                    </h2>

                    <ShieldCheck className="verify-icon" />
                  </div>

                  <div className="stu-profile__student-class">
                    Class 10 - Section A
                  </div>

                  <div className="stu-profile__student-id">
                    Student ID: BFPS10234
                  </div>
                </div>
              </div>

              <div className="stu-profile__details-grid">

                <div className="stu-profile__detail-item">
                  <span>Date of Birth</span>
                  <strong>12 March 2009</strong>
                </div>

                <div className="stu-profile__detail-item">
                  <span>Gender</span>
                  <strong>Female</strong>
                </div>

                <div className="stu-profile__detail-item">
                  <span>Blood Group</span>
                  <strong>O+</strong>
                </div>

                <div className="stu-profile__detail-item">
                  <span>Nationality</span>
                  <strong>Indian</strong>
                </div>

                <div className="stu-profile__detail-item">
                  <span>Email</span>
                  <strong>ananya.sharma@bfps.edu.in</strong>
                </div>

                <div className="stu-profile__detail-item">
                  <span>Mobile Number</span>
                  <strong>+91 98765 43210</strong>
                </div>

                <div className="stu-profile__detail-item stu-profile__detail-item--full">
                  <span>Address</span>
                  <strong>
                    45 Green Park, New Delhi,
                    Delhi - 110016
                  </strong>
                </div>

              </div>

            </div>
          </div>


          <div className="stu-profile__overview-card">

            <h3 className="stu-profile__card-title">
              Student Overview
            </h3>

            <div className="stu-profile__overview-grid">

              <div className="stu-profile__overview-item">
                <div className="stu-profile__overview-icon purple">
                  <BadgeCheck />
                </div>

                <div>
                  <span>Admission No.</span>
                  <strong>BFPS/2023/10234</strong>
                </div>
              </div>

              <div className="stu-profile__overview-item">
                <div className="stu-profile__overview-icon blue">
                  <BookOpen />
                </div>

                <div>
                  <span>Roll Number</span>
                  <strong>15</strong>
                </div>
              </div>

              <div className="stu-profile__overview-item">
                <div className="stu-profile__overview-icon green">
                  <GraduationCap />
                </div>

                <div>
                  <span>Class</span>
                  <strong>10</strong>
                </div>
              </div>

              <div className="stu-profile__overview-item">
                <div className="stu-profile__overview-icon amber">
                  <Users />
                </div>

                <div>
                  <span>Section</span>
                  <strong>A</strong>
                </div>
              </div>

              <div className="stu-profile__overview-item">
                <div className="stu-profile__overview-icon violet">
                  <Calendar />
                </div>

                <div>
                  <span>Academic Year</span>
                  <strong>2024 - 2025</strong>
                </div>
              </div>

              <div className="stu-profile__overview-item">
                <div className="stu-profile__overview-icon red">
                  <ShieldCheck />
                </div>

                <div>
                  <span>RTE Category</span>
                  <strong>No</strong>
                </div>
              </div>

            </div>

          </div>
        </div>

        <div className="stu-profile__cards-row">

          {/* PARENT */}
          <div className="stu-profile__info-card">

            <div className="stu-profile__info-card-header guardian">
              <Users className="icon blue" />
              Parent / Guardian Information
            </div>

            <div className="stu-profile__info-list">

              <div><span>Father's Name</span><strong>Rajesh Sharma</strong></div>
              <div><span>Mother's Name</span><strong>Priya Sharma</strong></div>
              <div><span>Father's Mobile</span><strong>+91 98123 45678</strong></div>
              <div><span>Mother's Mobile</span><strong>+91 98765 43211</strong></div>
              <div><span>Email</span><strong>rajesh.sharma@example.com</strong></div>
              <div><span>Address</span><strong>45 Green Park, New Delhi</strong></div>

            </div>

          </div>

          {/* ACADEMIC */}
          <div className="stu-profile__info-card">

            <div className="stu-profile__info-card-header academic">
              <GraduationCap className="icon green" />
              Academic Information
            </div>

            <div className="stu-profile__info-list">

              <div><span>Class</span><strong>10</strong></div>
              <div><span>Section</span><strong>A</strong></div>
              <div><span>Admission Date</span><strong>10 April 2023</strong></div>
              <div><span>Current Session</span><strong>2024 - 2025</strong></div>
              <div><span>Previous School</span><strong>Green Valley School</strong></div>

            </div>

          </div>

          {/* EMERGENCY */}
          <div className="stu-profile__info-card">

            <div className="stu-profile__info-card-header emergency">
              <Phone className="icon amber" />
              Emergency Contact
            </div>

            <div className="stu-profile__info-list">

              <div><span>Contact Person</span><strong>Rajesh Sharma</strong></div>
              <div><span>Relationship</span><strong>Father</strong></div>
              <div><span>Mobile Number</span><strong>+91 98123 45678</strong></div>
              <div><span>Alternate Number</span><strong>+91 99999 88888</strong></div>
              <div><span>Address</span><strong>45 Green Park, New Delhi</strong></div>

            </div>

          </div>

        </div>

      </main>
    </section >

  </>
}

export default StudentProfile