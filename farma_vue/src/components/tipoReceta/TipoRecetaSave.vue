<script setup lang="ts">
import type { TipoReceta } from '@/models/tipoReceta'
import http from '@/plugins/axios'
import { Checkbox, Textarea } from 'primevue'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import { computed, ref, watch } from 'vue'

const ENDPOINT = 'tipo-recetas'
const props = defineProps({
  mostrar: Boolean,
  tipoReceta: {
    type: Object as () => TipoReceta,
    default: () => ({}) as TipoReceta,
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

const tipoReceta = ref<TipoReceta>({ ...props.tipoReceta })
watch(
  () => props.tipoReceta,
  (newVal) => {
    tipoReceta.value = { ...newVal }
  },
)

async function handleSave() {
  try {
    const body = {
      nombre: tipoReceta.value.nombre,
      descripcion: tipoReceta.value.descripcion,
      requiereAutorizacion: tipoReceta.value.requiereAutorizacion || false,
    }
    if (props.modoEdicion) {
      await http.patch(`${ENDPOINT}/${tipoReceta.value.id}`, body)
    } else {
      await http.post(ENDPOINT, body)
    }
    emit('guardar')
    tipoReceta.value = {} as TipoReceta
    dialogVisible.value = false
  } catch (error: any) {
    alert(error?.response?.data?.message || 'Error al guardar el tipo de receta')
  }
}
</script>

<template>
  <div class="card flex justify-center">
    <Dialog v-model:visible="dialogVisible" :header="props.modoEdicion ? 'Editar' : 'Crear'" style="width: 25rem">
      <div class="flex items-center gap-4 mb-4">
        <label for="nombre" class="font-semibold w-3">Nombre</label>
        <InputText id="nombre" v-model="tipoReceta.nombre" class="flex-auto" autocomplete="off" autofocus />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="descripcion" class="font-semibold w-3">Descripción</label>
        <Textarea id="descripcion" v-model="tipoReceta.descripcion" class="flex-auto" autocomplete="off" />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="requiereAutorizacion" class="font-semibold w-3">Requiere Autorización</label>
        <Checkbox id="requiereAutorizacion" v-model="tipoReceta.requiereAutorizacion" binary />
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
