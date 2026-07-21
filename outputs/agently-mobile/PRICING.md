# Kobits launch pricing

Kobits uses low fixed package prices for the first agents:

| Package | Research Sprint | What the buyer gets |
| --- | ---: | --- |
| Basic | $2.99 | Focused research brief |
| Standard | $5.99 | Brief plus comparison table |
| Premium | $9.99 | Deeper brief plus recommendations |

## Target profit calculation

The pricing model targets a minimum 5% net profit after variable delivery costs. The calculation is:

`minimum price = (AI + search + infrastructure + fixed payment fee) / (1 - payment percentage - 5%)`

The app keeps prices above that minimum with a small market floor. This is necessary because card fees, refunds, support, and taxes can make very small payments unprofitable.

Before launching, replace the estimated API and payment inputs in `pricing-policy.js` with the actual costs from the AI, search, payment, and hosting services you choose.
