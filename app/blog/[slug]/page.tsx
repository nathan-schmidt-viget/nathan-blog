import { notFound } from "next/navigation";
import { CustomMDX } from "app/components/mdx";
import { formatDate, getBlogPosts } from "app/utils/utils";
import { baseUrl } from "app/sitemap";

export async function generateStaticParams() {
  let posts = getBlogPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export function generateMetadata({ params }) {
  let post = getBlogPosts().find((post) => post.slug === params.slug);
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
      type: "article",
      publishedTime,
      url: `${baseUrl}/blog/${post.slug}`,
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

export default function Blog({ params }) {
  let post = getBlogPosts().find((post) => post.slug === params.slug);

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
            "@type": "BlogPosting",
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            image: post.metadata.image
              ? `${baseUrl}${post.metadata.image}`
              : `/og?title=${encodeURIComponent(post.metadata.title)}`,
            url: `${baseUrl}/blog/${post.slug}`,
            author: {
              "@type": "Person",
              name: "My Portfolio",
            },
          }),
        }}
      />
      <h1 className='title font-semibold text-2xl tracking-tighter'>
        {post.metadata.title}
      </h1>
      <div className='flex flex-col items-start mt-2 gap-3 mb-8 text-sm'>
        <p className='text-sm text-neutral-600 dark:text-neutral-400 text-xs uppercase font-bold'>
          {formatDate(post.metadata.publishedAt)}
        </p>
        <p className='text-sm text-neutral-600 dark:text-neutral-400'>
          {post.metadata.summary}
        </p>
        <a
          href={post.metadata.url}
          target='_blank'
          className='inline-block text-center bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 px-2 py-1 rounded-md hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-all duration-300'
          rel='noopener noreferrer'
        >
          View Article
        </a>
      </div>
      {post.content && (
        <article className='prose border-y border-neutral-200 dark:border-neutral-800 py-8'>
          <CustomMDX source={post.content} />
        </article>
      )}
    </section>
  );
}
