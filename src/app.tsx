import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { CalcForm } from './components/calc-form'

export function App() {
  return (
    <>
      <main className="w-full h-[calc(100%-64px)] px-4 grid place-items-center">
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
      <footer className="text-zinc-500 h-16 flex items-center justify-center">
        Feito por Elivelton Santos{' '}
        <a
          className="text-zinc-200 hover:text-white underline ml-1 "
          href="https://github.com/samsepi0ldev"
        >
          {' '}
          Github.
        </a>
      </footer>
    </>
  )
}
