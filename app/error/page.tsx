'use client';
import { ErrorHandler } from '@/components/error/error-handler';
import { PAGE_ROUTES, RouteService } from '@/utils/route-service';
import { useRouter } from 'next/navigation';

const ErrorPage = ({ searchParams }: { searchParams: Record<string, string | undefined> }) => {
  const router = useRouter();

  return (
    <ErrorHandler
      error={new Error(searchParams.status ?? 'unknown')}
      reset={() => router.push(RouteService.page(PAGE_ROUTES.HOME))}
      customButtonText="Zurück zur Startseite"
    />
  );
};

export default ErrorPage;
