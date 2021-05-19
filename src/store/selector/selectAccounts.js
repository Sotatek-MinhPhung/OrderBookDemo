import store from "../store";

const getAccounts = async () => {
    return (await store.getState().connect).accounts
}

export default getAccounts