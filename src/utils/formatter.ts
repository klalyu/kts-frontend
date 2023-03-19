export const stringToDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-us", { dateStyle: "medium" }).format(
      date
    );
  } catch (e) {
    return "";
  }
};

export const pluralizeWord = (
  word: string,
  count: number,
  suffix = "s"
): string => {
  return `${count === 1 ? word : word + suffix}`;
};

export const urlHostWithPath = (url: string): string => {
  try {
    const urlObj = new URL(url);
    return `${urlObj.hostname}${urlObj.pathname}`;
  } catch (error) {
    return "";
  }
};
