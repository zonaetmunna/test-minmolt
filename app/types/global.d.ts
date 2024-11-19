interface HeaderProps {
  logo: React.ReactNode;
  links: ButtonProps[];
  linksAlign?: 'left' | 'right' | 'center';
  buttons: ButtonProps[];
}
interface HeroProps {
  title: TitleProps; // Title contains words
  subTitle: SubTitle; // Subtitle contains text and color
  description: Description; // Description contains text and color
  buttons: ButtonProps[]; // Array of buttons
  image: React.ReactNode; // Image or any React node (e.g. <Image />)
}

interface ButtonProps {
  text: string;
  href: string;
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link';
  size?: 'sm' | 'md' | 'lg';
}

interface Phrase {
  text: string; // Text of each phrase
  color: string; // Class name or style to apply color
}
interface TitleProps {
  words: Phrase[]; // Title has an array of phrases
}
interface SubTitle {
  text: string;
  color: string;
}
interface Description {
  text: string;
  color: string;
}

{
  /* Card Components */
}

interface HorizontalCardProps {
  imageAlign?: 'right' | 'left';
  title: string;
  description: string[];
  image: React.ReactNode;
}
interface VerticalCardProps {
  title: string;
  step: string;
  description: string[];
  image: React.ReactNode;
}

// Blog

interface FileDetails {
  url: string;
}

interface ImageFields {
  file: FileDetails;
}

interface AuthorFields {
  authorName: string;
  authorDescription: string;
  authorImage: {
    fields: {
      file: {
        url: string;
      };
    };
  };
}

interface Author {
  fields: AuthorFields;
}

interface Sys {
  id: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  locale: string;
  revision: number;
  space?: any; // Optionally include more specific types
  environment?: any;
  contentType?: any;
  publishedVersion?: number;
}

interface FileDetails {
  url: string;
}

interface ImageFields {
  file: FileDetails;
}

interface BlogImage {
  fields: ImageFields;
}

interface BlogFields {
  id: Sys.id;
  blogTitle: string;
  blogImage: { fields: { file: { url: string } } }; // Simplified path to the image URL
  createDate: string;
  published: boolean;
  blogDescription: string;
  author: Author;
  slug?: number;
}

interface BlogEntry {
  sys: Sys;
  fields: BlogFields;
  contentTypeId: string;
}

interface GraphQLResponse<T> {
  data: T;
  errors?: GraphQLError[];
}

interface GraphQLError {
  message: string;
  locations?: { line: number; column: number }[];
  path?: string[];
  extensions?: any;
}

interface BlogPostsResponse {
  blogPostCollection: {
    items: IBlogs[];
  };
}
