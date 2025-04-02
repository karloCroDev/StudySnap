export function SQLSyntaxCheck(texts: (string | null)[]): boolean {
  // Common SQL keywords and dangerous patterns
  const sqlKeywords = [
    'SELECT', 'INSERT', 'UPDATE', 'DELETE', 'DROP', 'TRUNCATE', 'ALTER', 'EXEC', 'UNION', 'OR', 'AND', 'JOIN',
    'WHERE', 'LIKE', 'TABLE', 'DATABASE', 'CASE', 'WHEN', 'THEN', 'END', 'AS', 'INTO', 'VALUES', 'SET', 'HAVING',
    'GROUP', 'ORDER', 'LIMIT', 'ADD', 'ASC', 'BETWEEN', 'BY', 'CHECK', 'COLUMN', 'CONSTRAINT', 'CREATE', 'DEFAULT',
    'DESC', 'DISTINCT', 'EXISTS', 'FOREIGN', 'FROM', 'IN', 'INDEX', 'IS', 'KEY', 'NOT', 'ON', 'PRIMARY', 'PROCEDURE',
    'REFERENCES', 'TOP', 'UNIQUE', 'VIEW', 'WITH', 'NULL'
  ];

  // Convert text to uppercase for case-insensitive matching
  const upperTexts = texts
    .filter((text) => text !== null && typeof text === 'string')
    .map((text) => text!.toUpperCase());

  const keywordSet = new Set(sqlKeywords); // For fast lookup

  for (const text of upperTexts) {
    const words = text!.split(" ");
    for (let i = 0; i < words.length - 1; i++) {
        if (keywordSet.has(words[i]) && keywordSet.has(words[i + 1])) {
            return true; // Found a match
        }
    }
  }
  return false; // No match found
}