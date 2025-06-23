import { prisma } from './prisma'
import { BlogsResponse, BlogResponse } from '@/app/types/blog'

// 获取所有发布的博客列表
export async function getAllBlogs(): Promise<BlogsResponse> {
  try {
    const posts = await prisma.post.findMany({
      where: {
        published: true,
      },
      select: {
        id: true,
        slug: true,
        title: true,
        excerpt: true,
        createdAt: true,
        published: true,
        author: true,
        tags: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return {
      blogs: posts,
      total: posts.length,
    }
  } catch (error) {
    console.error('获取博客列表失败:', error)
    return {
      blogs: [],
      total: 0,
    }
  }
}

// 根据 slug 获取单个博客详情
// 添加简单的内存缓存
type CacheItem = {
  data: BlogResponse;
  timestamp: number;
}
const cache = new Map<string, CacheItem>();
const CACHE_TTL = 5 * 60 * 1000; // 5分钟
export async function getBlogBySlug(slug: string): Promise<BlogResponse> {
  const cacheKey = `blog:${slug}`;
  const cached = cache.get(cacheKey);

  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }

  try {
    const blog = await prisma.post.findUnique({
      where: {
        slug,
        published: true,
      },
    });

    const result = { blog };
    cache.set(cacheKey, { data: result, timestamp: Date.now() });

    return result;
  } catch (error) {
    console.error('获取博客详情失败:', error)
    return {
      blog: null,
    }
  }
}

// 根据作者获取博客
export async function getBlogsByAuthor(author: string): Promise<BlogsResponse> {
  try {
    const posts = await prisma.post.findMany({
      where: {
        author,
        published: true,
      },
      select: {
        id: true,
        slug: true,
        title: true,
        excerpt: true,
        createdAt: true,
        published: true,
        author: true,
        tags: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return {
      blogs: posts,
      total: posts.length,
    }
  } catch (error) {
    console.error('根据作者获取博客失败:', error)
    return {
      blogs: [],
      total: 0,
    }
  }
}

// 根据标签获取博客
export async function getBlogsByTag(tag: string): Promise<BlogsResponse> {
  try {
    const posts = await prisma.post.findMany({
      where: {
        published: true,
        tags: {
          has: tag,
        },
      },
      select: {
        id: true,
        slug: true,
        title: true,
        excerpt: true,
        createdAt: true,
        published: true,
        author: true,
        tags: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return {
      blogs: posts,
      total: posts.length,
    }
  } catch (error) {
    console.error('根据标签获取博客失败:', error)
    return {
      blogs: [],
      total: 0,
    }
  }
}

// 搜索博客
export async function searchBlogs(query: string): Promise<BlogsResponse> {
  try {
    const posts = await prisma.post.findMany({
      where: {
        published: true,
        OR: [
          {
            title: {
              contains: query,
              mode: 'insensitive',
            },
          },
          {
            content: {
              contains: query,
              mode: 'insensitive',
            },
          },
          {
            excerpt: {
              contains: query,
              mode: 'insensitive',
            },
          },
        ],
      },
      select: {
        id: true,
        slug: true,
        title: true,
        excerpt: true,
        createdAt: true,
        published: true,
        author: true,
        tags: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return {
      blogs: posts,
      total: posts.length,
    }
  } catch (error) {
    console.error('搜索博客失败:', error)
    return {
      blogs: [],
      total: 0,
    }
  }
}

// 格式化日期的工具函数
export function formatDate(date: Date | string): string {
  if (!date) {
    return ''
  }

  const dateObj = typeof date === 'string' ? new Date(date) : date

  // 检查日期是否有效
  if (isNaN(dateObj.getTime())) {
    return '无效日期'
  }

  return dateObj.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// 创建新博客文章
export async function createBlogPost(data: {
  title: string
  slug: string
  content?: string
  excerpt?: string
  author?: string
  published?: boolean
  tags?: string[]
}) {
  try {
    const post = await prisma.post.create({
      data: {
        title: data.title,
        slug: data.slug,
        content: data.content,
        excerpt: data.excerpt,
        author: data.author,
        published: data.published ?? false,
        tags: data.tags ?? [],
      },
    })

    return post
  } catch (error) {
    console.error('创建博客文章失败:', error)
    throw error
  }
}

// 更新博客文章
export async function updateBlogPost(
  id: string,
  data: {
    title?: string
    slug?: string
    content?: string
    excerpt?: string
    author?: string
    published?: boolean
    tags?: string[]
  }
) {
  try {
    const post = await prisma.post.update({
      where: { id },
      data,
    })

    return post
  } catch (error) {
    console.error('更新博客文章失败:', error)
    throw error
  }
}