/**
 * Formatea la información de un log en una cadena legible.
 *
 * @param info - Objeto que contiene los datos del log, incluyendo `timestamp`, `level`, `message` y cualquier metadato adicional.
 * @returns Una cadena formateada que incluye la fecha y hora, el nivel del log en mayúsculas, el mensaje y, si existen, los metadatos serializados en JSON.
 *
 * Esta función es útil para estructurar la salida de logs de manera consistente y legible, facilitando su análisis y almacenamiento.
 */
export const logFormatter = (info: { timestamp: string; level: string; message: string; [key: string]: any }) => {
  const { timestamp, level, message, ...meta } = info;
  return `${timestamp} [${level.toUpperCase()}]: ${String(message)} ${
    Object.keys(meta).length ? JSON.stringify(meta) : ''
  }`;
};
