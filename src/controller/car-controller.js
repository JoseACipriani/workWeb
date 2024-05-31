const service = require('../domain/car/service-car');


class CarController {

    remove(request, response){

        const {ID} = request.params;
        const ok = service.remove(ID);
        const message = ok ? "Carro removido com sucesso!" : "Não foi possível remover o carro!";
        const cars = service.findAll();

        const modelView = {
            message,
            cars
        }

        response.render('car/list.html', modelView);
    }

    findAll(request, response) {

        const cars = service.findAll();
        const modelView = {
            cars
        }

        response.render('car/list.html', modelView);
    }

    showForm(request, response) {

        const {ID} = request.params;
        const car = service.findById(ID) || {ID:"novo"};

        if (ID && ID.trim().length > 0) {

            const modelView = {
                car
            }

            response.render('car/form.html', modelView);
        }
    }

    save(request, response) {

        const paramsId = request.params.ID;
        const {ID, marca, modelo, ano, vendido} = request.body;
        let message = "";
        let car = null;

        if (ID && ID.trim() == paramsId.trim() && ID != "novo") {

            car = service.update(ID, marca, modelo, ano, vendido);
            message = "Carro atualizado com sucesso!";

        } else {

            car = service.insert(marca, modelo, ano, vendido);
            message = "Carro inserido com sucesso!";

        }
        
        const modelView = {
            car,
            message
        }

        response.render('car/form.html', modelView);
    }

}

const controller = new CarController();

function configure(app) {

    app.get('/car', controller.findAll);
    app.get('/car/:ID', controller.showForm);
    app.get('/car/:ID/remove', controller.remove);
    app.post('/car/:ID', controller.save);
}

module.exports = {
    configure
}