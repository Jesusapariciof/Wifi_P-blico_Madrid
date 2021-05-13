const url = "https://datos.madrid.es/egob/catalogo/216619-0-wifi-municipal.json"

fetch(url)
    .then(respuesta => respuesta.json())
    .then(resultados => {
        resultado = resultados["@graph"]
        console.log(resultado)
        obtenerDatos(resultado)
        listener(resultado)
    })

function obtenerDatos(resultado) {
    limpiarTabla()
    tbody = document.querySelector('#tabla')
    for (let i = 0; i < resultado.length; i++) {

        let tr = document.createElement('tr')

        let localidad = document.createElement('td')
        localidad.innerText = resultado[i].address["locality"]

        let cp = document.createElement('td')
        cp.innerText = resultado[i].address["postal-code"];

        let lugar = document.createElement('td')
        lugar.innerText = resultado[i].title;

        let horario = document.createElement('td')
        horario.innerText = resultado[i].organization.schedule

        let direccion = document.createElement('td')
        direccion.innerText = resultado[i].address["street-address"];

        // let web = document.createElement('td')
        // web.innerText = resultado[i].relation

        tr.append(localidad)
        tr.append(cp)
        tr.append(lugar)
        tr.append(horario)
        tr.append(direccion)
        // tr.append(web)


        tbody.append(tr);
    }

}

function filtro(resultado) {
    let input = document.querySelector('#filtro').value
   

    let filtrado = resultado.filter((e) => {
        if (e.address["street-address"].toLowerCase().includes(input.toLowerCase()) || e.address["postal-code"].toLowerCase().includes(input.toLowerCase())) {
            return true;
        }

    })
    if (filtrado.length === 0) {
        mensajeError()
    }
    else {
        getQuitarErrorFiltro()
    }
    obtenerDatos(filtrado)
}

function listener(resultado) {

    let boton = document.querySelector('#boton');
    boton.addEventListener('click', () => {
        filtro(resultado)
    })
}

function limpiarTabla() {
    document.getElementById("tabla").innerText = "";
}

function mensajeError() {
    let errores = document.querySelector('.error')
    errores.innerHTML = "";
    let error = document.createElement('p');
    error.innerText = ('No hay ningún lugar con wifi gratis en esta dirección. Por favor, busque otra vez.')

    errores.append(error)

}

function getQuitarErrorFiltro() {
    let alerta = document.querySelector(".error");
    alerta.innerHTML = ""
}