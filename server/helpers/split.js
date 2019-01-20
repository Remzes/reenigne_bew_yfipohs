export default array => array
  .split(', ').map(keyword => {
    keyword = keyword.replace(/\s+/g, ' ').trim()
    return keyword
  })
  .filter(k => k.length > 0)