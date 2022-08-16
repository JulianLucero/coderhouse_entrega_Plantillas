const express = require ('express')
const app = express()

// configuro el puerto 
const port = process.env.PORT || 8080

//configuro el views

app.set('view engine' , 'pug')
app.set('views', './views')

//configuro el get
app.get ('/hola' , (req, res) => {
    res.render('hello', {mensaje: 'Usando pug en express, este es el mensaje'})
})

app.get ('/datos', (req, res) => {
    const { min,value, max,titulo} = req.query
    res.render('hello1',{min,value, max,titulo})
})



// configuro en que puerto se escucha
app.listen(port, err => {
    if(err) throw new Error(`Error on server listen: ${err}`)
    console.log(`Server running on port ${port}`)
})