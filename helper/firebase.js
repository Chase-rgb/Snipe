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
	} catch (error) {
		console.log("Error in getting database guilds", error)
	}
}
// testDB()

async function addSnipe(guildID, sniperID, targetIDs) {
	try {
		const batch = db.batch()

		const guildRef = db.collection("guilds").doc(guildID)
		const sniperInfoRef = guildRef.collection("sniperInfo").doc(sniperID.id)
		const sniperSnipedListRef = sniperInfoRef.collection("snipedList")
		targetIDs.forEach((targetUser) => {
			const huntedRef = guildRef.collection("huntedInfo").doc(targetUser.id)
			const sniperHuntedRef = sniperSnipedListRef.doc(targetUser.id)

			//Increment hunted document
			batch.set(sniperHuntedRef, {"timesHunted": FieldValue.increment(1)}, {merge: true})

			//Increment total sniped count
			batch.set(sniperInfoRef, {"totalSnipes": FieldValue.increment(1)}, {merge: true})

			//Add sniper name to the database
			batch.set(sniperInfoRef, {"username": sniperID.username}, {merge: true})

			//Increment hunted death count
			batch.set(huntedRef, {"timesHunted": FieldValue.increment(1)}, {merge: true})

			//Add hunted name to the database
			batch.set(huntedRef, {"username": targetUser.username}, {merge: true})
			
		})
		await batch.commit().then(console.log("Database successful updated"));
		return true

		// console.log(await (await guildRef.get()).data()[sniperID]);
	} catch (error) {
		console.log("Error in adding snipe to database", error);
		return false
	}
}

async function getGuildSniperData(guildID) {
	const sniperInfo = db.collection("guilds").doc(guildID).collection("sniperInfo");
	const snapshot = await sniperInfo.orderBy("totalSnipes", "desc").orderBy("username").get()
	sniperDataString = ""
	console.log(typeof snapshot);
	let i = 1
	snapshot.forEach(async (doc) => {
		sniperDataString += `${i}) ${doc.get("username")} => ***${doc.get("totalSnipes")}*** \n`
		i++
	})
	console.log(sniperDataString)
	return sniperDataString
}


// addSnipe("973383546825740298", "sniper3", "testTarget2")

module.exports = {
	db,
	addSnipe, 
	getGuildSniperData,
	// getUserData
}

// getGuildSniperData("973383546825740298") 