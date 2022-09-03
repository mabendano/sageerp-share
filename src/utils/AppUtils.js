import { TRUNC, ROUND, LAST_DAY, INLIST } from './JVFP';

export function numberFormat(value, decimals, decimal_sep, thousands_sep){
    let n = value;
    let c = isNaN(decimals) ? 2 : Math.abs(decimals);
    let d = decimal_sep || '.';

    let t = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep

    let sign = (n < 0) ? '-' : '';

    let i = parseInt(n = Math.abs(n).toFixed(c)) + '';
    let j = i.length;
    j = (j > 3) ? j % 3 : 0;
    return sign + (j ? i.substr(0, j) + t : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : '');
}

export function soloNumeros(valor) {
    return !/^([0-9])*$/.test(valor);
}

export function esNumero(valor) {
    return /^([0-9])*$/.test(valor);
}

export function replaceAll(texto, ocurrencia, reemplazo) {
    return texto.replace(new RegExp(ocurrencia, "g"), reemplazo);
}

export function formatoFacturaValido(numero) {
    const tokens = numero.split("-");
    if (tokens.length < 3) {
        return false;
    }
    if (tokens[0].length !== 3) {
        return false;
    }
    if (tokens[1].length !== 3) {
        return false;
    }
    if (tokens[2].length === 0) {
        return false;
    }
    return true;
}

export function formatDate(date) {
    if (!date) return null;

    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
}

export function getDateLegend(local_desde, local_hasta){
    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const separador = local_desde.indexOf("-") >= 0 ? '-' : '/';
    const [year_desde, month_desde, day_desde] = local_desde.split(separador);
    const l_desde = new Date(year_desde, month_desde -1, day_desde, 0, 0, 0, 0);
    const [year_hasta, month_hasta, day_hasta] = local_hasta.split(separador);
    const l_hasta = new Date(year_hasta, month_hasta - 1, day_hasta, 0, 0, 0, 0);
    let l_hoy = new Date();
    l_hoy.setHours(0);
    l_hoy.setMinutes(0);
    l_hoy.setSeconds(0);
    l_hoy.setMilliseconds(0);
    let ultimo_dia = LAST_DAY(l_hasta.getFullYear(), l_hasta.getMonth() + 1);
    if(toISOString(l_desde) === toISOString(l_hasta) && toISOString(l_desde) === toISOString(l_hoy)){
        return "HOY";
    }
    if(l_desde.getMonth() === l_hasta.getMonth() && l_desde.getFullYear() === l_hasta.getFullYear() && l_desde.getDate() === 1 && INLIST(l_hasta.getDate(), [l_hoy.getDate(), ultimo_dia])){
        return meses[l_desde.getMonth()] + " " + l_desde.getFullYear();
    }
    if(l_desde.getDate() === 1 && l_hasta.getDate() === 31 && l_desde.getMonth() === 0 && l_hasta.getMonth() === 11 && l_desde.getFullYear() === l_hasta.getFullYear()){
        return l_desde.getFullYear();
    }
    return formatDate(toISOString(l_desde)) + " - " + formatDate(toISOString(l_hasta));
}

export function toISOString(date){
    const respuesta = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().substr(0, 10);
    return respuesta;
}

export function toISOString_(date){
    const respuesta = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().substr(0, 19);
    return respuesta.replace('T', ' ');
}

export function dateToSQL(date) {
	if(date === undefined){
		return '2000-01-01';
	}
	if(date === null){
		return '2000-01-01';
	}
    const separator = date.indexOf("/") > -1 ? '/' : '-';
    let [year, month, day] = date.split(separator);
    let mes = month.padStart(2, '0');
    let dia = day.padStart(2, '0');
    return `${year}-${mes}-${dia}`;
}

export function getDateToSQL() {
    let ts = Date.now();
    let date_ob = new Date(ts);
    let date = date_ob.getDate();
    let month = date_ob.getMonth() + 1;
    let year = date_ob.getFullYear();
    return year + "-" + month + "-" + date;
}

export function getDateTime() {
    let ts = Date.now();
    let date_ob = new Date(ts);
    let date = date_ob.getDate();
    let month = date_ob.getMonth() + 1;
    let year = date_ob.getFullYear();
    let hour = date_obj.getHours();
    let minutes = date_obj.getMinutes();
    let seconds = date_obj.getSeconds();
    return new Date(year + "-" + month + "-" + date + " " + hour + ":" + minutes + ":" + seconds);
}

