export function maskCPF(cpf: string): string {
  const cleanCPF = cpf.replace(/\D/g, '');

  if (cleanCPF.length <= 3) {
    return cleanCPF;
  } else if (cleanCPF.length <= 6) {
    return `${cleanCPF.slice(0, 3)}.${cleanCPF.slice(3)}`;
  } else if (cleanCPF.length <= 9) {
    return `${cleanCPF.slice(0, 3)}.***.${cleanCPF.slice(6)}`;
  } else {
    return `${cleanCPF.slice(0, 3)}.***.***-${cleanCPF.slice(9)}`;
  }
}
