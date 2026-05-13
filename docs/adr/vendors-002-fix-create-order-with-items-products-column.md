# ADR-002: Fix `create_order_with_items` schema drift (`orders.products`, `order_items.price`)

**Date**: 2026-05-12  
**Status**: accepted  

## Context

The uTap app calls `create_order_with_items` to place Ushop orders. Users saw: `column "products" of relation "orders" does not exist`. `information_schema.columns` on `public.orders` confirmed there is no `products` column (line items live in `order_items`).

A follow-up error was `column "price" of relation "order_items" does not exist`. The live `public.order_items` table has `unit_price` and `total_price` (and no `price` column), but the same RPC inserted into `order_items(..., price)`.

## Decision

Remove `products` and its placeholder value from the `INSERT INTO public.orders` list inside `create_order_with_items`. Remove `price` from the `INSERT INTO public.order_items` list (and the duplicate `v_unit` value that was only there to populate `price`).

Ship fixes as migrations `20260513180000_fix_create_order_with_items_orders_products_column.sql` and `20260514090000_fix_create_order_with_items_order_items_no_price_column.sql`, and correct the original `20260512140000_store_availability_order_cutoff.sql` for new environments replaying migrations from scratch.

## Consequences

- Order creation RPC matches the real `orders` and `order_items` schemas.
- No new denormalized column added; product detail remains via `order_items` and FK to `products`.
