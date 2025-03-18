const db = require ('../config/db')


exports.products = async(req, res)=>{
    try {
        const [allProducts] = await db.execute('SELECT * FROM products');
        return res.status(200).json(allProducts)
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'An error occurred while fetching produce', error: error.message})  
    }
}