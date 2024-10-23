'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { useTheme } from 'next-themes';
import { toast } from 'sonner';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import {
  appearanceFormSchema,
  AppearanceFormSchema,
} from './AppearanceForm.schemas';
import { AppearanceFormProps } from './AppearanceForm.types';

export default function AppearanceForm(props: AppearanceFormProps) {
  const { theme, setTheme } = useTheme();
  const form = useForm<AppearanceFormSchema>({
    resolver: zodResolver(appearanceFormSchema),
    defaultValues: {
      theme: (theme as AppearanceFormSchema['theme']) || 'system',
    },
  });

  const onThemeChange = (theme: string) => {
    toast.message('Tema atualizado', {
      description: `O tema foi alterado para: ${theme}`,
    });
    setTheme(theme);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tema</CardTitle>
        <CardDescription>Selecione o tema para o painel.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <div className="space-y-8">
            <FormField
              control={form.control}
              name="theme"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <RadioGroup
                    onValueChange={(value) => {
                      field.onChange(value);
                      onThemeChange(value);
                    }}
                    defaultValue={field.value}
                    className="grid grid-cols-3 max-w-2xl gap-8 pt-2"
                  >
                    <FormItem>
                      <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                        <FormControl>
                          <RadioGroupItem value="light" className="sr-only" />
                        </FormControl>
                        <div className="items-center rounded-xl border-2 border-muted p-1 hover:border-accent">
                          <div className="space-y-2 rounded-lg bg-[#ecedef] p-2">
                            <div className="space-y-2 rounded-md bg-white p-2 shadow-sm">
                              <div className="h-2 w-[80px] rounded-lg bg-[#ecedef]" />
                              <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                            </div>
                            <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                              <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                              <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                            </div>
                            <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                              <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                              <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                            </div>
                          </div>
                        </div>
                        <span className="block w-full p-2 text-center font-normal">
                          Claro
                        </span>
                      </FormLabel>
                    </FormItem>
                    <FormItem>
                      <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                        <FormControl>
                          <RadioGroupItem value="dark" className="sr-only" />
                        </FormControl>
                        <div className="items-center rounded-xl border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground">
                          <div className="space-y-2 rounded-lg bg-slate-950 p-2">
                            <div className="space-y-2 rounded-md bg-slate-800 p-2 shadow-sm">
                              <div className="h-2 w-[80px] rounded-lg bg-slate-400" />
                              <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                            </div>
                            <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                              <div className="h-4 w-4 rounded-full bg-slate-400" />
                              <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                            </div>
                            <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                              <div className="h-4 w-4 rounded-full bg-slate-400" />
                              <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                            </div>
                          </div>
                        </div>
                        <span className="block w-full p-2 text-center font-normal">
                          Escuro
                        </span>
                      </FormLabel>
                    </FormItem>
                    <FormItem>
                      <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                        <FormControl>
                          <RadioGroupItem value="system" className="sr-only" />
                        </FormControl>
                        <div className="items-center rounded-xl border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground">
                          <div className="space-y-2 rounded-lg bg-gradient-to-br from-[#ecedef] to-slate-950 p-2">
                            <div className="space-y-2 rounded-md bg-gradient-to-br from-white to-slate-800 p-2 shadow-sm">
                              <div className="h-2 w-[80px] rounded-lg bg-gradient-to-br from-[#ecedef] to-slate-400" />
                              <div className="h-2 w-[100px] rounded-lg bg-gradient-to-br from-[#ecedef] to-slate-400" />
                            </div>
                            <div className="flex items-center space-x-2 rounded-md bg-gradient-to-br from-white to-slate-800 p-2 shadow-sm">
                              <div className="h-4 w-4 rounded-full bg-gradient-to-br from-[#ecedef] to-slate-400" />
                              <div className="h-2 w-[100px] rounded-lg bg-gradient-to-br from-[#ecedef] to-slate-400" />
                            </div>
                            <div className="flex items-center space-x-2 rounded-md bg-gradient-to-br from-white to-slate-800 p-2 shadow-sm">
                              <div className="h-4 w-4 rounded-full bg-gradient-to-br from-[#ecedef] to-slate-400" />
                              <div className="h-2 w-[100px] rounded-lg bg-gradient-to-br from-[#ecedef] to-slate-400" />
                            </div>
                          </div>
                        </div>
                        <span className="block w-full p-2 text-center font-normal">
                          Sistema
                        </span>
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </Form>
      </CardContent>
    </Card>
  );
}
