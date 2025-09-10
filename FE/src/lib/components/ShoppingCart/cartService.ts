import axios from 'axios';
import { Cart } from './types';

export const cartService = {
  async getCart(userId: string, apiBaseUrl: string): Promise<Cart> {
    try {
      console.log('Getting cart for:', { userId, apiBaseUrl });
      const response = await axios.get(`${apiBaseUrl}/cart/${userId}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return {
          userId,
          items: [],
          totalAmount: 0,
          totalItems: 0
        };
      }
      throw error;
    }
  },

  async addToCart(userId: string, productId: string, quantity: number, apiBaseUrl: string): Promise<Cart> {
    try {
      const payload = { userId, productId, quantity };
      console.log('Adding to cart - Payload:', payload);
      console.log('API URL:', `${apiBaseUrl}/cart/add`);
      
      const response = await axios.post(`${apiBaseUrl}/cart/add`, payload, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      console.log('Add to cart response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Add to cart error details:', {
        error,
        response: axios.isAxiosError(error) ? error.response?.data : null,
        status: axios.isAxiosError(error) ? error.response?.status : null,
        message: axios.isAxiosError(error) ? error.response?.data?.message : null,
        errors: axios.isAxiosError(error) ? error.response?.data?.errors : null
      });
      throw error;
    }
  },

  async updateCartItem(userId: string, productId: string, quantity: number, apiBaseUrl: string): Promise<Cart> {
    const response = await axios.put(`${apiBaseUrl}/cart/update`, {
      userId,
      productId,
      quantity
    });
    return response.data;
  },

  async removeFromCart(userId: string, productId: string, apiBaseUrl: string): Promise<Cart> {
    const response = await axios.delete(`${apiBaseUrl}/cart/remove`, {
      data: {
        userId,
        productId
      }
    });
    return response.data;
  },

  async clearCart(userId: string, apiBaseUrl: string): Promise<void> {
    await axios.delete(`${apiBaseUrl}/cart/clear/${userId}`);
  }
};