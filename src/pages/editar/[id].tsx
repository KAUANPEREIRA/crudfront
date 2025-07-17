import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "@/componentes/header";
import Footer from "@/componentes/Footer";

export default function EditarUsuario() {
  const router = useRouter();
  const { id } = router.query;

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [erro, setErro] = useState("");

  const API_URL = `https://backendcrud-kf19.onrender.com/usuarios/${id}`;

  useEffect(() => {
    if (id) {
      buscarUsuario();
    }
  }, [id]);

  const buscarUsuario = async () => {
    try {
      const res = await axios.get(API_URL);
      setNome(res.data.nome);
      setEmail(res.data.email);
    } catch {
      setErro("Erro ao carregar usuário");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome || !email) {
      setErro("Nome e e-mail são obrigatórios!");
      return;
    }

    try {
      await axios.put(API_URL, { nome, email });
      router.push("/");
    } catch {
      setErro("Erro ao atualizar usuário");
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />

      <div style={{ flex: 1 }}>
        <div style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
          <h1>Editar Usuário</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition"
              />
            </div>

            <div>
              <input
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition"
              />
            </div>

            {erro && <p className="text-red-600 text-sm">{erro}</p>}

            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition"
                style={{ cursor: "pointer" }}
            >
              Salvar
            </button>
          </form>

          <button onClick={() => router.push("/")} style={{ marginTop: 10 }}>
            Voltar
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
