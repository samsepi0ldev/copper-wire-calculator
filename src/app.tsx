import { Github } from 'lucide-react'
import { useEffect, useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { CalcForm } from './components/calc-form'
import { Button } from './components/ui/button'

export function App() {
  return (
    <div className="grid min-h-screen grid-rows-[auto_1fr_auto]">
      <main className="w-full row-span-2 px-4 grid place-items-center">
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
      <footer className="relative mt-8 py-6 text-muted-foreground before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-border/64">
        <div className="container flex w-full items-center justify-center gap-2 px-4 sm:px-6 mx-auto">
          <p className="text-center">
            © 2026 Desenvolvido por{' '}
            <span className="text-white">Elivelton Santos.</span> Código aberto
            no{' '}
            <a
              className="font-heading text-foreground text-lg hover:underline"
              href="https://github.com/samsepi0ldev"
            >
              {' '}
              Github.
            </a>
          </p>
        </div>
      </footer>
    </div>
  )
}
