import { Location } from "./Company";

export type Seeker = {
  seeker_id?: string;
  name: string;
  email: string;
  password?: string;
  passwordConfirmation?: string;
  avatar?: string;
  location?: Location;
};
