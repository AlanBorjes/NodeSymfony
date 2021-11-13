const getEmployee = () => {
    $.ajax({
        type: 'GET',
        headers: { "Accept": "application/json" },
        url: 'http://localhost/company/company/public/index.php/employee'
    }).done(res => {
        console.log(res.listEmployees);

        let listEmployees = res.listEmployees;
        let table = $("#tabla");
        table.append(
            "<tr class='table'>" +
            "<th scope='col'>#</th>" +
            "<th scope='col'>Name</th>" +
            "<th scope='col'>Address</th>" +
            "<th scope='col'>Created</th>" +
            "<th scope='col'>Updated</th>" +
            "<th scope='col'>Salary</th>" +
            "<th scope='col'>Status</th>" +
            "<th scope='col'>Acciones</th>" +
            "</tr>")

        for (let i = 0; i < listEmployees.length; i++) {
            var dateCreated = new Date(listEmployees[i].registered.date).toLocaleString();
            if (listEmployees[i].updated == null) {
                var dateUpdated = "Sin registro";
            } else {
                var dateUpdated = new Date(listEmployees[i].updated.date).toLocaleString();
            }

            table.append(
                "<tr>" +
                "<td>" + listEmployees[i].id + "</td>" +
                "<td>" + listEmployees[i].name + "</td>" +
                "<td>" + listEmployees[i].address + "</td>" +
                "<td>" + dateCreated + "</td>" +
                "<td>" + dateUpdated + "</td>" +
                "<td>" + listEmployees[i].salary + "</td>" +
                "<td>" + listEmployees[i].status + "</td>" +
                "<td>" + '<button onclick="getInfo(' + listEmployees[i].id + ');" type="button" class="btn btn-primary text-dark" data-bs-toggle="modal" data-bs-target="#details"> Detalles</button> </td>' +
                "<td>" + '<button onclick="getInfoUpdate(' + listEmployees[i].id + ');" type="button" class="btn btn-warning text-dark" data-bs-toggle="modal" data-bs-target="#update"> Modificar</button> </td>' +
                "<td>" + '<button onclick="getId(' + listEmployees[i].id + ');" type="button" class="btn btn-danger text-dark" data-bs-toggle="modal" data-bs-target="#delete2"> Eliminar</button> </td>' +
                "</tr>")
        }
    });
};

const create_employee = async() =>{
    let name = document.getElementById('name_register').value;
    let address = document.getElementById('address_register').value;
    let salary = document.getElementById('salary_register').value;
    let id_office = document.getElementById('officeCode_register').value;

    await $.ajax({
        type: 'POST',
        url: 'http://localhost/company/company/public/index.php/employe/create' ,
        data: {name, address, salary,id_office}
    }).done(function(res){
        console.log(res);
    });
};

const getEmployeeById = async id => {
    return await $.ajax({
        type: 'GET',
        url: 'http://localhost/company/company/public/index.php/employee/' + id
    }).done(res => res);
};


const getInfo = async id => {
    let employee = await getEmployeeById(id);
    var dateCreated = new Date(employee.employee[0].registered.date).toLocaleString();
    // let dateUpdated = new Date(school.school[0].updated.date).toLocaleString();

    if (employee.employee[0].updated == null) {
        var dateUpdated = "No hay fecha de actualización";
    } else {
        var dateUpdated = new Date(employee.employee[0].updated.date).toLocaleString();
    };

    document.getElementById('name').value = employee.employee[0].name;
    document.getElementById('address').value = employee.employee[0].address;
    document.getElementById('salary').value = employee.employee[0].salary;
    document.getElementById('updated').value = dateUpdated;
    document.getElementById('status').value = employee.employee[0].status ? "Activo" : "Inactivo";
    console.log(employee);
};

const getInfoUpdate = async id => {
    let employee = await getEmployeeById(id);
    var dateCreated = new Date(employee.employee[0].registered.date).toLocaleString();
    if (employee.employee[0].updated == null) {
        var dateUpdated = "No hay fecha de actualización";
    } else {
        var dateUpdated = new Date(employee.employee[0].updated.date).toLocaleString();
    };


    document.getElementById('id_update').value = id;
    document.getElementById('name_update').value = employee.employee[0].name;
    document.getElementById('street_update').value = employee.employee[0].street;
    document.getElementById('salary_update').value = employee.employee[0].street;
    document.getElementById('created_update').value = dateCreated;
    document.getElementById('updated_update').value = dateUpdated;
};

