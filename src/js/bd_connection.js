const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://user:scrapweb@scrapweb.we1fi.mongodb.net/?retryWrites=true&w=majority&appName=scrapweb";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Conexion exitosa!");
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
