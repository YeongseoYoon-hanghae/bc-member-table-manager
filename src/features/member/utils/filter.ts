export const generateFilters = <T, K extends keyof T>(
  data: T[],
  dataIndex: K
) => {
  const uniqueValues = Array.from(new Set(data.map((item) => item[dataIndex])));
  return uniqueValues.map((value) => ({
    text: String(value),
    value: String(value),
  }));
};
