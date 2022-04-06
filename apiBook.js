let express = require("express");
let app = express();
let cors = require("cors");
let mysql = require("mysql2");

let conection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "reba1302",
  database: `bookapp`,
});

conection.connect(function (error) {
  if (error) {
    console.error(error);
  } else {
    console.log("conexion correcta.");
  }
});

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

/////////////////////////////////////////////////// USUARIOS ////////////////////////////////////////////////////////////////////////////////////////////////

app.get("/usuarios", function (request, response) {
  let sql;
   sql = "SELECT * FROM bookapp.usuario WHERE id_usuario =" + request.body.id;

  conection.query(sql, function (err, result) {
    if (err) console.log(err);
    else {
      response.send(result);
    }
  });
  console.log(sql);
});

app.post(`/usuarios`, function (request, response) {
  console.log(request.body);

  let params = [
    (name = request.body.nombre),
    (apellidos = request.body.apellidos),
    (correo = request.body.correo),
    (foto = request.body.foto),
    (contraseña = request.body.password),
  ];
  let sql =
    "INSERT INTO bookapp.usuario(nombre, apellidos, correo, foto,password)" +
    "VALUES ('" +
    name +
    "', '" +
    apellidos +
    "', '" +
    correo +
    "', '" +
    foto +
    "', '" +
    contraseña +
    "')";

  console.log(sql);
  conection.query(sql, params, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      if (result.id_usuario) response.send(String(result.insertId));
      else response.send("-1");
    }
  });
});

app.put("/registrousuarios", function (request, response) {
  console.log(request.body);

  let params = [
    request.body.nombre,
    request.body.apellidos,
    request.body.correo,
    request.body.foto,
    request.body.password,
    request.query.id,
  ];

  let sql =
    "UPDATE bookapp.usuario SET nombre = COALESCE(?, nombre) , " +
    "apellidos = COALESCE(?, apellidos) , " +
    "correo = COALESCE(?, correo) , " +
    "foto = COALESCE(?, foto) , " +
    "password = COALESCE(?, password)  WHERE id_usuario = ?";

  console.log(params);
  conection.query(sql, params, function (err, result) {
    if (err) console.log(err);
    else {
      console.log(sql);

      response.send(result);
    }
  });
});

app.delete("/usuarios", function (request, response) {
  let sql =
    "DELETE FROM bookapp.usuario WHERE id_usuario ='" + request.query.id + "'";
  console.log(request.query.id);
  console.log(sql);
  conection.query(sql, function (err, result) {
    if (err) console.log(err);
    else {
      response.send(result);
    }
  });
});

/////////////////////////////////////////////////// LOGIN USUARIOS ////////////////////////////////////////////////////////////////////////////////////////////////
app.post(`/loginusuarios`, function (request, response) {
  console.log(request.body);

  let params = [request.body.correo, request.body.password];
  let sql =
    "SELECT * FROM bookapp.usuario WHERE correo = " +
    "?" +
    " AND password = " +
    "?";

  conection.query(sql, params, function (err, result) {
    if (err) console.log(err);
    else {
      response.send(result);
    }
  });
  console.log(sql);
});
////////////////////////////////////////////////// LIBROS ////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.get("/libros", function (request, response) {
  let sql;
   sql = "SELECT * FROM bookapp.libro WHERE id_usuario = " + request.query.id;

  conection.query(sql, function (err, result) {
    if (err) console.log(err);
    else {
      response.send(result);
    }
  });
  console.log(sql);
});

app.get("/libros/buscar", function (request, response) {
    
    let sql;
     sql = "SELECT * FROM bookapp.libro WHERE id_usuario = " + request.query.id_usuario + " AND id_libro = " + request.query.id_book
    console.log(request.query.id)
    conection.query(sql, function (err, result) {
      if (err) console.log(err);
      else {
        response.send(result);
      }
    });
    console.log(sql);
  });

app.post(`/libros`, function (request, response) {
  console.log(request.body);

  let params = [
    (usu = request.body.id_usuario),
    (title = request.body.titulo),
    (type = request.body.tipo),
    (autor = request.body.autor),
    (price = request.body.precio),
    (url = request.body.foto),
  ];
  let sql =
    "INSERT INTO bookapp.libro (id_usuario,titulo,tipo,autor,precio,foto)" +
    "VALUES ('" +
    usu +
    "', '" +
    title +
    "', '" +
    type +
    "', '" +
    autor +
    "', '" +
    price +
    "', '" +
    url +
    "')";

  console.log(sql);
  conection.query(sql, params, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      if (result.id_libro) response.send(String(result.insertId));
      else response.send("-1");
    }
  });
});

