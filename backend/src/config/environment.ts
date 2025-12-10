import { tmpdir } from 'os';

export class Environment {
  public static isProduction(): boolean {
    return Environment.getEnv('NODE_ENV', 'development') === 'production';
  }

  public static getPort(): number {
    return Environment.getEnvNumber('PORT', 8000);
  }

  public static getDBUrl(): string {
    return Environment.getEnv('DB');
  }

  public static getAwsRegion(): string {
    return Environment.getEnv('AWS_REGION');
  }

  public static getAwsS3Bucket(): string {
    return Environment.getEnv('AWS_S3_BUCKET');
  }

  public static getFileUploadProvider(): string {
    return Environment.getEnv('FILE_UPLOAD_PROVIDER');
  }

  public static getUploadPath(): string {
    return Environment.getEnv('UPLOAD_PATH');
  }

  public static getTempUploadPath(): string {
    return Environment.getEnv('TEMP_UPLOAD_PATH', tmpdir());
  }

  public static getTokenSecret(): string {
    return Environment.getEnv('TOKEN_SECRET');
  }

  public static getFileBasePath(): string {
    return Environment.getEnv('FILE_BASE_PATH', 'oxy-center-log');
  }

  public static getTokenExpiresInSeconds(): number {
    return Environment.getEnvNumber('TOKEN_EXPIRES_IN_SECONDS', 28800);
  }

  public static getSiteBaseUrl(): string {
    return Environment.getEnv('SITE_BASE_URL');
  }

  public static getApiBaseUrl(): string {
    return Environment.getEnv('API_BASE_URL');
  }

  public static getMasterPassword(): string | null {
    return Environment.getOptionalEnv('MASTER_PASSWORD');
  }

  private static getEnv(
    name: string,
    defaultValue: string | null = null
  ): string {
    if (!process.env[name] && !defaultValue) {
      throw new Error(`Variável de ambiente ${name} não definida`);
    }
    return (process.env[name] ?? defaultValue)!;
  }

  private static getOptionalEnv(
    name: string,
    defaultValue: string | null = null
  ): string | null {
    return process.env[name] ?? defaultValue;
  }

  private static getEnvNumber(
    name: string,
    defaultValue: number | null = null
  ): number {
    return parseInt(
      Environment.getEnv(
        name,
        defaultValue !== null ? defaultValue.toString() : null
      )
    );
  }

  private static getEnvBoolean(
    name: string,
    defaultValue: boolean | null = null
  ): boolean {
    return (
      'true' ===
      Environment.getEnv(
        name,
        defaultValue !== null ? defaultValue.toString() : null
      )
    );
  }
}
