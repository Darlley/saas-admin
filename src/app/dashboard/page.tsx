import PaymentCancelledCard from '@/components/PaymentCancelledCard';
import PaymentSuccessCard from '@/components/PaymentSuccessCard';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';

export default function Admin({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: {
    payment: 'success' | 'cancelled';
  };
}) {
  return (
    <>
      <div>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <div className="px-4">Dashboard Page</div>
      </div>

      {searchParams.payment === 'success' && <PaymentSuccessCard />}
      
      {searchParams.payment === 'cancelled' && (
        <PaymentCancelledCard />
      )}
    </>
  );
}
