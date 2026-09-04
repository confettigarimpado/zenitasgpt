const categories = [
  ["Tudo", "todos os produtos", "bg-[#b9786c]"],
  ["Decorar", "balões · fundos · enfeites", "bg-[#8f9270]"],
  ["Montar", "estruturas · móveis · suportes", "bg-[#a98668]"],
  ["Servir", "pratos · copos · talheres", "bg-[#c88476]"],
  ["Apresentar", "bandejas · boleiras · expositores", "bg-[#9d6b5e]"],
  ["Finalizar", "velas · toppers · forminhas", "bg-[#a94d52]"],
  ["Personalizar", "tags · adesivos · papelaria", "bg-[#7d5d5e]"],
  ["Presentear", "lembrancinhas · embalagens", "bg-[#b9786c]"],
  ["Divertir", "jogos · atividades · acessórios", "bg-[#71816b]"],
  ["Preparar", "ferramentas · itens para montagem", "bg-[#8f775e]"],
] as const;

const celebrations = ["Fazendinha", "Fundo do Mar", "Circo"];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#efede0]">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 md:px-10">
        <button aria-label="Abrir menu" className="text-2xl text-[#731a20]">☰</button>
        <a href="/" className="font-serif text-3xl italic text-[#731a20]">zenítas</a>
        <a href="/produtos" className="text-sm font-medium text-[#171512]">buscar</a>
      </header>
      <section className="mx-auto max-w-7xl px-5 pb-16 pt-10 md:px-10 md:pb-24 md:pt-20">
        <p className="mb-5 text-xs font-medium uppercase tracking-[0.24em] text-[#8b7f37]">curadoria para celebrar</p>
        <h1 className="max-w-4xl font-serif text-5xl leading-[0.98] text-[#731a20] md:text-7xl">celebrar fica melhor quando o caminho é mais simples.</h1>
        <p className="mt-7 text-lg text-[#171512] md:text-xl">ideias, escolhas e produtos num só lugar.</p>
      </section>
      <section className="mx-auto max-w-7xl px-5 pb-20 md:px-10 md:pb-28">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.24em] text-[#8b7f37]">encontre pelo que precisa</p>
        <h2 className="mb-8 max-w-2xl font-serif text-4xl leading-tight text-[#731a20] md:text-5xl">um acervo para cada parte da celebração</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {categories.map(([name, description, color]) => (
            <a key={name} href={name === "Tudo" ? "/produtos" : `/produtos?categoria=${encodeURIComponent(name)}`} className={`group flex aspect-[4/5] flex-col justify-end rounded-2xl p-4 text-[#efede0] transition-transform hover:-translate-y-1 md:p-6 ${color}`}>
              <span className="font-serif text-2xl leading-none md:text-4xl">{name}</span>
              <span className="mt-3 text-xs leading-snug text-[#efede0]/85 md:text-sm">{description}</span>
            </a>
          ))}
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 pb-24 md:px-10">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.24em] text-[#8b7f37]">encontre pelo motivo</p>
        <h2 className="mb-8 font-serif text-4xl text-[#731a20] md:text-5xl">celebrações que inspiram</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {celebrations.map((item, i) => <a href={`/festa/${item.toLowerCase().replaceAll(" ", "-")}`} key={item} className={`flex aspect-[4/5] items-end rounded-2xl p-5 font-serif text-3xl text-[#efede0] md:text-4xl ${["bg-[#8f775e]", "bg-[#71816b]", "bg-[#b9786c]"][i]}`}>{item}</a>)}
        </div>
      </section>
      <footer className="bg-[#731a20] px-5 py-14 text-[#efede0] md:px-10 md:py-20">
        <div className="mx-auto max-w-7xl"><div className="font-serif text-4xl italic">zenítas</div><p className="mt-4 max-w-md text-sm text-[#efede0]/80">um acervo de ideias, referências e produtos para celebrar do seu jeito.</p><div className="mt-10 flex gap-6 text-sm"><a href="/produtos">Produtos</a><a href="/celebracoes">Celebrações</a></div></div>
      </footer>
    </main>
  );
}

