export function capitalize(text = "") {
  let newText = "";
  if (text) {
    const lowerList = ["de", "da", "das", "do", "dos", "em", "e", "(a)", "(o)"];
    const words = text.split(" ");
    const newWords: string[] = [];
    words.forEach((w) => {
      const letters = w?.toLocaleLowerCase().split("");
      if (w.includes(".") && !lowerList.includes(w.toLowerCase())) {
        const abbreviation = w
          .split(".")
          .map((abbr) => abbr.charAt(0).toUpperCase() + abbr.slice(1))
          .join(".");
        newWords.push(abbreviation);
      } else if (lowerList.includes(w?.toLowerCase())) {
        newWords.push(w?.toLowerCase());
      } else {
        letters[0] = letters[0]?.toLocaleUpperCase();
        newWords.push(letters.join(""));
      }
    });
    newText = newWords.join(" ");
  }
  return newText;
}
