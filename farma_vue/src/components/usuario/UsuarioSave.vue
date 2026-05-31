<script setup lang="ts">
import type { Usuario } from '@/models/usuario'
import http from '@/plugins/axios'
import { Textarea } from 'primevue'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import { computed, ref, watch } from 'vue'

const ENDPOINT = 'usuarios'
const props = defineProps({
  mostrar: Boolean,
  usuario: {
    type: Object as () => Usuario,
    default: () => ({}) as Usuario,
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

const usuario = ref<Usuario>({ ...props.usuario })
watch(
  () => props.usuario,
  (newVal) => {
    usuario.value = { ...newVal }
  },
)

async function handleSave() {
  try {
    const body = {
      nombre: usuario.value.nombre,
      apellido: usuario.value.apellido,
      correo: usuario.value.correo,
      password: usuario.value.password,
      rol: usuario.value.rol,
    }
    if (props.modoEdicion) {
      await http.patch(`${ENDPOINT}/${usuario.value.id}`, body)
    } else {
      await http.post(ENDPOINT, body)
    }
    emit('guardar')
    usuario.value = {} as Usuario
    dialogVisible.value = false
  } catch (error: any) {
    alert(error?.response?.data?.message)
  }
}
</script>

<template>
  <div class="card flex justify-center">
    <Dialog
      v-model:visible="dialogVisible"
      :header="props.modoEdicion ? 'Editar' : 'Crear'"
      style="width: 25rem"
    >
      <div class="flex items-center gap-4 mb-4">
        <label for="nombre" class="font-semibold w-3">Nombre</label>
        <InputText
          id="nombre"
          v-model="usuario.nombre"
          class="flex-auto"
          autocomplete="off"
          autofocus
        />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="apellido" class="font-semibold w-3">Apellido</label>
        <InputText id="apellido" v-model="usuario.apellido" class="flex-auto" autocomplete="off" />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="correo" class="font-semibold w-3">Correo</label>
        <InputText id="correo" v-model="usuario.correo" class="flex-auto" autocomplete="off" />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="password" class="font-semibold w-3">Contraseña</label>
        <InputText id="password" v-model="usuario.password" class="flex-auto" autocomplete="off" />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="rol" class="font-semibold w-3">Rol</label>
        <InputText id="rol" v-model="usuario.rol" class="flex-auto" autocomplete="off" />
      </div>
      <div class="flex justify-end gap-2">
        <Button
          type="button"
          label="Cancelar"
          icon="pi pi-times"
          severity="secondary"
          @click="dialogVisible = false"
        ></Button>
        <Button type="button" label="Guardar" icon="pi pi-save" @click="handleSave"></Button>
      </div>
    </Dialog>
  </div>
</template>

<style scoped></style>
