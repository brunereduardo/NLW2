// para instalar o sqlite, escrevemos : node install sqlite-async no terminal. DEpois, para a visualização, instalamos o plugin sqlite no vs code

//constantes
const Database = require("sqlite-async")

// funcionalidades
function execute(db){
    //criar as teblas do banco de dados
    return db.exec(`
        CREATE TABLE IF NOT EXISTS proffys (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            avatar TEXT,
            whatsapp TEXT,
            bio TEXT
        );
        CREATE TABLE IF NOT EXISTS classes(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            subject INTEGER,
            cost TEXT,
            proffy_id INTERGER
        );

        CREATE TABLE IF NOT EXISTS class_schedules(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            class_id INTEGER,
            weekday INTEGER,
            time_from INTEGER,
            time_to INTEGER
        );
    `)
}



// abrindo o db e exportando 
module.exports = Database.open(__dirname + "/database.sqlite").then(execute)