import { cn } from "@/lib/utils";
import { AlertTriangle, RotateCcw } from "lucide-react";
import { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[linear-gradient(180deg,#fbf8f2_0%,#f4eee6_100%)] px-4 py-8 text-[#111111] sm:px-6 lg:px-8">
          <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-4xl items-center">
            <div className="grid w-full overflow-hidden rounded-[2rem] border border-black/5 bg-white shadow-[0_24px_80px_rgba(17,17,17,0.08)] lg:grid-cols-[0.9fr_1.1fr]">
              <div className="flex flex-col justify-center bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.18),transparent_56%),linear-gradient(180deg,#111111_0%,#1b1714_100%)] px-8 py-14 text-center text-white">
                <AlertTriangle size={56} className="mx-auto mb-6 text-[#d4af37]" />
                <div className="mx-auto inline-flex rounded-[1.35rem] bg-[#fbf8f2] p-2 shadow-[0_12px_30px_rgba(0,0,0,0.24)]">
                  <img
                    src="/brand/ec-emy-logo.webp"
                    alt="EC EMY COMÉRCIO"
                    className="h-14 w-auto object-contain"
                    width={1026}
                    height={950}
                  />
                </div>
                <p className="mt-8 text-xs uppercase tracking-[0.32em] text-white/60">
                  Ocorreu um erro
                </p>
                <h1 className="mt-4 text-4xl tracking-[-0.06em] text-white md:text-5xl">
                  Vamos recuperar esta página
                </h1>
                <p className="mt-4 text-sm leading-7 text-white/72">
                  A interface encontrou um problema inesperado. Normalmente, recarregar resolve.
                </p>
              </div>

              <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-12">
                <h2 className="text-2xl tracking-[-0.05em] text-[#111111] md:text-3xl">
                  Algo interrompeu a experiência.
                </h2>

                <p className="mt-4 max-w-xl text-base leading-8 text-[#5d5548]">
                  A página continua segura para ser recarregada. Se o problema
                  persistir, o stack abaixo ajuda-nos a diagnosticar rapidamente.
                </p>

                {this.state.error?.stack ? (
                  <div className="mt-8 max-h-56 overflow-auto rounded-2xl border border-black/5 bg-[#fbf8f2] p-4">
                    <pre className="text-xs leading-6 text-[#6d655a] whitespace-break-spaces">
                      {this.state.error.stack}
                    </pre>
                  </div>
                ) : null}

                <button
                  onClick={() => window.location.reload()}
                  className={cn(
                    "mt-8 inline-flex items-center justify-center gap-2 self-start rounded-full px-5 py-3 text-sm font-medium",
                    "bg-[#111111] text-white transition hover:bg-[#1f1f1f]"
                  )}
                >
                  <RotateCcw size={16} />
                  Recarregar página
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
