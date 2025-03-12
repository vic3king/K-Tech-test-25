import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  const defaultUserId = 'ff535484-6880-4653-b06e-89983ecf4ed5';

  useEffect(() => {
    router.replace(`/welcome/${defaultUserId}`);
  }, []);

  return null;
}
