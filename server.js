const express = require ('express')
const handlebars = require('express-handlebars')
const {Contenedor} = require("./contenedor")
const app = express()

app.use(express.urlencoded({extended:true}))

// configuro el puerto 
const port = process.env.PORT || 8080

// declaro el contenedor

const contenedor = new Contenedor("./productos.json")

//configuro el views

app.set('view engine' , 'hbs')
app.set('views', './views')

app.use(express.static('public'))
 
app.engine(
    'hbs',
    handlebars.engine({
        extname:".hbs",
        defaultLayout:"",
        layoutsDir: "",
        partialsDir: __dirname + "/views/partials"
    })
)

app.get("/", async (req, res) => {
    const producto = await contenedor.getAll();
    res.render('index', {
        list: producto,
        listExist: true,
        producto: true
    })
});

app.get('/productos', async (req , res) => {
    const producto = await contenedor.getAll();
    res.render('productos', {
        titulo: 'Mis productos de handlebars',
        list: producto,
        listExist: true,
        producto: true
    })
});

app.post('/productos', async (req, res) =>{
    const objProducto = req.body;
    contenedor.save(objProducto);
    const listExist = true;
    res.redirect('/productos');
});



// configuro en que puerto se escucha
app.listen(port, err => {
    if(err) throw new Error(`Error on server listen: ${err}`)
    console.log(`Server running on port ${port}`)
})