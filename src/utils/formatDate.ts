const DATE_FORMATTER = new Intl.DateTimeFormat('en-us', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

export const formatDate = (date: string | Date) => {
  return DATE_FORMATTER.format(new Date(date));
};
