import { customTheme } from "../../../../theme";

const File = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="56"
      height="56"
      viewBox="0 0 56 56"
      fill="none"
    >
      <path
        d="M11.6667 51.3337H44.3334C45.6221 51.3337 46.6667 50.289 46.6667 49.0003V16.3337H35V4.66699H11.6667C10.378 4.66699 9.33337 5.71166 9.33337 7.00033V49.0003C9.33337 50.289 10.378 51.3337 11.6667 51.3337Z"
        stroke={customTheme.colors.brand[500]}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M35 4.66699L46.6667 16.3337"
        stroke={customTheme.colors.brand[500]}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.8334 33.833L26.8334 39.6663L37.3334 26.833"
        stroke={customTheme.colors.brand[500]}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default File;
