import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Link } from "wouter";
import {
  ArrowRight,
  BadgeCheck,
  Clock3,
  Heart,
  Menu,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Star,
  Truck,
  Users,
  Gem,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  buildProductWhatsAppLink,
  buildWhatsAppLink,
  defaultWhatsappMessage,
} from "@/lib/site";
import { catalogProducts } from "@/data/products";

type Collection = {
  title: string;
  description: string;
  image: string;
  accent: string;
  imagePosition: string;
};

type Product = {
  title: string;
  category: string;
  description: string;
  badge: string;
  price: string;
  image: string;
  imagePosition: string;
};

type Testimonial = {
  name: string;
  city: string;
  quote: string;
};

type FaqItem = {
  question: string;
  answer: string;
};

const logoImage = "/brand/ec-emy-logo.webp";
const heroImage = "/products/20-vestido-verde-modelo.webp";
const heroAccentImage = "/products/31-vestido-curto-transpassado.webp";
const aboutImage = "/products/24-vestidos-manequins-coloridos.webp";
const ctaImage = "/products/02-vestidos-mix-color.webp";
const accessoriesImage = "/products/29-bolsas-shelf.webp";

const navItems = [
  { label: "Coleções", href: "#colecoes" },
  { label: "Destaques", href: "#destaques" },
  { label: "Produtos", href: "#produtos" },
  { label: "Catálogo", href: "/produtos" },
  { label: "Benefícios", href: "#beneficios" },
  { label: "Sobre", href: "#sobre" },
  { label: "Testemunhos", href: "#testemunhos" },
  { label: "FAQ", href: "#faq" },
];

const trustItems = [
  {
    icon: ShieldCheck,
    title: "Atendimento confiável",
    description: "Compra assistida com resposta rápida no WhatsApp.",
  },
  {
    icon: Gem,
    title: "Curadoria premium",
    description: "Peças selecionadas para uma imagem mais elegante.",
  },
  {
    icon: Truck,
    title: "Entrega e orientação",
    description: "Suporte claro para escolher, pedir e receber.",
  },
  {
    icon: Clock3,
    title: "Novidades frequentes",
    description: "Coleção viva com peças novas e destaques semanais.",
  },
];

const collections: Collection[] = [
  {
    title: "Conjunto off-white",
    description: "Peça estruturada para um visual elegante e muito vendável.",
    image: "/products/01-conjunto-vest-ivory.webp",
    accent: "Selecionado para uso diário",
    imagePosition: "center 28%",
  },
  {
    title: "Vestido branco",
    description: "Peça com presença leve, ideal para ocasiões especiais.",
    image: heroAccentImage,
    accent: "Mais sofisticado",
    imagePosition: "center 34%",
  },
  {
    title: "Bolsas estruturadas",
    description: "Acessórios que completam o look com acabamento refinado.",
    image: accessoriesImage,
    accent: "Acabamento refinado",
    imagePosition: "center 52%",
  },
  {
    title: "Sandália com detalhe",
    description: "Calçado versátil para finalizar a produção com estilo.",
    image: "/products/30-sandalia-detalhe.webp",
    accent: "Toque final da produção",
    imagePosition: "center 56%",
  },
];

const weeklyHighlights: Product[] = [
  {
    title: "Conjunto branco e vermelho",
    category: "Conjuntos",
    description: "Uma composição forte, luminosa e com leitura comercial imediata.",
    badge: "Destaque da semana",
    price: "Sob consulta",
    image: "/products/15-conjunto-branco-vermelho.webp",
    imagePosition: "center 40%",
  },
  {
    title: "Vestido verde",
    category: "Vestidos",
    description: "A peça com mais presença editorial e melhor leitura de boutique.",
    badge: "Mais procurado",
    price: "Sob consulta",
    image: "/products/26-vestido-verde-elite.webp",
    imagePosition: "center 36%",
  },
  {
    title: "Camisa vinho",
    category: "Blusas",
    description: "Peça listrada com presença visual forte e leitura comercial imediata.",
    badge: "Mais chamativo",
    price: "Sob consulta",
    image: "/products/08-vestidos-mix-premium.webp",
    imagePosition: "center 38%",
  },
];

