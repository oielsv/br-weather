'use client';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';

import { useCurrencyForm } from '../../hooks';
import { currencies } from '../../models/currency';

import { CurrencyBlock } from './CurrencyBlock';

export function CurrencyForm() {
  const {
    form,
    fields,
    data,
    handleCurrencyChange,
    handleAddCurrency,
    handleRemoveCurrency,
    handleSubmit,
    getAvailableCurrencies,
  } = useCurrencyForm();

  return (
    <div className="flex flex-col gap-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          {fields.map((field, index) => (
            <CurrencyBlock
              key={field.id}
              index={index}
              form={form}
              showRemoveButton={fields.length > 1}
              onCurrencyChange={handleCurrencyChange}
              onRemove={handleRemoveCurrency}
              getAvailableCurrencies={getAvailableCurrencies}
            />
          ))}
          <div className="flex justify-end gap-2">
            {fields.length < Object.keys(currencies).length && (
              <Button
                type="button"
                onClick={handleAddCurrency}
                disabled={fields.length >= Object.keys(currencies).length}
              >
                Add Currency {fields.length} / {Object.keys(currencies).length}
              </Button>
            )}
            <Button
              type="submit"
              disabled={!form.formState.isValid || form.formState.isSubmitting}
              className="hover:enabled:cursor-pointer"
            >
              Submit
            </Button>
          </div>
        </form>
      </Form>
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}

CurrencyForm.displayName = 'CurrencyForm';
