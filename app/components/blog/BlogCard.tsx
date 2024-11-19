'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MoveUpRight } from 'lucide-react';
import { formattedDate } from '@/utils/formattedDate';

interface BlogProps {
  blog: BlogFields;
}

function ensureAbsoluteUrl(url: string) {
  if (!url) return ''; // Handle undefined or null URLs gracefully
  return url.startsWith('//') ? `https:${url}` : url;
}

const BlogCard: React.FC<BlogProps> = ({ blog }) => {
  const [isHovered, setIsHovered] = useState(false); // State to handle hover

  const imageUrl = ensureAbsoluteUrl(blog.blogImage.fields.file.url);

  const authorName = blog.author?.fields?.authorName;

  return (
    <Link
      href={`/blogs/${blog?.id}`}
      className="flex flex-col items-center rounded-xl overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="w-full h-60 relative">
        <Image
          src={imageUrl}
          alt={blog.blogTitle}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>
      <div className="flex flex-col mt-2 py-4 w-full">
        <div className="text-gray-500 flex font-figtree justify-between items-center text-sm mb-4">
          <span className="text-[#474A4E] text-sm font-semibold">
            {authorName}
          </span>
          <span className="text-[#474A4E] text-sm font-normal">
            {formattedDate(blog.createDate)}
          </span>
        </div>
        <div className="flex justify-between items-center w-full gap-5 mb-2">
          <div>
            <h3 className="text-2xl text-[#05192E] font-bold">
              {blog.blogTitle}
            </h3>
          </div>
          <div
            className={`flex items-center p-2 rounded-full ${
              isHovered ? 'bg-[#0070CB] border-none' : 'border border-[#05192E]'
            }`}
          >
            <MoveUpRight
              className={`w-6 h-6 ${
                isHovered ? 'text-white' : 'text-[#05192E]'
              }`}
            />
          </div>
        </div>
        <p className="text-[#47494B]">{blog.blogDescription?.slice(0, 100)}</p>
      </div>
    </Link>
  );
};

export default BlogCard;