const featuredProducts: Product[] = [
  {
    title: "Blazer bege",
    category: "Conjuntos",
    description: "Corte elegante, presença feminina e leitura visual premium.",
    badge: "Peça assinatura",
    price: "Sob consulta",
    image: "/products/14-blazer-bege.webp",
    imagePosition: "center 38%",
  },
  {
    title: "Camisa listrada",
    category: "Blusas",
    description: "Um clássico fácil de vender, com leitura limpa e versátil.",
    badge: "Mais pedida",
    price: "Sob consulta",
    image: "/products/06-blusa-listras-azul.webp",
    imagePosition: "center 44%",
  },
  {
    title: "Camisas listradas",
    category: "Blusas",
    description: "Versátil para usar em mais de uma ocasião com conforto.",
    badge: "Novo",
    price: "Sob consulta",
    image: "/products/23-blusa-branca.webp",
    imagePosition: "center 42%",
  },
  {
    title: "Sandálias rasteiras",
    category: "Sandálias",
    description: "Detalhes discretos que deixam a produção mais completa.",
    badge: "Selecionado",
    price: "Sob consulta",
    image: "/products/32-sandalias-pilha.webp",
    imagePosition: "center 52%",
  },
];

const reasons = [
  {
    icon: Heart,
    title: "Curadoria com gosto",
  },
  {
    icon: Sparkles,
    title: "Imagem premium",
  },
  {
    icon: Users,
    title: "Atendimento humano",
  },
  {
    icon: BadgeCheck,
    title: "Compra simples",
  },
];

const testimonials: Testimonial[] = [
  {
    name: "Mariana S.",
    city: "Luanda",
    quote:
      "Achei o atendimento muito rápido e as peças chegam com uma apresentação impecável. Dá mesmo vontade de comprar.",
  },
  {
    name: "Débora A.",
    city: "Benguela",
    quote:
      "A marca transmite confiança. O site parece boutique de verdade, e isso ajudou-me a decidir sem hesitar.",
  },
  {
    name: "Renata M.",
    city: "Huambo",
    quote:
      "Gostei da elegância da apresentação e do cuidado no WhatsApp. Fiquei com sensação de exclusividade.",
  },
];

const faqItems: FaqItem[] = [
  {
    question: "Como faço um pedido?",
    answer:
      "Basta clicar em qualquer CTA de WhatsApp e enviar a mensagem. A equipa responde com orientação personalizada.",
  },
  {
    question: "Vocês enviam fotos e detalhes das peças?",
    answer:
      "Sim. O atendimento pelo WhatsApp serve exatamente para esclarecer tamanho, acabamento e disponibilidade.",
  },
  {
    question: "Fazem entrega?",
    answer:
      "A entrega pode ser combinada diretamente no WhatsApp, de acordo com a localização e a disponibilidade.",
  },
  {
    question: "Os produtos têm tamanhos variados?",
    answer:
      "As opções variam conforme a peça. O ideal é falar com a equipa para receber orientação mais precisa.",
  },
  {
    question: "Posso ver novidades da semana?",
    answer:
      "Sim. A secção de destaques e novidades foi pensada para mostrar rapidamente o que está mais atual na boutique.",
  },
];

