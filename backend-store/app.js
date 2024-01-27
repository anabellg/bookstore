// const express = require('express')
const mysql = require('mysql2')
const sqlLogin = require('./secrets')

var express = require('express')
var cors = require('cors')
var app = express()
app.use(cors())

//CONEXION A BD MYSQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: sqlLogin,
    database: 'libros',
});
connection.connect((err)=>{
    if(err) {
        console.error("Error connecting to MySQL" + err.stack)
        return
    }
    console.log("Connected to MySQL", connection.threadId);
})

//ENDPOINT PARA OBTENER TITULO E IMAGEN DE LIBROS
app.get('/immages/:id', (request, response)=>{
        const libroId = (request.params.id);
        const qsql =  `SELECT id_libro,titulo,imagen FROM libros WHERE libros.id_libro="${libroId}";`;
        connection.query(qsql, (err, results) => {
            if (err){
                console.error("Error executing the query" + err.stack)
                response.status(500).json({error: "Error fetching data"})
            } else{
                // console.log(request.params, results)
                response.status(200).json(results)
            }    
        });
    })
    //ENDPOINT PARA OBTENER LIBRO POR TITULO
app.get('/book/:title', (request, response)=>{
    const librotitle = (request.params.title);
    const qsql =  `SELECT libros.id_libro, libros.titulo, libros.imagen, categoria.categoria, editorial.nombre_editorial, autor.autor FROM LIBROS INNER JOIN categoria ON libros.id_categoria = categoria.id_categoria INNER JOIN editorial ON libros.id_editorial = editorial.id_editorial INNER JOIN autor ON libros.id_autor = autor.id_autor WHERE libros.titulo like "%${librotitle}%";`;
    connection.query(qsql, (err, results) => {
        if (err){
            console.error("Error executing the query" + err.stack)
            response.status(500).json({error: "Error fetching data"})
        } else{
            console.log(request.params, results)
            response.status(200).json(results)
        }    
    });
})

    
//ENDPOINT PARA OBTENER AUTORES
app.get('/autors', (request, response)=>{
    connection.query('SELECT * from autor ORDER BY id_autor', (err, results)=>{
        if (err){
            console.error("Error executing the query" + err.stack)
            response.status(500).json({error: "Error fetching data"})
            return 
        }
        response.status(200).json(results)
    })
})

//ENDPOINT PARA OBTENER TODOS LOS LIBROS
app.get('/title', (request, response)=>{
    connection.query('SELECT libros.id_libro, libros.titulo, libros.imagen FROM LIBROS', (err, results)=>{
        if (err){
            console.error("Error executing the query" + err.stack)
            response.status(500).json({error: "Error fetching data"})
            return 
        }
        response.status(200).json(results)
    })
})

//ENDPOINT PARA OBTENER LIBROS POR CATEGORIA
app.get('/category', (request, response)=>{
    connection.query('SELECT libros.id_libro, libros.titulo, categoria.categoria, editorial.nombre_editorial, autor.autor FROM LIBROS INNER JOIN categoria ON libros.id_categoria = categoria.id_categoria INNER JOIN editorial ON libros.id_editorial = editorial.id_editorial INNER JOIN autor ON libros.id_autor = autor.id_autor WHERE categoria.categoria = "Clasicos"', (err, results)=>{
        if (err){
            console.error("Error executing the query" + err.stack)
            response.status(500).json({error: "Error fetching data"})
            return 
        }
        response.status(200).json(results)
    })
})

//ENDPOINT PARA OBTENER INFORMACION DEL LIBRO POR ID
app.get("/searchbook/:id", (request, response)=>{
    // console.log(request.params)
    const libroId = (request.params.id);
    const qsql = `SELECT libros.id_libro, libros.imagen, libros.anio_edicion, libros.titulo, categoria.categoria, editorial.nombre_editorial, autor.autor FROM LIBROS INNER JOIN categoria ON libros.id_categoria = categoria.id_categoria INNER JOIN editorial ON libros.id_editorial = editorial.id_editorial INNER JOIN autor ON libros.id_autor = autor.id_autor WHERE libros.id_libro="${libroId}";`;
    // const qsql = `SELECT * FROM libros WHERE libros.id_libro="${libroId}";`;
    connection.query(qsql, (err, results) => {
        if (err){
            console.error("Error executing the query" + err.stack)
            response.status(500).json({error: "Error fetching data"})
        } else{
            console.log(request.params, results)
            response.status(200).json(results)
        }    
    });
})


//SERVIDOR
app.listen(3000, ()=>{
    console.log("Server is running on port 3000")
})