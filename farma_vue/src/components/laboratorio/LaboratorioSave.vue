<script setup lang="ts">
import type { Laboratorio } from '@/models/laboratorio'
import http from '@/plugins/axios'
import { Textarea } from 'primevue'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import { computed, ref, watch } from 'vue'

const ENDPOINT = 'laboratorios'
const props = defineProps({
  mostrar: Boolean,
  laboratorio: {
    type: Object as () => Laboratorio,
    default: () => ({}) as Laboratorio,
  },
  modoEdicion: Boolean,
})
const emit = defineEmits(['guardar', 'close'])

const dialogVisible = computed({
  get: () => props.mostrar,
  set: (value) => {
    if (!value) emit('close')
  },
})

const laboratorio = ref<Laboratorio>({ ...props.laboratorio })
watch(
  () => props.laboratorio,
  (newVal) => {
    laboratorio.value = { ...newVal }
  },
)

async function handleSave() {
  try {
    const body = {
      nombre: laboratorio.value.nombre,
      descripcion: laboratorio.value.descripcion,
      direccion: laboratorio.value.direccion,
      telefono: laboratorio.value.telefono,
    }
    if (props.modoEdicion) {
      await http.patch(`${ENDPOINT}/${laboratorio.value.id}`, body)
    } else {
      await http.post(ENDPOINT, body)
    }
    emit('guardar')
    laboratorio.value = {} as Laboratorio
    dialogVisible.value = false
  } catch (error: any) {
    alert(error?.response?.data?.message || 'Error al guardar el laboratorio')
  }
}
</script>

<template>
  <div class="card flex justify-center">
    <Dialog v-model:visible="dialogVisible" :header="props.modoEdicion ? 'Editar' : 'Crear'" style="width: 25rem">
      <div class="flex items-center gap-4 mb-4">
        <label for="nombre" class="font-semibold w-3">Nombre</label>
        <InputText id="nombre" v-model="laboratorio.nombre" class="flex-auto" autocomplete="off" autofocus />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="descripcion" class="font-semibold w-3">Descripción</label>
        <Textarea id="descripcion" v-model="laboratorio.descripcion" class="flex-auto" autocomplete="off" />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="direccion" class="font-semibold w-3">Dirección</label>
        <InputText id="direccion" v-model="laboratorio.direccion" class="flex-auto" autocomplete="off" />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="telefono" class="font-semibold w-3">Teléfono</label>
        <InputText id="telefono" v-model="laboratorio.telefono" class="flex-auto" autocomplete="off" />
      </div>

      <div class="flex justify-end gap-2">
        <Button type="button" label="Cancelar" icon="pi pi-times" severity="secondary"
          @click="dialogVisible = false"></Button>
        <Button type="button" label="Guardar" icon="pi pi-save" @click="handleSave"></Button>
      </div>
    </Dialog>
  </div>
</template>

<style scoped></style>
