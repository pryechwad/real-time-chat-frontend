const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL as string;

interface UserData {
  username: string;
  email: string;
  password: string;
}

interface RegisterResponse {
  jwt: string;
  user: {
    id: string;
    username: string;
    email: string;
  };
}

export const registerUser = async (userData: UserData): Promise<RegisterResponse> => {
  try {
    const response = await fetch(`${backendUrl}/auth/local/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Registration failed');
    }

    return await response.json();
  } catch (error) {
    console.error('Error occurred during registration:', error);
    throw error;
  }
};