const updateEmployee = async () => {
    let id = document.getElementById('id_update').value;
    let name = document.getElementById('name_update').value;
    let address = document.getElementById('address_update').value;
    let salary = document.getElementById('salary_update').value;
    console.log(id);

    $.ajax({
        type: 'POST',
        url: 'http://localhost/company/company/public/index.php/employee/update/' + id,
        data: { name, address, salary }
    }).done(function (res) {
        console.log(res);
    });
};
const getId = async id => {
    document.getElementById("id_delete").value = id;
    console.log(id_delete);
    console.log(document.getElementById("id_delete").value);
};
const deleteEmployee = async () => {
    let id = document.getElementById("id_delete").value;
    await $.ajax({
        type: 'GET',
        url: 'http://localhost/company/company/public/index.php/employee/delete/' + id
    }).done(res => {
        console.log(res);
    });
};

const Employee = () => {
    $.ajax({
        type: 'GET',
        headers: { "Accept": "application/json" },
        url: 'http://localhost/company/company/public/index.php/employee'
    }).done(res => {
        console.log(res.listEmployees);
        let listEmployees = res.listEmployees;
        let employee = $("#officeCode_register");
        for (let i = 0; i < listEmployees.length; i++) {
            employee.append(
                "<li id =officeCode_register >" + listEmployees[i].id + "</li>" 
            )
        }
    });
};

//Metodos de Office
const getOffice = () => {
    $.ajax({
        type: 'GET',
        headers: { "Accept": "application/json" },
        url: 'http://localhost:4000/office',

    }).done(res => {
        console.log(res.listOffice);

        let listOffice = res.listOffice;
        let table = $("#tabla2");
        table.append(
            "<tr class='table2'>" +
            "<th scope='col'>#</th>" +
            "<th scope='col'>Name</th>" +
            "<th scope='col'>Address</th>" +
            "<th scope='col'>Acciones</th>" +
            "</tr>")

        for (let i = 0; i < listOffice.length; i++) {

            table.append(
                "<tr>" +
                "<td>" + listOffice[i].id + "</td>" +
                "<td>" + listOffice[i].office_code + "</td>" +
                "<td>" + listOffice[i].address + "</td>" +
                "<td>" + '<button onclick="getInfo2(' + listOffice[i].id + ');" type="button" class="btn btn-primary text-dark" data-bs-toggle="modal" data-bs-target="#detailsOffice"> Detalles</button> </td>' +
                "<td>" + '<button onclick="getInfoUpdateOffice(' + listOffice[i].id + ');" type="button" class="btn btn-warning text-dark" data-bs-toggle="modal" data-bs-target="#updateOffice"> Modificar</button> </td>' +
                "<td>" + '<button onclick="getIdOffice(' + listOffice[i].id + ');" type="button" class="btn btn-danger text-dark" data-bs-toggle="modal" data-bs-target="#deleteOffice"> Eliminar</button> </td>' +
                "</tr>")
        }
    });
};

const getOfficeById = async id => {
    return await $.ajax({
        type: 'GET',
        url: 'http://localhost:4000/office/' + id
    }).done(res => res);
};
const getInfo2 = async id => {
    let office = await getOfficeById(id);

    document.getElementById('OfficeCode').value = office.office[0].office_code;
    document.getElementById('addressOffice').value = office.office[0].address;
    console.log(office);
};

const getInfoUpdateOffice = async id => {
    let office = await getOfficeById(id);

    document.getElementById('id_updateOffice').value = id;
    document.getElementById('officeCode_update').value = employee.employee[0].name;
    document.getElementById('address_updateOffice').value = employee.employee[0].street;

};
const updateOffice = async () => {
    let id = document.getElementById('id_updateOffice').value;
    let office_code = document.getElementById('officeCode_update').value;
    let address = document.getElementById('address_updateOffice').value;
    console.log(id);

    $.ajax({
        type: 'POST',
        url: 'http://localhost:4000/office/update/' + id,
        data: { id, office_code, address }
    }).done(function (res) {
        console.log(res);
    });
};
const deleteOffice = async () => {
    let id = document.getElementById("id_deleteOffice").value;
    await $.ajax({
        type: 'POST',
        url: 'http://localhost:4000/office/delete/' + id,
    }).done(res => {
        console.log(res);
    });
};
const getIdOffice = async id => {
    document.getElementById("id_deleteOffice").value = id;
    console.log(id_deleteOffice);
    console.log(document.getElementById("id_deleteOffice").value);
};
const create_office = async() =>{
    let office_code = document.getElementById('Office_register').value;
    let address = document.getElementById('addressOficce_register').value;

    await $.ajax({
        type: 'POST',
        url: 'http://localhost:4000/office/create',
        data: {office_code, address }
    }).done(function(res){
        console.log(res);
    });
};