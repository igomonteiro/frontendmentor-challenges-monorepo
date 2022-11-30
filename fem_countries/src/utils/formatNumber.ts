export default function formatNumber(number: number, maximumSignificantDigits = 3, locale = 'en-US') {
  return Intl.NumberFormat(locale, { maximumSignificantDigits }).format(number);
}
