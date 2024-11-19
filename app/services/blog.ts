import contentfulClient from '@/lib/contentful';

export const getAllBlogs = async (): Promise<BlogFields[]> => {
  const entries = await contentfulClient.getEntries<BlogEntry>({
    content_type: 'blogs',
  });
  return entries.items.map((item) => ({
    ...item.fields,
    id: item.sys.id, // Ensure the sys ID is correctly assigned here
  }));
};

export const getBlogBySlug = async (slug: string): Promise<BlogFields> => {
  const entry = await contentfulClient.getEntry<BlogEntry>(slug);
  return {
    ...entry.fields,
    id: entry.sys.id, // Ensure the sys ID is correctly assigned here
  };
};
