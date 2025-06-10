import { useCallback, useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFieldArray } from 'react-hook-form';
import { currencies, CurrencyCodeEnum } from '../models/currency';

const blockSchema = z
  .object({
    from: z.string().min(1, 'Lower limit is required'),
    to: z.string().min(1, 'Upper limit is required'),
    currency: z.nativeEnum(CurrencyCodeEnum),
  })
  .refine((data) => Number(data.to) > Number(data.from), {
    message: 'Upper limit must be greater than lower limit',
    path: ['to'],
  });

const formSchema = z.object({
  currencies: z.array(blockSchema),
});

export const useCurrencyForm = () => {
  const [data, setData] = useState<z.infer<typeof formSchema> | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      currencies: [
        {
          from: '',
          to: '',
          currency: currencies[CurrencyCodeEnum.EUR].code,
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'currencies',
  });

  const getAvailableCurrencies = (currentIndex: number) => {
    const selectedCurrencies = form
      .watch('currencies')
      .map((b, i) => (i !== currentIndex ? b.currency : null))
      .filter(Boolean);
    return Object.values(currencies).filter(
      (currency) => !selectedCurrencies.includes(currency.code)
    );
  };

  const handleCurrencyChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, index: number, field: 'from' | 'to') => {
      const { value: rawValue } = e.target;
      const formattedValue = rawValue.replace(/[^0-9]/g, '');

      if (!/^\d*$/.test(formattedValue)) {
        return;
      }

      form.setValue(`currencies.${index}.${field}`, formattedValue, { shouldValidate: true });
    },
    [form]
  );

  const handleAddCurrency = useCallback(() => {
    if (fields.length >= Object.keys(currencies).length) {
      return;
    }

    append({
      from: '',
      to: '',
      currency: getAvailableCurrencies(fields.length)[0]?.code,
    });
  }, [append, fields.length, form.watch('currencies')]);

  const handleRemoveCurrency = useCallback(
    (index: number) => {
      remove(index);
    },
    [remove]
  );

  const handleSubmit = useCallback(
    (values: z.infer<typeof formSchema>) => {
      setData(values);
    },
    [setData]
  );

  return {
    form,
    fields,
    data,
    handleCurrencyChange,
    handleAddCurrency,
    handleRemoveCurrency,
    handleSubmit,
    getAvailableCurrencies,
  };
};
