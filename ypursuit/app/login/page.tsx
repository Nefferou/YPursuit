'using client';
import Header from '@/components/Header';
import LoginForm from '@/components/LoginForm';

export default function Login() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between bg-gradient-to-r from-blue-500 to-teal-400 p-28">
            <Header />
            <LoginForm />
            <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
            </div>
        </main>
    )
}
