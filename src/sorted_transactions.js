import { built_html, sort_trans } from "./utils.js";

export const SortedTransactions = (accounts, transactions) => {
  let result = [];

  for (let i = 0; i < accounts.length; i++) {
    const acc_trans = transactions.filter(
      (transaction) => transaction.account_id === accounts[i].id
    );
    result = [...result, ...sort_trans(acc_trans)];
  }

  let html = "<h1>#3 New Transaction List</h1>";

  result.forEach((trans) => {
    html += "<div class='card'>";
    for (let key in trans) {
      html += built_html(key, trans[key]);
    }
    html += "</div>";
  });
  return html;
};
