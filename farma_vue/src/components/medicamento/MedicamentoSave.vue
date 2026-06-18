<script setup lang="ts">
import type { Medicamento } from '@/models/medicamento'
import type { Categoria } from '@/models/categoria'
import type { Laboratorio } from '@/models/laboratorio'

import http from '@/plugins/axios'
import { Checkbox, InputMask, InputNumber, Select, Textarea } from 'primevue'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import { computed, ref, watch } from 'vue'

const ENDPOINT = 'medicamentos'
const props = defineProps({
  mostrar: Boolean,
  medicamento: {
    type: Object as () => Medicamento,
    default: () => ({}) as Medicamento,
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

const categorias = ref<Categoria[]>([])
const formasFarmaceuticas = ref<any[]>([])
const laboratorios = ref<Laboratorio[]>([])
const medicamento = ref<Medicamento>({ ...props.medicamento })
const idCategoria = ref<number>(0)
const idFormaFarmaceutica = ref<number>(0)

watch(
  () => props.medicamento,
  (newVal) => {
    medicamento.value = { ...newVal }
  },
)

async function obtenerCategorias() {
  categorias.value = await http.get('categorias').then((res) => res.data)
}
async function obtenerFormasFarmaceuticas() {
  formasFarmaceuticas.value = await http.get('formas-farmaceuticas').then((res) => res.data)
}
async function handleSave() {
  try {
    const body = {
      idCategoria: medicamento.value.idCategoria,
      idFormaFarmaceutica: medicamento.value.idFormaFarmaceutica,
      idLaboratorio: medicamento.value.idLaboratorio || null,
      nombre: medicamento.value.nombre,
      descripcion: medicamento.value.descripcion,
      concentracion: medicamento.value.concentracion,
      receta: medicamento.value.receta,
      precio: medicamento.value.precio,
      fotografia: medicamento.value.fotografia,
    }
    if (props.modoEdicion) {
      await http.patch(`${ENDPOINT}/${medicamento.value.id}`, body)
    } else {
      await http.post(ENDPOINT, body)
    }
    emit('guardar')
    medicamento.value = {} as Medicamento
    dialogVisible.value = false
  } catch (error: any) {
    alert(error?.response?.data?.message)
  }
}
async function cargarDatos() {
  categorias.value = await http.get('categorias').then(res => res.data)
  formasFarmaceuticas.value = await http.get('formas-farmaceuticas').then(res => res.data)
  laboratorios.value = await http.get('laboratorios').then(res => res.data)

}

watch(
  () => props.mostrar,
  (nuevoValor) => {
    if (!nuevoValor) return

    cargarDatos()

    if (props.medicamento?.id) {
      medicamento.value = { ...props.medicamento }

      medicamento.value.idCategoria =
        props.medicamento.categoria?.id ?? props.medicamento.idCategoria

      medicamento.value.idFormaFarmaceutica =
        props.medicamento.idFormaFarmaceutica

      medicamento.value.idLaboratorio =
        props.medicamento.laboratorio?.id ?? props.medicamento.idLaboratorio

    } else {
      medicamento.value = {
        receta: false,
      } as Medicamento
    }
  },
)
</script>

<template>
  <div class="card flex justify-center">
    <Dialog v-model:visible="dialogVisible" :header="props.modoEdicion ? 'Editar' : 'Crear'" style="width: 25rem">
      <div class="flex items-center gap-4 mb-4">
        <label for="categoria" class="font-semibold w-3">Categorías</label>
        <Select v-model="medicamento.idCategoria" :options="categorias" optionLabel="nombre" optionValue="id" />
      </div>

      <div class="flex items-center gap-4 mb-4">
        <label for="nombre" class="font-semibold w-3">Nombre</label>
        <InputText id="nombre" v-model="medicamento.nombre" class="flex-auto" autocomplete="off" maxlength="100" />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="descripcion" class="font-semibold w-3">Descripción</label>
        <Textarea id="descripcion" v-model="medicamento.descripcion" class="flex-auto" autocomplete="off" rows="3"
          maxlength="2000" />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="concentracion" class="font-semibold w-3">Concentración</label>
        <InputText id="concentracion" v-model="medicamento.concentracion" class="flex-auto" autocomplete="off"
          maxlength="100" />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="forma" class="font-semibold w-3">Forma</label>
        <Select v-model="medicamento.idFormaFarmaceutica" :options="formasFarmaceuticas" optionLabel="nombre"
          optionValue="id" />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="laboratorio" class="font-semibold w-3">Laboratorio</label>
        <Select v-model="medicamento.idLaboratorio" :options="laboratorios" optionLabel="nombre" optionValue="id"
          placeholder="Seleccionar Laboratorio" showClear />
      </div>

      <div class="flex items-center gap-4 mb-4">
        <label for="receta" class="font-semibold w-3">Receta</label>

        <Checkbox id="receta" v-model="medicamento.receta" binary />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="precio" class="font-semibold w-3">Precio</label>
        <InputNumber v-model="medicamento.precio" mode="decimal" :minFractionDigits="2" :maxFractionDigits="2"
          locale="es-ES" />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="fotografia" class="font-semibold w-3">Fotografía</label>
        <InputText id="fotografia" v-model="medicamento.fotografia" class="flex-auto" autocomplete="off"
          maxlength="2000" />
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
