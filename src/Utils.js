// This is the only data we need to render the Book component so there is
// no need to store or pass around more than this. This method is used when
// parsing API data.
export const buildBook = (data) => {
  return {
    id: data.id,
    title: data.title,
    author: (data.authors ?  data.authors.join(', ') : ''),
    imageUrl: (data.imageLinks ? data.imageLinks.thumbnail : ''),
    shelfId: data.shelf
  }
}
