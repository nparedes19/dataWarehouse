const express = require('express');
const server = express();
const Sequelize = require('sequelize');
const cors = require('cors');
const parser = require('body-parser');
const path = 'mysql://root@localhost:3306/datawarehouse';
const jwt = require('jsonwebtoken');
const myDataBase = new Sequelize(path);
server.use(parser.json());
server.use(cors());

/*conectar base de datos----------------------------------------------------------------------------------------------------------------------*/

myDataBase.authenticate().then(() =>{
    console.log("conectado...")
}).catch(err=>{
    console.error("Error de conexión:", err)
});

module.exports = myDataBase;

/*middlewares-----------------------------------------------------------------------------------------------------------------------------------*/

/*verificar token (se usa para endpoints que necesiten que el usuario haya iniciado sesión)*/

const jwtClave = "D4T4_W4R3H0U53!"

retornarUsuarioNoAutorizado = (response) =>{
    response.status(401).send({error:'Usuario no autorizado'})
}

const verificarToken = async (req, res, next) =>{
  try{
      let = token = req.headers.authorization.split(" ")[1];
      let decodeToken = jwt.verify(token,jwtClave)

      if(decodeToken){
          req.token = decodeToken;
          return next();
      }
  }catch{
      res.status(401).send({error: "Usuario no autorizado"})
  }
}

/*validar información de usuario*/

function validarUsuario (req, res, next){
  const {usuario, correo, fullname, telefono, password} = req.body;

  if (!usuario || !fullname || !correo || !telefono || !password){
      return res.status(400)
          .send({states: 'Error' , message: "Debe llenar todos los datos"})
  }

  return next();
}

/*validar si existe usuario*/

const userExist = async (req, res, next) => {
  const {correo} = req.body;

  try {
      const userExist = await myDataBase.query('SELECT * FROM usuarios WHERE correo = ?', {
          type: myDataBase.QueryTypes.SELECT,
          replacements: [correo]
      });
      if(userExist.length >= '1'){
          res.status(406).json({
              message: 'El email ya existe'
          });
      }else{
          next();
      }
  } catch (err) {
      res.status(400).json({
          message: `Error: ${err}`
      });  
  }
};


/*validar si existe compañías*/

const companiaExist = async (req, res, next) => {
    const {email} = req.body;
  
    try {
        const companiaExist = await myDataBase.query('SELECT * FROM compania WHERE email = ?', {
            type: myDataBase.QueryTypes.SELECT,
            replacements: [email]
        });
        if(companiaExist.length >= '1'){
            res.status(406).json({
                message: 'La compañía ya existe'
            });
        }else{
            next();
        }
    } catch (err) {
        res.status(400).json({
            message: `Error: ${err}`
        });  
    }
  };

/*validar información de la compañía*/

function validarCompania (req, res, next){
    const {nombre, direccion, email, telefono, id_ciudad} = req.body;
  
    if (!nombre || !direccion || !email || !telefono || !id_ciudad){
        return res.status(400)
            .send({states: 'Error' , message: "Debe llenar todos los datos"})
    }
  
    return next();
  }

/*validar si existe region*/

const regionExist = async (req, res, next) => {
    const {region} = req.body;
  
    try {
        const regionExist = await myDataBase.query('SELECT * FROM regiones WHERE region = ?', {
            type: myDataBase.QueryTypes.SELECT,
            replacements: [region]
        });
        if(regionExist.length >= '1'){
            res.status(406).json({
                message: 'La región ya existe'
            });
        }else{
            next();
        }
    } catch (err) {
        res.status(400).json({
            message: `Error: ${err}`
        });  
    }
  };


/*validar si existe ciudad*/

const ciudadExist = async (req, res, next) => {
    const {ciudad} = req.body;
  
    try {
        const regionExist = await myDataBase.query('SELECT * FROM ciudades WHERE ciudad = ?', {
            type: myDataBase.QueryTypes.SELECT,
            replacements: [ciudad]
        });
        if(regionExist.length >= '1'){
            res.status(406).json({
                message: 'La ciudad ya existe'
            });
        }else{
            next();
        }
    } catch (err) {
        res.status(400).json({
            message: `Error: ${err}`
        });  
    }
  };

/*validar si existe ciudad*/

