import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase/config";
import { collections } from "../constants";

export async function postAccount(accountData) {
  try {
    const newAccountData = await addDoc(
      collection(db, collections.ACCOUNT_COLLECTION),
      accountData
    );
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
    return newTask;
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
    return newCommit;
  } catch (error) {
    console.error(error);
  }
}

export async function postTransactionExpenses(
  accountUid,
  transactionUid,
  expenseData
) {
  try {
    const newExpense = await addDoc(
      collection(
        db,
        collections.MOVEMENTS_EXPENSES_COLLECTION([
          collections.ACCOUNT_COLLECTION,
          accountUid,
          collections.MOVEMENTS_COLLECTION,
          transactionUid,
        ])
      ),
      expenseData
    );
    return newExpense;
  } catch (error) {
    console.error(error);
  }
}
