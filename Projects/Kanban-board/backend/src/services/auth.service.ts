type createAccountParams = {
  username: string;
  email: string;
  fullname: string;
  password: string;
  confirmPassword: string;
  userAgent?: string;
};
export const createAccount = async (data: createAccountParams) => {
  //verify existing user doesn't exist
  //Assert error if user exist
  //create user
  //create verifcation code
  //send verification email
  //create session
  //sign access & refresh token
  //return user & tokens
};
