'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import z from 'zod'
import { DIAMETER_DATA, DIAMETER_VALUES, UNIT_KEYS } from '@/constants'
import { makeCalculator } from '@/factory/make-calculator'
import { maskCurrency, maskOnlyNumbersAndDot } from '@/utils/formatter'
import { Button } from './ui/button'
import { Field, FieldError, FieldLabel } from './ui/field'
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
  copperBasePrice: z.coerce
    .number({
      error: 'Por favor, insira um valor numérico',
    })
    .min(0.1, { message: 'O preço mínimo deve ser de R$ 0,10' })
    .max(1000, {
      message: 'O preço parece muito alto. Verifique novamente.',
    }),
  diameterId: z.string({ error: 'Selecione um valor' }),
  key: z.string({ error: 'Selecione um valor' }),
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
      key,
      linearWeight,
      netWeight,
      wireGauge,
    })

    setShowResult(result)
  }
  return (
    <form
      className="flex flex-col gap-4 text-zinc-200"
      onSubmit={handleSubmit(calc)}
    >
      <div className="group flex flex-col">
        <Controller
          control={control}
          name="diameterId"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Diâmetro</FieldLabel>
              <Select
                name={field.name}
                onValueChange={field.onChange}
                value={field.value}
              >
                <SelectTrigger
                  aria-invalid={fieldState.invalid}
                  className="w-full"
                >
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
              <FieldError errors={[fieldState.error]} />
            </Field>
          )}
        />
      </div>
      <div className="group flex flex-col">
        <Field
          data-invalid={formState.errors.key || formState.errors.linearWeight}
        >
          <FieldLabel>Unidade a converter</FieldLabel>

          <div className="flex gap-2">
            <div>
              <Controller
                control={control}
                name="key"
                render={({ field }) => (
                  <Select
                    name={field.name}
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <SelectTrigger
                      aria-invalid={formState.errors.key}
                      className="w-full max-w-48"
                    >
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
              <FieldError errors={[formState.errors.key]} />
            </div>
            <Controller
              control={control}
              name="linearWeight"
              render={({ field: { onChange, value, ...field } }) => (
                <div className="relative flex-1">
                  <Input
                    {...field}
                    aria-invalid={formState.errors.linearWeight}
                    id="unit_weight"
                    onChange={(e) => {
                      const masked = maskOnlyNumbersAndDot(e.target.value)
                      onChange(masked)
                    }}
                    placeholder="Quantidade. Ex: 10.5"
                    value={value ? String(value) : ''}
                  />
                  <FieldError errors={[formState.errors.linearWeight]} />
                </div>
              )}
            />
          </div>
        </Field>
      </div>

      <Controller
        control={control}
        name="copperBasePrice"
        render={({ field: { onChange, value, ...field }, fieldState }) => (
          <div className="group flex flex-col">
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Preço unitário</FieldLabel>

              <Input
                {...field}
                aria-invalid={fieldState.invalid}
                id="unit_price"
                onChange={(e) => {
                  const rawValue = e.target.value.replace(/\D/g, '')

                  if (rawValue === '') {
                    onChange(0)
                    return
                  }
                  onChange(Number(rawValue) / 100)
                }}
                placeholder="R$ 0,00"
                type="text"
                value={
                  typeof value === 'number'
                    ? maskCurrency(value.toString())
                    : ''
                }
              />
              <FieldError errors={[fieldState.error]} />
            </Field>
          </div>
        )}
      />
      <Button
        className="bg-blue-500 text-blue-50 uppercase hover:bg-blue-600"
        type="submit"
      >
        Calcular
      </Button>
      <span
        className="block rounded px-2 py-4 text-center font-bold font-mono text-blue-400 text-xl"
        id="result"
      >
        {showResult ? showResult : '---'}
      </span>
    </form>
  )
}
