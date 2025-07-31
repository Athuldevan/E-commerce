// src/hooks/usePasswordStrength.js
import { useState } from "react";

export default function usePasswordStrength() {
  const [strength, setStrength] = useState("");

  const checkStrength = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[^A-Za-z0-9]/.test(password);
    const isLongEnough = password.length >= 8;

    let result = "";
    if (!isLongEnough) result = "Too short";
    else if (hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar)
      result = "Strong";
    else if ((hasUpperCase || hasLowerCase) && hasNumber)
      result = "Moderate";
    else result = "Weak";

    setStrength(result);
  };

  return { strength, checkStrength };
}
