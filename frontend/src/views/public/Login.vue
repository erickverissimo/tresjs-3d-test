<template>
  <v-container fluid class="fill-height pa-0">
    <v-row no-gutters class="h-100">
      <v-col
        cols="12"
        class="d-flex flex-column justify-center w-100 align-center"
      >
        <div class="d-flex justify-center ml-2 align-center w-100 h-100">
          <v-card
            class="mx-auto rounded py-12 px-8"
            max-width="603"
            min-height="557"
            width="100%"
            elevation="4"
          >
            <div class="d-flex flex-column text-center ga-2 py-5 mb-5">
              <div class="text-center">
                <img
                  src="../../assets/brand/bionic.svg"
                  alt="Logo"
                  style="height: 70px; width: 200px"
                />
              </div>
              <p class="text-body-1">
                Insira suas credenciais para acessar a plataforma
              </p>
            </div>

            <v-form ref="form" @submit.prevent="onSubmit">
              <div>
                <label class="text-subtitle-2 font-weight-bold"> E-mail </label>
                <v-text-field
                  v-model="data.username.value.value"
                  :error-messages="data.username.errorMessage.value"
                  :readonly="loading"
                  prepend-inner-icon="mdi-email-outline"
                  placeholder="Insira seu e-mail..."
                  required
                  variant="solo-filled"
                  flat
                  density="compact"
                  single-line
                />
              </div>

              <div>
                <label class="text-subtitle-2 font-weight-bold"> Senha </label>
                <v-text-field
                  v-model="data.password.value.value"
                  :error-messages="data.password.errorMessage.value"
                  prepend-inner-icon="mdi-lock-outline"
                  :append-inner-icon="
                    passwordVisible ? 'mdi-eye-off' : 'mdi-eye'
                  "
                  :readonly="loading"
                  @click:append-inner="passwordVisible = !passwordVisible"
                  :type="passwordVisible ? 'text' : 'password'"
                  placeholder="Insira sua senha..."
                  required
                  variant="solo-filled"
                  flat
                  density="compact"
                  single-line
                />
              </div>

              <div class="d-flex justify-end align-center pt-3">
                <v-btn
                  style="
                    text-transform: uppercase;
                    color: rgba(0, 0, 0, 0.87);
                    padding: 0;
                  "
                  type="button"
                  variant="text"
                  @click="redirect()"
                  >Esqueceu sua senha?</v-btn
                >
              </div>

              <br />

              <v-btn
                :loading="loading"
                block
                color="primary"
                type="submit"
                flat
              >
                Entrar
              </v-btn>
            </v-form>
            <div class="py-7">
              <v-divider>Ou</v-divider>
            </div>
            <div class="d-flex justify-center">
              <v-btn
                style="
                  text-transform: uppercase;
                  color: rgba(4, 30, 73, 1);
                  padding: 0;
                "
                type="button"
                variant="text"
              >
                Não tenho conta
              </v-btn>
            </div>
          </v-card>
        </div>
        <div class="d-flex align-center justify-space-between ga-2 mb-12">
          <div style="font-size: 15px; line-height: 28px">Desenvolvido por</div>
          <v-img
            src="../../assets/brand/bionic.svg"
            alt="Imagem de login"
            height="12"
            width="69"
            contain
          />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useForm, useField } from 'vee-validate';

import { useAuthStore } from '@/stores';
import { getInitialRoute } from '@/navItems';
import { loginSchema, LoginSchemaType } from '@/schemas';
import { ILoginRequest } from '@/types';

export default defineComponent({
  name: 'login',
  setup() {
    const validationSchema = loginSchema;
    const router = useRouter();
    const authStore = useAuthStore();

    const loading = ref(false);
    const passwordVisible = ref(false);

    const { handleSubmit } = useForm<LoginSchemaType>({
      validationSchema,
    });

    const data = {
      username: useField<string>('username', validationSchema),
      password: useField<string>('password', validationSchema),
    };

    const onSubmit = handleSubmit(async (values) => {
      loading.value = true;

      const loginData: ILoginRequest = {
        username: values.username,
        password: values.password,
      };

      await authStore.login(loginData).then(() => {
        loading.value = false;
        if (authStore.currentUser?.user) {
          router.push({ path: getInitialRoute() });
        }
      });
    });

    const redirect = () => {
      router.push('/esqueci-senha');
    };

    return {
      data,
      loading,
      passwordVisible,
      onSubmit,
      redirect,
    };
  },
});
</script>
