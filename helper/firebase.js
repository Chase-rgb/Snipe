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
// testDB()

async function addSnipe(guildID, sniperID, targetIDs) {
	try {
		const batch = db.batch()
		const guildRef = db.collection("guilds").doc(guildID);
		targetIDs.forEach((targetUser) => {
			batch.set(guildRef, {[sniperID]: {[targetUser]: FieldValue.increment(1)}}, {merge: true})
		})
		await batch.commit().then(console.log("Database successful updated"));

		// console.log(await (await guildRef.get()).data()[sniperID]);
	} catch (error) {
		console.log("Error in adding snipe to database", error);
	}
}


// addSnipe("973383546825740298", "sniper3", "testTarget2")

module.exports = {
	db,
	addSnipe
}
