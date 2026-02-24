import * as migration_20260222_add_shops_products from './20260222_add_shops_products';
import * as migration_20260223_add_shops_image_url from './20260223_add_shops_image_url';
import * as migration_20260224_231109 from './20260224_231109';
import * as migration_20260224_lookbooks_beauty_orders from './20260224_lookbooks_beauty_orders';

export const migrations = [
  {
    up: migration_20260222_add_shops_products.up,
    down: migration_20260222_add_shops_products.down,
    name: '20260222_add_shops_products',
  },
  {
    up: migration_20260223_add_shops_image_url.up,
    down: migration_20260223_add_shops_image_url.down,
    name: '20260223_add_shops_image_url',
  },
  {
    up: migration_20260224_231109.up,
    down: migration_20260224_231109.down,
    name: '20260224_231109',
  },
  {
    up: migration_20260224_lookbooks_beauty_orders.up,
    down: migration_20260224_lookbooks_beauty_orders.down,
    name: '20260224_lookbooks_beauty_orders'
  },
];
