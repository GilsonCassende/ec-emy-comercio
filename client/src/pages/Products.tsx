import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  buildProductWhatsAppLink,
  buildWhatsAppLink,
  defaultWhatsappMessage,
} from "@/lib/site";
import { useSeo } from "@/hooks/useSeo";
import {
  ArrowRight,
  Filter,
  MessageCircle,
  Search,
  Sparkles,
  Store,
  Tag,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import { catalogProducts, productCategories, type CatalogProduct, type ProductCategory } from "@/data/products";
import type { ProductFilterCategory } from "@/data/products";

function useCatalogGroups(items: CatalogProduct[]) {
  return useMemo(() => {
    const grouped = new Map<ProductCategory, CatalogProduct[]>();
    items.forEach((item) => {
      const list = grouped.get(item.category) ?? [];
      list.push(item);
      grouped.set(item.category, list);
    });

    return productCategories
      .filter((category): category is ProductCategory => category !== "Todos")
      .map((category) => ({
        category,
        products: grouped.get(category) ?? [],
      }))
      .filter((group) => group.products.length > 0);
  }, [items]);
}

function ProductCard({ product }: { product: CatalogProduct }) {
  return (
    <Card className="group gap-0 overflow-hidden border-black/5 bg-white/95 py-0 shadow-[0_18px_50px_rgba(17,17,17,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(17,17,17,0.12)]">
      <div className="relative overflow-hidden aspect-[4/5] bg-[#f4eee6]">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          decoding="async"
          fetchPriority="low"
          style={{ objectPosition: product.focus ?? "center 30%" }}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/58 via-black/6 to-transparent" />
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          {product.badge ? (
            <Badge className="rounded-full bg-white/92 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-[#111111] shadow-sm">
              {product.badge}
            </Badge>
          ) : null}
        </div>
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3">
          <Badge className="rounded-full bg-black/42 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-white/90 backdrop-blur-md">
            {product.category}
          </Badge>
          <span className="rounded-full border border-white/18 bg-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-white/90 backdrop-blur-md">
            Peça real
          </span>
        </div>
      </div>

      <CardContent className="flex h-full flex-1 flex-col p-5">
        <h3 className="text-xl tracking-[-0.04em] text-[#111111]">{product.name}</h3>
        <p className="mt-2 inline-flex rounded-full border border-[#d4af37]/18 bg-[#fbf8f2] px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-[#8a6f31]">
          Código: {product.code}
        </p>
        <p className="mt-3 text-sm leading-7 text-[#61584c]">
          Curadoria pensada para uma boutique feminina com peças fáceis de confirmar e comprar pelo WhatsApp.
        </p>
        <div className="mt-4 flex flex-col gap-3">
          <div className="min-w-0">
            <p className="text-xs uppercase tracking-[0.22em] text-[#8a6f31]">
              Investimento
            </p>
            <p className="mt-1 text-sm font-medium text-[#111111]">Sob consulta</p>
          </div>
          <Button asChild className="h-11 w-full rounded-full bg-[#111111] px-5 text-sm text-white hover:bg-[#1f1f1f]">
            <a
              href={buildProductWhatsAppLink({
                productName: product.name,
                productCode: product.code,
                category: product.category,
              })}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap"
            >
              Ver disponibilidade
              <MessageCircle className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function CatalogHero() {
  return (
    <section className="relative overflow-hidden border-b border-black/5 bg-[linear-gradient(180deg,#111111_0%,#1c1713_100%)] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.24),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.08),transparent_40%)]" />
      <div className="container relative grid gap-10 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-20">
        <div className="max-w-2xl">
          <Badge className="rounded-full bg-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.28em] text-white">
            Catálogo completo
          </Badge>
          <h1 className="mt-5 text-balance text-4xl leading-[0.95] tracking-[-0.06em] sm:text-5xl md:text-6xl">
            Peças prontas para consultar no WhatsApp.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-8 text-white/80 md:text-lg">
            Descubra peças femininas, confirme disponibilidade e fale com a equipa no WhatsApp para fechar a compra com segurança.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild className="h-12 rounded-full bg-white px-6 text-base text-[#111111] hover:bg-white/90">
              <a href={buildWhatsAppLink(defaultWhatsappMessage)} target="_blank" rel="noreferrer">
                Pedir atendimento no WhatsApp
                <MessageCircle className="h-4 w-4" />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-12 rounded-full border-white/18 bg-white/8 px-6 text-base text-white hover:bg-white/14 hover:text-white"
            >
              <a href="#filtros">Ver categorias</a>
            </Button>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {[
              `${catalogProducts.length} produtos`,
              "Curadoria real",
              "Resposta no WhatsApp",
            ].map((item) => (
              <div key={item} className="rounded-full border border-white/12 bg-white/6 px-4 py-2 text-sm text-white/82 backdrop-blur-sm">
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="overflow-hidden rounded-[1.8rem] border border-white/12 bg-white/6 shadow-[0_30px_90px_rgba(0,0,0,0.28)] sm:row-span-2">
              <img
                src="/products/20-vestido-verde-modelo.webp"
                alt="Vestido em destaque da coleção"
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="h-full min-h-[340px] w-full object-cover"
                style={{ objectPosition: "center 30%" }}
              />
            </div>
            <div className="overflow-hidden rounded-[1.8rem] border border-white/12 bg-white/6 shadow-[0_20px_60px_rgba(0,0,0,0.18)]">
              <img
                src="/products/29-bolsas-shelf.webp"
                alt="Bolsas da coleção"
                loading="lazy"
                decoding="async"
                className="h-40 w-full object-cover"
                style={{ objectPosition: "center 35%" }}
              />
            </div>
            <div className="overflow-hidden rounded-[1.8rem] border border-white/12 bg-white/6 shadow-[0_20px_60px_rgba(0,0,0,0.18)]">
              <img
                src="/products/30-sandalia-detalhe.webp"
                alt="Sandália da coleção"
                loading="lazy"
                decoding="async"
                className="h-40 w-full object-cover"
                style={{ objectPosition: "center 40%" }}
              />
            </div>
          </div>

          <div className="absolute -bottom-5 left-4 right-4 rounded-[1.5rem] border border-white/12 bg-[#111111]/86 p-4 backdrop-blur-md">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-white/55">Catálogo organizado</p>
                <p className="mt-1 text-sm text-white/88">
                  Produtos agrupados por categoria para facilitar a navegação.
                </p>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/8 px-3 py-2 text-xs uppercase tracking-[0.2em] text-white/84">
                <Sparkles className="h-3.5 w-3.5" />
                Boutique online
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Products() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<ProductFilterCategory>("Todos");

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  useSeo({
    title: "Produtos | EC EMY COMÉRCIO",
    description:
      "Conheça toda a coleção da EC EMY COMÉRCIO. Moda feminina, bolsas, calçados e acessórios com atendimento personalizado no WhatsApp.",
    canonicalPath: `${window.location.origin}/produtos`,
    image: `${window.location.origin}/brand/ec-emy-social.webp`,
  });

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();
    return catalogProducts.filter((product) => {
      const matchesCategory =
        activeCategory === "Todos" || product.category === activeCategory;
      const matchesQuery =
        query.length === 0 ||
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query);

      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, search]);

  const groups = useCatalogGroups(filteredProducts);
  const totalVisible = filteredProducts.length;
  const matchedCategories = groups.length;

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#fbf8f2_0%,#f4eee6_100%)] text-[#111111]">
      <div className="sticky top-0 z-40 border-b border-black/5 bg-[#fbf8f2]/80 backdrop-blur-xl">
        <div className="container flex h-20 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3" aria-label="EC EMY COMÉRCIO">
            <img
              src="/brand/ec-emy-logo.webp"
              alt="EC EMY COMÉRCIO"
              className="h-12 w-auto object-contain sm:h-14"
              width={1026}
              height={950}
            />
          </Link>

          <div className="hidden items-center gap-3 md:flex">
            <Button asChild variant="outline" className="h-11 rounded-full border-black/10 bg-white/80 px-5">
              <a href="#filtros">
                <Filter className="h-4 w-4" />
                Filtros
              </a>
            </Button>
            <Button asChild className="h-11 rounded-full bg-[#111111] px-5 text-white hover:bg-[#1f1f1f]">
              <a href={buildWhatsAppLink(defaultWhatsappMessage)} target="_blank" rel="noreferrer">
                Pedir atendimento no WhatsApp
                <MessageCircle className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>

      <main>
        <CatalogHero />

        <section id="filtros" className="scroll-mt-24 py-10">
          <div className="container">
            <div className="rounded-[1.75rem] border border-black/5 bg-white/88 p-4 shadow-[0_18px_45px_rgba(17,17,17,0.06)] backdrop-blur-sm md:p-6">
              <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
                <div className="relative">
                  <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8a6f31]" />
                  <Input
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Pesquisar por nome ou categoria"
                    className="h-12 rounded-full border-black/10 bg-[#fbf8f2] pl-11 text-sm shadow-none placeholder:text-[#85786a]"
                  />
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge className="rounded-full border border-black/10 bg-[#fbf8f2] px-3 py-2 text-[11px] uppercase tracking-[0.22em] text-[#6c5e52]">
                    <Tag className="mr-2 h-3.5 w-3.5" />
                    {totalVisible} produtos
                  </Badge>
                  <Badge className="rounded-full border border-black/10 bg-[#fbf8f2] px-3 py-2 text-[11px] uppercase tracking-[0.22em] text-[#6c5e52]">
                    <Store className="mr-2 h-3.5 w-3.5" />
                    {matchedCategories} categorias
                  </Badge>
                </div>
              </div>

              <div className="mt-5 flex gap-2 overflow-x-auto pb-1">
                {productCategories.map((category) => {
                  const isActive = activeCategory === category;
                  const count =
                    category === "Todos"
                      ? catalogProducts.length
                      : catalogProducts.filter((product) => product.category === category).length;

                  return (
                    <button
                      key={category}
                      type="button"
                      onClick={() => setActiveCategory(category)}
                      className={cn(
                        "whitespace-nowrap rounded-full border px-4 py-2 text-sm transition-all",
                        isActive
                          ? "border-[#111111] bg-[#111111] text-white shadow-[0_10px_28px_rgba(17,17,17,0.18)]"
                          : "border-black/10 bg-white text-[#4f463b] hover:border-[#8a6f31]/30 hover:bg-[#fbf8f2]"
                      )}
                    >
                      {category}
                      <span className={cn("ml-2 text-xs", isActive ? "text-white/70" : "text-[#8a6f31]")}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="pb-20">
          <div className="container space-y-14">
            {groups.length > 0 ? (
              groups.map((group) => (
                <section key={group.category} className="scroll-mt-24">
                  <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <Badge variant="outline" className="rounded-full border-[#d4af37]/25 bg-white/80 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-[#8a6f31]">
                        {group.category}
                      </Badge>
                      <h2 className="mt-3 text-3xl tracking-[-0.05em] text-[#111111] md:text-4xl">
                        {group.category}
                      </h2>
                    </div>
                    <p className="max-w-xl text-sm leading-7 text-[#61584c]">
                      {group.products.length} peça{group.products.length > 1 ? "s" : ""} selecionada{group.products.length > 1 ? "s" : ""} nesta categoria.
                    </p>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {group.products.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </section>
              ))
            ) : (
              <Card className="border-black/5 bg-white shadow-[0_18px_50px_rgba(17,17,17,0.06)]">
                <CardContent className="p-8 md:p-10">
                  <h2 className="text-2xl tracking-[-0.04em] text-[#111111]">Nenhum produto encontrado</h2>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-[#61584c]">
                    Ajusta a pesquisa ou volta para uma categoria mais ampla para encontrar peças relacionadas.
                  </p>
                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <Button onClick={() => setSearch("")} className="h-11 rounded-full bg-[#111111] px-5 text-white hover:bg-[#1f1f1f]">
                      Limpar pesquisa
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setActiveCategory("Todos")}
                      className="h-11 rounded-full border-black/10 bg-white px-5"
                    >
                      Ver todos
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </section>
      </main>

      <a
        href={buildWhatsAppLink(defaultWhatsappMessage)}
        target="_blank"
        rel="noreferrer"
        aria-label="Falar com a EC EMY COMÉRCIO no WhatsApp"
        className="fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] right-[calc(1rem+env(safe-area-inset-right))] z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#d4af37] text-[#111111] shadow-[0_18px_50px_rgba(17,17,17,0.22)] transition-all duration-300 hover:scale-110"
      >
        <MessageCircle className="h-6 w-6" />
      </a>
    </div>
  );
}
