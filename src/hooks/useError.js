import { useState } from "react";

export const useError = () => {
  const [error, setError] = useState(null);
  return { error: error, setError: setError };
};
