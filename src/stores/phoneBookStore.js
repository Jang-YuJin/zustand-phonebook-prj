import {create} from "zustand"

const phoneBookStore = create ((set) => ({
    mode: '',
    setMode: (mode) => set((state) => ({
        mode: mode
    })),
    modalOpen: false,
    setModalOpen: (bool) => set((state) => ({
        modalOpen: bool
    })),
    phoneBookList: [],
    addPhoneBook: (name, phoneNumber) => set((state) => ({
        phoneBookList: [...state.phoneBookList, {id: Date.now(), name, phoneNumber}]
    })),
    editPhoneBook: (list) => set((state) => ({
        phoneBookList: list
    })),
    id: '',
    setId: (id) => set((state) => ({
        id: id
    })),
    searchName: '',
    setSearchName: (name) => set((state) => ({
        searchName: name
    }))
}));

export default phoneBookStore;