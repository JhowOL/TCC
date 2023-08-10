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
      produtos: {
        name: "produto 1",
        categoria: "eletronico"
      }
    }
  );