import { transformDate, built_html, sort_trans } from "./utils.js";

export const MaxValue = (accounts, transactions) => {
    let result = {};
    transactions = sort_trans(transactions);
    for (let i = 0; i < transactions.length; i++) {
        const date_key = transformDate(transactions[i].book_date);
        const { sequence_number, account_id, value } = transactions[i];
        if (!result[date_key]?.value || result[date_key]?.value < value) {
            let account = accounts.find(a => (a.id == account_id));
            result[date_key] = {
                max_value: value,
                sequence_number: sequence_number,
                account_name: account.name || account.home_state
            };
        }
    }

    let html = "<h1>#4 Max value per month </h1>";

    for (let month in result) {
        html += `<h3>${month}</h3>`;
        html += "<div class='card'>";

        for (let key in result[month]) {
            html += built_html(key, result[month][key]);
        }
        html += "</div>";
    }
    return html;
}