function formattingDate(date?: string) {
  if (!date) return "";
  const instantiatingDate = new Date(date as string);
  instantiatingDate.setHours(instantiatingDate.getHours() + 3);

  return instantiatingDate.toLocaleDateString("pt-br");
}

function calculateDate150YearsAgo(currentDate: Date) {
  const currentYear = currentDate.getFullYear();
  const pastYear = currentYear - 150;
  const pastDate = new Date(
    pastYear,
    currentDate.getMonth(),
    currentDate.getDate(),
  );
  return pastDate;
}

function isDateLessThan150YearsAgo(date: Date) {
  const currentDate = new Date();
  const date150YearsAgo = calculateDate150YearsAgo(currentDate);
  return date < date150YearsAgo;
}

export { formattingDate, isDateLessThan150YearsAgo };
