<template>
	<div>
		<div class="row q-pa-sm">
			<div class="column col-xs-12">
				<span class="text-h6 text-center text-bold text-grey-7">{{ resumen.titulo }}</span>
			</div>
			<div class="column col-xs-12">
				<span class="text-subtitle2 text-center text-capitalize text-bold text-grey-7">{{ resumen.subtitulo }} </span>
			</div>
		</div>
		<q-table virtual-scroll :virtual-scroll-item-size="48" :virtual-scroll-sticky-size-start="48" :virtual-scroll-sticky-size-end="32"
			:v-model:pagination="pagination" :rows-per-page-options="[0]" dense :columns="columnas" no-data-label="No hay datos disponibles"
			:rows="resumen.contenido" row-key="id" style="height:calc(100vh - 179px);max-width: 100vw" hide-header hide-bottom>
			<template v-slot:top>
				<div class="row full-width text-caption text-grey-7 text-bold" style="font-size:12px">
					<div class="column col-xs-12 items-center">{{ resumen.autor }}</div>
				</div>
				<div class="row full-width text-caption text-grey-7" style="font-size:12px">
					<div class="column col-xs-4 items-center">Saldo</div>
					<div class="column col-xs-4 items-center">(-) Cheques</div>
					<div class="column col-xs-4 items-end text-grey-7 text-weight-bold">(=) Saldo</div>
				</div>
				<div class="row full-width text-caption text-grey-7" style="font-size:12px">
					<div class="column col-xs-4 items-center">{{ resumen.saldo }}</div>
					<div class="column col-xs-4 items-center">{{ resumen.cheques }}</div>
					<div class="column col-xs-4 items-end text-red-7 text-weight-bold">{{ resumen.saldo_final }}</div>
				</div>
        		<div class="row full-width text-caption text-grey-7" style="font-size:12px">
					<div class="column col-xs-5 text-grey-7 text-weight-bold">Documento</div>
					<div class="column col-xs-3 text-grey-7 text-weight-bold">F/Apertura</div>
					<div class="column col-xs-4 items-end text-grey-7 text-weight-bold">Saldo</div>
				</div>
      		</template>
        	<template v-slot:body="props">
            	<q-tr :props="props">
            	<q-td style="cursor:pointer" key="id" :props="props">
					<div class="row full-width text-caption text-grey-7" style="font-size:12px">
						<div class="column col-xs-5 text-brown">
							{{ props.row.documento }}
						</div>
						<div class="column col-xs-3 content-center">
							<span>{{ props.row.fecha }}</span>
						</div>
						<div class="column col-xs-4 items-end text-grey-7 text-weight-bold">
							<span>{{ props.row.saldo }}</span>
						</div>
					</div>
            	</q-td>
            	</q-tr>
        	</template>
    	</q-table>
	</div>
</template>

<script setup>

import { onMounted, ref } from 'vue';
import { QSpinnerFacebook, useQuasar } from 'quasar';
import { useApiSupabase } from '../services/supabase/useApiSupabase';
import { useMensajes } from '../services/useMensajes';

	const props = defineProps({
    	id: {
        	type: Number,
        	required: true,
    	},
  	});
	const q = useQuasar();
  	const pagination = ref({rowsPerPage: 0});
	const columnas = [{name:'id', label:'', field:'id', sortable:true, align:'left', style:'width: 100px',}];
	const resumen = ref({
		titulo:'',
		subtitulo:'',
		autor:'',
		contenido:[],
		suma:0.00
	});
	const { selectByIdSupabase } = useApiSupabase();
	const { mostrarMensaje } = useMensajes();

	onMounted(async () => {
		q.loading.show({spinner:QSpinnerFacebook, message:"Consultando.."});
		const respuesta = await selectByIdSupabase('resumen_compartido', 'contenido', props.id);
		q.loading.hide();
		if(respuesta.mensaje.length > 0){
			mostrarMensaje('Error', respuesta.mensaje);
			return;
		}
		resumen.value = respuesta.data.contenido;
		console.log(resumen.value)
	});

</script>
