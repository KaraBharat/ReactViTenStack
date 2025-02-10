type LogType =
  | "INFO"
  | "ERROR"
  | "WARN"
  | "DEBUG"
  | "REQUEST"
  | "GET"
  | "POST"
  | "PUT"
  | "DELETE"
  | "PATCH"
  | "OPTIONS";

export const customLogger = (
  message: string,
  status: number,
  method: string,
  ...rest: string[]
) => {
  const timestamp = new Date().toISOString();

  const colorMap = {
    INFO: "\x1b[36m", // Cyan
    ERROR: "\x1b[31m", // Red
    WARN: "\x1b[33m", // Yellow
    DEBUG: "\x1b[32m", // Green
    REQUEST: "\x1b[35m", // Magenta
    GET: "\x1b[32m", // Green
    POST: "\x1b[34m", // Blue
    PUT: "\x1b[33m", // Yellow
    DELETE: "\x1b[31m", // Red
    PATCH: "\x1b[35m", // Magenta
    OPTIONS: "\x1b[36m", // Cyan
  };

  const getStatusEmoji = (status: number): string => {
    if (status < 200) return "🔵"; // Information
    if (status < 300) return "✅"; // Success
    if (status < 400) return "🔄"; // Redirect
    if (status < 500) return "⚠️"; // Client Error
    return "❌"; // Server Error
  };

  const methodColor = colorMap[method as LogType] || colorMap.INFO;
  const resetColor = "\x1b[0m";
  const separator = "│";
  const statusEmoji = getStatusEmoji(status);

  console.log(
    `${statusEmoji} ${methodColor} ==> [${timestamp}] [${method}] ${message}${resetColor}`,
    ...rest.map((item) => `\n${methodColor}${separator}${resetColor} → ${item}`)
  );
};
