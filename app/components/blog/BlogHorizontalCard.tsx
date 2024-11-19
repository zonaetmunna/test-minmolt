'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { formattedDate } from '@/utils/formattedDate';

interface BlogProps {
  blog: BlogFields;
  index: number;
}

function ensureAbsoluteUrl(url: string) {
  if (!url) return '';
  return url.startsWith('//') ? `https:${url}` : url;
}

const BlogHorizontalCard: React.FC<BlogProps> = ({ blog, index }) => {
  const isImageLeft = index % 2 === 0;

  const blogImageUrl = ensureAbsoluteUrl(blog?.blogImage?.fields?.file?.url);
  const authorImageUrl = blog?.author?.fields?.authorImage?.fields?.file?.url
    ? ensureAbsoluteUrl(blog?.author?.fields?.authorImage?.fields?.file?.url)
    : '';

  const authorName = blog.author?.fields?.authorName;
  const authorDescription = blog.author?.fields?.authorDescription;

  return (
    <div
      className={`relative flex   ${
        isImageLeft ? 'md:flex-row flex-col' : 'md:flex-row-reverse flex-col'
      } items-center   duration-300 ease-in-out my-8`}
    >
      <div className="flex-none w-full md:w-1/2 relative h-56 md:h-96 ">
        <Image
          src={blogImageUrl}
          alt={blog.blogTitle}
          layout="fill"
          objectFit="cover"
          className={`${isImageLeft ? 'rounded-l-lg' : 'rounded-r-lg'}`}
        />
      </div>
      <div
        className={`md:absolute  ${
          isImageLeft ? 'right-16' : 'left-16'
        } w-full md:w-1/2 px-4 py-6 bg-white bg-opacity-90 shadow-xl  backdrop-filter backdrop-blur-lg flex flex-col justify-between items-start `}
      >
        <div className="flex flex-col">
          <div className="flex justify-between items-center w-full gap-5 mb-3">
            <div className="flex items-center gap-2">
              {authorImageUrl && (
                <div className="flex justify-center items-center">
                  <Image
                    src={authorImageUrl}
                    alt="Author Image"
                    width={50}
                    height={50}
                    className="rounded-full w-10 h-10"
                  />
                </div>
              )}
              <div className="flex flex-col gap-1">
                <span className="text-[#474A4E] text-sm font-semibold">
                  {authorName}
                </span>
                <span className="text-[#474A4E] text-xs">
                  {authorDescription}
                </span>
              </div>
            </div>
            <span className="text-[#474A4E] text-sm font-semibold">
              {formattedDate(blog.createDate)}
            </span>
          </div>

          <div className="mb-4 flex flex-col">
            <h3 className="text-2xl text-[#05192E] font-bold">
              {blog.blogTitle}
            </h3>
            <p className="text-gray-700 mb-4">
              {blog.blogDescription.slice(0, 100)}
            </p>
          </div>
        </div>
        <div className="w-full font-figtree flex fixed -bottom-6 md:-bottom-6 justify-center z-20">
          <Link
            href={`/blogs/${blog.id}`}
            className="flex justify-center items-center h-12 rounded-md px-6 text-base bg-primary text-primary-foreground shadow-lg shadow-shadow  active:translate-y-[2px] hover:bg-primary/90 normal-case"
          >
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogHorizontalCard;
