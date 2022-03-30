class APIFeatures {
  constructor(query, queryStr) {
    this.query = query
    this.queryStr = queryStr
  }

  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: 'i',
          },
        }
      : {}

    this.query = this.query.find({ ...keyword })
    return this
  }

  filter() {
    const queryCopy = { ...this.queryStr }

    // Remove fields from query
    const removeFields = ['keyword', 'limit', 'page', 'minprice', 'maxprice']
    removeFields.forEach((el) => delete queryCopy[el])

    this.query = this.query.find(queryCopy)
    return this
  }

  filterRatings() {
    const queryCopy = { ...this.queryStr }

    // Removing fields from the query
    const removeFields = ['keyword', 'limit', 'page', 'minprice', 'maxprice']
    removeFields.forEach((el) => delete queryCopy[el])

    let queryStrMe = queryCopy.ratings
      ? {
          ratings: {
            gte: queryCopy.ratings,
          },
        }
      : {}

    let queryStr = JSON.stringify(queryStrMe)

    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`)

    this.query = this.query.find(JSON.parse(queryStr))
    return this
  }

  filterPrice() {
    const queryCopy = { ...this.queryStr }

    // Removing fields from the query
    const removeFields = ['keyword', 'limit', 'page']
    removeFields.forEach((el) => delete queryCopy[el])

    let queryStrMe =
      queryCopy.minprice || queryCopy.maxprice
        ? {
            price: {
              gte: queryCopy.minprice,
              lte: queryCopy.maxprice,
            },
          }
        : {}

    let queryStr = JSON.stringify(queryStrMe)

    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`)

    this.query = this.query.find(JSON.parse(queryStr))
    return this
  }

  pagination(resPerPage) {
    const currentPage = Number(this.queryStr.page) || 1
    const skip = resPerPage * (currentPage - 1)

    this.query = this.query.limit(resPerPage).skip(skip)
    return this
  }
}

export default APIFeatures
