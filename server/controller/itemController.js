import itemModal from "../models/itemModel.js"

const getItem = async (req, res) => {
    const items = itemModal.find({})
    
    res.send(items)

}

export {getItem}