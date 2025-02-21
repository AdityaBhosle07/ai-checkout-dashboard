import CheckoutForm from "../../components/CheckoutForm";
import Image from "next/image";

export default function Home() {
  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-black">
        Checkout Dashboard
      </h1>
      <CheckoutForm />
    </main>
  );
}

{
  <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
    <div className="font-geist text-xl text-black">
      This text should use Geist Sans
    </div>

    <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
      <section className="text-center sm:text-left">
        <h1 className="text-3xl font-bold text-blue-800">
          Tailwind is working!
        </h1>
        <h1 className="text-2xl font-bold text-black">
          Welcome to Checkout Dashboard
        </h1>
        <p className="text-gray-900">
          Your one-stop solution for checkout analytics.
        </p>
      </section>

      <Image
        className="dark:invert"
        src="/next.svg"
        alt="Next.js logo"
        width={180}
        height={38}
        priority
      />

      <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)] text-black">
        <h1 className="text-black text-2xl font-bold">
          Welcome to Checkout Dashboard
        </h1>
        <li>Save and see your changes instantly.</li>
      </ol>

      <div className="flex gap-4 items-center flex-col sm:flex-row">
        <a
          className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-white gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            className="dark:invert"
            src="/vercel.svg"
            alt="Vercel logomark"
            width={20}
            height={20}
          />
          Get Started
        </a>
        <a
          className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44 text-black"
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Read our docs
        </a>
      </div>
    </main>
  </div>;
}
