import { messagerUtils } from "../messagerFunctions/messagerFunction";

export const searchFunction = async (searchInput, user, setFind, find, setSearchResult) => {
    if (searchInput.current.value != "") {
        const result = await messagerUtils.findChat(user._id, searchInput.current.value);
        searchInput.current.value = "";
        setFind(!find);
        setSearchResult([result])
    }
}

export const closeSearch = async (setFind, find, setSearchResult) => {
    setFind(!find);
    setSearchResult(false)
}