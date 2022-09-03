import useSupabase from '../../boot/supabase';
import { deducirMensajeError } from '../../utils/AppUtils';

export function useApiSupabase() {
	const { supabase } = useSupabase();

	const selectByIdSupabase = async (table, columns, id) => {
		try{
			const {data, error } = await supabase.from(table).select(columns).eq('id', id);
			if(error){
				return {mensaje:error};
			}
			return {mensaje:'', data:data[0]};
		}catch(error){
			console.log('error', error)
			return {mensaje:error};
		}
	}

	const insertSupabase = async (table, formData) => {
		try{
			const { data, error } = await supabase.from(table).insert([...formData]);
			if(error){
				return {mensaje: deducirMensajeError(error)};
			}
			const id = data[0].id;
			return {mensaje:'', id};
		}catch(ex){
			return {mensaje: deducirMensajeError(ex)};
		}
	}

	return {
		selectByIdSupabase, insertSupabase
	}
}
