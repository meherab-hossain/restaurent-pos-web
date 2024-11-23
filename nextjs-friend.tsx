/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Admin from "@/components/layout/AdminLayout";
import Base from "@/components/layout/BaseLayout";
import cookies from "@/utils/cookies/index";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

// Define proper types
type LayoutType = 'base' | 'admin';
type MiddlewareType = 'user-auth' | 'admin-auth' | null;

interface HocOptions {
  middleware?: MiddlewareType[];
  layout?: LayoutType;
}

interface AuthToken {
  token: string;
  expiresAt: number;
}

const LayoutEnum: Record<LayoutType, React.ComponentType<any>> = {
  base: Base,
  admin: Admin,
};

const isTokenExpired = (tokenName: string): boolean => {
  const token = cookies.get(tokenName);
  if (!token) return true;
  
  try {
    const parsed: AuthToken = JSON.parse(token);
    return Date.now() > parsed.expiresAt;
  } catch {
    return true;
  }
};

const checkAuth = (type: 'user' | 'admin'): boolean => {
  const auth = cookies.get(`${type}_auth`);
  const token = cookies.get(`${type}_token`);
  console.log(auth, token, 'checkAuth', auth === 'test' , token !== '' , token !== undefined);
  return (auth === 'test' && token !== '' && token !== undefined);
};

const FriendHoc = <P extends object>(
  Component: React.ComponentType<P>,
  options: HocOptions
) => {
  const WrappedComponent: React.FC<P> = (props) => {
    const { middleware, layout } = options;
    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState(true);

    useEffect(() => {
      const checkAuthMiddleware = (type: 'user' | 'admin'): boolean => {
        if (middleware?.includes(`${type}-auth` as MiddlewareType)) {
          console.log(type, checkAuth(type), 'middleware');
          if (!checkAuth(type)) {
            router.push(type === 'user' ? '/login' : '/login');
            return false;
          }
          // if (isTokenExpired(`${type}_token`)) {
          //   router.push(type === 'user' ? '/login' : '/admin/login');
          //   return false;
          // }
        }
        return true;
      };

      const authCheck = 
        checkAuthMiddleware('user') && 
        checkAuthMiddleware('admin');
        
      setIsAuthorized(authCheck);
    }, [router, middleware]);

    if (!isAuthorized) {
      return null;
    }

    if (layout) {
      const Layout = LayoutEnum[layout];
      return (
        <Layout>
          <Component {...props} />
        </Layout>
      );
    }

    return <Component {...props} />;
  };

  return WrappedComponent;
};

export default FriendHoc;
