import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <div className='w-full'>
      <h1 className='text-3xl'>Home Page</h1>
    </div>
  )
}
