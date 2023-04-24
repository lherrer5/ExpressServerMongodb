//require("dotenv").config();
const express = require("express");
const { validateSignup } = require("./validator");
const { validateActProducto } = require("./validator");
const { validateDelProducto } = require("./validator");
const fs = require("fs");
const app = express();
const cors = require('cors');
const PORT = 3060;

app.use(express.json());
app.use(cors());

// Comprobar si el archivo existe, si no, se crea con un array vacío
if (!fs.existsSync("./productosOrd.txt")) {
    fs.writeFileSync("./productosOrd.txt", "[]");
}

// Obtener todos los productos
app.get("/productos", (req, res) => {
    fs.readFile("productosOrd.txt", "utf8", (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error al obtener los productos");
            return;
        }
        //validación archivo vacio
        if (!data || data.trim() === "") {
//hago validacion con .trim pa evitar q "" sea leida como falso y se detecte error sin parar el servidor 
            res.json([]);
            return;
        }
//creo el array q almacenará productos
        let productos = [];
        try {
//si encuentra productos, los convierte a js y guarda en array pdts
            productos = JSON.parse(data.trim());
//.trim pa eliminar los espacios al ppio/final d la cadena d datos JSON antes de analizarla con JSON.parse() 
//garantizando q esta se analice correctamente como JSON y que el objeto de JS devuelto se use correctamente
        } catch (e) {
// capturo error al parsear el JSON, lo imprimo y envio rpta de error con status 500 de server error y msj
            console.error(e);
            res.status(500).send("Error al obtener los productos");
            return;
        }
        res.json(productos);
    });
    // console.log("Product -> getAllProducts");
    // const products = await Product.find();
    // res.json(products);
});

// Obtener un producto por su nombre
app.get("/productos/:nombre", (req, res) => {
    const nombre = req.params.nombre;
    fs.readFile("productosOrd.txt", "utf8", (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error al obtener los productos");
            return;
        }
        if (!data || data.trim() === "") {
            res.status(404).send("Producto no encontrado");
            return;
        }
        const productos = JSON.parse(data.trim());
        const producto = productos.find(p => p.nombre === nombre);
        if (producto) {
            res.status(200).json(producto);
        } else {
            res.status(404).send("Producto no encontrado");
        }
    });
});

//POST generando ID unico
app.post("/productos", (req, res) => {
    const { error, value } = validateSignup(req.body, { abortEarly: false });
    if (error) {
        console.log(error);
        return res.status(400).send(error.details);
    }
//Guardo el producto nuevo obtenido del body validado
    const nuevoProducto = value;
    fs.readFile("productosOrd.txt", "utf8", (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error al agregar el producto");
            return;
        }
        if (!data || data.trim() === "") {
            res.status(404).send("Producto no encontrado");
            return;
        }
        let productos = [];
        try {
            productos = JSON.parse(data);
        } catch (error) {
            console.error(error);
            res.status(500).send("Error al agregar el producto");
            return;
        }
//reduce recorre los elementos del array y aplica una fnc q compara el id d c/producto con el valor máx acum y devuelve el mayor. Al final, maxId contendrá el valor máx del id en el array productos
        const maxId = productos.reduce((max, producto) => {
//max es el valor acumulado actual (inicia en 0), y producto es el elemento actual del array.
            return producto.id > max ? producto.id : max;
//Comparo el id del pdto actual con el valor max acum. Si producto.id es mayor que max, devuelve producto.id y continua iteracion; de lo contrario, devuelve max.
        }, 0);
        const idNuevoProducto = maxId + 1;
        const productoConId = {
            id: idNuevoProducto,
            nombre: nuevoProducto.nombre,
            precio: nuevoProducto.precio,
            unidades: nuevoProducto.unidades,
            categoria: nuevoProducto.categoria,
            descripción: nuevoProducto.descripción,
        };
        productos.push(productoConId);
        const productoNuevo = JSON.stringify(productos);
        fs.writeFile("productosOrd.txt", productoNuevo, (err) => {
            if (err) {
                console.error(err);
                res.status(500).send("Error al agregar el producto");
                return;
            }
            res.status(201).json(productoConId);//201 created
        });
    });
});

// Actualizar un producto por su ID
app.patch("/productos/:id", (req, res) => {
    const id = req.params.id;
    const { error, value } = validateActProducto(req.body, { abortEarly: false });
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    fs.readFile("productosOrd.txt", "utf8", (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error al actualizar el producto");
            return;
        }
        if (!data || data.trim() === "") {
            res.status(404).send("Producto no encontrado");
            return;
        }
        let productos = JSON.parse(data.trim());
        const indiceProducto = productos.findIndex((producto) => producto.id.toString() === id);
        if (indiceProducto === -1) {
            res.status(404).send("Producto no encontrado");
            return;
        }
        const productoActualizado = {
// obtengo las propiedades actuales d mi pdto a actualizar
            ...productos[indiceProducto],
//y las reemplazo con los valores recibidos
            ...value,
        };
// Actualizo el pdto en productos
        productos[indiceProducto] = productoActualizado;
//uso null y 2 para hacer más legible el json poniendo una sangría de 2 espacios, no es obligatorio
        const productoNuevo = JSON.stringify(productos, null, 2);
        fs.writeFile("productosOrd.txt", productoNuevo, (err) => {
            if (err) {
                console.error(err);
                res.status(500).send("Error al actualizar el producto");
                return;
            }
            res.json(productoActualizado);
        });
    });
});

//DELETE por ID
app.delete("/productos/:id", (req, res) => {
    const { error } = validateDelProducto(req.params);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    const id = req.params.id;
    fs.readFile("productosOrd.txt", "utf8", (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error al eliminar el producto");
            return;
        }
        // Validar archivo vacío
        if (!data || data.trim() === "") {
            res.status(404).send("Producto no encontrado");
            return;
        }

        const productos = JSON.parse(data);
        const indiceProducto = productos.findIndex((producto) => producto.id.toString() == id);
        if (indiceProducto === -1) {
            res.status(404).send("Producto no encontrado");
            return;
        }
 // 1 indica cuantos elemt se eliminaran y como splice() devuelve un array con el/los elemt eliminados, uso [0] pa obtener el 1er elemt eliminado.
        const productoEliminado = productos.splice(indiceProducto, 1)[0];
        fs.writeFile("productosOrd.txt", JSON.stringify(productos), "utf8", (err) => {
            if (err) {
                console.error(err);
                res.status(500).send("Error al eliminar el producto");
                return;
            }
            res.json(productoEliminado);
        }
        );
    });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`El servidor esta escuchando en el puerto ${PORT}...`);
});

