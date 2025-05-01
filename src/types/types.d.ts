export interface FormAuthProps {
  type: "login" | "register";
  title: string;
  subtitle: {
    text: string;
    textRedirect: string;
    urlRedirect: string;
  };
  labelSubmit: string;
}
