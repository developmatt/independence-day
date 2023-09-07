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
  get: async (index: number) => {
    const users = await UserRepository.list();
    return users[index];
  },
  list: async () => {
    const usersFromLocalStorage = await UserRepository.getFromLocalStorage();
    if(usersFromLocalStorage) return usersFromLocalStorage;
    const usersFromApi = await UserRepository.getFromApi();
    await UserRepository.fill(usersFromApi);
    return usersFromApi;
  },
  fill: async (users: UserInterface[]) => {
    return await localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(users.map((user: UserInterface) => ({ ...user, cpf: user.cpf.replace(/\D/g, ''), phone: user.phone.replace(/\D/g, '') }))));
  },
  post: async (user: UserInterface) => {
    const users = await UserRepository.list();
    const newUsers = [...users, user];
    await UserRepository.fill(newUsers);
    return newUsers;
  },
  patch: async (index: number, user: UserInterface) => {
    const users = await UserRepository.list();
    const newUsers = users.map((u: UserInterface, i: number) => i === index ? user : u);
    await UserRepository.fill(newUsers);
    return newUsers;
  },
  delete: async (index: number) => {
    const users = await UserRepository.list();
    const newUsers = users.filter((_: UserInterface, i: number) => i !== index);
    UserRepository.fill(newUsers);
    return newUsers;
  }
}