const paisExist = async (req, res, next) => {
    const {pais} = req.body;
  
    try {
        const regionExist = await myDataBase.query('SELECT * FROM paises WHERE pais = ?', {
            type: myDataBase.QueryTypes.SELECT,
            replacements: [pais]
        });
        if(regionExist.length >= '1'){
            res.status(406).json({
                message: 'El país ya existe'
            });
        }else{
            next();
        }
    } catch (err) {
        res.status(400).json({
            message: `Error: ${err}`
        });  
    }
  };

/*validar si existe el pais*/

const asociarPais = async (req, res, next) => {
    const {id_pais} = req.body;
  
    try {
        const regionExist = await myDataBase.query('SELECT * FROM paises WHERE id_pais = ?', {
            type: myDataBase.QueryTypes.SELECT,
            replacements: [id_pais]
        });
        if(regionExist.length == '0'){
            res.status(406).json({
                message: 'El país al que quiere asociar la ciudad no existe'
            });
        }else{
            next();
        }
    } catch (err) {
        res.status(400).json({
            message: `Error: ${err}`
        });  
    }
  };

/*verificar si es admin*/

const verificarAdmin = async (req, res, next) =>{
  
  try {let token = req.headers.authorization;
  console.log(token);
  if(token){
      token = token.split(" ")[1];
      let decodificado = jwt.verify(token,jwtClave)
      let admin = decodificado.is_admin
      if(admin === 0){
        res.status(401).send({error:"usuario no autorizado"})
      }else{
        return next();
      }  }
  } catch {
    res.status(401).send({error:"usuario no autorizado"})
  }
}


/*endpoints necesarios--------------------------------------------------------------------------------------------------------------------------*/

/*logIn*/

server.post('/login', async(req,res) => {
    const { correo, password } = req.body;
    try {
      const info = await myDataBase.query("SELECT * FROM usuarios WHERE correo=? AND password=?", {
        replacements: [correo, password],
        type: myDataBase.QueryTypes.SELECT,
      });

      if (info.length == 0) {
        res.status(401).json({"msj":"Correo o contraseña incorrectos"});
      } else {  
        const data = {
          id_usuario: info[0].id_usuario,
          usuario: info[0].usuario,
          correo: info[0].correo,
          telefono: info[0].telefono,
          fullname: info[0].fullname,
          is_admin: info[0].is_admin
        };
        token = jwt.sign(data, jwtClave, { expiresIn: "1h" });
        res.status(200).json({"msj":"Log in exitoso","token":token ,"admin" :info[0].is_admin});
        console.log(data)
      }
    } catch (err) {
      console.log("error" + err);
    }
})

/*crear usuario*/

server.post('/usuarios', userExist,/*validarUsuario, userExist, verificarAdmin,*/  async (req,res) =>{
  const {usuario, correo, fullname, telefono, password} = req.body
  const user = await myDataBase.query ('INSERT INTO usuarios (usuario, correo, fullname, telefono, password) VALUES (?, ?, ?, ?, ?)',
  {
      replacements: [usuario, correo, fullname, telefono, password],
      type: myDataBase.QueryTypes.INSERT
  }
  )
  user.push(req.body)
  res.status(201).json({status: "Usuario creado exitosamente"});  
})

/*traer el listado de todaos los usuarios*/

server.get('/usuarios', /*verificarToken,*/ async (req, res) => {
    try {
        const results = await myDataBase.query('SELECT * FROM usuarios', { type: myDataBase.QueryTypes.SELECT });
        if(results){
            res.status(200).json(results);
        }else{
            throw new Error;
        }
    } catch (err) {
        res.status(400).json({
            message: `Error: ${err}`
        })
    }
  });


/*borrar usuario*/

server.delete('/usuarios/:id', verificarToken, async (req, res) => {

    const {id}= req.params;

    try{
        const companies_id_delete =  await myDataBase.query('DELETE FROM usuarios WHERE id_usuario = ?',
        {
        replacements: [id],
        })
       
        if(companies_id_delete) {
            res.status(201).json({message: "Usuario eliminado exitosamente"});
        } else {
            throw new Error
        }
    }catch(err) {
        res.status(400).json ({
            message: 'Error'
            })
    }   
 
})

/*actualizar una usuario*/

