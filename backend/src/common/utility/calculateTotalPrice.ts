import { POUCH_SIZE_PRICES } from '@common/constants';
import { Cat } from '@modules/users';

export function calculateTotalPrice(cats: Cat[]): number {
  return cats
    .filter((cat) => cat.subscriptionActive)
    .reduce((total, cat) => total + POUCH_SIZE_PRICES[cat.pouchSize], 0);
}
