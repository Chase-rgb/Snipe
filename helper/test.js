const { database } = require('./firebase')
const { getDocs , collection } = "firebase/firestore";

const querySnapshot = async () => {await getDocs(collection(database, "973383546825740298"))};
querySnapshot.forEach((doc) => {
  console.log(`${doc.id} => ${doc.data()}`);
});