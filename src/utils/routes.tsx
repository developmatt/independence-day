import { RouteInterface } from "../types/Route";

export const routes: RouteInterface = {
  home: {
    path: '/',
    name: 'Home'
  },
  addUser: {
    path: '/users/add',
    name: 'Adicionar usuário'
  },
  listUsers: {
    path: '/users/list',
    name: 'Listar usuários'
  }
}