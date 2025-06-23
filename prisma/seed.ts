import { PrismaClient } from '@prisma/custom-client'

const prisma = new PrismaClient()

async function main() {
  console.log('开始导入种子数据...')

  // 创建博客文章（使用现有的模拟数据）
  const posts = await Promise.all([
    prisma.post.upsert({
      where: { slug: 'nextjs-routing' },
      update: {},
      create: {
        title: 'Next.js 路由系统学习',
        slug: 'nextjs-routing',
        excerpt: '学习 Next.js App Router 的基础概念和文件系统路由',
        content: `# Next.js 路由系统

Next.js 13+ 的 App Router 使用文件系统路由，这意味着：

## 文件系统路由
- \`page.tsx\` 文件定义一个路由
- 文件夹名称决定 URL 路径
- \`[slug]\` 表示动态路由参数

## 基础路由示例
- \`app/page.tsx\` → \`/\`
- \`app/blog/page.tsx\` → \`/blog\`
- \`app/blog/[slug]/page.tsx\` → \`/blog/任意路径\`

这是 Next.js 强大而直观的路由系统！`,
        published: true,
        createdAt: new Date('2024-01-15'),
        author: '张三',
        tags: ['Next.js', 'React', '路由'],
      },
    }),
    prisma.post.upsert({
      where: { slug: 'react-components' },
      update: {},
      create: {
        title: 'React 组件设计原则',
        slug: 'react-components',
        excerpt: '了解如何设计可复用和可维护的 React 组件',
        content: `# React 组件设计原则

编写可维护的 React 组件的几个重要原则：

## 1. 单一职责原则
每个组件应该只负责一个功能。

## 2. 可复用性
通过 props 让组件变得灵活可复用。

## 3. 组合优于继承
使用组合模式来构建复杂组件。

## 4. Props 接口设计
明确定义组件的输入和输出。`,
        published: true,
        createdAt: new Date('2024-01-10'),
        author: '李四',
        tags: ['React', '组件', '设计模式'],
      },
    }),
    prisma.post.upsert({
      where: { slug: 'typescript-basics' },
      update: {},
      create: {
        title: 'TypeScript 基础入门',
        slug: 'typescript-basics',
        excerpt: '从零开始学习 TypeScript 的类型系统',
        content: `# TypeScript 基础

TypeScript 为 JavaScript 添加了类型系统：

## 基础类型
- string, number, boolean
- Array, Object
- interface, type

## 高级特性
- 泛型 (Generics)
- 联合类型 (Union Types)
- 类型守卫 (Type Guards)

## 优势
- 编译时错误检查
- 更好的开发体验
- 代码更易维护`,
        published: true,
        createdAt: new Date('2024-01-05'),
        author: '王五',
        tags: ['TypeScript', 'JavaScript', '类型系统'],
      },
    }),
  ])

  console.log('博客文章创建完成:', posts.map(p => p.title))

  console.log('种子数据导入完成！')
  console.log(`总共创建了 ${posts.length} 篇博客文章`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('种子数据导入失败:', e)
    await prisma.$disconnect()
    process.exit(1)
  })