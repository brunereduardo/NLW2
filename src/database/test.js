const dataBase = require('./db')
const createProffy = require("./createProffy")

dataBase.then( async (db) => {
    //inserir dados
    proffyValue = {
        name: "Bruner Albrecht",
        avatar: "https://avatars1.githubusercontent.com/u/33575403?s=400&u=aa70d41f0488900cc3b7c00e13cdc6b1d8358092&v=4",
        whatsapp:"0123456789",
        bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Blandit volutpat maecenas volutpat blandit aliquam etiam erat velit scelerisque. Sapien eget mi proin sed libero. Nibh praesent tristique magna sit amet purus gravida quis blandit. At tellus at urna condimentum. Et malesuada fames ac turpis egestas maecenas pharetra. Commodo elit at imperdiet dui accumsan sit amet nulla. In massa tempor nec feugiat nisl pretium fusce id velit. Dui nunc mattis enim ut tellus elementum. Id diam vel quam elementum."
    }

    classValue = {
        subject: 1,
        cost: "30"
    }

    classScheduleValues= [
        {
            weekday: 1,
            time_from: 720,
            time_to: 1220
        },

        {
            weekday: 0,
            time_from: 520,
            time_to: 1220
        }
    ]

    //await createProffy(db,{proffyValue, classValue, classScheduleValues})
    
    //consultar os dados inseridos

    //const selectedProffys = await db.all("SELECT * FROM proffys")
    //console.log(selectedProffys)

    //consultar as classes de um determinado professor etrazer junto os dados do mesmo 

    /* const selectedClassesAndProffys = await db.all(`
        SELECT classes.*, proffys.*
        FROM proffys 
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE classes.proffy_id = 1;
    `)
    console.log(selectedClassesAndProffys) */

    // o horário que o proffy trabalha, por exemplo, é das 8 - 18h
    // o horário do time_from(8h) precisa ser menor ou igual  ao horário solicitado 
    //o time_to precisa ser acima 
    /* const selectedClassesSchedules = await db.all(`
        SELECT class_schedules.*
        FROM class_schedules
        WHERE class_schedules.class_id = 1
        AND class_schedules.weekday = "0"
        AND class_schedules.time_from <= "420"
        AND class_schedules.time_to  > "520"
    `)
    console.log(selectedClassesSchedules) */
})