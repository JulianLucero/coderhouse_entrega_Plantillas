const express = require ('express')
const app = express()

app.use(express.urlencoded({extended:true}))

// configuro el puerto 
const port = process.env.PORT || 8080

//configuro el views

app.set('view engine' , 'ejs')
app.set('views', './views')

//configuro el get
app.get ('/' , (req, res) => {
    let productos = [
        {nombre:'Producto 1', precio: '$100'},
        {nombre:'Producto 2', precio: '$200'},
        {nombre:'Producto 3', precio: '$300'},
        {nombre:'Producto 4', precio: '$3400'},
        {nombre:'Producto 5', precio: '$7890'}
    ]
    res.render('index', {
        mensaje: 'Hola EJS',
        productos: productos
    })
})

app.post('/productos', (req, res) =>{
    const obj = req.body
    console.log(obj) 
    const {nombre, descripcion, price} = req.body

    productos.push({
        nombre,
        price,
        descripcion
    })
    res.render('index')
})
  



// configuro en que puerto se escucha
app.listen(port, err => {
    if(err) throw new Error(`Error on server listen: ${err}`)
    console.log(`Server running on port ${port}`)
})