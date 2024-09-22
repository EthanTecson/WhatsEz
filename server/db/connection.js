import { MongoClient, ServerApiVersion} from 'mongodb';

const uri = process.env.ATLAS_URI || ""
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,

        // Client enforces adherence to API rules,
        // meaning that if a functionality or feature 
        // that is outside of the API rules known realm,
        // an error will be thrown
        strict: true,

        // Throws errors if updates are recommended
        deprecationErrors: true,
    },
});

try {
    //  Connect client (the database) to the server
    await client.connect();
    // Send ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
        "Pinged your deployment. You successfully connected to MongoDB!"
    );

} catch (error) {
    console.error(err);
}

export default db;