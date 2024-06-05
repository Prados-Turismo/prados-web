import { customTheme } from "../../../../theme"

const Padlock = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="56"
      height="56"
      viewBox="0 0 56 56"
      fill="none"
    >
      <path
        d="M45.4998 25.7222H10.4998C9.21117 25.7222 8.1665 26.7668 8.1665 28.0555V49.0555C8.1665 50.3442 9.21117 51.3888 10.4998 51.3888H45.4998C46.7885 51.3888 47.8332 50.3442 47.8332 49.0555V28.0555C47.8332 26.7668 46.7885 25.7222 45.4998 25.7222Z"
        stroke={customTheme.colors.brand[500]}
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path
        d="M16.3335 25.6665V16.3387C16.3274 10.3484 20.91 5.32821 26.9337 4.7262C32.9573 4.12419 38.462 8.13626 39.6668 14.0067"
        stroke={customTheme.colors.brand[500]}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M28 35V42"
        stroke={customTheme.colors.brand[500]}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default Padlock
