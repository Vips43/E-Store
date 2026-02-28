import { create } from "zustand";

const BASE_URI = window.location.origin === `localhost` ? `http://localhost:3000` : `https://e-store-backend-steel.vercel.app`

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
  selectValue: "",


  setSelectValue: (value) => set({ selectValue: value }),

  setInput: (value) => set({ input: value }),

  searchData: async () => {
    set({ searched: true });
    const res = await fetch(`${BASE_URI}/search`);
    const data = await res.json();
    set({ searchResults: data.products || [] });
  },

  clearSearch: () => set({ searchResults: [], searched: false, input: "" }),


  fetchData: async (page = 1, limit = 10) => {
    const { selectValue } = get()
    set({ isLoading: true })
    try {

      const res = await fetch(`${BASE_URI}/products?category=${selectValue || ''}&page=${page}&limit=${limit}`
      );
      const data = await res.json();
      set({
        products: data.products,
        totalProducts: data.totalProducts,
        page: data.page,
        limit: data.limit,
        isLoading: false
      });;
    } catch (err) {
      set({ isLoading: false });
      console.error("Frontend Error:", err);
    }
  },

  fetchUsers: async () => {
    set({ isLoading: true })
    try {
      const res = await fetch(`${BASE_URI}/users`)
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
    localStorage.setItem("authUser", JSON.stringify(userWithRole));

    set({
      user: userWithRole,
      token: userWithRole.accessToken,
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

export const useMyCart = create((set, get) => ({
  cartCount: 0, //total items in cart
  items: [], // array of products count and id
  currProduct: '',
  setCurrProduct: (val) => set({ currProduct: val }),

  addCartCount: (product) => {
    const { items } = get();
    const id = product.id
    const existingItem = items.find(item => item.id === id);
    if (existingItem) {
      const updateItem = items.map(item => item.id === id ? { ...item, count: item.count + 1 } : item);
      set({ items: updateItem, cartCount: get().cartCount + 1 });
    } else {
      set({
        items: [...items, { product, id, count: 1 }],
        cartCount: get().cartCount + 1
      })
    }
    console.log(items)
  },
  minCartCount: (id) => {
    const { items, cartCount } = get();
    const existingItem = items.find(item => item.id === id);

    if (!existingItem) return;

    if (existingItem) {
      const updatedItems = items.map(item => item.id === id ? { ...item, count: item.count > 1 ? item.count - 1 : 0, } : item);

      set({ items: updatedItems, cartCount: cartCount - 1 })
    } else {
      const updatedItems = items.filter(item => item.id !== id);
      set({ items: updatedItems, cartCount: cartCount - 1 });
    }
  },
  removeCartItems: (id) => {
    const { items, cartCount } = get();
    const itemToRemove = items.find(item => item.id === id);
    if (itemToRemove) {
      const updatedItems = items.filter(item => item.id !== id);
      set({ items: updatedItems, cartCount: cartCount - itemToRemove.count })
      console.log("items:", items, "cartCount:", cartCount - itemToRemove.count)
      return;
    }
  },

}));