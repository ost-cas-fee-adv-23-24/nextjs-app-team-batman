import { APIError } from '@/utils/api/api-service-base';
import { PAGE_ROUTES, RouteService } from '@/utils/route-service';
import { notFound, redirect } from 'next/navigation';

export const errorHandler = (error: unknown) => {
  if (error instanceof APIError && error.status === 404) return notFound();
  redirect(RouteService.page(PAGE_ROUTES.ERROR, null, { status: (error as Error)?.message || 'unknown' }));
};
