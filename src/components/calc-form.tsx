import { zodResolver } from '@hookform/resolvers/zod'
import { Label } from '@radix-ui/react-label'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import z from 'zod'
import { DIAMETER_DATA, DIAMETER_VALUES, UNIT_KEYS } from '@/constants'
import { makeCalculator } from '@/factory/make-calculator'
import { maskCurrency, maskOnlyNumbersAndDot } from '@/utils/formatter'
import { Button } from './ui/button'
import { Input } from './ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'

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

export function CalcForm() {
  const [showResult, setShowResult] = useState<string | undefined>(undefined)
  const calculator = makeCalculator()

  const { control, formState, handleSubmit } = useForm({
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
    <form
      onSubmit={handleSubmit(calc)}
      className="gap-4 flex flex-col text-zinc-200"
    >
      <div className="group flex flex-col">
        <Label
          className="text-sm mb-1 block text-zinc-500"
          htmlFor="diameter_id"
        >
          Diâmetro
        </Label>
        <Controller
          control={control}
          name="diameterId"
          render={({ field }) => (
            <Select
              defaultValue={'1'}
              name={field.name}
              value={field.value}
              onValueChange={field.onChange}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione uma medida" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectGroup>
                  {DIAMETER_VALUES.map((val, i) => (
                    <SelectItem key={val} value={(++i).toString()}>
                      {val}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        />
      </div>
      <div className="group flex flex-col">
        <Label className="text-sm mb-1 block text-zinc-500" htmlFor="unit_id">
          Unidade a converter
        </Label>
        <div className="flex gap-2">
          <Controller
            control={control}
            name="key"
            render={({ field }) => (
              <Select
                defaultValue={UNIT_KEYS[0].value}
                name={field.name}
                value={field.value}
                onValueChange={field.onChange}
              >
                <SelectTrigger className="w-full max-w-48">
                  <SelectValue placeholder="Selecione uma unidade" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectGroup>
                    {UNIT_KEYS.map((val, i) => (
                      <SelectItem key={i.toString()} value={val.value}>
                        {val.text}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
          <Controller
            control={control}
            name="linearWeight"
            render={({ field: { onChange, value, ...field } }) => (
              <div className="flex-1 relative">
                <Input
                  {...field}
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
            <Label
              className="text-sm mb-1 block text-zinc-500"
              htmlFor="unit_price"
            >
              Preço unitário
            </Label>
            <Input
              {...field}
              type="text"
              id="unit_price"
              placeholder="R$ 0,00"
              value={
                typeof value === 'number' ? maskCurrency(value.toString()) : ''
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
      <Button
        className="bg-blue-500 hover:bg-blue-600 text-blue-50 uppercase"
        type="submit"
      >
        Calcular
      </Button>
      <span
        id="result"
        className="font-mono font-bold rounded px-2 py-4 block text-center text-xl text-blue-400"
      >
        {showResult ? showResult : '---'}
      </span>
    </form>
  )
}
