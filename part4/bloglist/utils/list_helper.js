const dummy = (_) => 1


const totalLikes = (blogs) => blogs.reduce((acc, blog) => acc + blog.likes, 0)

const maxProp = prop => objects => objects.reduce((acc, object) => Math.max(acc, object[prop]), -Infinity)
const maxLikes = maxProp('likes')

const sumObjectsProperty = prop => objects => objects.reduce((acc, object) => acc + object[prop], 0)
const sumLikes = sumObjectsProperty('likes')
const getAuthors = blogs => Array.from(new Set(blogs.map(blog => blog.author)))

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null
  return blogs.find(blog => blog.likes === maxLikes(blogs))
}

const mostBlogs = blogs => {
  if (blogs.length === 0) return null

  const maxBlogs = maxProp('blogs')
  const authors = getAuthors(blogs)
  const countAuthorsBlogs = author => blogs.reduce((acc, blog) => blog.author === author ? acc + 1 : acc, 0)
  const blogsCount = authors.map(author => {
    return {
      author,
      blogs: countAuthorsBlogs(author)
    }
  })

  return blogsCount.find(blogCount => blogCount.blogs === maxBlogs(blogsCount))

}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null

  const authors = getAuthors(blogs)
  const likesCount = authors.map(author => {
    return {
      author,
      likes: sumLikes(blogs.filter(blog => blog.author === author))
    }
  })

  return likesCount.find(result => result.likes === maxLikes(likesCount))
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
