import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center pb-6 pt-8 lg:static lg:w-auto  lg:rounded-xl lg:p-4">
          Storied Take Home Assignment
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-tfrom-black via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          By{' '}
          <Image
            src="/CircleLogoGreenReg.svg"
            alt="Dustins Logo"
            width={24}
            height={24}
            priority
            className='mx-2'
          /> Dustin Myers
        </div>
      </div>

      <div className="relative flex place-items-center">
        <Image
          className="relative"
          src="/storied-logo.svg"
          alt="Storied Logo"
          width={180}
          height={37}
          priority
        />
      </div>

      <div className="flex items-center justify-center mb-32 lg:max-w-5xl w-full lg:mb-0">
        <Link href="/awesomeness" className="w-48 text-center bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 dark:bg-gray-800 dark:hover:bg-green-700">
          Let's Start  🚀
        </Link>
      </div>
    </main>
  )
}
