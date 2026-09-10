"use client";

import { useEffect, useState } from "react";

type Catalog = {
  products: Array<{ id: string; name: string; slug: string; image: string | null; price: unknown; category: unknown }>;
  celebrations: Array<{ id: string; name: string; slug: string; image: string | null; occasion: unknown }>;
};

const needs = [
  ["Decorar", "balões · fundos · enfeites", "#8f9270"],
  ["Montar", "estruturas · móveis · suportes", "#a98668"],
  ["Servir", "pratos · copos · talheres", "#c88476"],
  ["Apresentar", "bandejas · boleiras · expositores", "#9d6b5e"],
  ["Finalizar", "velas · toppers · forminhas", "#a94d52"],
  ["Personalizar", "tags · adesivos · papelaria", "#7d5d5e"],
  ["Presentear", "lembrancinhas · embalagens", "#b9786c"],
  ["Divertir", "jogos · atividades · acessórios", "#71816b"],
] as const;

const fallbackCelebrations = ["Fazendinha", "Fundo do Mar", "Circo"];

export default function Home() {
  const [catalog, setCatalog] = useState<Catalog | null>(null);

  useEffect(() => {
    fetch("/api/catalog").then((r) => r.ok ? r.json() : null).then(setCatalog).catch(() => null);
  }, []);

  const celebrations = catalog?.celebrations?.length ? catalog.celebrations : fallbackCelebrations.map((name) => ({ id: name, name, slug: name.toLowerCase().replaceAll(" ", "-"), image: null, occasion: "celebração" }));
  const heroImage = "/images/home-hero.png";

  return (
    <main className="min-h-screen bg-[#efede0] text-[#171512]">
      <section className="relative overflow-hidden bg-[#731a20]">
        <header className="absolute inset-x-0 top-0 z-10 flex justify-center px-5 py-6 md:py-10">
          <a href="/" aria-label="Zenítas">
            <img src="/images/logo-cream.png" alt="Zenítas" className="h-auto w-40 md:w-56" />
          </a>
        </header>
        <div className="mx-auto max-w-[1600px] pt-24 md:pt-36">
          <img src={heroImage} alt="Celebração em família" className="block aspect-[3/2] w-full object-cover object-center" />
        </div>
      </section>

      <section className="bg-[#8f775e] px-5 py-16 text-center text-[#efede0] md:px-10 md:py-24">
        <p className="mx-auto max-w-5xl font-serif text-3xl leading-tight md:text-5xl">celebrar fica ainda melhor quando o caminho é mais simples<br /><strong>é para isso que zenítas está aqui.</strong></p>
      </section>

      <section className="bg-[#6c5b43] px-5 py-16 text-[#efede0] md:px-10 md:py-24">
        <div className="mx-auto max-w-7xl">
          <p className="text-lg">escolha por</p>
          <h2 className="mb-10 font-serif text-5xl text-[#d9b5a8] md:text-7xl">celebração</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {celebrations.slice(0, 8).map((item, i) => (
              <a href={`/festa/${item.slug}`} key={item.id} className="group overflow-hidden rounded-2xl bg-[#f2e5d3] text-[#6c5b43] shadow-sm transition-transform hover:-translate-y-1">
                <div className="aspect-[4/3] bg-cover bg-center" style={{ backgroundImage: `url(${item.image || heroImage})` }} />
                <div className="p-4"><p className="font-serif text-2xl leading-none md:text-3xl">{item.name.toLowerCase()}</p><p className="mt-2 text-sm text-[#731a20]">{String(item.occasion || "celebração")}</p></div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#efede0] px-5 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-7xl">
          <p className="text-right text-lg text-[#731a20]">escolha por</p>
          <h2 className="mb-10 text-right font-serif text-5xl leading-none text-[#731a20] md:text-7xl">necessidade</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {needs.map(([name, description, color]) => (
              <a key={name} href={`/produtos?categoria=${encodeURIComponent(name)}`} className="group flex aspect-[4/5] flex-col justify-end rounded-2xl p-4 text-[#efede0] shadow-sm transition-transform hover:-translate-y-1 md:p-6" style={{ backgroundColor: color }}>
                <span className="font-serif text-2xl leading-none md:text-4xl">{name}</span>
                <span className="mt-3 text-xs leading-snug text-[#efede0]/85 md:text-sm">{description}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {catalog?.products?.length ? <section className="mx-auto max-w-7xl bg-[#efede0] px-5 pb-24 md:px-10"><p className="mb-3 text-xs font-medium uppercase tracking-[0.24em] text-[#8b7f37]">acervo de produtos</p><div className="grid grid-cols-2 gap-4 md:grid-cols-4">{catalog.products.slice(0, 8).map((product) => <a href={`/produto/${product.slug}`} key={product.id} className="overflow-hidden rounded-2xl bg-[#f5f0e3]"><div className="aspect-square bg-cover bg-center" style={{ backgroundImage: `url(${product.image || heroImage})` }} /><div className="p-4"><p className="font-medium text-[#171512]">{product.name}</p>{product.price ? <p className="mt-1 text-sm text-[#731a20]">R$ {String(product.price)}</p> : null}</div></a>)}</div></section> : null}

      <footer className="bg-[#731a20] px-5 py-14 text-[#efede0] md:px-10 md:py-20">
        <div className="mx-auto flex max-w-7xl flex-col items-center text-center">
          <img src="/images/logo-cream.png" alt="Zenítas" className="h-auto w-44 md:w-56" />
          <p className="mt-8 max-w-md text-sm text-[#efede0]/80">um acervo de ideias, referências e produtos para celebrar do seu jeito.</p>
          <div className="mt-10 flex gap-6 text-sm"><a href="/produtos">Produtos</a><a href="/celebracoes">Celebrações</a></div>
        </div>
      </footer>
    </main>
  );
}
