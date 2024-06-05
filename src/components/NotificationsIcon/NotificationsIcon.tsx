import { Icon } from "@chakra-ui/react";

interface INotificationsIcon {
  category: string;
  size?: number;
}

const NotificationsIcon = ({ category, size = 22 }: INotificationsIcon) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const icons: any = {
    product: (
      <>
        <path
          d="M14.5832 5H5.4165C4.72615 5 4.1665 5.55964 4.1665 6.25V16.25C4.1665 16.9404 4.72615 17.5 5.4165 17.5H14.5832C15.2735 17.5 15.8332 16.9404 15.8332 16.25V6.25C15.8332 5.55964 15.2735 5 14.5832 5Z"
          stroke="white"
          fill="none"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M12.5 7.50001V4.16667C12.5 2.78596 11.3807 1.66667 10 1.66667C8.61929 1.66667 7.5 2.78596 7.5 4.16667V7.50001"
          stroke="white"
          fill="none"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ),
    finance: (
      <>
        <path
          d="M10 1.75V18.25"
          stroke="white"
          fill="none"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14.125 3.25C14.125 3.25 10.364 3.25 8.5 3.25C6.63602 3.25 5.125 4.76102 5.125 6.625C5.125 8.48898 6.63602 10 8.5 10"
          stroke="white"
          fill="none"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M5.875 16.75C5.875 16.75 9.63602 16.75 11.5 16.75C13.364 16.75 14.875 15.239 14.875 13.375C14.875 11.511 13.364 10 11.5 10H8.5"
          stroke="white"
          fill="none"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ),
    support: (
      <>
        <path
          d="M14.5 13C16.1569 13 17.5 11.6569 17.5 10C17.5 8.34314 16.1569 7 14.5 7"
          fill="none"
          stroke="white"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M5.5 7C3.84314 7 2.5 8.34314 2.5 10C2.5 11.6569 3.84314 13 5.5 13"
          fill="none"
          stroke="white"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M5.5 13V12.8125V11.875V10V7C5.5 4.51472 7.51473 2.5 10 2.5C12.4853 2.5 14.5 4.51472 14.5 7V13C14.5 15.4853 12.4853 17.5 10 17.5"
          stroke="white"
          fill="none"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ),
    contract: (
      <>
        <path
          d="M16.6668 9.58332V5.83332L12.9168 1.66666H4.16683C3.70659 1.66666 3.3335 2.03975 3.3335 2.49999V17.5C3.3335 17.9602 3.70659 18.3333 4.16683 18.3333H8.3335"
          stroke="white"
          fill="none"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14.1667 15C15.0871 15 15.8333 14.2538 15.8333 13.3333C15.8333 12.4128 15.0871 11.6667 14.1667 11.6667C13.2462 11.6667 12.5 12.4128 12.5 13.3333C12.5 14.2538 13.2462 15 14.1667 15Z"
          stroke="white"
          fill="none"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M17.5002 18.3333C17.5002 16.4924 16.0078 15 14.1668 15C12.3259 15 10.8335 16.4924 10.8335 18.3333"
          stroke="white"
          fill="none"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12.5 1.66666V5.83332H16.6667"
          stroke="white"
          fill="none"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ),
    collaborator: (
      <>
        <path
          d="M5.83333 14.1667C6.98393 14.1667 7.91667 13.2339 7.91667 12.0833C7.91667 10.9327 6.98393 10 5.83333 10C4.68274 10 3.75 10.9327 3.75 12.0833C3.75 13.2339 4.68274 14.1667 5.83333 14.1667Z"
          stroke="white"
          fill="none"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14.1668 14.1667C15.3174 14.1667 16.2502 13.2339 16.2502 12.0833C16.2502 10.9327 15.3174 10 14.1668 10C13.0162 10 12.0835 10.9327 12.0835 12.0833C12.0835 13.2339 13.0162 14.1667 14.1668 14.1667Z"
          stroke="white"
          fill="none"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.99984 5.83332C11.1504 5.83332 12.0832 4.90058 12.0832 3.74999C12.0832 2.5994 11.1504 1.66666 9.99984 1.66666C8.84924 1.66666 7.9165 2.5994 7.9165 3.74999C7.9165 4.90058 8.84924 5.83332 9.99984 5.83332Z"
          stroke="white"
          fill="none"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.99984 18.3333C9.99984 16.0322 8.13434 14.1667 5.83317 14.1667C3.53198 14.1667 1.6665 16.0322 1.6665 18.3333"
          stroke="white"
          fill="none"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M18.3333 18.3333C18.3333 16.0322 16.4678 14.1667 14.1667 14.1667C11.8655 14.1667 10 16.0322 10 18.3333"
          stroke="white"
          fill="none"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14.1668 10C14.1668 7.69884 12.3013 5.83334 10.0002 5.83334C7.699 5.83334 5.8335 7.69884 5.8335 10"
          stroke="white"
          fill="none"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ),
    partnerCompany: (
      <>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.99984 3.33334L18.3332 8.75001V18.3333H1.6665V8.75001L9.99984 3.33334Z"
          stroke="white"
          fill="none"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8.33333 18.3333V9.58334L5 11.6667V18.3333"
          stroke="white"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M11.6665 18.3333V9.58334L14.9998 11.6667V18.3333"
          stroke="white"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M17.0835 18.3333H3.3335"
          stroke="white"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ),
    adherence: (
      <>
        <path
          d="M14.5832 5H5.4165C4.72615 5 4.1665 5.55964 4.1665 6.25V16.25C4.1665 16.9404 4.72615 17.5 5.4165 17.5H14.5832C15.2735 17.5 15.8332 16.9404 15.8332 16.25V6.25C15.8332 5.55964 15.2735 5 14.5832 5Z"
          stroke="white"
          fill="none"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M12.5 7.50001V4.16667C12.5 2.78596 11.3807 1.66667 10 1.66667C8.61929 1.66667 7.5 2.78596 7.5 4.16667V7.50001"
          stroke="white"
          fill="none"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ),
    linkedCompany: (
      <>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.99984 3.33334L18.3332 8.75001V18.3333H1.6665V8.75001L9.99984 3.33334Z"
          stroke="white"
          fill="none"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8.33333 18.3333V9.58334L5 11.6667V18.3333"
          stroke="white"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M11.6665 18.3333V9.58334L14.9998 11.6667V18.3333"
          stroke="white"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M17.0835 18.3333H3.3335"
          stroke="white"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ),
  };
  return (
    <Icon fontSize={size} viewBox="0 0 19 21" color="currentColor">
      {icons[category]}
    </Icon>
  );
};

export default NotificationsIcon;
