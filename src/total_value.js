import { built_html, getRate } from "./utils.js";

export const TotalValue = (accounts, transactions) => {
  let result = {};
  let multiplier = 1;

  for (let i = 0; i < transactions.length; i++) {
    multiplier = getRate(transactions[i].book_date);
    const { account_id, value } = transactions[i];
    if (!result[account_id]) {
      result[account_id] = Math.round(multiplier * value);
    } else {
      result[account_id] += Math.round(multiplier * value);
    }
  }

  let html =
    "<h1>#1 Total (rate-adjusted) transactional value of each account.</h1>";

  for (let i = 0; i < accounts.length; i++) {
    html += `
        <h3>${accounts[i].name ?? accounts[i].home_state}</h3>
        <div class="card">
            ${built_html("Total Value", result[accounts[i].id])}
        </div>
        `;
  }

  return html;
};
