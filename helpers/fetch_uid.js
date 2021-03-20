const firebase = require("firebase/app");
require("firebase/firestore");

module.exports.fetchUID = async function (discordUID) {
  db = firebase.firestore();

  var response = false

  await db.collection("users").doc(discordUID)
    .get()
    .then((doc) => {
      if(doc.exists) {
        response =  doc.data()["genshinUID"];
      } 
    })

  return response;

}

