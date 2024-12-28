export interface RequestBase {
  firstName: string;
  lastName: string;
  email: string;
}

export interface BackendRequest extends RequestBase {
  password: string;
}

export interface BackendResponse extends RequestBase {
  _id: string;
}
