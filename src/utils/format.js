const subjects = [
    "Artes",
    "Biologia",
    "Ciências",
    "Educação Física",
    "Física",
    "Geografia",
    "História",
    "Matemática",
    "Português",
    "Química",
    "Programação",
]

const weekdays = [
    "Domingo",
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
]

function getSubject(subjectNumber){
    const position = +subjectNumber -1// com o + na frente de subjectNumber, garantimos que ele será considerado como número, não como uma string correspondete ao seu valor numérico 
    return subjects[position]
}
// const [] = é uma desestruturação
function convertHoursToMinutes(time){
    const [hour, minutes]= time.split(":")
    return Number((hour*60) + minutes)
}

module.exports = {
    subjects,
    weekdays,
    getSubject,
    convertHoursToMinutes
}