import React from "react";
import FormContainerAuth from "@/components/views/auth/FormContainer";

function Cadastro() {
  return (
    <FormContainerAuth
      type="register"
      subtitle={{
        text: "Já tem uma conta?",
        textRedirect: "Entre aqui",
        urlRedirect: "/login",
      }}
      labelSubmit="Cadastrar"
      title="Seja bem vindo!"
    />
  );
}

export default Cadastro;