server.patch('/usuarios/:id', /*verificarToken,*/ async (req, res) => {

    const {usuario, correo, fullname, telefono, password,is_admin} = req.body;
    const id = req.params.id

    const company_update =  await myDataBase.query('UPDATE usuarios SET usuario =?, correo = ?, fullname = ?, password = ?, is_admin = ? WHERE id_usuario = ?',
        {
        replacements: [usuario, correo, fullname, telefono, password,is_admin, id],
        type: myDataBase.QueryTypes.UPDATE,
        }
    )
    
    company_update.push(req.body);
    res.status(201).json({message: "Usuario actualizado exitosamente"});
    console.log(company_update);
})

/*traer el listado de todas las compañías*/

server.get('/companias', /*verificarToken,*/ async (req, res) => {
    try {
        const results = await myDataBase.query('SELECT compania.id_compania, compania.nombre,compania.direccion,compania.email,compania.telefono, compania.id_ciudad, ciudades.ciudad FROM `compania` INNER JOIN ciudades ON compania.id_ciudad = ciudades.id_ciudad' , {type: myDataBase.QueryTypes.SELECT});
        if(results){
            res.status(200).json(results);
            console.log(results);
        }else{
            throw new Error;
        }
    } catch (err) {
        res.status(400).json({
            message: `Error`
        })
    }
});

/*crear compania*/

server.post('/companias', verificarToken, companiaExist, validarCompania, async (req, res) => {

    const {nombre, direccion, email, telefono, id_ciudad} = req.body;

    const companies =  await myDataBase.query('INSERT INTO compania (nombre, direccion, email, telefono, id_ciudad) VALUES (?, ?, ?, ?, ?)',
        {
        replacements: [nombre, direccion, email, telefono, id_ciudad],
        type: myDataBase.QueryTypes.INSERT,
        }
    )
    
    companies.push(req.body);
    res.status(201).json({message: "Compañia creada exitosamente"});
    console.log(companies);
})

/*borrar compañias*/

server.delete('/companias/:id', verificarToken, async (req, res) => {

    const {id}= req.params;

    try{
        const companies_id_delete =  await myDataBase.query('DELETE FROM compania WHERE id_compania = ?',
        {
        replacements: [id],
        })
       
        if(companies_id_delete) {
            res.status(201).json({message: "Compañia eliminada exitosamente"});
        } else {
            throw new Error
        }
    }catch(err) {
        res.status(400).json ({
            message: 'Error'
            })
    }   
 
})

/*actualizar una compañía*/

server.patch('/companias/:id', /*verificarToken,*/ async (req, res) => {

    const {nombre, direccion, email, telefono, id_ciudad} = req.body;
    const id = req.params.id

    const company_update =  await myDataBase.query('UPDATE compania SET nombre =?, direccion = ?, email = ?, telefono = ?, id_ciudad = ? WHERE id_compania = ?',
        {
        replacements: [nombre, direccion, email, telefono, id_ciudad,id],
        type: myDataBase.QueryTypes.UPDATE,
        }
    )
    
    company_update.push(req.body);
    res.status(201).json({message: "Compañia actualizada exitosamente"});
    console.log(company_update);
})

/*traer el listado de todas las regiones*/

server.get('/regiones', /*verificarToken,*/ async (req, res) => {
  try {
      const results = await myDataBase.query('SELECT * FROM regiones', { type: myDataBase.QueryTypes.SELECT });
      if(results){
          res.status(200).json(results);
      }else{
          throw new Error;
      }
  } catch (err) {
      res.status(400).json({
          message: `Error: ${err}`
      })
  }
});

/*agregar una región*/

server.post('/regiones', regionExist, verificarToken,  async (req,res) =>{
    const {region} = req.body
    const nombreRegion = await myDataBase.query ('INSERT INTO regiones (region) VALUES (?)',
    {
        replacements: [region],
        type: myDataBase.QueryTypes.INSERT
    }
    )
    nombreRegion.push(req.body)
    res.status(201).json({status: "Región creada exitosamente"});  
  })

/*actualizar una región*/

server.put('/regiones/:id', verificarToken, async (req,res) => {
    const {id} = req.params;
    const {region} = req.body;
    try {
        const actualizar = await myDataBase.query('UPDATE regiones SET region = ? WHERE id_regiones = ?', 
        {replacements: [region, id]});

        if(actualizar){
            res.status(200).json({
                message: 'Región actualizada'
            });
            actualizar.push(req.body);
        }else{
            throw new Error;
        };

    } catch (err) {
        res.status(400).json({
            message: `Error: ${err}`
        });
    };

})

/*borrar una región*/

