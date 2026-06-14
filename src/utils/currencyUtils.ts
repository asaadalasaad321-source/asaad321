export const formatCurrency = (amount: number, currency: string = 'SAR'): string => {
  return new Intl.NumberFormat('ar-SA', {
    style: 'currency',
    currency: currency,
  }).format(amount);
};

export const parseStringToNumber = (value: string): number => {
  return parseFloat(value.replace(/[^0-9.-]+/g, '')) || 0;
};

export const calculateTotal = (quantity: number, unitPrice: number): number => {
  return Number((quantity * unitPrice).toFixed(2));
};