export function getFirstDate() {
    let ts = Date.now();
    let date_ob = new Date(ts);
    let date = 1;
    let month = date_ob.getMonth() + 1;
    let year = date_ob.getFullYear();
    return new Date(year + "-" + month + "-" + date);
}


export function pasar_caja_a_unidad(cantidad, factor) {
    if (factor === 1) {
        return cantidad;
    }
    let multiplo = factor == 1 ? 1 : factor <= 100 ? 100 : 1000;
    let decimal = (cantidad - TRUNC(cantidad, 0)) * multiplo;
    return ROUND(TRUNC(cantidad, 0) * factor + decimal, 0);
}

export function UNIDADES_A_CAJAS(unidades, factor) {
    let multiplo = factor === 1 ? 1 : factor <= 100 ? 100 : 1000;
    factor = factor == 0 ? 1 : factor;
    let div = unidades / factor;
    let rst = parseInt(div, 10); // obtengo la parte entera que seran las cajas obtenidas tras la divicion
    let dif = unidades - rst * factor;
    multiplo = dif > multiplo ? 10000 : multiplo;
    return rst + dif / multiplo;
}

export function elevarA(elevar, aLa) {
    return Math.pow(elevar, aLa);
}

export function removeObjectFromArray(arrayObj, key, value){
    let index = -1;
    for(let i = 0; i < arrayObj.length; i++){
        const obj = arrayObj[i];
        if(obj[key] === value){
            index = i;
            break;
        }
    }
    if(index > -1 ){
        arrayObj.splice(index, 1);
        return true;
    }
    return false;
}

export const ENUMS = {
    COMERCIOS:0,
    PRODUCTORES:1,
    ASOCIACIONES:2,
    EDUCATIVOS:3,
    DISTRIBUIDORAS:4,
    BAR_RESTAURANT:5,

    DT_CANTINI:1,
    PROMOCION:2,
    DT_CANREC:3,
    DT_CANDEV:4,
    DT_CANT:5,

    NUBE:0,
	LOCAL:1,
    DISPOSITIVO:2,

    VISTA_AVANZADA:0,
    VISTA_LABORATORIO:1,

    FACTURA:1,
    NV:2,
    NC:3,
    ND:4,
    GUIA_REM:5,
    LIQUIDACION:6,
    RETENCION:7,
}

export function deducirMensajeError(o_error){
    let mensaje = '';
    let hubo = false;
    if(o_error.message){
        mensaje = o_error.message === 'Network Error' ? 'La aplicación no logra conectarse con el servidor, revise si su dispositivo esta con internet o si el servidor esta disponible.' : o_error.message;
        hubo = true;
    }
    if(o_error.config){
        if(o_error.config.url){
            mensaje = mensaje + "<br><span style='color:red'>" + o_error.config.url + "</span>";
            hubo = true;
        }
    }
    if(hubo === false){
        mensaje = JSON.stringify(o_error);
    }
    return mensaje;
}

export function codify(_value) {
    _value = _value.trim();
    let posicionRecorrido = 0;
    let longitudCadena = _value.length;
    let valorLetraenCurso = 0;
    let claveEncriptada = "";
    while (posicionRecorrido < longitudCadena) {
        valorLetraenCurso = _value.charCodeAt(posicionRecorrido);
        valorLetraenCurso = (valorLetraenCurso * 2) - 5;
        let letraCHR = String.fromCharCode(valorLetraenCurso);
        claveEncriptada = claveEncriptada + letraCHR;
        posicionRecorrido++;
    }
    return claveEncriptada;
}

export function deCodify(_value) {
    _value = _value.trim();
    let posicionRecorrido = 0;
    let longitudCadena = _value.length;
    let valorLetraenCurso = 0;
    let claveDesencriptada = "";
    while (posicionRecorrido < longitudCadena) {
        valorLetraenCurso = _value.charCodeAt(posicionRecorrido);
        valorLetraenCurso = (valorLetraenCurso + 5) / 2;
        let letraCHR = String.fromCharCode(valorLetraenCurso);
        claveDesencriptada = claveDesencriptada + letraCHR;
        posicionRecorrido++;
    }
    return claveDesencriptada;
}

