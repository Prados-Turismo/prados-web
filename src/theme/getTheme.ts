const getTheme = (domain: string) => {
  const theme = {
    default: {
      content: {
        project: "PradosTurismo",
        d4signSafe: "Prados",
        phoneNumber: "",
        hubSlug: "padrao",
      },
      images: {
        favicon: "/images/prados/logoprados16x16.png",
        logo: "/images/prados/logopradosg.png",
        logoLogin: "/images/prados/logo_laranja.png",
        iara: "/images/fiibo/avatar-iara.svg",
        iaraWelcome: "/images/fiibo/iara-welcome-fiibo.png",
        iaraPreuser: "/images/fiibo/iara-userpre-fiibo.png",
        bgRegister: "/images/bg-register-fiibo.png",
        iaraProduct: "/images/fiibo/iaraProductFiibo.png",
      },
      colors: {
        sideBarButton: {
          "50": "#dd7f11",
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
    }
  };

  const palette =
    Object.entries(theme).find((theme) => domain.includes(theme[0]))?.[1] ||
    null;

  return palette || theme["default"];
};

export default getTheme;
