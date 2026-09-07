import { RegisterForm } from "../../components/form/RegisterForm";
import { Navbar } from "../../../../components/navbar/Navbar";
import { useAuth } from "../../../../context/use-auth";
import { Navigate } from "react-router-dom";

function RegisterPage() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  return (
    <>
      <Navbar />

      <main className="min-h-[calc(100vh-73px)] bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-lg">
          {/* Page header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900">
              Create your account
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Register to start using the application.
            </p>
          </div>

          {/* Form container */}
          <div className="rounded-xl bg-white p-6 shadow-sm sm:p-8">
            <RegisterForm />
          </div>
        </div>
      </main>
    </>
  );
}

export default RegisterPage;
