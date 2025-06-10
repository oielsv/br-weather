import { CurrencyForm } from './components/CurrencyForm';

export function Backoffice() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-2xl font-bold">Currency Manager</h1>
      <CurrencyForm />
    </div>
  );
}

Backoffice.displayName = 'Backoffice';
