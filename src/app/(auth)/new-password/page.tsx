import PageNewPassword from '@/components/PageNewPassword';

type PageProps = {
  params: { [key: string]: string | string[] | undefined };
  searchParams: { token: string };
};

export default function page({ params, searchParams }: PageProps) {
  return <PageNewPassword token={searchParams?.token} />;
}
