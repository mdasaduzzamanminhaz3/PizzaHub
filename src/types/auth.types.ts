export interface SignInFormValues {
  email: string;
  password: string;
}

export interface SignInFormProps {
  brandName?: string;
  brandHighlight?: string;
  heading?: string;
  subheading?: string;
  signUpHref?: string;
  forgotPasswordHref?: string;
  onSubmitForm?: (values: SignInFormValues) => void | Promise<void>;
  onGoogleSignIn?: () => void | Promise<void>;
}