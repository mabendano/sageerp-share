import { date } from 'quasar';

export const ENERO = 1;
export const FEBRERO = 2;
export const MARZO = 3;
export const ABRIL = 4;
export const MAYO = 5;
export const JUNIO = 6;
export const JULIO = 7;
export const AGOSTO = 8;
export const SEPTIEMBRE = 9;
export const OCTUBRE = 10;
export const NOVIEMBRE = 11;
export const DICIEMBRE = 12;
export const LUNES = 1;
export const MARTES = 2;
export const MIERCOLES = 3;
export const JUEVES = 4;
export const VIERNES = 5;
export const SABADO = 6;
export const DOMINGO = 7;
	
export function INLIST(valor, lista) {   
	return lista.includes(valor);
}

export function TRUNC(nD, nDec){
    let rst = 0;
    if (nD > 0) {
    	rst = Math.floor(nD * Math.pow(10, nDec)) / Math.pow(10, nDec);
    } else {
      	rst = Math.ceil(nD * Math.pow(10, nDec)) / Math.pow(10, nDec);
    }
    return rst;
}

export function ROUND(nD, nDec) {
	return Math.round(nD * Math.pow(10, nDec)) / Math.pow(10, nDec);
}

export function PADR(eExpression, nResultSize, cPadCharacter) {	
	return eExpression.padEnd(nResultSize, cPadCharacter);
}

export function PADL(eExpression, nResultSize, cPadCharacter) {
	return eExpression.padStart(nResultSize, cPadCharacter);
}

export function REPEAT(cExpression, ocurrencias) {
	return cExpression.repeat(ocurrencias);
}

export function OCCURS(_cSearchExpression, _cExpressionSearched) {
	let nOccurs = 0;
	for (let i = 0; i < _cExpressionSearched.length; i++) {
		let value = _cExpressionSearched.substring(i, i + 1);
		if (_cSearchExpression === value) {
			nOccurs += 1;
		}
	}
	return nOccurs;
}

export function BETWEEN(value, minValue, maxValue) {
	if (value >= minValue && value <= maxValue) {
		return true;
	}
    return false;
}

export function BETWEEN_DATE(value, minValue, maxValue) {	
	return date.isBetweenDates(value, minValue, maxValue, { inclusiveFrom: true, inclusiveTo: true, onlyDate: true });
}

export function DAY(_date) {
	if(typeof _date === 'string'){ 
		let newDate = new Date(_date);				
		return newDate.getDay();  
	}else{	
		return _date.getDay();
	}
}

export function MONTH(_date) {
	if(typeof _date === 'string'){ 
		let newDate = new Date(_date);				
		return newDate.getMonth();  
	}else{	
		return _date.getMonth();
	}
}

export function YEAR(_date) {
	if(typeof _date === 'string'){ 
		let newDate = new Date(_date);				
		return newDate.getFullYear();  
	}else{	
		return _date.getFullYear();
	}
}

export function LAST_DAY(anio, mes) {
	let nDay = -1;
	if (mes > 12) {
		nDay = -1;
	}
	if (mes == 0) {
		nDay = -1;
	}
	if (mes == FEBRERO) {
		nDay = anio % 4 == 0 ? 29 : 28;
	}
	if (mes == ENERO || mes == MARZO || mes == MAYO || mes == JULIO || mes == AGOSTO || mes == OCTUBRE || mes == DICIEMBRE) {
		nDay = 31;
	}
	if (mes == ABRIL || mes == JUNIO || mes == SEPTIEMBRE || mes == NOVIEMBRE) {
		nDay = 30;
	}
	return nDay;
}

export function DATE_TO_ADD_UP_DAYS(_date, _days){		
	let newDate = null;
	if(typeof _date === 'string'){
		newDate = new Date(Date.parse(_date));		
	}else{
		newDate = _date;		
	}	
    newDate = date.addToDate(newDate, { days:_days})    
	return newDate;
}

export function groupBy(xs, f) {
	return xs.reduce((r, v, i, a, k = f(v)) => ((r[k] || (r[k] = [])).push(v), r), {});
}

export function getKeyWords(text, separator){
	const tokens = text.trim().split(separator);
	const words = [];
	tokens.forEach(token => {
		if(token.trim().length > 0){
			words.push(token);
		}
	});
	return words;
}

export function IN(textSearch, values){	    
	const separador = ' ';
    textSearch = textSearch === null ? '' : textSearch === undefined ? '' : textSearch.replace(new RegExp('%', "g"), separador);
    if(textSearch.length === 0 || values.length === 0){
        return false;
    }	 
    const palabras = textSearch.split(separador); 
    let contador = 0;
    for(let i = 0; i < palabras.length; i++){
        const palabra = palabras[i];    
        const cuantos = values.filter(value => value === null ? false : value === undefined ? false : value.toUpperCase().trim().includes(palabra.toUpperCase().trim())).length;
        if(cuantos > 0){
            contador += 1;
        }
    }    
    return contador === palabras.length;     
}
