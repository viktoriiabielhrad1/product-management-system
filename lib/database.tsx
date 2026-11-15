
import "server-only";

import PocketBase from "pocketbase";


const db = new PocketBase(process.env.POCKETBASE_URL!);

//let several requests run at the same time without cancelling each other
db.autoCancellation(false);

async function authenticate() {

  await db.collection("_superusers").authWithPassword(

    process.env.POCKETBASE_SUPERUSER_EMAIL!,

    process.env.POCKETBASE_SUPERUSER_PASSWORD!

  );

}


export { db, authenticate };