import { useState, useContext } from "react";
import UserContext from "../Context/UserContext";

export const useForm = (initialValues) => {
  const [values, setValues] = useState(initialValues);
  const userContext = useContext(UserContext);

  return {
    values,
    handleChange: (e) => {
      userContext.setError(null);
      setValues({
        ...values,
        [e.target.name]: e.target.value
      });
    },
    reset: () => setValues(initialValues)
  };
};
