
import { useQuasar } from 'quasar';

export function useMensajes () {
    const q = useQuasar();

    const mostrarMensaje = (titulo, mensaje) => q.dialog({
		dark:q.dark.isActive,
		title:titulo,
		message:mensaje,
		html:true
	});

	const mostrarConfirmacion = (mensaje, posicion) => {
        if(mensaje.trim().length === 0){
            return;
        }
        q.notify({
            message:mensaje,
            color:'grey-8',
            multiLine: true,
            position:posicion === undefined ? 'center' : posicion,
            icon:'info',
            actions: [
                { label: 'Cerrar', color: 'white', handler: () => {  } }
              ]
        });
    }

	const mostrarError = (mensaje, posicion) => {
        if(mensaje.trim().length === 0){
            return;
        }
        q.notify({
            message:mensaje,
            color: 'red-4',
            multiLine: true,
            position:posicion === undefined ? 'center' : posicion,
            icon:'error',
            actions: [
                { label: 'Cerrar', color: 'white', handler: () => {  } }
              ]
        });
    };

    return {
        mostrarMensaje, mostrarConfirmacion, mostrarError
    }
}
