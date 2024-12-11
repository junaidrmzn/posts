export type PostData = {
  authorId: string;
  content: string;
  createdAt: string;
  id: string;
  published: boolean;
  title: string;
  updatedAt: string;
};

export type PostDataMutation = Partial<Pick<PostData, 'title' | 'content'>>;

export interface SignupData {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
}

export interface SigninData {
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken?: string;
}
