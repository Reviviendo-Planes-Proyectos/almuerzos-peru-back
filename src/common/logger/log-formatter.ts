export const logFormatter = (info: { timestamp: string; level: string; message: string; [key: string]: any }) => {
  const { timestamp, level, message, ...meta } = info;
  return `${timestamp} [${level.toUpperCase()}]: ${String(message)} ${
    Object.keys(meta).length ? JSON.stringify(meta) : ''
  }`;
};
