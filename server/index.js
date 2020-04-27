require('dotenv/config');
const express = require('express');

const db = require('./database');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');

const app = express();

app.use(staticMiddleware);
app.use(sessionMiddleware);
app.use(express.json());

app.get('/api/health-check', (req, res, next) => {
  db.query('select \'successfully connected\' as "message"')
    .then(result => res.json(result.rows[0]))
    .catch(err => next(err));
});

app.get('/api/products/', (req, res, next) => {
  const sql = `
    select "image",
           "name",
           "price",
           "productId",
           "shortDescription"
      from "products"
  `;
  db.query(sql)
    .then(productResult => {
      const product = productResult.rows;
      res.status(200).json(product);
    })
    .catch(err => next(err));
});

app.get('/api/products/:productId', (req, res, next) => {
  const { productId } = req.params;
  if (!parseInt(productId, 10) || productId < 1) {
    return next(new ClientError('Product must be a Positive Interger', 400))
    ;
  }
  const sql = `
    select *
      from "products"
     where "productId" = $1
  `;
  const params = [productId];
  db.query(sql, params)
    .then(result => {
      const product = result.rows[0];
      if (!product) {
        return next(new ClientError('Cannot find product within our database', 404));
      } else {
        res.json(product);
      }
    })
    .catch(err => next(err));
});

app.get('/api/cart/', (req, res, next) => {
  const { cartId } = req.session;
  const sql = `
      select "c"."cartItemId",
      "c"."price",
      "p"."productId",
      "p"."image",
      "p"."name",
      "p"."shortDescription"
  from "cartItems" as "c"
  join "products" as "p" using("productId")
  where "c"."cartId" = $1
  `;
  const params = [cartId];
  if (!req.session.cartId) {
    res.status(200).json([]);
    return;
  }
  db.query(sql, params)
    .then(result => {
      res.status(200).json(result.rows);
    })
    .catch(err => next(err));
});

app.post('/api/cart/', (req, res, next) => {
  const { cartId } = req.session;
  const { productId } = req.body;
  if (productId < 0) {
    return next(new ClientError('Product Id must be a positive number ', 400));
  }
  const sqlSelectPrice = `
    select "price"
      from "products"
     where "productId" = $1
    `;
  const values = [productId];
  db.query(sqlSelectPrice, values)
    .then(resultPrice => {
      if (resultPrice.rows.length === 0) throw new ClientError('Invalid product', 400);
      if (cartId) {
        return {
          cartId: req.session.cartId, price: resultPrice.rows[0].price
        };
      }
      const sqlInsertCart = `
            insert into "carts" ("cartId", "createdAt")
            values (default, default)
            returning "cartId"
            `;
      return db.query(sqlInsertCart)
        .then(cartIdResult => (
          {
            price: resultPrice.rows[0].price, cartId: cartIdResult.rows[0].cartId
          })
        );
    })
    .then(returnedObject => {
      req.session.cartId = returnedObject.cartId;
      const sqlInsertingCartItem = `
          insert into "cartItems" ("cartId", "productId", "price")
          values ($1, $2, $3)
          returning "cartItemId"
          `;
      const values = [returnedObject.cartId, productId, returnedObject.price];
      return db.query(sqlInsertingCartItem, values)
        .then(cartItemResult => (
          {
            cartItemId: cartItemResult.rows[0].cartItemId
          })
        );
    })
    .then(cartItemIdResult => {
      const sqlSelectingProduct = `
        select "c"."cartItemId",
          "c"."price",
          "p"."productId",
          "p"."image",
          "p"."name",
          "p"."shortDescription"
        from "cartItems" as "c"
        join "products" as "p" using("productId")
        where "c"."cartItemId" = $1
      `;
      const value = [cartItemIdResult.cartItemId];
      return db.query(sqlSelectingProduct, value)
        .then(productData => {
          res.status(201).json(productData.rows[0]);
        });
    })
    .catch(err => next(err));
});

// POST ORDER
app.post('/api/orders/', (req, res, next) => {
  const { cartId } = req.body.cartId;
  if (!req.body.name || !req.body.creditCard || !req.body.shippingAddress) { throw new ClientError('Name, CreditCard, and Shipping Address are required', 400); }
  const insertOrderSql = `
            insert into "orders" ("cartId", "name","creditCard","shippingAddress")
            values ($1, $2, $3, $4)
            returning *
            `;
  const values = [cartId, req.body.name, req.body.creditCard, req.body.shippingAddress];
  return db.query(insertOrderSql, values)
    .then(data => {

      res.status(201).json(data);
    }).catch(err => next(err));
});
//   if (!req.session.cartId) throw new ClientError('CartId Not Available', 400);
//   const values = [cartId, req.body.name, req.body.creditCard, req.body.shippingAddress];

//   db.query(insertOrderSql, values)
//     .then(result => {
//       delete req.body.cartId;
//       res.status(201).json(result);
//     });
// }

app.use('/api', (req, res, next) => {
  next(new ClientError(`cannot ${req.method} ${req.originalUrl}`, 404));
});

app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    res.status(err.status).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).json({
      error: 'an unexpected error occurred'
    });
  }
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', process.env.PORT);
});
