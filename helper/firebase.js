const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

const serviceAccount = require('../ServiceAccountKey.json');

initializeApp({
	credential: cert(serviceAccount)
});

const db = getFirestore();

async function testDB() {
	try {
		// const snapshot = await db.collection('guilds').get();
		const sniperHitlistRef = await db.collection("guilds").doc("973383546825740298").collection("sniperKillList").doc("sniperId").get()
		// console.log(snapshot);
		console.log(sniperHitlistRef);
	} catch (error) {
		console.log("Error in getting database guilds", error)
	}
}
// testDB()

async function addSnipe(guildID, sniperID, targetIDs) {
	try {
		const batch = db.batch()
		console.log("after batch");
		const guildRef = db.collection("guilds").doc(guildID)
		console.log("after guild ref");
		const sniperHitlistRef = db.collection("guilds").doc(guildID).collection("sniperKillList").doc(sniperID.id);
		console.log("after sniper ref");
		targetIDs.forEach((targetUser) => {
			console.log("adding targetID");
			batch.set(sniperHitlistRef, {[targetUser]: FieldValue.increment(1)}, {merge: true})
		})
		batch.set(guildRef, {"--playerStats--": {[sniperID]: FieldValue.increment(targetIDs.length)}}, {merge: true})
		await batch.commit().then(console.log("Database successful updated"));
		return true

		// console.log(await (await guildRef.get()).data()[sniperID]);
	} catch (error) {
		console.log("Error in adding snipe to database", error);
		return false
	}
}

async function getGuildData(guildID) {
	const guildRef = db.collection("guilds").doc(guildID);
	const guildData = await guildRef.get()
}


// addSnipe("973383546825740298", "sniper3", "testTarget2")

module.exports = {
	db,
	addSnipe, 
	getGuildData,
	// getUserData
}

// testDB()