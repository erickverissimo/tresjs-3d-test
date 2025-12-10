export function validatePhoneNumber(phoneNumber: string): boolean {
  if (!phoneNumber) return false;

  phoneNumber = phoneNumber.replace(/[^\d]+/g, "");
  if (phoneNumber.length < 10 || phoneNumber.length > 11) {
    return false;
  }

  return true;
}
