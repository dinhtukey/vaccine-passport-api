const { Place, UserPlace } = require("../models");

exports.create = async (req, res, next) => {
    try {
        const newPlace = new Place({
            ...req.body,
            creator: req.user._id
        })
        const savedPlace = await newPlace.save();
        res.status(201).json(savedPlace)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}

exports.getAll = async (req, res, next) => {
    try {
        const list = await Place.find().populate('creator').sort('-createdAt');
        for (const place of list) {
            const userVisitLast24h = await UserPlace.find({
                place: place._id,
                createdAt: {
                    $gt: new Date(Date.now() - 24*60*60*1000)
                }
            });
            place._doc.userVisitLast24h = userVisitLast24h
        }
        res.status(200).json(list)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}

exports.getOne = async (req, res, next) => {
    try {
        const place = await Place.findById(req.params.id).populate('creator')
        const userVisitLast24h = await UserPlace.find({
            place: place._id,
            createdAt: {
                $gt: new Date(Date.now() - 24*60*60*1000)
            }
        }).populate('user');
        place._doc.userVisitLast24h = userVisitLast24h
        res.status(200).json(place)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}

exports.update = async (req, res, next) => {
    try {
        const place = await Place.findOneAndUpdate({
            _id: req.params.id,
            creator: req.user.id
        }, {
            $set: req.body
        });

        console.log("place", place);
        

        res.status(200).json(place)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}

exports.delete = async (req, res, next) => {
    try {
        const {id} = req.params;
        await UserPlace.deleteMany({place: id})
        const placeDeleted = await Place.findByIdAndDelete(id);
        res.status(200).json(placeDeleted)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}