import { NextRequest } from 'next/server';
import contentfulClient from '@/lib/contentful';

export async function GET(req: NextRequest) {
  const slug = req.url.split('/blogs/')[1];

  console.log('slug', slug);

  if (!slug) {
    return new Response(JSON.stringify({ message: 'Slug is required' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  try {
    const entry = await contentfulClient.getEntry<BlogEntry>(slug);
    const blog = {
      ...entry.fields,
      id: entry.sys.id,
    };

    return new Response(JSON.stringify(blog), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    let errorMessage = 'Failed to process the request';
    if (error instanceof Error) {
      errorMessage = error.message;
    } else {
      console.error('Non-error object thrown:', error);
    }

    return new Response(
      JSON.stringify({ message: 'Failed to fetch blogs', error: errorMessage }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  }
}
