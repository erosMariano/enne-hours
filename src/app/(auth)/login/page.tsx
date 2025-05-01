import React from "react";
import FormContainerAuth from "@/components/auth/FormContainer";

function Login() {
  return (
    <FormContainerAuth
      type="login"
      subtitle={{
        text: "Não tem uma conta ainda?",
        textRedirect: "Cadastre-se aqui",
        urlRedirect: "/register",
      }}
      labelSubmit="Entrar"
      title="Bem vindo de volta"
    />
  );
}

export default Login;
