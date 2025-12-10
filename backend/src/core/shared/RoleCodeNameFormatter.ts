export function roleCodeNameFormatter(
  roleName: string,
  companyName?: string
): string {
  const formattedCompanyName = companyName
    ? companyName.toLowerCase().replaceAll(' ', '_')
    : '';
  const newRoleName = roleName.toLowerCase().includes(formattedCompanyName)
    ? roleName.toLowerCase().replaceAll(' ', '_')
    : `${roleName.toLowerCase().replaceAll(' ', '_')}${
        formattedCompanyName ? `_${formattedCompanyName}` : ''
      }`;

  return newRoleName;
}
