import { Icon } from "@chakra-ui/react";

const FlagIcon = () => {
  return (
    <Icon fontSize={32} viewBox="0 0 32 32" color="brand.500">
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.33325 29.3333H7.99992H10.6666"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8 29.3334V2.66669"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M26.6667 4H8V14.6667H26.6667L24 9.33333L26.6667 4Z"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Icon>
  );
};

export default FlagIcon;
