import urlModel from "../Model/model.js";
import { nanoid } from 'nanoid'

const isUrlValid = (url) => {
    try {
        new URL(url)
        return true;
    } catch (err) {
        return false;
    }
}


const createShortUrl = async (req, res) => {

    try {
        const { longUrl } = req.body;
        const shortedUrl = `http://${req.headers.host}/${nanoid(8)}`;

        if (!isUrlValid(longUrl)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid url please validate the url than request to body'
            })
        }

        const newObjUrl = new urlModel({
            longUrl: longUrl,
            shortUrl: shortedUrl
        });

        await newObjUrl.save()

        res.status(201).json({
            success: true,
            message: 'urls get successfully',
            url: shortedUrl
        })
    } catch (err) {
        res.status(400).json({
            success: false,
            message: `Error something went wrong ${err}`
        })
    }
}

const redirectUrl = async (req, res) => {
    try {
        const { urlId } = req.params;
        const shortId = `http://${req.headers.host}/${urlId}`;
        console.log(shortId);
        const doc = await urlModel.findOne({ shortUrl: shortId });

        if (!doc) {
            return res.status(404).json({
                success: false,
                message: 'URL not Matching data not found',
            });
        }

        res.redirect(doc.longUrl);

    } catch (err) {
        res.status(500).json({
            success: false,
            message: `Error something went wrong ${err}`
        });
    }
}

const modelController = {
    createShortUrl,
    redirectUrl
}

// module.exports= modelController;
export default modelController;