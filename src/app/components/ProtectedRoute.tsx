import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/router';
import { useEffect, ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: string;
}


export default function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { isAuthenticated, hasRole, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
    } else if (!loading && isAuthenticated && requiredRole && !hasRole(requiredRole)) {
      router.push('/unauthorized');
    }
  }, [isAuthenticated, loading, requiredRole, hasRole, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!isAuthenticated || (requiredRole && !hasRole(requiredRole))) {
    return null;
  }

  return <>{children}</>;
}
