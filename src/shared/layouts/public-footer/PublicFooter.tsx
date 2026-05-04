import React from "react";
import "./PublicFooter.scss";

import footerLogo from "./images/footer-logo.png"

const PublicFooter = () => {
    const quickLinks = [
  "Home", "About Us", "Academics", "Courses", "Gallery", "Achievements", "Contact Us"
];
 
const timing = [
  { day: "Mon – Fri", hours: "8:00 AM – 3:30 PM", open: true },
  { day: "Saturday",  hours: "9:00 AM – 1:00 PM",  open: true },
  { day: "Sunday",    hours: "Closed",              open: false },
];

  return (
    <footer className="sps-footer">
        <div className="sps-footer__topbar" />
 
        <div className="sps-footer__inner">
          <div className="sps-footer__grid">
 
            <div>
              <div className="sps-footer__logo-wrap">
                <img src={footerLogo} className="sps-footer__logo-icon"/>
                <div className="sps-footer__logo-text-wrap">
                  <div className="sps-footer__logo-name">SWARAJ BAL<br/>NIKETAN SCHOOL</div>
                  <div className="sps-footer__logo-tagline">Learn · Grow · Succeed</div>
                </div>
              </div>
 
              <p className="sps-footer__desc">
                Providing quality education since 1999. We nurture young minds in a safe, 
                inclusive environment where every child is encouraged to learn, grow, and 
                achieve their full potential.
              </p>
 
              <div className="sps-footer__socials">
                {/* Facebook */}
                <a href="#" className="sps-footer__social-link" aria-label="Facebook">
                  <svg viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                </a>
                {/* Instagram */}
                <a href="#" className="sps-footer__social-link" aria-label="Instagram">
                  <svg viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" style={{fill:'#0f1b3c'}}/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" style={{stroke:'#0f1b3c',strokeWidth:2}}/></svg>
                </a>
                {/* YouTube */}
                <a href="#" className="sps-footer__social-link" aria-label="YouTube">
                  <svg viewBox="0 0 24 24"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" style={{fill:'#0f1b3c'}}/></svg>
                </a>
                {/* WhatsApp */}
                <a href="#" className="sps-footer__social-link" aria-label="WhatsApp">
                  <svg viewBox="0 0 24 24"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                </a>
              </div>
            </div>
 
            {/* ── COL 2 · QUICK LINKS ── */}
            <div>
              <h4 className="sps-footer__col-title">Quick Links</h4>
              <ul className="sps-footer__links">
                {quickLinks.map(link => (
                  <li key={link}><a href="#">{link}</a></li>
                ))}
              </ul>
            </div>
 
            {/* ── COL 3 · CONTACT ── */}
            <div>
              <h4 className="sps-footer__col-title">Contact Us</h4>
              <ul className="sps-footer__contact-list">
                <li className="sps-footer__contact-item">
                  <div className="sps-footer__contact-icon">
                    <svg viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3" style={{fill:'#0f1b3c'}}/></svg>
                  </div>
                  <div className="sps-footer__contact-text">
                    <strong>Address</strong>
                    123 School Road, Sector 12<br/>New Delhi, India – 110001
                  </div>
                </li>
                <li className="sps-footer__contact-item">
                  <div className="sps-footer__contact-icon">
                    <svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.5a16 16 0 0 0 5.55 5.55l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z"/></svg>
                  </div>
                  <div className="sps-footer__contact-text">
                    <strong>Phone</strong>
                    +91 98765 43210<br/>+91 11 2345 6789
                  </div>
                </li>
                <li className="sps-footer__contact-item">
                  <div className="sps-footer__contact-icon">
                    <svg viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6" style={{fill:'none',stroke:'#0f1b3c',strokeWidth:2}}/></svg>
                  </div>
                  <div className="sps-footer__contact-text">
                    <strong>Email</strong>
                    info@swaraj.edu.in
                  </div>
                </li>
              </ul>
            </div>
 
            {/* ── COL 4 · TIMING ── */}
            <div>
              <h4 className="sps-footer__col-title">School Hours</h4>
              <div className="sps-footer__timing">
                {timing.map(({ day, hours, open }) => (
                  <div className="sps-footer__timing-row" key={day}>
                    <div>
                      <div className="sps-footer__timing-day">{day}</div>
                      {open && <div className="sps-footer__timing-hours">{hours}</div>}
                    </div>
                    <span className={`sps-footer__timing-badge ${open ? "sps-footer__timing-badge--open" : "sps-footer__timing-badge--closed"}`}>
                      {open ? "Open" : "Closed"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
 
          </div>
 
          <div className="sps-footer__divider" />
 
          <div className="sps-footer__bottom">
            <p className="sps-footer__copyright">
              © 2024 <span>Swaraj Bal Niketan  School</span>. All Rights Reserved.
            </p>
            <div className="sps-footer__bottom-links">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Use</a>
              <a href="#">Sitemap</a>
            </div>
          </div>
        </div>
      </footer>
  );
};

export default PublicFooter;