import { createLogger, format, transports } from 'winston';

const { combine, timestamp, printf } = format;

const customFormat = printf(({ level, message, timestamp, context, stack }) => {
  let color = '\x1b[0m'; // Reset color
  if (level === 'error') {
    color = '\x1b[31m'; // Red color for errors
  } else if (level === 'warn') {
    color = '\x1b[33m'; // Yellow color for warnings
  } else if (level === 'info') {
    color = '\x1b[32m'; // Green color for info
  } else if (level === 'debug') {
    color = '\x1b[36m'; // Cyan color for debug
  }
  return `${color}${timestamp} [${level.toUpperCase()}] - [${context}] ${message} ${
    stack ? `\n${stack}` : ''
  }`;
});

export const createLogInstance = (DEVELOPMENT: boolean) => {
  const formatLog = DEVELOPMENT ? customFormat : format.json();

  const instance = createLogger({
    format: combine(timestamp(), formatLog),
    transports: [new transports.Console()],
  });

  return instance;
};
