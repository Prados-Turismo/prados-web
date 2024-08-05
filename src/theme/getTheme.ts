const getTheme = (domain: string) => {
  const theme = {
    default: {
      content: {
        project: "Fiibo",
        d4signSafe: "fiibo",
        phoneNumber: "",
        hubSlug: "padrao",
      },
      images: {
        favicon: "/images/fiibo/favicon.png",
        logo: "/images/logoprados120.png",
        logoLogin: "/images/logoprados120.png",
        iara: "/images/fiibo/avatar-iara.svg",
        iaraWelcome: "/images/fiibo/iara-welcome-fiibo.png",
        iaraPreuser: "/images/fiibo/iara-userpre-fiibo.png",
        bgRegister: "/images/bg-register-fiibo.png",
        iaraProduct: "/images/fiibo/iaraProductFiibo.png",
      },
      colors: {
        sideBarButton: {
          "50": "#FDE8EB",
        },

        brand: {
          "50": "#FDE8EB",
          "100": "#F9BEC8",
          "200": "#F494A5",
          "300": "#F06A82",
          "400": "#EC415F",
          "500": "#e92043",
          "600": "#8B0E24",
          "700": "#7e0e21",
          "800": "#5D0918",
          "900": "#2E050C",
        },
        brandSecond: {
          "50": "#ffffff",
          "100": "#F9BEC8",
          "500": "#e92043",
        },
        text: {
          first: "#333333",
          second: "#505050",
          third: "#707070",
          fourth: "#909090",
        },
        contrast: "#fefefe",
      },
    },
    xp: {
      content: {
        project: "XP",
        d4signSafe: "xp",
        phoneNumber: "",
        hubSlug: "xp-saude",
      },
      images: {
        favicon: "/images/xp/favicon.ico",
        logo: "/images/logos/logoxp.png",
        logoLogin: "/images/logos/logoxp.png",
        iara: "/images/xp/avatar-iara.png",
        iaraWelcome: "/images/xp/iara-welcome-xp.png",
        iaraPreuser: "/images/xp/iara-userpre-xp.png",
        bgRegister: "/images/bg-register-xp.png",
        iaraProduct: "/images/xp/iaraProductXP.png",
      },
      colors: {
        sideBarButton: {
          "50": "#FFF9E6",
        },

        brand: {
          "50": "#FFF9E6",
          "100": "#FEEEB9",
          "200": "#FDE28C",
          "300": "#FCD75E",
          "400": "#FCCC31",
          "500": "#FBC105",
          "600": "#C99A03",
          "700": "#977402",
          "800": "#644D02",
          "900": "#322701",
        },
        brandSecond: {
          "50": "#FFF9E6",
          "100": "#FEEEB9",
          "500": "#FBC105",
        },
        text: {
          first: "#333333",
          second: "#505050",
          third: "#707070",
          fourth: "#909090",
        },
        contrast: "#1F1F1F",
      },
    },
    doctorclin: {
      content: {
        project: "Doctor Clin",
        d4signSafe: "fiibo",
        phoneNumber: "",
        hubSlug: "doctor-clin",
      },
      images: {
        favicon: "/images/doctorclin/favicon.png",
        logo: "/images/logos/doctorclin.png",
        logoLogin: "/images/logos/doctorclin.png",
        iara: "/images/doctorclin/avatar-iara.svg",
        iaraWelcome: "/images/doctorclin/iara-welcome-fiibo.png",
        iaraPreuser: "/images/doctorclin/iara-userpre-fiibo.png",
        bgRegister: "/images/bg-register-doctorclin.png",
        iaraProduct: "/images/doctorclin/iaraProductFiibo.png",
      },
      colors: {
        sideBarButton: {
          "50": "#F0FFF4",
        },

        brand: {
          "50": "#F0FFF4",
          "100": "#C6F6D5",
          "200": "#9AE6B4",
          "300": "#68D391",
          "400": "#48BB78",
          "500": "#009844",
          "600": "#009844",
          "700": "#276749",
          "800": "#22543D",
          "900": "#1C4532",
        },
        brandSecond: {
          "50": "#ffffff",
          "100": "#C6F6D5",
          "500": "#009844",
        },
        text: {
          first: "#333333",
          second: "#505050",
          third: "#707070",
          fourth: "#909090",
        },
        contrast: "#fefefe",
      },
    },
    qipu: {
      content: {
        project: "QIPU",
        d4signSafe: "fiibo",
        phoneNumber: "",
        hubSlug: "qipu",
      },
      images: {
        favicon: "/images/qipu/favicon.png",
        logo: "/images/logos/qipu.png",
        logoLogin: "/images/logos/qipu.png",
        iara: "/images/qipu/avatar-iara.svg",
        iaraWelcome: "/images/qipu/iara-welcome-fiibo.png",
        iaraPreuser: "/images/qipu/iara-userpre-fiibo.png",
        bgRegister: "/images/bg-register-qipu.png",
        iaraProduct: "/images/qipu/iaraProductFiibo.png",
      },
      colors: {
        sideBarButton: {
          "50": "#ebeefd",
        },

        brand: {
          "50": "#ebeefd",
          "100": "#d7ddfc",
          "200": "#afbbfa",
          "300": "#889af7",
          "400": "#6078f5",
          "500": "#3957F3",
          "600": "#334eda",
          "700": "#2d45c2",
          "800": "#273caa",
          "900": "#223491",
        },
        brandSecond: {
          "50": "#ffffff",
          "100": "#d7ddfc",
          "500": "#3957F3",
        },
        text: {
          first: "#333333",
          second: "#505050",
          third: "#707070",
          fourth: "#909090",
        },
        contrast: "#fefefe",
      },
    },
    fiec: {
      content: {
        project: "FIEC",
        d4signSafe: "fiibo",
        phoneNumber: "",
        hubSlug: "fiec",
      },
      images: {
        favicon: "/images/fiec/favicon.png",
        logo: "/images/logos/fiec.png",
        logoLogin: "/images/logos/fiec.png",
        iara: "/images/fiec/avatar-iara.svg",
        iaraWelcome: "/images/fiec/iara-welcome-fiibo.png",
        iaraPreuser: "/images/fiec/iara-userpre-fiibo.png",
        bgRegister: "/images/bg-register-fiec.png",
        iaraProduct: "/images/fiec/iaraProductFiibo.png",
      },
      colors: {
        sideBarButton: {
          "50": "#e5eef5",
        },

        brand: {
          "50": "#e5eef5",
          "100": "#669dc8",
          "200": "#4c8cbf",
          "300": "#327cb6",
          "400": "#196cad",
          "500": "#005ca4",
          "600": "#005293",
          "700": "#004983",
          "800": "#004072",
          "900": "#003762",
        },
        brandSecond: {
          "50": "#ffffff",
          "100": "#d7ddfc",
          "500": "#005ca4",
        },
        text: {
          first: "#333333",
          second: "#505050",
          third: "#707070",
          fourth: "#909090",
        },
        contrast: "#fefefe",
      },
    },
  };

  const palette =
    Object.entries(theme).find((theme) => domain.includes(theme[0]))?.[1] ||
    null;

  return palette || theme["default"];
};

export default getTheme;
