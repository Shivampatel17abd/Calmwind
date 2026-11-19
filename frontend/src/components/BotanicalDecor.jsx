export function SproutLogo({ className = "w-6 h-6", color = "#355b44" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M12 21V12"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M12 12C12 7.5 8 5 4 6C4 10.5 7.5 12 12 12Z"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={color}
        fillOpacity="0.15"
      />
      <path
        d="M12 10C12.5 6.5 16 4.5 20 5C20 9 17 11 12 11.5"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={color}
        fillOpacity="0.1"
      />
    </svg>
  );
}

export function FernSprig({ className = "w-16 h-16", color = "#62866b" }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M8 40C16 34 26 22 36 8"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M17 31C13 30 11 27 12 24C16 26 19 28 20 31"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 27C25 25 28 26 29 29C25 30 22 29 21 27"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M25 21C21 20 19 17 21 15C24 17 27 19 27 21"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M29 17C33 15 36 17 36 19C33 20 30 19 29 17"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M33 11C31 9 32 7 34 7C36 9 36 11 35 12"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function EmptyJournalArt({ className = "w-40 h-40" }) {
  return (
    <svg
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Soft landscape hill */}
      <ellipse cx="80" cy="120" rx="70" ry="30" fill="#eef2ea" />
      <ellipse cx="50" cy="124" rx="45" ry="22" fill="#e2ebdc" />
      <ellipse cx="110" cy="126" rx="40" ry="20" fill="#d8e5d1" />

      {/* Notebook outline */}
      <rect
        x="55"
        y="45"
        width="50"
        height="65"
        rx="6"
        fill="#fffefa"
        stroke="#cadcbd"
        strokeWidth="1.5"
      />
      <line
        x1="65"
        y1="60"
        x2="95"
        y2="60"
        stroke="#dfe4d9"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <line
        x1="65"
        y1="70"
        x2="95"
        y2="70"
        stroke="#dfe4d9"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <line
        x1="65"
        y1="80"
        x2="85"
        y2="80"
        stroke="#dfe4d9"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Delicate sprout emerging from book */}
      <path
        d="M80 45V30"
        stroke="#355b44"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M80 34C75 32 72 26 75 22C80 25 80 32 80 34Z"
        fill="#cadcbd"
        stroke="#355b44"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path
        d="M80 31C85 29 88 23 85 19C80 22 80 29 80 31Z"
        fill="#8bb99a"
        stroke="#355b44"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />

      {/* Floating stars/peace sparkles */}
      <circle cx="40" cy="40" r="2" fill="#cadcbd" />
      <circle cx="120" cy="48" r="1.5" fill="#cadcbd" />
      <circle cx="105" cy="25" r="2.5" fill="#8bb99a" />
    </svg>
  );
}
