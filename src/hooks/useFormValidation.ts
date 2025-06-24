
export const useFormValidation = () => {
  const validateNumber = (value: string) => {
    return /^\d*$/.test(value);
  };

  const createNumberHandler = (setter: (value: string) => void) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (validateNumber(value)) {
        setter(value);
      }
    };
  };

  return {
    validateNumber,
    createNumberHandler,
  };
};
