// This imports a function from Contentful SDK to fetch data
import contentfulClient from '@/lib/contentful';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const page = request.nextUrl.searchParams.get('page') || 1;
  const limit = request.nextUrl.searchParams.get('per_page') || 5;

  try {
    const response = await contentfulClient.getEntries({
      content_type: 'blogs',
      skip: (Number(page) - 1) * Number(limit),
      limit: Number(limit),
    });

    const blogs = response.items.map((item) => ({
      ...item.fields,
      id: item.sys.id, // Include sys.id in the response
    }));

    return new Response(
      JSON.stringify({
        currentPage: page,
        totalPages: Math.ceil(response.total / Number(limit)),
        blogs: blogs,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  } catch (error) {
    // More robust error handling
    let errorMessage = 'Failed to process the request';
    if (error instanceof Error) {
      errorMessage = error.message; // Safe to access message property
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
