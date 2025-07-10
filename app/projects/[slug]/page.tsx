import { notFound } from "next/navigation";
import { CustomMDX } from "app/components/mdx";
import { formatDate, getProjects } from "../../utils/utils";
import { baseUrl } from "app/sitemap";
import Link from "next/link";

export async function generateStaticParams() {
  let posts = getProjects();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export function generateMetadata({ params }) {
  let post = getProjects().find((post) => post.slug === params.slug);
  if (!post) {
    return;
  }

  let {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata;
  let ogImage = image
    ? image
    : `${baseUrl}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      publishedTime,
      url: `${baseUrl}/projects/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default function Projects({ params }) {
  let post = getProjects().find((post) => post.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <section>
      <script
        type='application/ld+json'
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProjectPosting",
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            image: post.metadata.image
              ? `${baseUrl}${post.metadata.image}`
              : `/og?title=${encodeURIComponent(post.metadata.title)}`,
            url: `${baseUrl}/projects/${post.slug}`,
            author: {
              "@type": "Person",
              name: "My Portfolio",
            },
          }),
        }}
      />
      <h1 className='text-2xl font-semibold tracking-tighter title'>
        {post.metadata.title}
      </h1>
      <div className='grid grid-cols-3 gap-3 items-start mt-2 mb-8 text-sm'>
        <div className='flex flex-col col-span-2 gap-2 items-start'>
          <p className='text-sm text-neutral-600 dark:text-neutral-400'>
            {formatDate(post.metadata.publishedAt)}
          </p>
          <p className='text-sm text-neutral-600 dark:text-neutral-400 text-pretty'>
            {post.metadata.summary}
          </p>
          <Link
            href={post.metadata.url}
            target='_blank'
            className='inline-block px-2 py-1 text-center rounded-md transition-all duration-300 bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-300 dark:hover:bg-neutral-700'
            rel='noopener noreferrer'
          >
            View Project
          </Link>
        </div>
        <div className='flex flex-col col-span-1 gap-2'>
          <p className='text-sm text-neutral-600 dark:text-neutral-400'>
            {post.metadata.role}
          </p>
          {post.metadata.award && (
            <p className='text-sm text-neutral-600 dark:text-neutral-400'>
              {post.metadata.award}
            </p>
          )}
          <p className='text-sm text-neutral-600 dark:text-neutral-400'>
            {post.metadata.tech}
          </p>
        </div>
      </div>
      {post.content && (
        <div className='py-8 prose border-y border-neutral-200 dark:border-neutral-800'>
          <CustomMDX source={post.content} />
        </div>
      )}
    </section>
  );
}
