import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-blue-600 text-white py-4 shadow-md">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">Minha Aplicação</h1>
        <nav className="space-x-4">
          <Link href="/">
            <span className="hover:underline cursor-pointer">Listar</span>
          </Link>
          <Link href="/cadastrar">
            <span className="hover:underline cursor-pointer">Cadastrar</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}