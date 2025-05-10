"use client";
import { ToastContainer } from "react-toastify";

import ContentDashboard from "../ContentDashboard";

function ProjetoWrapper({ project }: any) {
  return (
    <>
      {project ? (
        <ContentDashboard project={project} />
      ) : (
        <p>Projeto não encontrato</p>
      )}
      <ToastContainer />
    </>
  );
}

export default ProjetoWrapper;
