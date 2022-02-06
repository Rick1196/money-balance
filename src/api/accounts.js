import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase/config";
import { collections } from "../constants";

export async function postAccount(accountData) {
  try {
    console.log(accountData);
    const newAccountData = await addDoc(
      collection(db, collections.ACCOUNT_COLLECTION),
      accountData
    );
    console.log(newAccountData);
    return newAccountData;
  } catch (error) {
    console.error(error);
  }
}

export async function postTransaction(accountUid, transactionData) {
  try {
    const newTask = await addDoc(
      collection(
        db,
        `${collections.ACCOUNT_COLLECTION}`,
        `${accountUid}/${collections.MOVEMENTS_COLLECTION}`
      ),
      transactionData
    );
    console.log(newTask);
  } catch (error) {
    console.error(error);
  }
}

export async function updateAccountBalance(newBalance, accountUid) {
  try {
    await updateDoc(
      doc(collection(db, `${collections.ACCOUNT_COLLECTION}`), `${accountUid}`),
      {
        amount: newBalance,
      }
    );
  } catch (error) {
    console.error(error);
  }
}

export async function postCommitAtHistory(accountUid, commitData) {
  try {
    const newCommit = await addDoc(
      collection(
        db,
        `${collections.ACCOUNT_COLLECTION}`,
        `${accountUid}/${collections.COMMIT_COLLECTION}`
      ),
      commitData
    );
    console.log(newCommit);
  } catch (error) {
    console.error(error);
  }
}
