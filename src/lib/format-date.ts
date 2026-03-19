export function formatDate(date: string) {
  const value = date.trim();

  // Only auto-format ISO-style dates. Free-form labels like "April 18" or
  // "TBA" should stay exactly as entered in the studio.
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return date;
  }

  const parsed = new Date(value);

  if (Number.isNaN(parsed.getTime())) {
    return date;
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  }).format(parsed);
}
