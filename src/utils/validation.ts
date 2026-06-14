export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
  return password.length >= 6;
};

export const validateRingNumber = (ringNumber: string): boolean => {
  return ringNumber.trim().length > 0;
};

export const validateSpecies = (species: string): boolean => {
  return species.trim().length > 0;
};

export const validateDateTime = (dateTime: string): boolean => {
  return new Date(dateTime).getTime() > 0;
};

export const validatePhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^[\d\s\-\+\(\)]+$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
};
