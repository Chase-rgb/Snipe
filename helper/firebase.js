const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue, runTransaction } = require('firebase-admin/firestore');
const client = require('firebase-tools');

const serviceAccount = require('../ServiceAccountKey.json');

initializeApp({
	credential: cert(serviceAccount)
});

const db = getFirestore();

async function testDB() {
	try {
		// const snapshot = await db.collection('guilds').get();
		const sniperInfo =  (await db.collection("guilds").doc("973383546825740298").collection("sniperInfo").doc("975519587804274700").get()).get("username")
		console.log(sniperInfo);
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
		const sniperSnipeHistoryRef = sniperInfoRef.collection("snipeHistory").doc()
		targetIDs.forEach(async (targetUser) => {
			const huntedRef = guildRef.collection("huntedInfo").doc(targetUser.id)
			const huntedHistoryRef = huntedRef.collection("huntedHistory").doc()
			const sniperHuntedRef = sniperSnipedListRef.doc(targetUser.id)

			//Increment hunted document
			batch.set(sniperHuntedRef, {"timesHunted": FieldValue.increment(1), "username": targetUser.username, "lastHuntedTimestamp": Timestamp.now()}, {merge: true})

			//Increment total sniped count
			batch.set(sniperInfoRef, {"totalSnipes": FieldValue.increment(1), "username": sniperID.username, "lastSnipedTimestamp": Timestamp.now()}, {merge: true})

			//Increment hunted death count
			batch.set(huntedRef, {"timesHunted": FieldValue.increment(1), "username": targetUser.username, "lastHuntedTimestamp": Timestamp.now()}, {merge: true})
			
			//Add to sniper and hunted histories
			batch.set(sniperSnipeHistoryRef, {"targetUser": targetUser.username, "timestamp": Timestamp.now()})
			batch.set(huntedHistoryRef, {"sniperUser": sniperID.username, "timestamp": Timestamp.now()})

		})
		await batch.commit().then(console.log("Database successful updated"));
		return true
	} catch (error) {
		console.log("Error in adding snipe to database", error);
		return false
	}
}

async function getGuildSniperData(guildID) {
	const sniperInfo = db.collection("guilds").doc(guildID).collection("sniperInfo");
	const snapshot = await sniperInfo.orderBy("totalSnipes", "desc").orderBy("lastSnipedTimestamp", "desc").get()
	// console.log(snapshot.size);
	sniperDataString = ""
	let i = 1
	snapshot.forEach(async (doc) => {
		sniperDataString += `${i}) ${doc.get("username")} => ***${doc.get("totalSnipes")}*** \n`
		// console.log(sniperDataString);
		i++
	})
	// console.log(sniperDataString)
	return sniperDataString.length == 0 ? "No sniper data available" : sniperDataString
}


async function getGuildHuntedData(guildID) {
	const huntedInfo = db.collection("guilds").doc(guildID).collection("huntedInfo");
	const snapshot = await huntedInfo.orderBy("timesHunted", "desc").orderBy("lastHuntedTimestamp", "desc").get()
	huntedDataString = ""
	let i = 1
	snapshot.forEach(async (doc) => {
		huntedDataString += `${i}) ${doc.get("username")} => ***${doc.get("timesHunted")}*** \n`
		i++
	})
	// console.log(huntedDataString)
	return huntedDataString.length == 0 ? "No hunted data available" : huntedDataString
}

async function getSniperData(guildID, sniperID) {
	const sniperInfoRef = db.collection("guilds").doc(guildID).collection("sniperInfo").doc(sniperID.id);
	const doc = await sniperInfoRef.get()
	if (!doc.exists) {
		return "No sniper data available"
	} else {
		const sniperHitlistRef = sniperInfoRef.collection("snipedList")
		const snapshot = await sniperHitlistRef.orderBy("timesHunted", "desc").orderBy("lastHuntedTimestamp", "desc").get()
		sniperDataString = ""
		let i = 1
		snapshot.forEach(async (doc) => {
			// console.log(doc);
			sniperDataString += `${i}) ${doc.get("username")} => ***${doc.get("timesHunted")}*** \n`
			i++
		})
		// console.log(sniperDataString)
		return sniperDataString.length == 0 ? "No sniper data available" : sniperDataString
	}
}


async function deleteServerSnipeData(guildID) {
	let collectionPath = `/guilds/${guildID}`
	await client.firestore.delete(collectionPath, {
		project: process.env.GCLOUD_PROJECT,
		recursive: true,
		yes: true,
		force: true
	})
}


// addSnipe("973383546825740298", "sniper3", "testTarget2")

module.exports = {
	db,
	addSnipe, 
	getGuildSniperData,
	getGuildHuntedData,
	getSniperData,
	deleteServerSnipeData
}

// testDB()