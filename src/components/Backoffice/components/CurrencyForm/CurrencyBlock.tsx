import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { CurrencyCodeEnum, Currency } from '../../models/currency';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';

const formSchema = z.object({
  currencies: z.array(
    z.object({
      from: z.string(),
      to: z.string(),
      currency: z.nativeEnum(CurrencyCodeEnum),
    })
  ),
});

interface CurrencyBlockProps {
  index: number;
  showRemoveButton: boolean;
  form: UseFormReturn<z.infer<typeof formSchema>>;
  onCurrencyChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    field: 'from' | 'to'
  ) => void;
  onRemove: (index: number) => void;
  getAvailableCurrencies: (index: number) => Currency[];
}

export function CurrencyBlock({
  index,
  showRemoveButton,
  form,
  onCurrencyChange,
  onRemove,
  getAvailableCurrencies,
}: CurrencyBlockProps) {
  return (
    <div className="grid grid-cols-12 gap-2 border pt-5 pb-1 px-4 rounded-md">
      <div className="col-span-8 grid grid-cols-2 gap-2">
        <FormField
          control={form.control}
          name={`currencies.${index}.from`}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="hover:cursor-pointer">Lower limit</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  autoComplete="off"
                  placeholder="Lower limit"
                  onChange={(e) => onCurrencyChange(e, index, 'from')}
                  inputMode="numeric"
                />
              </FormControl>
              <div className="min-h-5">
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={`currencies.${index}.to`}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="hover:cursor-pointer">Upper limit</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  autoComplete="off"
                  placeholder="Upper limit"
                  inputMode="numeric"
                  onChange={(e) => onCurrencyChange(e, index, 'to')}
                />
              </FormControl>
              <div className="min-h-5">
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
      </div>
      <div className="col-span-4 flex gap-2">
        <FormField
          control={form.control}
          name={`currencies.${index}.currency`}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Currency</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a currency" />
                  </SelectTrigger>
                  <SelectContent>
                    {getAvailableCurrencies(index).map((currency) => (
                      <SelectItem key={currency.code} value={currency.code}>
                        {currency.symbol} {currency.code}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <div className="min-h-5">
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <div className="col-span-1 flex items-stretch">
          {showRemoveButton && (
            <Button
              variant="ghost"
              size="icon"
              className="hover:cursor-pointer mt-5.5"
              onClick={() => onRemove(index)}
            >
              <Trash size={18} className="text-red-500" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
