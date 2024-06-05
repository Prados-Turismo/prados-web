/* eslint-disable @typescript-eslint/no-explicit-any */
export const numberFormat = (number: number) => {
  if (number === null) {
    return "-";
  } else {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(number);
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const dateFormat = (date: any) => {
  if (date.toString() === "Invalid Date") {
    return "-";
  } else {
    const offset = date?.getTimezoneOffset();
    const adjustedDate = new Date(date?.getTime() + offset * 60 * 1000);
    return new Intl.DateTimeFormat("pt-BR").format(adjustedDate);
  }
};

export const calculateTimeDifference = (dateTime: string): string => {
  const providedDate: any = new Date(dateTime);

  const timeDifferenceInMilliseconds: number =
    (new Date() as any) - providedDate;

  const timeDifferenceInSeconds: number = Math.floor(
    timeDifferenceInMilliseconds / 1000,
  );
  const timeDifferenceInMinutes: number = Math.floor(
    timeDifferenceInMilliseconds / (1000 * 60),
  );
  const timeDifferenceInHours: number = Math.floor(
    timeDifferenceInMilliseconds / (1000 * 60 * 60),
  );
  const timeDifferenceInDays: number = Math.floor(
    timeDifferenceInMilliseconds / (1000 * 60 * 60 * 24),
  );

  if (timeDifferenceInSeconds < 60) {
    return "Agora";
  } else if (timeDifferenceInMinutes === 1) {
    return "há 1 minuto";
  } else if (timeDifferenceInMinutes < 60) {
    return `há ${timeDifferenceInMinutes} minutos`;
  } else if (timeDifferenceInHours === 1) {
    return "há 1 hora";
  } else if (timeDifferenceInHours < 24) {
    return `há ${timeDifferenceInHours} horas`;
  } else if (timeDifferenceInDays === 1) {
    return "há 1 dia";
  } else {
    return `há ${timeDifferenceInDays} dias`;
  }
};

export const dateHourFormat = (date: Date) => {
  if (date.toString() === "Invalid Date") {
    return "-";
  } else {
    const currentDate = new Date();

    if (
      date.getDate() === currentDate.getDate() &&
      date.getMonth() === currentDate.getMonth()
    ) {
      const options = {
        hour: "numeric",
        minute: "numeric",
        timeZone: "America/Sao_Paulo",
      } as const;
      return new Intl.DateTimeFormat("pt-BR", options).format(date);
    } else {
      const options = {
        day: "numeric",
        month: "short",
        timeZone: "America/Sao_Paulo",
      } as const;
      return new Intl.DateTimeFormat("pt-BR", options)
        .format(date)
        .replace(" de", "")
        .replace(".", "");
    }
  }
};

export const shortTimeFormat = (date: Date) => {
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};

export const dateToIsoFormat = (dateString: string): string => {
  const [day, month, year] = dateString.split("/");
  const isoDateString = `${year}-${month}-${day}T00:00:00.000Z`;
  const isoDate = new Date(isoDateString);
  return isoDate.toISOString();
};

export const dateToIsoFormatAmerican = (dateString: string): string => {
  const [day, month, year] = dateString.split("/");
  return `${year}-${month}-${day}`;
};

export const timeFormat = (date: Date) => {
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
};

export const homeTextMask = (text: string) => {
  const preposicoes = [
    "de",
    "do",
    "da",
    "com",
    "para",
    "em",
    "por",
    "como",
    "sem",
    "sob",
    "sobre",
    "entre",
    "e",
  ];

  const palavras = text.split(" ");
  if (
    palavras.length > 3 ||
    (palavras.length === 3 &&
      (preposicoes.includes(palavras[0].toLowerCase()) ||
        preposicoes.includes(palavras[1].toLowerCase()) ||
        preposicoes.includes(palavras[2].toLowerCase())))
  ) {
    const resultado: string[] = [];
    palavras.slice(0, 3).forEach((palavra) => {
      resultado.push(palavra);
      if (preposicoes.includes(palavra.toLowerCase())) {
        return false;
      }
    });
    return resultado.join(" ") + "...";
  } else {
    return text;
  }
};
