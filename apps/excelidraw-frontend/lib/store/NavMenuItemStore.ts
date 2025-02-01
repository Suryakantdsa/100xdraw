import { create } from "zustand";

interface ImenuItemStore {
  isMenuBarCLicked: boolean;
  setMenuClicked: () => void;
}

const menuItemStore = create<ImenuItemStore>((set) => ({
  isMenuBarCLicked: false,
  setMenuClicked: () =>
    set((state) => ({ isMenuBarCLicked: !state.isMenuBarCLicked })),
}));

export default menuItemStore;
