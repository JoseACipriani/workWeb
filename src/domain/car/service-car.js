const Car = require('./car');
let ID = 1;
let registros = [];

    class CarService {

        findAll(){
            return registros;
        }

        findById(ID) {
            return registros.find((registro) => registro.ID == ID);
        }

        insert(marca, modelo, ano, vendido) {

            const car = new Car(ID++, marca, modelo, ano, vendido);
            registros.push(car);
            return car;

        }

        update(ID, marca, modelo, ano, vendido) {
            registros = registros.map((registro)=> {

                if (registro.ID == ID) {

                    registro.marca   = marca;
                    registro.modelo  = modelo;
                    registro.ano     = ano;
                    registro.vendido = vendido;
                }
                return registro;
            });

            return new Car(ID, marca, modelo, ano, vendido);
        }

        remove(ID) {
            const old = registros.length;
            registros = registros.filter((registro) => registro.ID != ID);
            
            return old > registros.length;
        }

    }

module.exports = new CarService();