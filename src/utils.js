import { transactions, monthly_rates } from "./data.js";

export const getRate = (book_date) => {
  let effective_date = "1900-01-01";
  let multiplier = 1;

  monthly_rates.forEach((monthly_rate) => {
    if (book_date === monthly_rate.effective_date) {
      multiplier = monthly_rate.multiplier;
      return;
    }
    if (
      book_date > monthly_rate.effective_date &&
      monthly_rate.effective_date > effective_date
    ) {
      multiplier = monthly_rate.multiplier;
      effective_date = monthly_rate.effective_date;
    }
  });

  return multiplier;
};

export const checkOutOfSequence = (current_trans) => {
  const acc_trans = transactions.filter(
    (transaction) => transaction.account_id === current_trans.account_id
  );
  const pre_trans = acc_trans.filter(
    (acc_tran) =>
      acc_tran.book_date > current_trans.book_date &&
      acc_tran.sequence_number < current_trans.sequence_number
  );

  if (pre_trans.length === 0) return false;

  return true;
};

export const sort_trans = (trans) => {
  trans.sort((a, b) => (a.book_date > b.book_date ? 1 : -1));
  let i = 1;
  trans.forEach((tran) => {
    tran.sequence_number = i++;
  });

  return trans;
};

export const built_html = (key, value) => {
  return `
        <div class="inline">
            <div class="key">${key}</div>
            <div class="value">${value}</div>
        </div>
    `;
};
