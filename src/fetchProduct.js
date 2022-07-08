import axios from 'axios'

export default async id => {
  const response = await axios.get(
    `https://6295cdfa810c00c1cb680de8.mockapi.io/products/${id}`
  )
  return response.data
}
