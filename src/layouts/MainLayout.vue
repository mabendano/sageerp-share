<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-teal-6 text-white">
        <q-toolbar-title>
          SAGEVictoria - Share 1.01
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

	<q-footer elevated>
        <div class="row q-pa-sm bg-teal-6">
			<div class="column col-xs-12 text-center">
				Sistema Contable SAGEVictoria ERP
			</div>
			<div class="column col-xs-12 text-center">
				<a href="http://www.loxasoluciones.com" target="_blank" class="text-white">Conoce mas en www.loxasoluciones.com</a>
			</div>
		</div>
    </q-footer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>

</script>
