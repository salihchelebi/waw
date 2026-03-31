export function maskValue(value) {
  if (!value) return '***';
  if (value.length <= 4) return '*'.repeat(value.length);
  return `${value.slice(0, 2)}***${value.slice(-2)}`;
}

export function simplifyError(error, fallbackMessage) {
  console.error('[detayli-hata]', error);
  return fallbackMessage;
}
