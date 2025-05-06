import React from "react";

import FormContainerAuth from "@/components/views/auth/FormContainer";

function Login() {
  return (
    <FormContainerAuth
      labelSubmit="Entrar"
      subtitle={{
        text: "Não tem uma conta ainda?",
        textRedirect: "Cadastre-se aqui",
        urlRedirect: "/register",
      }}
      title="Bem vindo de volta"
      type="login"
    />
  );
}

export default Login;
