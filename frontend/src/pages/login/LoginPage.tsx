import { LoginForm } from "../../components/forms/login/LoginForm";
import { Navbar } from "../../components/navbar/Navbar";

function LoginPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-[calc(100vh-73px)] bg-gray-50 px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="mx-auto w-full max-w-md">
          {/* Page header */}
          <header className="mb-8 text-center">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Welcome back
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Login to your account to continue.
            </p>
          </header>

          {/* Login card */}
          <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
            <LoginForm />
          </section>

          {/* Register link */}
          <p className="mt-6 text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <a
              href="/register"
              className="font-medium text-purple-600 transition-colors hover:text-purple-700"
            >
              Create one
            </a>
          </p>
        </div>
      </main>
    </>
  );
}

export default LoginPage;
