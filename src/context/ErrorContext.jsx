import { createContext, useContext, useState } from "react";
import { ErrorModal } from "../components/ErrorModal";

const ErrorContext = createContext();

export function ErrorProvider({ children }) {
  const [error, setError] = useState(null);
  const showError = (message) => setError(message);
  const hideError = () => setError(null);

  return (
    <ErrorContext.Provider value={{ showError }}>
      {children}
      <ErrorModal visible={!!error} message={error} onClose={hideError} />
    </ErrorContext.Provider>
  );
}

export function useError() {
  return useContext(ErrorContext);
}