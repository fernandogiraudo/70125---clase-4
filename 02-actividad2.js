const fs = require("fs");
const crypto = require("crypto");

class UserManager {
  constructor(path) {
    this.path = path;
  }

  async agregarUsuario(usuario) {
    if (
      !usuario.nombre ||
      !usuario.apellido ||
      !usuario.password ||
      !usuario.nombreUsuario
    ) {
      return console.log("Usuario incompleto");
    }

    const { nombre, apellido, password, nombreUsuario } = usuario;
    const usuarios = await this.obtenerUsuarios();
    const passwordSecurizada = await this.securizarPassword(password);
    const nuevoUsuario = {
        nombre,
        apellido,
        password: passwordSecurizada,
        nombreUsuario
    }

    usuarios.push(nuevoUsuario);
    await fs.promises.writeFile(this.path, JSON.stringify(usuarios), 'utf-8');
  }

  async obtenerUsuarios() {
    try {
      const resultado = await fs.promises.readFile(this.path, "utf-8");
      const usuarios = JSON.parse(resultado);
      return usuarios;
    } catch (error) {
        return [];
    }
  }

  async securizarPassword(password){
    const hash = crypto.createHash('sha256');
    hash.update(password);
    const passwordSecurizada = hash.digest('hex');
    return passwordSecurizada;
  }

  async validarUsuario(nombreUsuario, password){
    const users = await this.obtenerUsuarios();
    const user = users.find(u => u.nombreUsuario === nombreUsuario);
    if(!user){
        return console.log('El usuario no existe');
    }
    const bdPassword = user.password;
    const passwordSecurizada = await this.securizarPassword(password);
    if(bdPassword === passwordSecurizada){
        console.log('Logueado correctamente');
    }
    else{
        console.log('La contraseña es incorrecta');
    }
  }
}

const test = async () => {
    const userManager = new UserManager('./user.json');
    await userManager.agregarUsuario({
        nombre: 'Fernando',
        apellido: 'Giraudo',
        password: '123456789',
        nombreUsuario: 'fergiraudo'
    });

    await userManager.agregarUsuario({
        nombre: 'Sergio',
        apellido: 'Sosa',
        password: '987654321',
        nombreUsuario: 'sersosa'
    });

    console.log('Usuario: fergiraudo contraseña: 123456789: ');
    await userManager.validarUsuario('fergiraudo', '123456789');

    console.log('Usuario: fergiraudo contraseña: hola: ');
    await userManager.validarUsuario('sersosa', 'hola');
}

test();
