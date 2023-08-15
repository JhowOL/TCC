db.createUser(
  {
    user: "root",
    pwd: "example",
    roles: [
      {
        role: "readWrite",
        db: "stock"
      }
    ]
  }
);
db.createCollection('stocks');
db.stocks.insertOne(
  {
    name: 'stock 1',
    products: [
      {
        name: "produto 1",
        amount: 100,
        categoria: "eletronico",
        lastPurchase: {
          amount: 100,
          unitaryValue: 1,
          date: "20203-01-01"
        }
      },
      {
        name: "produto 2",
        amount: 50,
        categoria: "roupa",
        lastPurchase: {
          amount: 50,
          unitaryPrice: 2,
          date: "20203-01-01"
        }
      }
    ]
  }
);