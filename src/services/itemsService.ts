import { apiGet } from "./apiClient";

export interface UserItem {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export const fetchItems = () => apiGet<UserItem[]>("/users");
export const fetchItemById = (id: string) => apiGet<UserItem>(`/users/${id}`);
