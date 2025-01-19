//------------------------------------------Lista ingresos egresos--------------------------------------------------------------
const ingresos = [

];

const egresos = [

];

//-------------------------------------------formatear moneda a metodo ingles en dolares--------------------------------------------
const formatoMoneda = (valor) =>{
    return valor.toLocaleString("es-CO",{style:"currency", currency:"COP",minimumFractionDigits:2});
};
//-------------------------------------------formatear valor de porcentaje a porcentaje--------------------------------------------
const formatoPorcentaje = (valor) => {
    return valor.toLocaleString("en-US",{style:"percent", minimumFractionDigits:2});
}
//------------------------------------------- función  para ingreos totales------------------------------------------------------
let totalIngresos = () =>{
    let totalIngreso=0;
    for(let ingreso of ingresos){
        totalIngreso += ingreso.valor;
    }
    return totalIngreso;
};
//--------------------------------------------funcion suma egresos totales-----------------------------------------------------
let totalEgresos = () =>{
    let totalEgreso=0;
    for(let egreso of egresos){
        totalEgreso += egreso.valor;
    }
    return totalEgreso;
};
//-------------------------------------------funcion carga de datos en cabecero----------------------------------------------
let cargarCabecero = () =>{
    let presupuesto = totalIngresos() - totalEgresos();
    let porcentajeEgreso = totalEgresos() / totalIngresos();
    document.getElementById("presupuesto").innerHTML = formatoMoneda(presupuesto);
    document.getElementById("porcentaje").innerHTML = formatoPorcentaje(porcentajeEgreso);
    document.getElementById("ingresos").innerHTML = formatoMoneda(totalIngresos());
    document.getElementById("egresos").innerHTML = formatoMoneda(totalEgresos());
};


// -----------------------------------------aqui se cargan los ingresos y egresos ---------------------------------------------------------------
const cargarIngresos = () =>{
    let ingresoHTML = "";
    for(let ingreso of ingresos){
        ingresoHTML += crearIngresoHTML(ingreso);
    };
    document.getElementById("lista-ingresos").innerHTML = ingresoHTML;
}
const crearIngresoHTML = (ingreso)=>{
    let ingresosHTML =`
    <div class="elemento">
        <div class="elementoDescripcion">${ingreso.descripcion}</div>
            <div class="derecha">
                <div class="elementoValor">+ ${formatoMoneda(ingreso.valor)}</div>
                <svg onclick="borrar(${ingreso.id})" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="" stroke="red" stroke-linecap="round" stroke-linejoin="round" width="14" height="14" stroke-width="1.5">
                    <path d="M18 6l-12 12"></path>
                    <path d="M6 6l12 12"></path>
                </svg>
            </div>
        </div>
    `
    return ingresosHTML;
};

const CARGAR_EGRESOS = () =>{
    let egresosHTML = ""
    for(let egreso of egresos){
        egresosHTML += crearEgresoHTML(egreso); 
    }
    document.getElementById("lista-Egresos").innerHTML = egresosHTML;
};
const crearEgresoHTML =(egreso) =>{
    let egresosHTML = `
    <div class="elemento">
                    <div class="elementoDescripcion">${egreso.descripcion}</div>
                    <div class="derecha">
                        <div class="elementoValor salida">+ ${formatoMoneda(egreso.valor)}</div>
                        <svg onclick="borrarEgreso(${egreso.id})" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="" stroke="red" stroke-linecap="round" stroke-linejoin="round" width="14" height="14" stroke-width="1.5">
                            <path d="M18 6l-12 12"></path>
                            <path d="M6 6l12 12"></path>
                        </svg>
                    </div>
                </div>
    `
    return egresosHTML;
}

//---------------------------------------------metodo para eliminar datos -------------------------------------------------------------

const borrar = (id)=>{
    let indiceEliminar = ingresos.findIndex( ingreso => ingreso.id === id);
    ingresos.splice(indiceEliminar,1);
    cargarCabecero();
    cargarIngresos();

};

const borrarEgreso = (id)=>{
    let indiceEliminar = egresos.findIndex( egreso => egreso.id === id);
    egresos.splice(indiceEliminar,1);
    cargarCabecero();
    CARGAR_EGRESOS();

};

// ------------------------------------------------------FORMULARIO----------------------------------------------------------------------
let agregarDato = () =>{
    let forma = document.forms["forma"];
    let tipo = forma["tipo"];
    let descripcion = forma["descripcion"];
    let valor = forma["valor"];
    if(descripcion.value !== "" && valor.value !== ""){
        if(tipo.value === "ingreso"){
            ingresos.push(new Ingreso(descripcion.value,Number(valor.value)));
            cargarCabecero();
            cargarIngresos();
        }
        else if(tipo.value === "egreso"){
            egresos.push(new Egreso(descripcion.value, +valor.value));
            cargarCabecero();
            CARGAR_EGRESOS();
        }
    }
};
//--------------------------------------------funcion onload que desencadena las otras funciones------------------------------------------
let cargarApp = () =>{
    cargarCabecero();
    cargarIngresos();
    CARGAR_EGRESOS();
};





