import * as migration_20260222_add_shops_products from './20260222_add_shops_products';

export const migrations = [
  {
    up: migration_20260222_add_shops_products.up,
    down: migration_20260222_add_shops_products.down,
    name: '20260222_add_shops_products'
  },
];
