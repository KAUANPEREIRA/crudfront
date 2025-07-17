import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-blue-600 text-white py-4 shadow-inner mt-10">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        <p className="text-sm">&copy; {new Date().getFullYear()} Minha Aplicação. Todos os direitos reservados.</p>
        <nav className="space-x-4 mt-2 md:mt-0">
          <Link href="/">
            <span className="hover:underline cursor-pointer">Listar</span>
          </Link>
          <Link href="/cadastrar">
            <span className="hover:underline cursor-pointer">Cadastrar</span>
          </Link>
        </nav>
      </div>
    </footer>
  );
}
