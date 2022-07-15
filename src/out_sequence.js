import { built_html, checkOutOfSequence, isValidDate } from "./utils.js";

export const OutSequence = (accounts, transactions) => {
  let result = {};
  for (let i = 0; i < transactions.length; i++) {
    if (!isValidDate(transactions[i].book_date)) continue;
    if (!checkOutOfSequence(transactions[i])) {
      const { account_id } = transactions[i];
      if (!result[account_id]) {
        result[account_id] = [];
      }

      result[account_id].push(transactions[i]);
    }
  }

  let html = "<h1>#2 Out of sequence transaction per account";

  for (let i = 0; i < accounts.length; i++) {
    html += `<h3>${accounts[i].name ?? accounts[i].home_state}</h3>`;
    const acc_trans = result[accounts[i].id];
    for (let j = 0; j < acc_trans.length; j++) {
      const trans = acc_trans[j];
      html += "<div class='card'>";

      for (let key in trans) {
        html += built_html(key, trans[key]);
      }
      html += "</div>";
    }
  }
  return html;
};
