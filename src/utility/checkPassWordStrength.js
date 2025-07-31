// src/utility/checkPassWordStrength.js
export default function checkPasswordStrength(password) {
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[^A-Za-z0-9]/.test(password);
  const isLongEnough = password.length >= 8;

  if (!isLongEnough) return "Weak";
  if (hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar)
    return "Strong";
  if (hasUpperCase || hasLowerCase || hasNumber) return "Moderate";
  return "Weak";
}
