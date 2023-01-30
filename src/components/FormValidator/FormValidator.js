import { useState, useCallback } from "react";

export function FormValidator() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const id = target.name;
    const value = target.value;
    setValues({ ...values, [name]: value });
    if (target.validationMessage) {
      setErrors({ ...errors, [id]: "Что-то пошло не так..." });
    } else {
      setErrors({ ...errors, [id]: "" });
    }
    setIsFormValid(target.closest("form").checkValidity());
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsFormValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsFormValid(newIsFormValid);
    },
    [setValues, setErrors, setIsFormValid]
  );

  return { values, handleChange, errors, isFormValid, resetForm };
}
