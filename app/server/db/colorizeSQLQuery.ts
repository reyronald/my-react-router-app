import chalk from "chalk"

const KEYWORD = `_keyword_`
const QUOTES = `_quotes_`
const NUMBER = `_number_`

export const color = {
  Lavender: chalk.hex("#ae8bdc"),
  cyan: chalk.cyan,
  blue: chalk.blue,
  mandy: chalk.hex("#e74856"),
}

type Tokens = Record<"keywords" | "quotes" | "numbers", string[]>

export function colorizeSQLQuery(sqlQuery: string) {
  const tokens: Tokens = {
    keywords: [],
    quotes: [],
    numbers: [],
  }

  const replacer = (replaceValue: string, array: string[]) => (substring: string) => {
    array.push(substring)
    return replaceValue
  }

  const sqlQueryColored = sqlQuery
    .replaceAll(
      new RegExp(`\\b(${SQL_RESERVED_KEYWORDS.join("|")})\\b`, "g"),
      replacer(KEYWORD, tokens.keywords),
    )
    .replaceAll(/".*"/g, replacer(QUOTES, tokens.quotes))
    .replaceAll(/(?:\d+(?:\.\d+)?)/g, replacer(NUMBER, tokens.numbers))
    // Repalce them back with colors
    .replaceAll(KEYWORD, () => color.Lavender(tokens.keywords.shift() || ""))
    .replaceAll(QUOTES, () => color.cyan(tokens.quotes.shift() || ""))
    .replaceAll(NUMBER, () => color.mandy(tokens.numbers.shift() || ""))
    .trim()

  return sqlQueryColored
}

const SQL_RESERVED_KEYWORDS = [
  "SELECT",
  "UPDATE",
  "INSERT",
  "DELETE",
  "SET",
  "INTO",
  "VALUES",
  "IS",
  "NOT",
  "AS",
  "ON",
  "INNER",
  "LEFT",
  "JOIN",
  "NULL",
  "BEGIN",
  "COMMIT",
  "ROLLBACK",
  "FROM",
  "WHERE",
  "LIKE",
  "DISTINCT",
  "AND",
  "IN",
  "LIMIT",
  "OFFSET",
  "ORDER",
  "BY",
  "ASC",
  "DESC",
]
