import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { DIAMETER_DATA } from './constants'
import { makeCalculator } from './factory/make-calculator'
import { maskCurrency, maskOnlyNumbersAndDot } from './utils/formatter'

const calcSchema = z.object({
  key: z.string(),
  diameterId: z.string(),
  copperBasePrice: z.coerce
    .number({
      error: 'Por favor, insira um valor numérico',
    })
    .min(0.1, { message: 'O preço mínimo deve ser de R$ 0,10' })
    .max(1000, {
      message: 'O preço parece muito alto. Verifique novamente.',
    }),
  linearWeight: z.coerce
    .number({ error: 'Por favor, insira um valor numérico' })
    .min(0.001, { message: 'O peso deve ser maior que zero' }),
})

type CalcProps = z.infer<typeof calcSchema>

export function App() {
  const [showResult, setShowResult] = useState<string | undefined>(undefined)
  const calculator = makeCalculator()

  const { control, register, formState, handleSubmit } = useForm({
    resolver: zodResolver(calcSchema),
  })

  function calc({ copperBasePrice, diameterId, key, linearWeight }: CalcProps) {
    const netWeight = DIAMETER_DATA[diameterId].weight
    const wireGauge = DIAMETER_DATA[diameterId].diameter

    const result = calculator.calc({
      copperBasePrice,
      linearWeight,
      key,
      netWeight,
      wireGauge,
    })

    setShowResult(result)
  }

  return (
    <div className="max-w-2xl w-full rounded-xl border border-zinc-800 bg-zinc-900 p-2">
      <h1 className="text-zinc-200 font-semibold text-xl text-center">
        Calculadora de fios de cobre
      </h1>
      <form
        onSubmit={handleSubmit(calc)}
        className="p-4 gap-4 flex flex-col text-zinc-200"
      >
        <div className="group flex flex-col">
          <label
            className="text-sm mb-1 block text-zinc-500"
            htmlFor="diameter_id"
          >
            Diâmetro
          </label>
          <select
            className="border p-2 rounded border-zinc-700 text-sm bg-zinc-800 text-zinc-100"
            id="diameter_id"
            {...register('diameterId')}
          >
            <option value="1">1/4 (6,35mm)</option>
            <option value="2">5/16 (7,94mm)</option>
            <option value="3">3/8 (9,52mm)</option>
            <option value="4">1/2 (12,7mm)</option>
            <option value="5">5/8 (15,87mm)</option>
            <option value="6">3/4 (19,05mm)</option>
          </select>
        </div>
        <div className="group flex flex-col">
          <label className="text-sm mb-1 block text-zinc-500" htmlFor="unit_id">
            Unidade a converter
          </label>
          <div className="flex gap-2">
            <select
              className="w-1/3 border p-2 rounded border-zinc-700 text-sm bg-zinc-800"
              id="unit_id"
              {...register('key')}
            >
              <option value="m">Metros (m)</option>
              <option value="kg">Quilos (kg)</option>
            </select>
            <Controller
              control={control}
              name="linearWeight"
              render={({ field: { onChange, value, ...field } }) => (
                <div className="flex-1 relative">
                  <input
                    {...field}
                    className="w-full border p-2 rounded border-zinc-700 text-sm bg-zinc-800"
                    id="unit_weight"
                    placeholder="Quantidade. Ex: 10.5"
                    value={value ? String(value) : ''}
                    onChange={(e) => {
                      const masked = maskOnlyNumbersAndDot(e.target.value)
                      onChange(masked)
                    }}
                  />
                  {formState.errors.linearWeight ? (
                    <p className="absolute text-xs text-red-400 font-bold">
                      {formState.errors.linearWeight.message}
                    </p>
                  ) : null}
                </div>
              )}
            />
          </div>
        </div>

        <Controller
          name="copperBasePrice"
          control={control}
          render={({ field: { onChange, value, ...field } }) => (
            <div className="group flex flex-col">
              <label
                className="text-sm mb-1 block text-zinc-500"
                htmlFor="unit_price"
              >
                Preço unitário
              </label>
              <input
                {...field}
                className="border p-2 rounded border-zinc-700 text-sm bg-zinc-800"
                type="text"
                id="unit_price"
                placeholder="R$ 0,00"
                value={
                  typeof value === 'number'
                    ? maskCurrency(value.toString())
                    : ''
                }
                onChange={(e) => {
                  const rawValue = e.target.value.replace(/\D/g, '')

                  if (rawValue === '') {
                    onChange(0)
                    return
                  }
                  onChange(Number(rawValue) / 100)
                }}
              />
              {formState.errors.copperBasePrice ? (
                <p className="text-xs text-red-400 font-bold">
                  {formState.errors.copperBasePrice.message}
                </p>
              ) : null}
            </div>
          )}
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 rounded text-emerald-50 font-bold w-full uppercase py-2"
        >
          Calcular
        </button>
        <span
          id="result"
          className="font-mono font-bold rounded px-2 py-4 block text-center text-xl text-blue-400"
        >
          {showResult ? showResult : '---'}
        </span>
      </form>
    </div>
  )
}
