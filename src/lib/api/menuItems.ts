

const BASE_URL= process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"

export const getMenuItems = async(query="")=>{
    const res = await fetch(`${BASE_URL}/menuItems?${query}`)
    return res.json();
}


export const getMenuItemById = async(menuItem:string)=> {
    const res = await fetch(`${BASE_URL}/jobs/${menuItem}`)
    return res.json()
}

