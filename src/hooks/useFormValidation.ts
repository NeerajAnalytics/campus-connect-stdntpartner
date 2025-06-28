
export const useFormValidation = () => {
  const validateNumber = (value: string) => {
    return /^\d*$/.test(value);
  };

  const validateAlphabets = (value: string) => {
    return /^[a-zA-Z\s]*$/.test(value);
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string) => {
    return /^\d{10,15}$/.test(phone);
  };

  const createNumberHandler = (setter: (value: string) => void) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (validateNumber(value)) {
        setter(value);
      }
    };
  };

  const createAlphabetHandler = (setter: (value: string) => void) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (validateAlphabets(value)) {
        setter(value);
      }
    };
  };

  const validateRequired = (value: string, fieldName: string) => {
    if (!value || value.trim().length === 0) {
      return `${fieldName} is required`;
    }
    return null;
  };

  return {
    validateNumber,
    validateAlphabets,
    validateEmail,
    validatePhone,
    validateRequired,
    createNumberHandler,
    createAlphabetHandler,
  };
};
