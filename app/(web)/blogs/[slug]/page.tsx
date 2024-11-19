import BlogCard from '@/components/blog/BlogCard';
import Image from 'next/image';
import { Clock } from 'lucide-react';
import CTA from '@/components/CTAs/cta';
import { formattedDate } from '@/utils/formattedDate';
import { getAllBlogs } from '@/services/blog';

type Params = Promise<{ slug: string }>;

function ensureAbsoluteUrl(url: string) {
  if (!url) return ''; // Handle undefined or null URLs gracefully
  return url.startsWith('//') ? `https:${url}` : url;
}

export default async function BlogDetails(props: { params: Params }) {
  const params = await props.params;
  const slug = params.slug;

  // const blog = await getBlogBySlug(slug);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/blogs/${slug}`,
  );
  const blog = await response.json();

  const page = 1;
  const per_page = 6;

  const responseBlogs = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/blogs?page=${page}&per_page=${per_page}`,
    {
      cache: 'no-cache',
      next: { revalidate: 10 },
    },
  );

  const res = await responseBlogs.json();
  const blogs = res.blogs;

  const imageUrl = ensureAbsoluteUrl(blog?.blogImage?.fields?.file?.url); // Accessing the URL from BlogImage

  const authorImageUrl = blog?.author?.fields?.authorImage?.fields?.file?.url
    ? ensureAbsoluteUrl(blog?.author?.fields?.authorImage?.fields?.file?.url)
    : '';

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Blog Header Section */}
        <div className="mb-10">
          <h1 className="text-5xl font-bold mb-4">{blog?.blogTitle}</h1>
          <div className="flex items-center gap-2 mb-6">
            <Clock className="w-5 h-5  text-[#5C5C5C]" />
            <p className="text-[#5C5C5C] text-xl font-normal ">
              {formattedDate(blog?.createDate)}
            </p>
          </div>

          <div className="relative w-full h-[600px] rounded-lg overflow-hidden">
            <Image
              src={imageUrl}
              alt="Featured Image"
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
        </div>

        <div className="flex items-center gap-4 mb-10">
          <Image
            src={authorImageUrl}
            alt={blog?.author?.fields?.authorName}
            width={200}
            height={200}
            className="w-16 h-16 rounded-full"
          />
          <div className="flex flex-col  gap-1">
            <span className="text-3xl font-semibold text-[#000000]">
              {blog?.author?.fields?.authorName}
            </span>
            <span className="text-[#7A7A7A] text-xl font-semibold">
              {blog?.author?.fields?.authorDescription}
            </span>
          </div>
        </div>

        {/* Blog Content */}
        <div className="prose max-w-full mb-16">
          <p className="text-[#000000] text-xl leading-9">
            {blog?.blogDescription}
          </p>
          {/* Add the rest of your content here, using appropriate HTML tags */}
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-10">Latest Blog</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {blogs
              ?.slice(0, 3)
              .map((blog: BlogFields) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
          </div>
        </div>

        <div className="mt-16">
          <CTA withDescription={true} />
        </div>
      </div>
    </section>
  );
}
