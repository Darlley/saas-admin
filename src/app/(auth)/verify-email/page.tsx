import PageVerifyEmail from '@/components/PageVerifyEmail';

type PageProps = {
  params: { [key: string]: string | string[] | undefined };
  searchParams: { token: string };
}

export default function page({
  params,
  searchParams,
}: PageProps) {
  return <PageVerifyEmail token={searchParams.token} />;
}
