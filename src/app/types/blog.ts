import { Post } from '@prisma/custom-client'

// 直接使用Prisma生成的Post类型
export type BlogPost = Post

// 博客摘要类型（用于列表显示）
export type BlogSummary = Pick<Post, 'id' | 'slug' | 'title' | 'excerpt' | 'createdAt' | 'published' | 'author' | 'tags'>

// API 响应接口
export interface BlogsResponse {
  blogs: BlogSummary[];
  total: number;
}

// 博客详情响应接口
export interface BlogResponse {
  blog: BlogPost | null;
}

// 兼容现有接口的转换类型
export interface Blog {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string | null;
  date: string;
  author?: string | null;
  tags?: string[];
}


// // 博客文章的基础接口
// export interface Blog {
//   id: number;
//   slug: string;
//   title: string;
//   excerpt: string;
//   content: string;
//   date: string;
//   author?: string;  // 可选字段
//   tags?: string[];  // 可选字段
// }

// // 博客列表项接口（不包含完整内容，用于列表显示）
// export interface BlogSummary {
//   id: number;
//   slug: string;
//   title: string;
//   excerpt: string;
//   date: string;
//   author?: string;
//   tags?: string[];
// }

// // API 响应接口
// export interface BlogsResponse {
//   blogs: BlogSummary[];
//   total: number;
// }

// // 博客详情响应接口
// export interface BlogResponse {
//   blog: Blog | null;
// }