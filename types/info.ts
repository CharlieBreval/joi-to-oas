type Licence = {
  name: string;
  url?: string;
};

type Contact = {
  name?: string;
  url?: string;
  email?: string;
};

type Info = {
  title: string;
  version: string;
  description?: string;
  termsOfService?: string;
  contact?: Contact;
  licence?: Licence;
};

export default Info;
