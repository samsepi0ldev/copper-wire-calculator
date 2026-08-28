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

export default function Home() {
  return (
    <Providers>
      <div className="grid min-h-screen grid-rows-[1fr_auto]">
        <main className="grid w-full place-items-center px-4 pt-10">
          <Card className="w-full max-w-2xl">
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
        {/* <AdBanner dataAdSlot="9873999514" /> */}
        <section className="mx-auto w-full max-w-2xl space-y-8 px-4 py-8">
          <article className="prose prose-invert max-w-none">
            <h2 className="mb-3 font-semibold text-foreground text-xl">
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
            <h2 className="mb-3 font-semibold text-foreground text-xl">
              Tabela de referência AWG para mm
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-muted-foreground text-sm">
                <thead>
                  <tr className="border-border border-b">
                    <th className="py-2 pr-4 text-left">AWG</th>
                    <th className="py-2 pr-4 text-left">Diâmetro (mm)</th>
                    <th className="py-2 pr-4 text-left">Área (mm²)</th>
                    <th className="py-2 text-left">kg/km</th>
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
                    <tr className="border-border/50 border-b" key={awg}>
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
            <h2 className="mb-4 font-semibold text-foreground text-xl">
              Perguntas frequentes
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="mb-1 font-medium text-foreground">
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
                <h3 className="mb-1 font-medium text-foreground">
                  Qual a densidade do cobre usada no cálculo?
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  A calculadora utiliza a densidade padrão do cobre de 8,96
                  g/cm³, que é o valor comumente adotado para cobre puro em
                  aplicações elétricas.
                </p>
              </div>
              <div>
                <h3 className="mb-1 font-medium text-foreground">
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
                <h3 className="mb-1 font-medium text-foreground">
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
          <div className="container mx-auto flex w-full items-center justify-center gap-2 px-4 sm:px-6">
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
