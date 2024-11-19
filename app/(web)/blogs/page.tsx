import CTA from '@/components/CTAs/cta';
import BlogSection from '@/components/blog/BlogSection';
import { Suspense } from 'react';

export const metadata = {
  title: 'MindMolt – Break Free from Porn Addiction',
  description:
    'Use MindMolt to overcome porn addiction by blocking explicit content across devices, tracking your progress, and enjoying access to safe entertainment apps and programs.',
};

type SearchParams = {
  [key: string]: string | string[] | undefined;
};

export default async function Blogs({
  searchParams: searchParamsPromise,
}: {
  searchParams: Promise<SearchParams>;
}) {
  // Await searchParams
  const searchParams = await searchParamsPromise;

  const page = searchParams['page'] ?? '1';
  const per_page = searchParams['per_page'] ?? '5';

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/blogs?page=${page}&per_page=${per_page}`,
    {
      cache: 'no-cache',
      next: { revalidate: 10 },
    },
  );

  const res = await response.json();

  const blogs = res.blogs;
  const currentPage = res.currentPage;
  const totalPages = res.totalPages;

  return (
    <section className="bg-accent">
      <div className="container mx-auto">
        <Suspense fallback={<p>Loading feed...</p>}>
          <BlogSection
            blogs={blogs}
            currentPage={currentPage}
            totalPages={totalPages}
          />
          <div className="mt-16">
            <CTA withDescription={true} />
          </div>
        </Suspense>
      </div>
    </section>
  );
}
