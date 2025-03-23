import  RegisterForm  from "../../components/RegisterForm";

export default function RegisterPage() {
  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl mb-4">Register</h1>
      <RegisterForm />
    </main>
  );
}
