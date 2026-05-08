import React, { useState } from 'react';
import './StudentHeader.scss';
import { Menu, Search, Bell, ChevronDown } from 'lucide-react';
import StudentSidebar from '../student-sidebar/StudentSidebar';

interface StudentHeaderProps {
  onMenuToggle?: () => void;
  notifCount?: number;
  userName?: string;
  userSub?: string;
  userAvatar?: string;
}

const StudentHeader: React.FC<StudentHeaderProps> = ({
  onMenuToggle,
  notifCount = 3,
  userName = 'Ananya Sharma',
  userSub = 'B.Tech CSE – 2nd Year',
  userAvatar = 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=80&h=80&fit=crop&q=80',
}) => {
  const [query, setQuery] = useState('');

  return (
    <header className="stu-header">
      <div className="stu-header__left">
        <button
          className="stu-header__menu-btn"
          onClick={onMenuToggle}
          aria-label="Toggle sidebar">
          <Menu strokeWidth={1.8} />
        </button>
        <div className="stu-header__logo">
          <img src="/assets/comman/school-logo.png" alt="" className="stu-header__logo-img" />
        </div>
      </div>

      {/* ================= RIGHT ================= */}
      <div className="stu-header__right">

        <button
          className="stu-header__notif"
          aria-label="Notifications"
        >
          <Bell strokeWidth={1.8} />

          {notifCount > 0 && (
            <span className="stu-header__notif-badge">
              {notifCount}
            </span>
          )}
        </button>

        <button
          className="stu-header__user"
          aria-label="User menu"
        >
          <img
            className="stu-header__avatar"
            src={userAvatar}
            alt={userName}
          />

          <div className="stu-header__user-info">
            <span className="stu-header__user-name">
              {userName}
            </span>

            <span className="stu-header__user-sub">
              {userSub}
            </span>
          </div>

          <span className="stu-header__chevron">
            <ChevronDown strokeWidth={2} />
          </span>
        </button>

      </div>
    </header>
  );
};

<StudentSidebar/>

export default StudentHeader;