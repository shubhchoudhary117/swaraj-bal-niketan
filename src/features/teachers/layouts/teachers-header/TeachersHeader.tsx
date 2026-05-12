import React, { useState } from 'react';
import './TeachersHeader.scss';
import { Menu, Search, Bell, ChevronDown } from 'lucide-react';
import TeachersSidebar from '../teachers-sidebar/TeachersSidebar';

interface StudentHeaderProps {
  onMenuToggle?: () => void;
  notifCount?: number;
  userName?: string;
  userSub?: string;
  userAvatar?: string;
}

const TeachersHeader: React.FC<StudentHeaderProps> = ({
  onMenuToggle,
  notifCount = 3,
  userName = 'Ananya Sharma',
  userSub = 'B.Tech CSE – 2nd Year',
  userAvatar = 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=80&h=80&fit=crop&q=80',
}) => {
  const [query, setQuery] = useState('');
  const isMobile = window.matchMedia("(max-width:768px)").matches;

  return (
    <header className="tech-header">

      <div className="tech-header__left">
        {
          isMobile && <>
            <button
              className="tech-header__menu-btn"
              onClick={onMenuToggle}
              aria-label="Toggle sidebar">
              <Menu strokeWidth={1.8} />
            </button>
            <div className="tech-header__logo">
              <img src="/assets/comman/school-logo.png" alt="" className="tech-header__logo-img" />
            </div>
          </>
        }
      </div>


      {/* ================= RIGHT ================= */}
      <div className="tech-header__right">

        <button
          className="tech-header__notif"
          aria-label="Notifications"
        >
          <Bell strokeWidth={1.8} />

          {notifCount > 0 && (
            <span className="tech-header__notif-badge">
              {notifCount}
            </span>
          )}
        </button>

        <button
          className="tech-header__user"
          aria-label="User menu"
        >
          <img
            className="tech-header__avatar"
            src={userAvatar}
            alt={userName}
          />

          <div className="tech-header__user-info">
            <span className="tech-header__user-name">
              {userName}
            </span>

            <span className="tech-header__user-sub">
              {userSub}
            </span>
          </div>

          <span className="tech-header__chevron">
            <ChevronDown strokeWidth={2} />
          </span>
        </button>

      </div>
    </header>
  );
};

<TeachersSidebar />

export default TeachersHeader;