app.put("/libros", function (request, response) {
  console.log(request.body);

  let params = [
   request.body.id_usuario,
   request.body.titulo,
   request.body.tipo,
   request.body.autor,
   request.body.precio,
   request.body.foto,
   request.body.id_libro
    
  ];
  if(params[0] == "")
  {params[0] = null}
  if(params[1] == "")
  {params[1] = null}
  if(params[2] == "")
  {params[2] = null}
  if(params[3] == "")
  {params[3] = null}
  if(params[4] == "")
  {params[4] = null}
  if(params[5] == "")
  {params[5] = null}
console.log(params)
  
  let sql =
    "UPDATE bookapp.libro SET id_usuario = COALESCE(?, id_usuario), " +
    "titulo = COALESCE(?, titulo) , " +
    "tipo = COALESCE(?, tipo) , " +
    "autor = COALESCE(?, autor) , " +
    "precio = COALESCE(?, precio), " +
    "foto = COALESCE(?,  foto)  WHERE id_libro = ?" ;

  console.log(params);
  conection.query(sql, params, function (err, result) {
    if (err) console.log(err);
    else {
      console.log(sql);

      response.send(result);
    }
  });
});

app.delete("/libros", function (request, response) {
  let sql =
    "DELETE FROM bookapp.libro WHERE id_libro ='" + request.query.id + "'";
  console.log(request.query.id);
  console.log(sql);
  conection.query(sql, function (err, result) {
    if (err) console.log(err);
    else {
      response.send(result);
    }
  });
});


/////////////////////////////////////IONIC BOOK//////////////////////////////////////////////

app.get("/librosIonic", function (request, response) {
  let sql;
   sql = "SELECT * FROM bookapp.libro";

  conection.query(sql, function (err, result) {
    if (err) console.log(err);
    else {
      response.send(result);
    }
  });
  console.log(sql);
});

app.get("/librosIonic/buscar", function (request, response) {
    
  let sql;
   sql = "SELECT * FROM bookapp.libro WHERE id_libro =" + request.query.id
  console.log(request.query.id)
  conection.query(sql, function (err, result) {
    if (err) console.log(err);
    else {
      response.send(result);
    }
  });
  console.log(sql);
});

app.post(`/librosIonic`, function (request, response) {
  console.log(request.body);

  let params = [
    (usu = request.body.id_usuario),
    (title = request.body.titulo),
    (type = request.body.tipo),
    (autor = request.body.autor),
    (price = request.body.precio),
    (url = request.body.foto),
  ];
  let sql =
    "INSERT INTO bookapp.libro (id_usuario,titulo,tipo,autor,precio,foto)" +
    "VALUES ('" +
    usu +
    "', '" +
    title +
    "', '" +
    type +
    "', '" +
    autor +
    "', '" +
    price +
    "', '" +
    url +
    "')";

  console.log(sql);
  conection.query(sql, params, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      if (result.id_libro) response.send(String(result.insertId));
      else response.send("-1");
    }
  });
});


app.put("/librosIonic", function (request, response) {
  console.log(request.body);

  let params = [
   request.body.id_usuario,
   request.body.titulo,
   request.body.tipo,
   request.body.autor,
   request.body.precio,
   request.body.foto,
   request.body.id_libro
    
  ];
  if(params[0] == "")
  {params[0] = null}
  if(params[1] == "")
  {params[1] = null}
  if(params[2] == "")
  {params[2] = null}
  if(params[3] == "")
  {params[3] = null}
  if(params[4] == "")
  {params[4] = null}
  if(params[5] == "")
  {params[5] = null}
console.log(params)
  
  let sql =
    "UPDATE bookapp.libro SET id_usuario = COALESCE(?, id_usuario), " +
    "titulo = COALESCE(?, titulo) , " +
    "tipo = COALESCE(?, tipo) , " +
    "autor = COALESCE(?, autor) , " +
    "precio = COALESCE(?, precio), " +
    "foto = COALESCE(?,  foto)  WHERE id_libro = ?" ;

  console.log(params);
  conection.query(sql, params, function (err, result) {
    if (err) console.log(err);
    else {
      console.log(sql);

      response.send(result);
    }
  });
});

app.delete("/librosIonic", function (request, response) {
  let sql =
    "DELETE FROM bookapp.libro WHERE id_libro ='" + request.query.id + "'";
  console.log(request.query.id);
  console.log(sql);
  conection.query(sql, function (err, result) {
    if (err) console.log(err);
    else {
      response.send(result);
    }
  });
});
app.listen(5000);