server.delete('/regiones/:id', verificarToken, async (req,res) => {
    const {id} = req.params;
    try {
        const regionEliminar = await myDataBase.query('DELETE FROM regiones WHERE id_regiones = ?', 
        {replacements: [id]});

        if(regionEliminar){
            res.status(200).json({
                message: 'Región eliminada'
            });
        }else{
            throw new Error;
        };

    } catch (err) {
        res.status(400).json({
            message: `Error: ${err}`
        });
    };

})


/*agregar un pais*/

server.post('/paises', paisExist, verificarToken,  async (req,res) =>{
    const {id_regiones,pais} = req.body
    const nombrePais = await myDataBase.query ('INSERT INTO paises (id_regiones, pais) VALUES (?, ?)',
    {
        replacements: [id_regiones,pais],
        type: myDataBase.QueryTypes.INSERT
    }
    )
    nombrePais.push(req.body)
    res.status(201).json({status: "País creado exitosamente"});  
  })

/*traer el listado de todos las paises*/

server.get('/paises', /*verificarToken,*/ async (req, res) => {
    try {
        const results = await myDataBase.query('SELECT * FROM paises', { type: myDataBase.QueryTypes.SELECT });
        if(results){
            res.status(200).json(results);
        }else{
            throw new Error;
        }
    } catch (err) {
        res.status(400).json({
            message: `Error: ${err}`
        })
    }
  });

/*traer paises por ID de región*/

server.get('/paises/:id'/*, verificarToken*/, async (req, res) => {
  const {id} = req.params;
  try {
      const result = await myDataBase.query('SELECT * FROM paises WHERE id_regiones = ?', {
          type: myDataBase.QueryTypes.SELECT,
          replacements: [id]
      });
      if(result.length == '0'){
          res.status(404).json({
              message: 'La región no existe'
          })
      }else if(result.length >= '1'){
          res.status(200).json(result)
      }else{
          throw new Error
      }
  } catch (err) {
      res.status(400).json({
          message: `Error: ${err}`
      });
  }
});

/*actualizar una país*/

server.put('/paises/:id', verificarToken, async (req,res) => {
    const {id} = req.params;
    const {id_regiones, pais} = req.body;
    try {
        const actualizar = await myDataBase.query('UPDATE paises SET id_regiones = ?, pais = ? WHERE id_pais = ?', 
        {replacements: [id_regiones, pais, id]});

        if(actualizar){
            res.status(200).json({
                message: 'País actualizado'
            });
            actualizar.push(req.body);
        }else{
            throw new Error;
        };

    } catch (err) {
        res.status(400).json({
            message: `Error: ${err}`
        });
    };

})

/*borrar un pais*/

server.delete('/paises/:id', verificarToken, async (req,res) => {
    const {id} = req.params;
    try {
        const paisEliminar = await myDataBase.query('DELETE FROM paises WHERE id_pais = ?', 
        {replacements: [id]});

        if(paisEliminar){
            res.status(200).json({
                message: 'Pais eliminado'
            });
        }else{
            throw new Error;
        };

    } catch (err) {
        res.status(400).json({
            message: `Error: ${err}`
        });
    };

})


/*agregar una ciudad*/

server.post('/ciudades', ciudadExist, asociarPais, verificarToken,  async (req,res) =>{
    const {id_pais,ciudad} = req.body
    const nombreCiudad = await myDataBase.query ('INSERT INTO ciudades (id_pais, ciudad) VALUES (?, ?)',
    {
        replacements: [id_pais,ciudad],
        type: myDataBase.QueryTypes.INSERT
    }
    )
    nombreCiudad.push(req.body)
    res.status(201).json({status: "Ciudad creada exitosamente"});  
  })

/*traer el listado de todas las ciudades*/

server.get('/ciudades', /*verificarToken,*/ async (req, res) => {
    try {
        const results = await myDataBase.query('SELECT * FROM ciudades', { type: myDataBase.QueryTypes.SELECT });
        if(results){
            res.status(200).json(results);
        }else{
            throw new Error;
        }
    } catch (err) {
        res.status(400).json({
            message: `Error: ${err}`
        })
    }
  });

/*traer ciudades por ID de país*/

server.get('/ciudades/:id', /*verificarToken,*/ async (req, res) => {
  const {id} = req.params;
  try {
      const result = await myDataBase.query('SELECT * FROM ciudades WHERE id_pais = ?', {
          type: myDataBase.QueryTypes.SELECT,
          replacements: [id]
      });
      if(result.length == '0'){
          res.status(404).json({
              message: 'El país no existe'
          })
      }else if(result.length >= '1'){
          res.status(200).json(result)
      }else{
          throw new Error
      }
  } catch (err) {
      res.status(400).json({
          message: `Error: ${err}`
      });
  }
});

