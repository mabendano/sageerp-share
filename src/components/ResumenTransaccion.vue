<template>
	<div>
		<div class="row q-pa-sm">
			<div class="column col-xs-12">
				<span class="text-h6 text-center text-bold text-grey-7">{{ resumen.titulo }}</span>
			</div>
			<div class="column col-xs-12">
				<span class="text-subtitle2 text-center text-capitalize text-bold text-grey-7">{{ resumen.subtitulo }} Por {{ resumen.autor }}</span>
			</div>
		</div>
		<q-table virtual-scroll :v-model:pagination="pagination" :rows-per-page-options="[0]" :virtual-scroll-item-size="48" :virtual-scroll-sticky-size-start="48" :virtual-scroll-sticky-size-end="32"
			:columns="columnas" no-data-label="No hay datos disponibles" :rows="resumen.contenido"	row-key="index"
			style="height:calc(100vh - 179px);max-width:100vw" hide-header >

			<template v-slot:body="props">
				<q-tr :props="props" :class="`${props.rowIndex % 2 === 0 ? 'bg-white' : 'bg-grey-3'}`">
				<q-td style="cursor:pointer" key="id" :props="props">
					<div class="row q-pa-xs justify-center">
						<div class="column col-xs-12 text-grey-7 text-bold justify-center multiline" style="font-size:12px">
							{{ props.row.codigo }} - {{ props.row.producto }}
						</div>
					</div>
					<div class="row" style="font-size:12px">
						<div class="column col-xs-3 text-grey-8 text-bold content-center">
							<span>Cantidad</span>
						</div>
						<div class="column col-xs-3 text-grey-8 text-bold content-center">
							<span>
								<span class="text-red text-bold">{{props.row.iva === 'T' ? '*' : ''}}</span>
								Precio
							</span>
						</div>
						<div class="column col-xs-2 text-grey-8 text-bold content-center">
							<span>% Dcto</span>
						</div>
						<div class="column col-xs-4 text-grey-8 text-bold content-center">
							<span>Precio C/D</span>
						</div>
					</div>
					<div class="row">
						<div class="column col-xs-3 text-grey-8 text-bold content-center" >
							<span style="font-size:12px" class="q-pt-xs text-caption">
								<span>{{ props.row.cantidad }}</span>
							</span>
						</div>
						<div class="column col-xs-3 text-grey-8 text-bold content-center">
							<span style="font-size:12px" class="q-pt-xs text-caption">{{ props.row.precio }}</span>
						</div>
						<div class="column col-xs-2 text-grey-8 text-bold content-center">
							<span style="font-size:12px" class="q-pt-xs text-caption">
								<span>{{ props.row.dcto }}</span>
							</span>
						</div>
						<div class="column col-xs-4 text-grey-8 text-bold content-center justify-center">
							<span style="font-size:12px" class="q-pt-xs text-caption">{{ props.row.subtotal }}</span>
						</div>
					</div>
					<div class="row" style="font-size:12px">
						<div class="column col-xs-3 text-grey-8 text-bold content-center justify-center" style="font-size:13px">
							<span class="text-red text-bold" v-if="props.row.dt_iva === 'T'">
								{{ props.row.unitario }}
							</span>
						</div>
						<div class="column col-xs-3"></div>
						<div class="column col-xs-2 text-blue-5 text-bold content-center text-caption justify-center" style="font-size:13px">
							<span>TOTAL: </span>
						</div>
						<div class="column col-xs-4 text-red-5 text-bold content-center justify-center" style="font-size:14px">
							<span>{{ props.row.total }}</span>
						</div>
					</div>
				</q-td>
				</q-tr>
			</template>
			<template v-slot:bottom>
				<div class="row full-width">
					<div class="column col-xs-12 content-center justify-center text-blue q-pa-sm " style="height:35px">
						<span class="text-caption text-bold" style="font-size:16px">
							{{ resumen.contenido.length }} {{ resumen.contenido.length === 0 ? 'Sin detalle' : resumen.contenido.length === 0 ? 'Producto' : 'Productos'}}
						</span>
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						<span class="text-bold" style="font-size:16px">
							Suman:<span class="q-pl-sm">{{ resumen.suma }}</span>
						</span>
					</div>
				</div>
			</template>
		</q-table>
	</div>
</template>

<script setup>

import { onMounted, ref } from 'vue';
import { useApiSupabase } from '../services/supabase/useApiSupabase';
import { useMensajes } from '../services/useMensajes';

	const props = defineProps({
    	id: {
        	type: Number,
        	required: true,
    	},
  	});
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
		const respuesta = await selectByIdSupabase('resumen_compartido', 'contenido', props.id);
		console.log(respuesta)
		if(respuesta.mensaje.length > 0){
			mostrarMensaje('Error', respuesta.mensaje);
			return;
		}
		resumen.value = respuesta.data.contenido;
		console.log(resumen.value)
	});

</script>
