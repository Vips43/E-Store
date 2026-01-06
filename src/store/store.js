import { create } from "zustand";

const useMyStore = create((set, get) => ({
  products: [],
  isLoading: false,
  hasFetched: false,
  users: [],
  role: { admin: [], user: [], moderator: [] },
  error: null,
  selectValue: '',
  page: 1,
  limit: 10,
  totalProducts: 0,
  input: '',
  searchResults: [],
  searched: false,

  setInput: (value) => set({ input: value }),

  searchData: async (query) => {
    set({ searched: true });
    const res = await fetch(`https://dummyjson.com/products/search?q=${query}`);
    const data = await res.json();
    set({ searchResults: data.products || [] });
  },

  clearSearch: () => set({ searchResults: [], searched: false, input: "" }),


  fetchData: async (page = 1, limit = 10) => {
    const { selectValue } = get()
    const skip = (page - 1) * limit;
    set({ isLoading: true })
    try {
      const url = selectValue
        ? `https://dummyjson.com/products/category/${selectValue}?limit=${limit}&skip=${skip}`
        : `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;

      const res = await fetch(url);
      const data = await res.json();
      set({ products: data.products, totalProducts: data.total, page, limit, isLoading: false });
    } catch (err) {
      set({ isLoading: false });
    }
  },

  fetchUsers: async () => {
    set({ isLoading: true })
    try {
      const res = await fetch(`https://dummyjson.com/users`)
      const data = await res.json();

      const admin = data.users.filter(user => user.role === 'admin')
      const user = data.users.filter(user => user.role === 'user')
      const moderator = data.users.filter(user => user.role === 'moderator')

      set({ usersData: data, users: data.users, isLoading: false, role: { admin, user, moderator } });
    } catch (err) {
      set({ isLoading: false, error: 'there is error:' + err });
    }
  },
}));

export default useMyStore;

export const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("authUser")) || null,
  token: localStorage.getItem("token"),
  isAuthenticated: !!localStorage.getItem("token"),

  login: (userWithRole) => {
    localStorage.setItem("token", userWithRole.token);
    localStorage.setItem("authUser", JSON.stringify(userWithRole));

    set({
      user: userWithRole,
      token: userWithRole.token,
      isAuthenticated: true,
    });
  },

  logout: () => {
    localStorage.clear();
    set({
      user: null,
      token: null,
      isAuthenticated: false,
    });
  },
}));
