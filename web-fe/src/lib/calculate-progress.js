export const calculateProgress = (
  status,
  quantity_available,
  quantity_required,
) => {
  return quantity_available && status !== "pending"
    ? (quantity_available * 100) / quantity_required
    : 100;
};
