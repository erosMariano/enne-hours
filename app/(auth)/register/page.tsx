import React from "react";

import FormContainerAuth from "@/components/views/auth/FormContainer";

function Cadastro() {
  return (
    <FormContainerAuth
      labelSubmit="Cadastrar"
      subtitle={{
        text: "Já tem uma conta?",
        textRedirect: "Entre aqui",
        urlRedirect: "/login",
      }}
      title="Seja bem vindo!"
      type="register"
    />
  );
}

export default Cadastro;
