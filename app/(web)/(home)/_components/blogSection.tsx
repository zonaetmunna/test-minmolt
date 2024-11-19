import React, { Suspense } from 'react';
import BlogCard from '@/components/blog/BlogCard';
import Link from 'next/link';

export default async function BlogSection() {
  const page = '1';
  const per_page = '6';

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/blogs?page=${page}&per_page=${per_page}`,
    {
      cache: 'no-cache',
      next: { revalidate: 10 },
    },
  );

  const res = await response.json();

  const blogs = res.blogs;

  return (
    <section className="py-[64px] bg-accent">
      <div className="container mx-auto">
        <div className="bg-accent lg:bg-transparent py-12 px-4 rounded-[32px] ">
          <h2 className="text-center text-3xl font-bold mb-12">
            Most Popular Blog
          </h2>
          <Suspense fallback={<p>Loading feed...</p>}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {blogs
                ?.slice(0, 6)
                ?.map((blog: BlogFields) => (
                  <BlogCard key={blog.id} blog={blog} />
                ))}
            </div>
            <div className="text-center mt-12 flex  flex-row gap-4 justify-center font-figtree font-medium">
              <Link
                href="/blogs"
                className="flex  justify-center items-center h-12 rounded-md px-4 text-base bg-primary text-primary-foreground shadow-lg shadow-shadow  active:translate-y-[2px] hover:bg-primary/90 normal-case"
              >
                View All Blogs
              </Link>
            </div>
          </Suspense>
        </div>
      </div>
    </section>
  );
}
