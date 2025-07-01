import { BlogPosts } from "app/components/posts";
import About from "app/components/about";

export default function Page() {
  return (
    <section className='flex flex-col gap-4'>
      <div className='flex flex-col gap-2'>
        <p className='text-sm text-neutral-600 dark:text-neutral-400'>
          Senior UI Developer
        </p>
        <h1 className='text-5xl font-bold tracking-tighter font-stretch-extra-condensed'>
          Nathan Schmidt
        </h1>
      </div>
      <div className='flex flex-col gap-2'>
        <About />
      </div>
      <div className='my-8'>
        <BlogPosts />
      </div>
    </section>
  );
}
