export const generateRangeDate = (
  valueFrom: string | undefined,
  valueTo: string | undefined,
) => {
  if (!valueFrom || !valueTo) {
    return {
      initialDate: undefined,
      finalDate: undefined,
    };
  }

  const initialDate = new Date(valueFrom);
  const finalDate = new Date(valueTo);

  initialDate.setHours(0, 0, 0, 0);
  finalDate.setHours(23, 59, 59, 999);

  return {
    initialDate,
    finalDate,
  };
};
