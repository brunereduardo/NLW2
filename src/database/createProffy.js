// para usar a função await, temos que colocar na frente da função a palavra async(assíncrono)
// com o module.exports, fazemos que que a função possa ser chamada por outro arquivo na mesma pasta, através do require("função")
module.exports =  async function( db, { proffyValue, classValue, classScheduleValues } ) {
    //inserir dados na tabela proffys
    //como estamos usando uma template literals(``), o java script nos permite colocar variáveis dentro do texto da seguinte maneira: ${} 
    const insertedProffy = await db.run(`
        INSERT INTO Proffys (
            name,
            avatar,
            whatsapp,
            bio
        ) VALUES (
            "${proffyValue.name}",
            "${proffyValue.avatar}",
            "${proffyValue.whatsapp}",
            "${proffyValue.bio}"
        );
     `)

     const proffy_id = insertedProffy.lastID

     //inserir dados na tabela Classes

     const insertedClass = await db.run(`
            INSERT INTO Classes (
                subject,
                cost,
                proffy_id
            ) VALUES (
                "${classValue.subject}",
                "${classValue.cost}",
                "${proffy_id}"
            );
     `)
     const class_id = insertedClass.lastID
    // inserir dados na tabela Class_schedule

     const insertedAllClass_ScheduleValues = classScheduleValues.map((classScheduleValue)=>{
        return db.run(`
            INSERT INTO Class_schedules (
                class_id,
                weekday,
                time_from,
                time_to
            ) VALUES (
                "${class_id}",
                "${classScheduleValue.weekday}",
                "${classScheduleValue.time_from}",
                "${classScheduleValue.time_to}"
            );`)
     })

     //execução de todos os db.runs() das classScheduleValues
      await Promise.all(insertedAllClass_ScheduleValues)
}