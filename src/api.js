import axios from 'axios'

export const fetchProducts = async (page, limit, category) => {
    const response = await axios.get(
      'https://6295cdfa810c00c1cb680de8.mockapi.io/products',
      {
        params: {
          page,
          limit,
          category
        }
      }
    )
    return response.data
}
