const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

const serviceAccount = require('../ServiceAccountKey.json');

initializeApp({
	credential: cert(serviceAccount)
});

const db = getFirestore();

async function testDB() {
	try {
		const snapshot = await db.collection('guilds').get();
		// console.log(snapshot);
		snapshot.forEach((doc) => {
			console.log(doc);
		});
	} catch (error) {
		console.log("Error in getting database guilds", error)
	}
}
testDB()



module.exports.db = db
