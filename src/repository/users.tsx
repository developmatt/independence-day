import axios from "axios";
import { UserInterface } from "../types/User";

const LOCAL_STORAGE_KEY = 'users';

export const UserRepository = {
  getFromLocalStorage: async () => {
    const users = localStorage.getItem(LOCAL_STORAGE_KEY);
    return users ? JSON.parse(users) : null;
  },
  getFromApi: async () => {
    const { data } = await axios.get('https://private-9d65b3-tinnova.apiary-mock.com/users');
    return data
  },
  list: async () => {
    const usersFromLocalStorage = await UserRepository.getFromLocalStorage();
    if(usersFromLocalStorage) return usersFromLocalStorage;
    const usersFromApi = await UserRepository.getFromApi();
    UserRepository.fill(usersFromApi);
    return usersFromApi;
  },
  fill: (users: UserInterface[]) => {
    return localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(users))
  },
  post: async (user: UserInterface) => {
    const users = await UserRepository.list();
    const newUsers = [...users, user];
    UserRepository.fill(newUsers);
    return newUsers;
  }
}