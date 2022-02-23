export { currencyFormatter } from "./constants";
export const collections = {
  ACCOUNT_COLLECTION: "accounts",
  MOVEMENTS_COLLECTION: "movements",
  COMMIT_COLLECTION: "commits",
  MOVEMENTS_EXPENSES_COLLECTION: (path) => `${path.join("/")}/expenses`,
};
export const transactions = {
  INCOME: "income",
  WITHDRAW: "withdraw",
};

export const stores = {
  ACCOUNTS_STORE: "accounts",
  SESSION_STORE: "session",
  TRANSACTIONS_STORE: "transactions",
  COMMITS_STORE: "commits",
  EXPENSES_STORE: "expenses",
};

export const timeFilters = [
  { value: "week", label: "Last week" },
  { value: "month", label: "Last Month" },
  { value: "quarter", label: "Last quarter" },
  { value: "year", label: "Last year" },
  { value: "allTime", label: "All time" },
];

export const timeFiltersTypes = {
  week: "week",
  month: "month",
  quarter: "quarter",
  year: "year",
  allTime: "allTime",
};

export const validationsRegex = {
  number: /^[0-9/.]*$/,
};
