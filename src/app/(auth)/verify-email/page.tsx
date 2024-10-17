import PageVerifyEmail from '@/components/PageVerifyEmail';

export default function page({
  params,
  searchParams,
}: {
  params: { [key: string]: string | string[] | undefined };
  searchParams: { token: string };
}) {
  return <PageVerifyEmail token={searchParams.token} />;
}
