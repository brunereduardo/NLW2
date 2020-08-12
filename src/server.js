//dentro do json mundamos o script test para dev, e seu texto para nodemom src/server.js. No terminal apenas chamamos o npm run dev

//para requrer uma função de dentro do projeto, usamos requeire

//require('express')().listen(5500)

//dentro de require chamamos a biblioteca express, como ela é uma função utilizamos os () e com um "."acessamos uma outra função chamada liesten(porta de servidor)

//Para usarmos um html com esteroids, utilizaremos a biblioteca nunjunks, que o npm nos proporicona. Para instalar, basta escrver npm install nunjucks

//função curta= dentro de um () escrevemos ()=>{}
//.use() -> configuração do servidor
// [] = conjunto de dados;
// {} = um objeto em javascript


//Servidor
const express = require("express")
const server = express()

const {pageLanding, pageStudy, pageGiveClasses, saveClasses} = require("./pages")

//configurar nunjucks (template engine)
const nunjucks = require("nunjucks") 
// configure("pasta que esta meus arquivos html", {enviar um objeto com algumas opções}). express é qual servidor eu estou usando. Cache é uma memória que usamos para deixar mais rápida a atualização, mas como queremos sempre o arquivo mais novo, desabilitamos o Cache(noCache= true)
nunjucks.configure("src/views",{
    express: server,
    noCache: true,

})
//Inicio  e configuração do servidor
//para configurar o server.use() é preciso o express.static, que são os arquvios estáticos (imagens, scripts, styles) que estão na ´pasta public
server
// receber os dados por req.body. O express, por padrão só recebe pelo req.query
.use(express.urlencoded({extended: true}))
.use(express.static("public"))
.get("/", pageLanding)
.get("/study",pageStudy)
.get("/give-classes", pageGiveClasses)
.post("/save-classes", saveClasses)//outra opção seria post("/give-classes")
//Start no servidor
.listen(5500)

//__dirname,pega o caminho do diretóiro onde o server.js esta( quase um pwd)