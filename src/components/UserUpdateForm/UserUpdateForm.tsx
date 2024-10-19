import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';

import { UserUpdateFormProps } from './UserUpdateForm.types';

export default function UserUpdateForm(props: UserUpdateFormProps) {
  const form = useForm({
    defaultValues: {},
    mode: 'onBlur',
  });

  async function handleSubmit(values: any) {
    console.log(values);
  }

  return (
    <div className="flex flex-col lg:flex-row items-start">
      <div className="w-full lg:w-1/3">
        <h2 className="text-xl font-semibold">Informações Pessoais</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Atualize suas informações pessoais aqui.
        </p>
      </div>
      <div className="w-full lg:w-2/3 mt-4 lg:mt-0">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="nome"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input {...field} readOnly className="p-4 h-10" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      readOnly
                      className="p-4 h-10"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
    </div>
  );
}