/*actualizar una ciudad*/

server.put('/ciudades/:id', verificarToken, async (req,res) => {
    const {id} = req.params;
    const {id_pais, ciudad} = req.body;
    try {
        const actualizar = await myDataBase.query('UPDATE ciudades SET id_pais = ?, ciudad = ? WHERE id_ciudad = ?', 
        {replacements: [id_pais, ciudad, id]});

        if(actualizar){
            res.status(200).json({
                message: 'Ciudad actualizada'
            });
            actualizar.push(req.body);
        }else{
            throw new Error;
        };

    } catch (err) {
        res.status(400).json({
            message: `Error: ${err}`
        });
    };

})

/*borrar una ciudad*/

server.delete('/ciudades/:id', verificarToken, async (req,res) => {
    const {id} = req.params;
    try {
        const ciudadEliminar = await myDataBase.query('DELETE FROM ciudades WHERE id_ciudad = ?', 
        {replacements: [id]});

        if(ciudadEliminar){
            res.status(200).json({
                message: 'Ciudad eliminada'
            });
        }else{
            throw new Error;
        };

    } catch (err) {
        res.status(400).json({
            message: `Error: ${err}`
        });
    };

})

/*Crear un contacto*/

server.post('/contactos', /*validarUsuario, userExist,*/  async (req,res) =>{
    const {nombre, apellido, id_compania, id_ciudad, direccion, cargo, interes, cuenta_telefono, preferencia_telefono, cuenta_whatsapp, preferencia_whatsapp, cuenta_instagram, preferencia_instagram, cuenta_facebook, preferencia_facebook, cuenta_linkedin, preferencia_linkedin} = req.body
    const contacto = await myDataBase.query ('INSERT INTO contactos (nombre, apellido, id_compania, id_ciudad, direccion, cargo, interes, cuenta_telefono, preferencia_telefono, cuenta_whatsapp, preferencia_whatsapp, cuenta_instagram, preferencia_instagram, cuenta_facebook, preferencia_facebook, cuenta_linkedin, preferencia_linkedin) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    {
        replacements: [nombre, apellido, id_compania, id_ciudad, direccion, cargo, interes, cuenta_telefono, preferencia_telefono, cuenta_whatsapp, preferencia_whatsapp, cuenta_instagram, preferencia_instagram, cuenta_facebook, preferencia_facebook, cuenta_linkedin, preferencia_linkedin],
        type: myDataBase.QueryTypes.INSERT
    }
    )
    contacto.push(req.body)
    res.status(201).json({status: "Contacto creado exitosamente"});  
  })

/*traer el listado de todos los contactos*/

server.get('/contactos', verificarToken, async (req, res) => {
    try {
        const results = await myDataBase.query('SELECT contactos.id_contacto,contactos.nombre,contactos.apellido,contactos.cargo,contactos.id_compania,compania.nombre AS nombre_compania,contactos.id_ciudad,ciudades.ciudad AS nombre_ciudad, paises.pais,paises.pais AS nombre_pais,regiones.id_regiones,regiones.region AS nombre_region,contactos.direccion,contactos.interes,contactos.cuenta_telefono,contactos.preferencia_telefono,pre_pho.preferencia AS preferencia_telefono,contactos.cuenta_whatsapp,contactos.preferencia_whatsapp,pre_wha.preferencia AS preferencia_whatsapp,contactos.cuenta_instagram,contactos.preferencia_instagram,pre_ins.preferencia AS preferencia_instagram,contactos.cuenta_facebook,contactos.preferencia_facebook,pre_fac.preferencia AS preferencia_facebook,contactos.cuenta_linkedin,contactos.preferencia_linkedin,pre_lin.preferencia AS preferencia_linkedin FROM contactos INNER JOIN compania ON contactos.id_compania=compania.id_compania INNER JOIN preferencias AS pre_pho ON contactos.preferencia_telefono=pre_pho.id_preferencia INNER JOIN preferencias AS pre_wha ON contactos.preferencia_whatsapp=pre_wha.id_preferencia INNER JOIN preferencias AS pre_ins ON contactos.preferencia_instagram=pre_ins.id_preferencia INNER JOIN preferencias AS pre_fac ON contactos.preferencia_facebook=pre_fac.id_preferencia INNER JOIN preferencias AS pre_lin ON contactos.preferencia_linkedin=pre_lin.id_preferencia INNER JOIN ciudades ON contactos.id_ciudad=ciudades.id_ciudad INNER JOIN paises ON ciudades.id_pais=paises.id_pais INNER JOIN regiones ON paises.id_regiones=regiones.id_regiones', { type: myDataBase.QueryTypes.SELECT });
        if(results){
            res.status(200).json(results);
            console.log(results);
        }else{
            throw new Error;
        }
    } catch (err) {
        res.status(400).json({
            message: `Error: ${err}`
        })
    }
});

