
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Header from "@/componentes/header";
import Footer from "@/componentes/Footer";

export default function Cadastrar() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [erro, setErro] = useState("");
  const router = useRouter();

  const API_URL = "https://backendcrud-kf19.onrender.com/usuarios";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome || !email) {
      setErro("Nome e e-mail são obrigatórios!");
      return;
    }

    try {
      await axios.post(API_URL, { nome, email });
      alert("Usuário cadastrado com sucesso!");
      router.push("/");
    } catch {
      alert("Erro ao salvar usuário!");
      setErro("Erro ao salvar usuário");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1">
        <div className="max-w-md mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Cadastro de cliente</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition"
            />

            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition"
            />

            {erro && <p className="text-red-600 text-sm">{erro}</p>}

            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
                style={{ cursor: "pointer" }}
            >
              Cadastrar
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
