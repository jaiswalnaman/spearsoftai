import axios from 'axios';

const API_URL = 'https://sparrow-rapid-kingfish.ngrok-free.app';

export interface AccountStatus {
  isBusinessAccount: boolean;
}

export const checkBusinessAccount = async (email: string): Promise<AccountStatus> => {
  try {
    const response = await axios.post(`${API_URL}/check_business_account`, { email });
    return response.data;
  } catch (error) {
    console.error('Error checking business account:', error);
    return { isBusinessAccount: false };
  }
};