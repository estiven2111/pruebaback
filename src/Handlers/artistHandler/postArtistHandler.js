const { postArtist } = require("../../Controllers/artistControllers")

const postArtistHandler = async (req,res) =>{
    try {
        const result = await postArtist(req)
        res.json(result)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}
module.exports = {postArtistHandler}
