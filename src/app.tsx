import { AccessCounter } from '@/components/access-counter'
import { CalcForm } from '@/components/calc-form'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Providers } from '@/providers'
import { AdBanner } from './components/ad-banner'

export function App() {
  return (
    <Providers>
      <div className="grid min-h-screen grid-rows-[1fr_auto]">
        <main className="w-full px-4 grid place-items-center pt-10">
          <Card className="max-w-2xl w-full">
            <CardHeader>
              <CardTitle>Calculadora de fios de cobre</CardTitle>
              <CardDescription>
                Calcule rapidamente o custo e as conversões de fios de cobre com
                base no diâmetro, quantidade e preço unitário.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CalcForm />
            </CardContent>
          </Card>
        </main>
        <AdBanner dataAdSlot="9873999514" />
        <section className="w-full max-w-2xl mx-auto px-4 py-8 space-y-8">
          <article className="prose prose-invert max-w-none">
            <h2 className="text-xl font-semibold text-foreground mb-3">
              Como é feito o cálculo do fio de cobre?
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              O cálculo do peso do fio de cobre utiliza a densidade do cobre
              (8,96 g/cm³) juntamente com a área da seção transversal do fio. A
              área é calculada a partir do diâmetro usando a fórmula π × (d/2)².
              Multiplicando a área pelo comprimento e pela densidade, obtemos o
              peso total. O custo é então calculado multiplicando o peso pelo
              preço por quilograma. Esta calculadora também suporta conversão
              entre AWG (American Wire Gauge) e milímetros, facilitando o
              trabalho com diferentes padrões de bitola.
            </p>
          </article>

          <article className="prose prose-invert max-w-none">
            <h2 className="text-xl font-semibold text-foreground mb-3">
              Tabela de referência AWG para mm
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-muted-foreground">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 pr-4">AWG</th>
                    <th className="text-left py-2 pr-4">Diâmetro (mm)</th>
                    <th className="text-left py-2 pr-4">Área (mm²)</th>
                    <th className="text-left py-2">kg/km</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    [10, 2.588, 5.26, 47.1],
                    [12, 2.053, 3.31, 29.7],
                    [14, 1.628, 2.08, 18.7],
                    [16, 1.291, 1.31, 11.7],
                    [18, 1.024, 0.823, 7.37],
                    [20, 0.812, 0.518, 4.64],
                    [22, 0.644, 0.326, 2.92],
                  ].map(([awg, diam, area, kg]) => (
                    <tr key={awg} className="border-b border-border/50">
                      <td className="py-2 pr-4 font-mono">{awg}</td>
                      <td className="py-2 pr-4 font-mono">{diam}</td>
                      <td className="py-2 pr-4 font-mono">{area}</td>
                      <td className="py-2 font-mono">{kg}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>

          <article className="prose prose-invert max-w-none">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Perguntas frequentes
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-foreground font-medium mb-1">
                  O que é AWG?
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  AWG (American Wire Gauge) é um padrão norte-americano para
                  bitolas de fios elétricos. Quanto menor o número AWG, maior o
                  diâmetro do fio. Por exemplo, um fio 10 AWG é mais grosso que
                  um 20 AWG.
                </p>
              </div>
              <div>
                <h3 className="text-foreground font-medium mb-1">
                  Qual a densidade do cobre usada no cálculo?
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  A calculadora utiliza a densidade padrão do cobre de 8,96
                  g/cm³, que é o valor comumente adotado para cobre puro em
                  aplicações elétricas.
                </p>
              </div>
              <div>
                <h3 className="text-foreground font-medium mb-1">
                  Como converter AWG para milímetros?
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  A conversão segue a fórmula padrão: d(mm) = 0,127 ×
                  92^((36-AWG)/39). Nossa calculadora faz essa conversão
                  automaticamente — basta selecionar a opção AWG e escolher a
                  bitola desejada.
                </p>
              </div>
              <div>
                <h3 className="text-foreground font-medium mb-1">
                  O cálculo considera o isolamento do fio?
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Não. O cálculo considera apenas o condutor de cobre nu
                  (diâmetro do metal). O isolamento plástico não é incluído no
                  peso nem no custo do cobre.
                </p>
              </div>
            </div>
          </article>
        </section>
        <footer className="relative mt-8 py-6 text-muted-foreground before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-border/64">
          <div className="container flex w-full items-center justify-center gap-2 px-4 sm:px-6 mx-auto">
            <p className="text-center">
              © 2026 Desenvolvido por{' '}
              <span className="text-white">Elivelton Santos.</span> Código
              aberto no{' '}
              <a
                className="font-heading text-foreground text-lg hover:underline"
                href="https://github.com/samsepi0ldev"
              >
                {' '}
                Github.
              </a>
            </p>
            <AccessCounter />
          </div>
        </footer>
      </div>
    </Providers>
  )
}
