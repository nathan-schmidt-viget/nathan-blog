import { BlogPosts } from "app/components/posts";

export default function Page() {
  return (
    <section className='flex flex-col gap-4'>
      <div className='flex flex-col gap-2'>
        <p className='text-sm text-neutral-600 dark:text-neutral-400'>
          Senior UI Developer
        </p>
        <h1 className='text-5xl font-semibold tracking-tighter'>
          Nathan Schmidt
        </h1>
      </div>
      <div className='flex flex-col gap-2'>
        <p>
          I'm a software engineer based in Colorado. I'm currently working at{" "}
          <a
            href='https://www.viget.com'
            target='_blank'
            className='underline hover:no-underline focus-visible:no-underline'
            rel='noopener noreferrer'
          >
            Viget
          </a>
          .
        </p>
        <p>
          I build UI components for sites and multi million dollar web
          applications in collaboration with other developers and or
          independently. I take high fidelity designs and developing them into
          large design systems that can be used throughout the application.
        </p>
        <p>
          I develop interactive UI components that meet accessibility standards
          WCAG. I collaborate with stakeholders to gather feedback, refine
          requirements, and align on project goals. I ensure that the UI
          components effectively meet the needs of both users and business
          objectives. I'm a quick learner and I'm always looking for new
          challenges.
        </p>
      </div>
      <div className='my-8'>
        <BlogPosts />
      </div>
    </section>
  );
}
