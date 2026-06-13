import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { buildWhatsAppLink, defaultWhatsappMessage } from "@/lib/site";
import { ArrowLeft, MessageCircle, Search } from "lucide-react";
import { useLocation } from "wouter";

export default function NotFound() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#fbf8f2_0%,#f4eee6_100%)] text-[#111111]">
      <main className="container flex min-h-screen items-center py-10">
        <Card className="w-full overflow-hidden border-black/5 bg-white shadow-[0_24px_80px_rgba(17,17,17,0.08)]">
          <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
            <div className="flex items-center justify-center bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.18),transparent_56%),linear-gradient(180deg,#111111_0%,#1b1714_100%)] px-8 py-14 text-white">
              <div className="max-w-sm text-center">
                <div className="mx-auto inline-flex rounded-[1.35rem] bg-[#fbf8f2] p-2 shadow-[0_12px_30px_rgba(0,0,0,0.24)]">
                  <img
                    src="/brand/ec-emy-logo.webp"
                    alt="EC EMY COMÉRCIO"
                    className="h-16 w-auto object-contain"
                    width={1026}
                    height={950}
                  />
                </div>
                <p className="mt-8 text-xs uppercase tracking-[0.32em] text-white/60">
                  Página não encontrada
                </p>
                <h1 className="mt-4 text-5xl tracking-[-0.06em] text-white md:text-6xl">
                  404
                </h1>
                <p className="mt-4 text-sm leading-7 text-white/72">
                  A página que procuras não existe ou foi movida. Vamos voltar
                  para a boutique.
                </p>
              </div>
            </div>

            <CardContent className="flex flex-col justify-center p-8 sm:p-10 lg:p-12">
              <div className="max-w-xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#d4af37]/20 bg-[#fbf8f2] px-3 py-1 text-[11px] uppercase tracking-[0.26em] text-[#8a6f31]">
                  <Search className="h-3.5 w-3.5" />
                  Navegação indisponível
                </div>

                <h2 className="mt-5 text-3xl tracking-[-0.05em] text-[#111111] md:text-4xl">
                  O link não está disponível agora.
                </h2>

                <p className="mt-4 max-w-lg text-base leading-8 text-[#5d5548]">
                  Se chegaste aqui por engano, regressa à homepage ou fala com a
                  equipa pelo WhatsApp para continuares a experiência sem fricção.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Button
                    onClick={() => setLocation("/")}
                    className="h-12 rounded-full bg-[#111111] px-6 text-base text-white hover:bg-[#1f1f1f]"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Voltar à homepage
                  </Button>
                <Button
                  asChild
                  variant="outline"
                  className="h-12 rounded-full border-black/10 bg-white px-6 text-base text-[#111111] hover:bg-[#fbf8f2]"
                >
                    <a href={buildWhatsAppLink(defaultWhatsappMessage)} target="_blank" rel="noreferrer">
                      <MessageCircle className="h-4 w-4" />
                      Falar no WhatsApp
                    </a>
                </Button>
                </div>
              </div>
            </CardContent>
          </div>
        </Card>
      </main>
    </div>
  );
}
