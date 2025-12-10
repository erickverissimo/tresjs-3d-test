export async function rawBody(req: any, res: any, next: any) {
  const contentType = (req.headers['content-type'] ?? '').toLowerCase();
  if (
    contentType === 'application/json' ||
    contentType.includes('multipart/form-data')
  ) {
    return next();
  }
  req.rawBody = '';
  req.on('data', (chunk) => {
    req.rawBody += chunk;
  });
  req.on('end', () => {
    console.log('...end');
    try {
      next();
    } catch (err) {
      console.log('Error parsing body');
      next();
    }
  });
}
