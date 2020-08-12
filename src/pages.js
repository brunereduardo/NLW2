// obs: const {  } = desestruturar
const Database =require("./database/db")
const { subjects, weekdays, getSubject, convertHoursToMinutes} = require("./utils/format")

//Funções:
function pageLanding(req, res){
    return res.render("index.html")
}

 async function pageStudy(req, res){
    const filters = req.query

    if(!filters.subject || !filters.weekday || !filters.time){
        return res.render("study.html", {filters, subjects, weekdays})
    }
    //converter horas em minutos
    const timeToMinutes = convertHoursToMinutes(filters.time)
    const query = `
        SELECT classes.*, proffys.*
        FROM proffys 
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE EXISTS (
            SELECT class_schedules.*
            FROM class_schedules
            WHERE class_schedules.class_id = classes.id
            AND class_schedules.weekday = ${filters.weekday}
            AND class_schedules.time_from <= ${timeToMinutes}
            AND class_schedules.time_to  > ${timeToMinutes}
        )
        AND classes.subject = "${filters.subject}"
        `
        // caso haja erro na hora da consulta do banco de dados.
        try {
            const db = await Database
            const proffys = await db.all(query)
            proffys.map((proffy)=>{
                proffy.subject = getSubject(proffy.subject)
            })
            return res.render("study.html", {proffys, filters, subjects, weekdays})
        } catch (error) {
            console.log(error)
        }
    
}

function pageGiveClasses(req, res){
    return res.render("give-classes.html", {subjects, weekdays})
}// sem o nunjucks teriamos que fazer assim return res.sendFile(__dirname + "/views/give-classes.html")

async function saveClasses(req, res) {
    const createProffy = require("./database/createProffy")
    //const data = req.body// vamos trocar o rep.query por req.body, para que os dados trafeguem com mais segurança 
    const proffyValue = {
        name: req.body.name,
        avatar: req.body.avatar,
        whatsapp: req.body.whatsapp,
        bio: req.body.bio
    }

    const classValue = {
        subject: req.body.subject,
        cost: req.body.cost
    }
    // map arruma os dados em req.body.weekday, e depois passa para classScheduleValues
    const classScheduleValues = req.body.weekday.map((weekday, index)=>{
        return {
            weekday: weekday,
            time_from: convertHoursToMinutes(req.body.time_from[index]),
            time_to: convertHoursToMinutes(req.body.time_to[index])
        }
    })

    try {
        const db = await Database
        await createProffy(db, {proffyValue, classValue,    classScheduleValues})
        
        let queryString = "?subjecy=" + req.body.subject// podemos modificar o let a qualuer momento 
        queryString += "&weekday=" + req.body.weekday[0]
        queryString += "&time=" + req.body.time_from[0]
        return res.redirect("/study"+queryString)
    } catch (error) {
        console.log(error)
    }
    
    

    /* //Adc os novos dados na lista de  proffys
    //se tiver dados
    const isNotEmpty = Object.keys(data).length != 0 // Aqui temos uma atribuição que só ocorrerá se o tamnho da lista, que tem as chaves dos dados, estiver deiferente de 0. Caso o contrário isNotEmpty será 0
    if (isNotEmpty) {
        data.subject = getSubject(data.subject)
        proffys.push(data)
        return res.redirect("/study")
    } */
}

module.exports =  {pageLanding, pageStudy, pageGiveClasses, saveClasses}