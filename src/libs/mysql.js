import mysql from 'mysql2/promise';

export const connection = await mysql.createConnection({
    
    host: 'localhost',
    user: 'root',
    password: 'clave',
    port: 3306,
    database: 'Etiquetas'
});