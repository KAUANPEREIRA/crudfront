
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Header from "@/componentes/header";
import Footer from "@/componentes/Footer";

interface Usuario {
  id: number;
  nome: string;
  email: string;
}

export default function Home() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(false);
  const API_URL = "https://backendcrud-kf19.onrender.com/usuarios";

  useEffect(() => {
    buscarUsuarios();
  }, []);

  const buscarUsuarios = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_URL);
      setUsuarios(res.data);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
  const confirmar = window.confirm("Tem certeza que deseja excluir este usuário?");
  if (!confirmar) return;

  try {
    await axios.delete(`${API_URL}/${id}`);
    await buscarUsuarios();
  } catch (error) {
    console.error("Erro ao excluir usuário:", error);
    alert("Erro ao excluir usuário. Tente novamente.");
  }
};

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow max-w-2xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Clientes Cadastrados</h1>
        <p className="my-5">Clientes cadastrados recebem 10% de desconto</p>

        <Link href="/cadastrar">
          <button className="mb-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" style={{ cursor: "pointer" }}>
            Novo Cadastro
          </button>
        </Link>

        {loading ? (
          <div className="flex justify-center my-10">
            <div className="loader"></div>
          </div>
        ) : (
          <ul className="space-y-4">
            {usuarios.map((usuario) => (
              <li
                key={usuario.id}
                className="border p-4 rounded shadow-sm flex justify-between items-center"
              >
                <div>
                  <strong>{usuario.nome}</strong>
                  <p>{usuario.email}</p>
                </div>
                <div className="space-x-2">
                  <Link href={`/editar/${usuario.id}`}>
                    <button className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">
                      Editar
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(usuario.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Excluir
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>

      <Footer />

      <style jsx>{`
        .loader {
          border: 6px solid #f3f3f3; /* cinza claro */
          border-top: 6px solid #3b82f6; /* azul */
          border-radius: 50%;
          width: 40px;
          height: 40px;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
