import { authOptions } from '@/app/api/auth/[...nextauth]/authOption';
import { SignInForm } from '@/components/auth/auth.signin';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

const SignInPage = async () => {
  const session = await getServerSession(authOptions);

  if (session) {
    return redirect('/');
  }

  return <SignInForm />;
};

export default SignInPage;
