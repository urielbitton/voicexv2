export const signUp = async (userData) => {
  try {
    const response = await fetch(`http://localhost:3005/v1/users/sign-up`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(userData)
    });
    return response.json();
  } catch (error) {
    console.log(error);
  }
};
