//procurar o botao
document.querySelector("#add-time").addEventListener('click',cloneField)
//quando clicar no botao

//Executar uma accao 
function cloneField(){
    //console.log('Chegguei aqui tmbm!!!')
    //duplicar os conteudos. Que conteudos?
    const newFieldsContainer = document.querySelector(".schedule-item").cloneNode(true)// se for verdadeiro, ele copia tudo dentro da div .schedule-item(seus filhos). Se for falso, ele copia a div vazia
    
    //colocar na pagina
    const fields = newFieldsContainer.querySelectorAll("input")
    //console.log(fields[0].value)
    //console.log(fields[1].value)
    //para cada campo, limpar
    fields.forEach(function(field){
        field.value = ""
    })

    document.querySelector("#schedule-items").appendChild(newFieldsContainer)

}
    