function SectionHeading({
  eyebrow,
  title,
  description,
  centered = false,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  centered?: boolean;
}) {
  return (
    <div className={cn("max-w-3xl", centered && "mx-auto text-center")}>
      <Badge
        variant="outline"
        className="rounded-full border-[#d4af37]/25 bg-white/80 px-3 py-1 text-[11px] uppercase tracking-[0.28em] text-[#8a6f31]"
      >
        {eyebrow}
      </Badge>
      <h2 className="mt-4 text-balance text-3xl leading-[1.05] tracking-[-0.05em] text-[#111111] md:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 max-w-2xl text-balance text-base leading-8 text-[#5d5548] md:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}

function SectionLabel({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-4 rounded-2xl border border-black/5 bg-white p-4 shadow-[0_10px_30px_rgba(17,17,17,0.04)]">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#111111] text-white">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <h3 className="text-sm font-semibold tracking-[-0.02em] text-[#111111]">
          {title}
        </h3>
        <p className="mt-1 text-sm leading-6 text-[#6d655a]">{description}</p>
      </div>
    </div>
  );
}

function ProductCard({
  product,
  variant = "default",
}: {
  product: Product;
  variant?: "default" | "highlight";
}) {
  const isHighlight = variant === "highlight";
  const catalogProduct = catalogProducts.find((item) => item.image === product.image);
  const productName = catalogProduct?.name ?? product.title;
  const productCategory = catalogProduct?.category ?? product.category;
  const productCode = catalogProduct?.code ?? "N/A";

  return (
    <Card
      className={cn(
        "group gap-0 overflow-hidden border-black/5 bg-white py-0 shadow-[0_18px_50px_rgba(17,17,17,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(17,17,17,0.1)]",
        isHighlight && "rounded-[1.5rem]"
      )}
    >
      <div className="relative overflow-hidden aspect-[4/5]">
        <img
          src={product.image}
          alt={productName}
          loading="lazy"
          decoding="async"
          style={{ objectPosition: product.imagePosition }}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />
        <div className="absolute left-5 top-5">
          <Badge className="rounded-full bg-white/90 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-[#111111] shadow-sm">
            {product.badge}
          </Badge>
        </div>
        <div className="absolute bottom-5 left-5 right-5">
          <div className="inline-flex items-center gap-2 rounded-full bg-black/45 px-3 py-1 text-xs tracking-[0.16em] text-white/90 backdrop-blur-md">
            {productCategory}
          </div>
        </div>
      </div>
      <CardContent className="p-6">
        <h3 className="text-xl tracking-[-0.04em] text-[#111111]">{productName}</h3>
        <p className="mt-2 inline-flex rounded-full border border-[#d4af37]/18 bg-[#fbf8f2] px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-[#8a6f31]">
          Código: {productCode}
        </p>
        <p className="mt-3 text-sm leading-7 text-[#5d5548]">{product.description}</p>
        <div className="mt-5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between lg:gap-6">
          <div className="min-w-0">
            <p className="text-xs uppercase tracking-[0.22em] text-[#8a6f31]">
              Investimento
            </p>
            <p className="mt-1 text-sm font-medium text-[#111111]">{product.price}</p>
          </div>
          <Button
            asChild
            size="sm"
            className="h-11 w-full shrink-0 rounded-full bg-[#111111] px-5 text-sm font-semibold tracking-[-0.01em] text-white shadow-[0_12px_28px_rgba(17,17,17,0.16)] transition hover:-translate-y-0.5 hover:bg-[#1f1f1f] lg:min-w-[11.5rem] lg:w-auto lg:self-end"
          >
            <a
              href={buildProductWhatsAppLink({
                productName,
                productCode,
                category: productCategory,
              })}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap"
            >
              Pedir no WhatsApp
              <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showFloatingWhatsApp, setShowFloatingWhatsApp] = useState(true);

  useEffect(() => {
    const footer = document.getElementById("contato");
    if (!footer || typeof IntersectionObserver === "undefined") {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowFloatingWhatsApp(!entry.isIntersecting);
      },
      { threshold: 0.08 }
    );

    observer.observe(footer);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[#fbf8f2] text-[#111111]">
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:shadow-lg"
      >
        Saltar para o conteúdo
      </a>

      <header className="sticky top-0 z-50 border-b border-black/5 bg-[#fbf8f2]/85 backdrop-blur-xl">
        <div className="container flex h-20 items-center justify-between gap-4">
          <a href="#topo" className="flex items-center" aria-label="EC EMY COMÉRCIO">
            <img
              src={logoImage}
              alt="EC EMY COMÉRCIO"
              className="h-14 w-auto object-contain sm:h-16"
              width={1026}
              height={950}
              fetchPriority="high"
            />
          </a>

          <nav className="hidden items-center gap-7 text-sm lg:flex">
            {navItems.map((item) => (
              item.href.startsWith("/") ? (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-[#4f463b] transition-colors hover:text-[#111111]"
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-[#4f463b] transition-colors hover:text-[#111111]"
                >
                  {item.label}
                </a>
              )
            ))}
            <Button
              asChild
              size="sm"
              className="h-11 rounded-full bg-[#111111] px-5 text-sm text-white hover:bg-[#1f1f1f]"
            >
              <a href={buildWhatsAppLink(defaultWhatsappMessage)} target="_blank" rel="noreferrer">
                WhatsApp
                <MessageCircle className="h-4 w-4" />
              </a>
            </Button>
          </nav>

          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="h-11 w-11 rounded-full border-black/10 bg-white/80 lg:hidden"
                aria-label="Abrir menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-[90vw] border-l border-black/10 bg-[#fbf8f2] p-0 sm:max-w-md">
              <div className="flex h-full flex-col">
                <SheetHeader className="border-b border-black/5 px-6 py-5 text-left">
                  <div className="flex items-center">
                    <img
                      src={logoImage}
                      alt="EC EMY COMÉRCIO"
                      className="h-14 w-auto object-contain sm:h-16"
                      width={1026}
                      height={950}
                    />
                  </div>
                </SheetHeader>

                <div className="flex-1 px-6 py-6">
                <div className="space-y-2">
                  {navItems.map((item) => (
                    <SheetClose asChild key={item.href}>
                      {item.href.startsWith("/") ? (
                        <Link
                          href={item.href}
                          className="flex items-center justify-between rounded-2xl border border-black/5 bg-white px-4 py-4 text-sm text-[#111111] shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                        >
                          <span>{item.label}</span>
                          <ArrowRight className="h-4 w-4 text-[#8a6f31]" />
                        </Link>
                      ) : (
                        <a
                          href={item.href}
                          className="flex items-center justify-between rounded-2xl border border-black/5 bg-white px-4 py-4 text-sm text-[#111111] shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                        >
                          <span>{item.label}</span>
                          <ArrowRight className="h-4 w-4 text-[#8a6f31]" />
                        </a>
                      )}
                    </SheetClose>
                  ))}
                </div>
                </div>

                <SheetFooter className="flex-col border-t border-black/5 px-6 py-6">
                  <Button
                    asChild
                    className="h-12 w-full rounded-full bg-[#111111] text-white hover:bg-[#1f1f1f]"
                  >
                    <a href={buildWhatsAppLink(defaultWhatsappMessage)} target="_blank" rel="noreferrer">
                      Falar no WhatsApp
                      <MessageCircle className="h-4 w-4" />
                    </a>
                  </Button>
                <Button
                  asChild
                  variant="outline"
                  className="h-12 w-full rounded-full border-black/10 bg-white hover:bg-white"
                >
                  <Link href="/produtos">Ver catálogo</Link>
                </Button>
              </SheetFooter>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <main id="conteudo">
        <section
          id="topo"
          className="relative overflow-hidden border-b border-black/5 bg-[linear-gradient(180deg,#fbf8f2_0%,#f4eee6_100%)]"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.22),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(17,17,17,0.04),transparent_42%)]" />

          <div className="container relative grid gap-12 py-16 lg:grid-cols-[1.04fr_0.96fr] lg:items-center lg:py-20">
            <div className="max-w-2xl">
              <Badge
                variant="outline"
                className="rounded-full border-[#d4af37]/25 bg-white/80 px-3 py-1 text-[11px] uppercase tracking-[0.28em] text-[#8a6f31]"
              >
                Boutique feminina premium
              </Badge>

              <h1 className="mt-5 text-balance text-3xl leading-[0.98] tracking-[-0.05em] text-[#111111] sm:max-w-2xl sm:text-5xl md:text-6xl lg:max-w-none lg:text-7xl">
                Moda feminina selecionada para parecer elegante sem esforço.
              </h1>

              <p className="mt-6 max-w-xl text-base leading-8 text-[#5d5548] md:text-lg">
                A EC EMY COMÉRCIO apresenta uma curadoria feminina com roupas,
                bolsas, acessórios e calçados pensados para elevar o look e
                conduzir a cliente para uma compra mais segura pelo WhatsApp.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild className="h-12 rounded-full bg-[#111111] px-6 text-base text-white hover:bg-[#1f1f1f]">
                  <a href={buildWhatsAppLink(defaultWhatsappMessage)} target="_blank" rel="noreferrer">
                    Falar no WhatsApp
                    <MessageCircle className="h-4 w-4" />
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="h-12 rounded-full border-black/10 bg-white/80 px-6 text-base text-[#111111] hover:bg-white"
                >
                  <Link href="/produtos">Ver catálogo</Link>
                </Button>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                {[
                  "Atendimento personalizado",
                  "Peças selecionadas",
                  "Compra prática no WhatsApp",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-full border border-black/5 bg-white/80 px-4 py-2 text-sm text-[#4f463b] shadow-sm"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute left-5 top-5 hidden rounded-2xl border border-white/70 bg-white/85 p-4 shadow-xl backdrop-blur-md lg:block">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#111111] text-white">
                    <Star className="h-4 w-4 fill-current" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-[#8a6f31]">
                      Destaque da boutique
                    </p>
                    <p className="mt-1 text-sm text-[#111111]">Curadoria premium semanal</p>
                  </div>
                </div>
              </div>

              <div className="overflow-hidden rounded-[2rem] border border-white/75 bg-white shadow-[0_30px_100px_rgba(17,17,17,0.16)]">
                <img
                  src={heroImage}
                  alt="Coleção feminina EC EMY COMÉRCIO"
                  fetchPriority="high"
                  decoding="async"
                  loading="eager"
                  style={{ objectPosition: "center 40%" }}
                  className="h-[420px] w-full object-cover md:h-[560px]"
                />
              </div>

              <div className="absolute bottom-5 right-5 max-w-xs rounded-2xl bg-[#111111] p-4 text-white shadow-2xl lg:bottom-5 lg:right-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                    <Heart className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-white/65">
                      Sensação premium
                    </p>
                    <p className="mt-1 text-sm text-white/90">
                      Boutique elegante com compra simples e humana.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-black/5 bg-white/80">
          <div className="container grid gap-4 py-6 sm:grid-cols-2 xl:grid-cols-4">
            {trustItems.map((item) => (
              <SectionLabel
                key={item.title}
                icon={item.icon}
                title={item.title}
                description={item.description}
              />
            ))}
          </div>
        </section>

        <section id="colecoes" className="scroll-mt-24 py-20">
          <div className="container">
            <SectionHeading
              eyebrow="Coleções"
              title="Seleções pensadas para diferentes momentos da vida da cliente."
              centered
            />

            <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {collections.map((collection) => (
                <Card
                  key={collection.title}
                  className="group gap-0 overflow-hidden border-black/5 bg-white py-0 shadow-[0_18px_50px_rgba(17,17,17,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(17,17,17,0.1)]"
                >
                  <div className="relative overflow-hidden aspect-[4/5]">
                    <img
                      src={collection.image}
                      alt={collection.title}
                      loading="lazy"
                      decoding="async"
                      style={{ objectPosition: collection.imagePosition }}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />
                    <div className="absolute bottom-5 left-5 right-5 text-white">
                      <Badge className="rounded-full bg-white/90 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-[#111111]">
                        {collection.accent}
                      </Badge>
                      <h3 className="mt-4 text-2xl tracking-[-0.04em] text-white">
                        {collection.title}
                      </h3>
                      <div className="mt-4 flex items-center justify-between gap-3">
                        <span className="text-[11px] uppercase tracking-[0.22em] text-white/65">
                          Ver seleção
                        </span>
                        <Button
                          asChild
                          size="sm"
                          className="h-10 rounded-full bg-white px-4 text-sm text-[#111111] hover:bg-white/90"
                        >
                          <a
                            href={buildWhatsAppLink(defaultWhatsappMessage)}
                            target="_blank"
                            rel="noreferrer"
                          >
                            WhatsApp
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="destaques" className="scroll-mt-24 bg-[#f4eee6] py-20">
          <div className="container">
            <SectionHeading
              eyebrow="Destaques da semana"
              title="As peças que merecem mais atenção nesta curadoria."
            />

            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {weeklyHighlights.map((product) => (
                <ProductCard key={product.title} product={product} variant="highlight" />
              ))}
            </div>
          </div>
        </section>

        <section id="produtos" className="scroll-mt-24 py-20">
          <div className="container">
            <SectionHeading
              eyebrow="Produtos"
              title="A boutique apresentada como uma seleção de peças desejáveis."
            />

            <div className="mt-12 grid gap-6 md:grid-cols-2 md:gap-x-6 md:gap-y-10 xl:grid-cols-4 xl:gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.title} product={product} />
              ))}
            </div>

            <div className="mt-10 flex justify-center">
              <Button
                asChild
                className="h-12 rounded-full bg-[#111111] px-6 text-base text-white shadow-[0_12px_28px_rgba(17,17,17,0.16)] hover:bg-[#1f1f1f]"
              >
                <Link href="/produtos">
                  Ver Todos os Produtos
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section id="sobre" className="scroll-mt-24 border-y border-black/5 bg-[#fbf8f2] py-20">
          <div className="container grid gap-12 md:grid-cols-2 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
            <div className="relative">
              <div className="overflow-hidden rounded-[2rem] border border-white/80 bg-white shadow-[0_24px_70px_rgba(17,17,17,0.12)]">
                <img
                  src={aboutImage}
                  alt="Sobre a EC EMY COMÉRCIO"
                  loading="lazy"
                  decoding="async"
                  style={{ objectPosition: "center 38%" }}
                  className="h-[420px] w-full object-cover md:h-[560px]"
                />
              </div>
              <div className="absolute bottom-5 left-5 rounded-2xl bg-white p-4 shadow-xl">
                <p className="text-xs uppercase tracking-[0.22em] text-[#8a6f31]">
                  Boutique com curadoria
                </p>
                <p className="mt-1 text-sm text-[#111111]">
                  Peças selecionadas com intenção e elegância.
                </p>
              </div>
            </div>

            <div>
            <SectionHeading
              eyebrow="Sobre a marca"
              title="Uma marca pensada para mulheres que valorizam presença e bom gosto."
            />

              <div className="mt-8 space-y-4 text-[#5d5548]">
                <p className="leading-8">
                  A proposta é simples: apresentar peças que ajudem a cliente a
                  sentir-se bem vestida, sem ruído visual e sem a sensação de loja
                  improvisada.
                </p>
                <p className="leading-8">
                  Cada bloco da homepage foi pensado para parecer boutique,
                  transmitir confiança e conduzir naturalmente para o WhatsApp.
                </p>
                <p className="leading-8">
                  O resultado é uma presença online mais forte, elegante e pronta
                  para ser mostrada com orgulho à cliente.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="beneficios" className="scroll-mt-24 py-20">
          <div className="container">
            <SectionHeading
              eyebrow="Porque escolher"
              title="Uma boutique que comunica cuidado, confiança e estilo."
            />

            <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {reasons.map((reason) => (
                <Card
                  key={reason.title}
                  className="border-black/5 bg-white shadow-[0_16px_42px_rgba(17,17,17,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_55px_rgba(17,17,17,0.1)]"
                >
                  <CardContent className="p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#111111] text-white">
                      <reason.icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-5 text-xl tracking-[-0.04em] text-[#111111]">
                      {reason.title}
                    </h3>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="testemunhos" className="scroll-mt-24 bg-[#f4eee6] py-20">
          <div className="container">
            <SectionHeading
              eyebrow="Testemunhos"
              title="Pequenos sinais de validação fazem a marca parecer muito mais confiável."
            />

            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {testimonials.map((testimonial) => (
                <Card
                  key={testimonial.name}
                  className="border-black/5 bg-white shadow-[0_16px_42px_rgba(17,17,17,0.06)]"
                >
                  <CardContent className="p-6">
                    <div className="flex gap-1 text-[#d4af37]">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star key={index} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                    <p className="mt-5 text-sm leading-8 text-[#5d5548]">
                      “{testimonial.quote}”
                    </p>
                    <div className="mt-6 border-t border-black/5 pt-4">
                      <p className="text-sm font-medium text-[#111111]">
                        {testimonial.name}
                      </p>
                      <p className="text-xs uppercase tracking-[0.2em] text-[#8a6f31]">
                        {testimonial.city}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="scroll-mt-24 py-20">
          <div className="container grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
            <div>
            <SectionHeading
              eyebrow="FAQ"
              title="Responder às dúvidas antes do WhatsApp acelera a decisão."
            />
            </div>

            <Card className="border-black/5 bg-white shadow-[0_18px_50px_rgba(17,17,17,0.06)]">
              <CardContent className="p-0">
                <Accordion type="single" collapsible className="px-6">
                  {faqItems.map((item, index) => (
                    <AccordionItem key={item.question} value={`faq-${index}`}>
                      <AccordionTrigger className="text-left text-sm text-[#111111] hover:no-underline">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="pb-5 text-sm leading-7 text-[#5d5548]">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="relative overflow-hidden border-y border-black/5 py-20">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${ctaImage})`, backgroundPosition: "center 38%" }}
          />
          <div className="absolute inset-0 bg-black/55" />
          <div className="container relative text-white">
            <div className="mx-auto max-w-3xl text-center">
              <Badge className="rounded-full bg-white/15 px-3 py-1 text-[11px] uppercase tracking-[0.28em] text-white">
                Atendimento por WhatsApp
              </Badge>
              <h2 className="mt-5 text-3xl leading-[1.05] tracking-[-0.05em] text-white md:text-5xl">
                Pronta para falar com uma boutique que entende de presença e elegância?
              </h2>
              <p className="mt-5 text-base leading-8 text-white/85 md:text-lg">
                A próxima ação é simples: abrir o WhatsApp e receber atenção
                personalizada para escolher a peça certa.
              </p>

              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Button asChild className="h-12 rounded-full bg-white px-6 text-base text-[#111111] hover:bg-white/90">
                  <a href={buildWhatsAppLink(defaultWhatsappMessage)} target="_blank" rel="noreferrer">
                    Abrir WhatsApp
                    <MessageCircle className="h-4 w-4" />
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="h-12 rounded-full border-white/20 bg-white/10 px-6 text-base text-white hover:bg-white/15 hover:text-white"
                >
                  <a href="#colecoes">Explorar coleções</a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer id="contato" className="bg-[#111111] py-16 text-white">
        <div className="container">
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
            <div>
              <div className="inline-flex items-center rounded-[1.35rem] bg-[#fbf8f2] p-2 shadow-[0_12px_30px_rgba(0,0,0,0.24)]">
                <img
                  src={logoImage}
                  alt="EC EMY COMÉRCIO"
                  className="h-14 w-auto object-contain sm:h-16"
                  width={1026}
                  height={950}
                  loading="lazy"
                />
              </div>
              <p className="mt-5 max-w-md text-sm leading-8 text-white/70">
                Moda feminina selecionada com atendimento próximo, presença
                visual refinada e foco total em uma experiência elegante pelo
                WhatsApp.
              </p>
            </div>

            <div>
              <h4 className="text-sm uppercase tracking-[0.24em] text-white/55">
                Links rápidos
              </h4>
              <ul className="mt-5 space-y-3 text-sm text-white/75">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <a className="transition hover:text-white" href={item.href}>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm uppercase tracking-[0.24em] text-white/55">
                Contacto
              </h4>
              <div className="mt-5 space-y-4 text-sm text-white/75">
                <a
                  href={buildWhatsAppLink(defaultWhatsappMessage)}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 transition hover:text-white"
                >
                  <MessageCircle className="h-4 w-4 text-[#d4af37]" />
                  WhatsApp
                </a>
                <p>
                  Atendimento direto para escolher peças, pedir fotos e fechar
                  a compra de forma simples.
                </p>
              </div>
            </div>
          </div>

          <Separator className="my-10 bg-white/10" />

          <div className="flex flex-col gap-4 text-sm text-white/55 md:flex-row md:items-center md:justify-between">
            <p>© 2024 EC EMY COMÉRCIO. Todos os direitos reservados.</p>
            <p>Moda feminina com curadoria, elegância e atendimento humano.</p>
          </div>
        </div>
      </footer>

      <a
        href={buildWhatsAppLink(defaultWhatsappMessage)}
        target="_blank"
        rel="noreferrer"
        aria-label="Falar com a EC EMY COMÉRCIO no WhatsApp"
        className={cn(
          "fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] right-[calc(1rem+env(safe-area-inset-right))] z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#d4af37] text-[#111111] shadow-[0_18px_50px_rgba(17,17,17,0.22)] transition-all duration-300 hover:scale-110 md:bottom-5 md:right-5",
          !showFloatingWhatsApp && "pointer-events-none translate-y-6 opacity-0"
        )}
      >
        <MessageCircle className="h-6 w-6" />
      </a>
    </div>
  );
}

export default Home;
