<template>
  <q-page>
	<ResumenTransaccion :id="id" v-if="tipo === 1"/>
	<ResumenCreditosCliente :id="id" v-if="tipo === 2"/>
  </q-page>
</template>

<script setup>

import { onMounted, ref } from '@vue/runtime-core';
import { useRoute } from 'vue-router';

import ResumenTransaccion from 'src/components/ResumenTransaccion';
import ResumenCreditosCliente from 'src/components/ResumenCreditosCliente';

	const route = useRoute();
	const id = ref(0);
	const tipo = ref(0);

  	onMounted(() => {
		const { el_id, el_tipo } = route.params;
		id.value = parseInt(el_id);
		tipo.value = parseInt(el_tipo);
  	});

</script>
