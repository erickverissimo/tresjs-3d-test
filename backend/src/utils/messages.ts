export function getFormatedMessage(message: string, ...params: any): string {
  let messageResult: string = message;
  for (const paramIndex in params) {
    messageResult = messageResult.replace(
      `{${paramIndex}}`,
      params[paramIndex]
    );
  }

  return messageResult;
}
