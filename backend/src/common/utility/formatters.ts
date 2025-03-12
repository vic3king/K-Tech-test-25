export const formatCats = (cats: string[]): string => {
  if (!Array.isArray(cats)) return '';
  if (cats.length === 0) return '';
  if (cats.length === 1) return cats[0];
  if (cats.length === 2) return `${cats[0]} and ${cats[1]}`;
  return `${cats.slice(0, -1).join(', ')}, and ${cats[cats.length - 1]}`;
};

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
  }).format(price);
};
