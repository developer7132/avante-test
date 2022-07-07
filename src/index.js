import "./styles.css";
import { transactions, accounts } from "./data.js";
import { TotalValue } from "./total_value.js";
import { OutSequence } from "./out_sequence.js";
import { SortedTransactions } from "./sorted_transactions.js";

document.getElementById("app").innerHTML = `
  ${TotalValue(accounts, transactions)}
  ${OutSequence(accounts, transactions)}
  ${SortedTransactions(accounts, transactions)}
`;
