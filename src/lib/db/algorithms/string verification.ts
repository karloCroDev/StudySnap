

export function SQLSyntaxCheck(texts: (string | null)[]): boolean{
    // Common SQL keywords and dangerous patterns
    const sqlKeywords = [
        "SELECT", "INSERT", "UPDATE", "DELETE", "DROP", "TRUNCATE", "ALTER", "EXEC",
        "UNION", "OR", "AND", "JOIN", "WHERE", "LIKE", "TABLE", "DATABASE", 
        "CASE", "WHEN", "THEN", "END", "AS", "INTO", "VALUES", "SET", 
        "HAVING", "GROUP BY", "ORDER BY", "LIMIT", "--", ";", "/*", "*/",
        "ADD", "ASC", "BETWEEN", "BY", "CASE", "CHECK", "COLUMN", "CONSTRAINT",
        "CREATE", "DEFAULT", "DESC", "DISTINCT", "EXISTS", "FOREIGN", "FROM",
        "IN", "INDEX", "IS", "KEY", "NOT", "ON", "ORDER", "PRIMARY", "PROCEDURE",
        "REFERENCES" , "TOP", "UNIQUE", "VIEW", "WITH", "NULL"

    ];

    // Convert text to uppercase for case-insensitive matching
    let upperTexts = texts.filter((text) => text !== null && typeof text === "string").map((text) => text!.toUpperCase());
    let sqlKeywordsFound = sqlKeywords.some(keyword => upperTexts.some(text => text?.toUpperCase().includes(keyword.toUpperCase())));    if (sqlKeywordsFound) console.log("FOUND SQL SYNTAX")
    return sqlKeywordsFound
  };