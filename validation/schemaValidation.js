import yup from "yup";

//User Schema for validation of incoming JSON requests
export const UserSchema = yup.object({
  name: yup.string().required(),
  email: yup.string().required(),
  user_name: yup.string().required(),
  password: yup.string().required(),
  smtp_host: yup.string().required(),
  smtp_port: yup.number().required(),
  smtp_encryption: yup.mixed().oneOf(["TLS", "SSL", "NONE"]),
  message_per_day: yup.number().required(),
  minimum_time_gap: yup.number().required(),
  imap_host: yup.string().required(),
  imap_port: yup.number().required(),
  imap_encryption: yup.mixed().oneOf(["TLS", "SSL", "NONE"])
});
//Email Schema for validation of incoming JSON requests
export const EmailSchema = yup.object({
  email_to: yup.array().of(yup.string().email()).required(),
  cc: yup.array().of(yup.string().email()).nullable(),
  bcc: yup.array().of(yup.string().email()).nullable(),
  subject: yup.string().required(),
  body: yup.string().required(),
});
