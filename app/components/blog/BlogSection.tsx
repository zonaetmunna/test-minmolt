import React, { useState } from 'react';
import BlogHorizontalCard from './BlogHorizontalCard';
import PaginationControls from './PaginationControls';

const BlogSection = ({
  blogs: initialBlogs,
  currentPage,
  totalPages,
}: {
  blogs: BlogFields[];
  currentPage: number;
  totalPages: number;
}) => {
  return (
    <div className="bg-accent lg:bg-transparent py-12 px-4 rounded-[32px]">
      <h2 className="text-center text-3xl font-bold mb-4">Blogs</h2>
      <div className="grid grid-cols-1 md:grid-cols-1 gap-6 md:gap-0">
        {initialBlogs.map((blog, index) => (
          <BlogHorizontalCard key={blog.id} blog={blog} index={index} />
        ))}
      </div>

      <PaginationControls currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
};

export default BlogSection;
