export function SQLSyntaxCheck(texts: (string | null)[]): boolean {
  // Common SQL keywords and dangerous patterns
  const sqlKeywords = [
    'SELECT', 'INSERT', 'UPDATE', 'DELETE', 'DROP', 'TRUNCATE', 'ALTER', 'EXEC', 'UNION', 'OR', 'AND', 'JOIN',
    'WHERE', 'LIKE', 'TABLE', 'DATABASE', 'CASE', 'WHEN', 'THEN', 'END', 'AS', 'INTO', 'VALUES', 'SET', 'HAVING',
    'GROUP', 'ORDER', 'LIMIT', 'ADD', 'ASC', 'BETWEEN', 'BY', 'CHECK', 'COLUMN', 'CONSTRAINT', 'CREATE', 'DEFAULT',
    'DESC', 'DISTINCT', 'EXISTS', 'FOREIGN', 'FROM', 'IN', 'INDEX', 'IS', 'KEY', 'NOT', 'ON', 'PRIMARY', 'PROCEDURE',
    'REFERENCES', 'TOP', 'UNIQUE', 'VIEW', 'WITH', 'NULL' , "*/", "*", "/*"
  ];

  // Convert text to uppercase for case-insensitive matching
  const upperTexts = texts
    .filter((text) => text !== null && typeof text === 'string')
    .map((text) => text!.toUpperCase());

  //No SQL keyword can make damage to the databse
 let keywordCount = 0;
  for (const keyword of sqlKeywords) {
    for (const text of upperTexts) {
      if (text.includes(keyword)) {
        keywordCount++;
        if (keywordCount >= 2) {
          console.log('FOUND SQL SYNTAX');
          return true;
        }
      }
    }
  }

  return false;
}
