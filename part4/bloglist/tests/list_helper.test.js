const listHelper = require('../utils/list_helper')

const emptyListOfBlogs = []

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
]

const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }
]

describe('dummy', () => {

  test('returns 1 with an empty list of blogs', () => {
    expect(listHelper.dummy(emptyListOfBlogs)).toBe(1)
  })

  test('returns 1 with a non-empty list of blogs', () => {

    expect(listHelper.dummy(listWithOneBlog)).toBe(1)

  })
})


describe('total likes', () => {

  test('of an empty list of blogs is cero', () => {
    expect(listHelper.totalLikes(emptyListOfBlogs)).toBe(0)
  })

  test('of a list with one blog is the blog\'s likes', () => {
    const [blog] = listWithOneBlog
    expect(listHelper.totalLikes(listWithOneBlog)).toBe(blog.likes)
  })

})

describe('favorite blog', () => {

  test('of an empty list of blogs returns null', () => {
    const result = listHelper.favoriteBlog(emptyListOfBlogs)
    expect(result).toEqual(null)
  })

  test('of a list with one blog is the blog itself', () => {
    const [blog] = listWithOneBlog
    const result = listHelper.favoriteBlog(listWithOneBlog)
    expect(result).toEqual(blog)
  })

  test('of a list of blogs is the blog with the most likes', () => {
    const blogWithTheMostLikes = blogs.find(blog => blog.likes === 12)
    const result = listHelper.favoriteBlog(blogs)
    expect(result).toEqual(blogWithTheMostLikes)
  })

})

describe('most blogs', () => {
  test('of an empty list of blogs is null', () => {
    expect(listHelper.mostBlogs(emptyListOfBlogs)).toBe(null)
  })
  test('of a list with one blog is an object with the author of the blog and a count of one blog', () => {
    const result = listHelper.mostBlogs(listWithOneBlog)
    const blogCount = {
      author: 'Edsger W. Dijkstra',
      blogs: 1
    }
    expect(result).toEqual(blogCount)
  })
  test('of a list of many blogs is an object with the author that has more blogs and the blog count', () => {
    const result = listHelper.mostBlogs(blogs)
    const blogCount = {
      author: 'Robert C. Martin',
      blogs: 3
    }
    expect(result).toEqual(blogCount)
  })
})

describe('most likes', () => {
  test('of an empty list of blogs is null', () => {
    expect(listHelper.mostLikes(emptyListOfBlogs)).toBe(null)
  })
  test('of a list with one blog is an object with the author of the blog and the amount of likes of that blog', () => {
    const result = listHelper.mostLikes(listWithOneBlog)
    const likesCount = {
      author: 'Edsger W. Dijkstra',
      likes: 5
    }
    expect(result).toEqual(likesCount)
  })
  test('of a list of many blogs is an object with the author that has more likes across all blogs and the likes count', () => {
    const result = listHelper.mostLikes(blogs)
    const blogCount = {
      author: 'Edsger W. Dijkstra',
      likes: 17
    }
    expect(result).toEqual(blogCount)
  })
})