/*borrar un contacto*/

server.delete('/contactos/:id', async (req,res) => {
    const {id} = req.params;
    try {
        const contactoEliminar = await myDataBase.query('DELETE FROM contactos WHERE id_contacto = ?', 
        {replacements: [id]});

        if(contactoEliminar){
            res.status(200).json({
                message: 'Contacto eliminado'
            });
        }else{
            throw new Error;
        };

    } catch (err) {
        res.status(400).json({
            message: `Error: ${err}`
        });
    };

})

/*modificar un contacto*/

server.patch('/contactos/:id', async (req,res) => {
    const {
      nombre,
      apellido,
      cargo,
      id_compania,
      id_ciudad,
      interes,
      cuenta_telefono,
      cuenta_whatsapp,
      cuenta_instagram,
      cuenta_facebook,
      cuenta_linkedin,
    } = req.body;
    const idContact = req.params.id;
    const preferencia_telefono = req.body.preferencia_telefono ? req.body.preferencia_telefono : 1;
    const preferencia_whatsapp = req.body.preferencia_whatsapp ? req.body.preferencia_whatsapp : 1;
    const preferencia_instagram = req.body.preferencia_instagram ? req.body.preferencia_instagram : 1;
    const preferencia_facebook = req.body.preferencia_facebook ? req.body.preferencia_facebook : 1;
    const preferencia_linkedin = req.body.preferencia_linkedin ? req.body.preferencia_linkedin : 1;
    try {
      const contactExistente = await myDataBase.query("SELECT id_contacto FROM contactos WHERE id_contacto=?", {
        replacements: [idContact],
        type: myDataBase.QueryTypes.SELECT,
      });
      if (contactExistente.length != 0) {
        if (
          nombre &&
          apellido &&
          cargo &&
          id_compania &&
          id_ciudad &&
          interes &&
          preferencia_telefono &&
          preferencia_whatsapp &&
          preferencia_instagram &&
          preferencia_facebook &&
          preferencia_linkedin
        ) {
          try {
            const data = await myDataBase.query(
              "UPDATE contactos SET nombre=?, apellido=?, cargo=?, id_compania=?, id_ciudad=?, interes=?, cuenta_telefono=?, preferencia_telefono=?, cuenta_whatsapp=?, preferencia_whatsapp=?, cuenta_instagram=?, preferencia_instagram=?,cuenta_facebook=?,  preferencia_facebook=?,cuenta_linkedin=?,  preferencia_linkedin=? WHERE id_contacto=?",
              {
                replacements: [
                  nombre,
                  apellido,
                  cargo,
                  id_compania,
                  id_ciudad,
                  interes,
                  cuenta_telefono,
                  preferencia_telefono,
                  cuenta_whatsapp,
                  preferencia_whatsapp,
                  cuenta_instagram,
                  preferencia_instagram,
                  cuenta_facebook,
                  preferencia_facebook,
                  cuenta_linkedin,
                  preferencia_linkedin,
                  idContact,
                ],
                type: myDataBase.QueryTypes.UPDATE,
              }
            );
            console.log(data);
            res.status(200).json({ msj: "Contacto modificado exitosamente" });
          } catch (err) {
            console.log("error" + err);
          }
        } else {
          res.status(400).json({ msj: "Todos los campos deben estar completos" });
        }
      } else {
        res.status(400).json({ msj: "Id contacto erroneo - No se encuentra en Base de Datos" });
      }
    } catch (err) {
      console.log("error" + err);
    }
  }),

/*conectar el servidor--------------------------------------------------------------------------------------------------------------------------*/

server.listen(3000, () =>{
    console.log('servidor iniciando...');
});
