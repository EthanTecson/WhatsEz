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

// Pinging for admin database
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

// Pinging for TESTING database
try {
    await client.connect();

    await client.db('TESTING').command({ ping: 1 });
    console.log("Ping to TESTING successful!");
} catch (err) {
    console.error(err);
}

let db = client.db("TESTING");

export default db;