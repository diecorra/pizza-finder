export function dateFormat(created: Date) {
  const date = new Date(created).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return date;
}
