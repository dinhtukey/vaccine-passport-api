const crypto = require("crypto-js");
const jwt = require('jsonwebtoken');
const { User, UserVaccine, UserPlace, VaccineLot, Vaccine, Place } = require("../models");

exports.create = async (req, res, next) => {
    const {idNumber, phoneNumber} = req.body;
    try {
        let user = await User.findOne({phoneNumber: phoneNumber});
        if (user) return res.status(403).json('Phone number already registered for another account');

        user = await User.findOne({idNumber: idNumber});
        if (user) return res.status(403).json('Id number already registered for another account');

        const newUser = new User(req.body);
        const savedUser = await newUser.save();

        const token = jwt.sign(
            {id: savedUser._id},
            process.env.TOKEN_SECRET_KEY
        );

        res.status(201).json({
            token,
            user: savedUser
        })
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}

exports.getAll = async (req, res, next) => {
    try {
        const list = await User.find().sort('-createdAt');
        for (const user of list) {
            const vaccine = await UserVaccine.find({
                user: user._id
            }).sort("-createdAt");
            user._doc.vaccine = vaccine
        }
        res.status(200).json(list);
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}

exports.getOne = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id)
        const userVaccine = await UserVaccine.find({
            user: req.params.id
        }).populate('vaccine').populate('vaccineLot');

        const userPlace = await UserPlace.find({
            user: req.params._id
        }).populate('place');

        user._doc.vaccinated = userVaccine;
        user._doc.placedVisited = userPlace;

        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}

exports.update = async (req, res, next) => {
    const {idNumber, phoneNumber} = req.body;
    try {
        let user = await User.findOne({phoneNumber: phoneNumber});
        if (user && user._id.toString() !== req.params.id) return res.status(403).json('Phone number already registered for another account');

        user = await User.findOne({idNumber: idNumber});
        if (user && user._id.toString() !== req.params.id) return res.status(403).json('Id number already registered for another account');

        const updateUser = await User.findByIdAndUpdate(
            req.params.id,  
            {
                $set: req.body
            }
        )
        res.status(200).json(updateUser);
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}

exports.delete = async (req, res, next) => {
    try {
        const { id } = req.params;
        await UserVaccine.deleteMany({user: id});
        await UserPlace.deleteMany({user: id});

        const deleteUser = await User.findByIdAndDelete(id);
        res.status(200).json(deleteUser);
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}

//add vaccinated to user
exports.vaccinated = async (req, res) => {
    try {
        const newUserVaccine = new UserVaccine(req.body);
        const savednewUserVaccine = await newUserVaccine.save();
        await VaccineLot.findOneAndUpdate({
            _id: req.body.vaccineLot
        }, {
            $inc: { vaccinated: +1}
        });

        savednewUserVaccine._doc.vaccine = await Vaccine.findById(req.body.vaccine);
        savednewUserVaccine._doc.vaccineLot = await VaccineLot.findById(req.body.vaccineLot);
        res.status(201).json(savednewUserVaccine);
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}

// find all places of user 
exports.getAllPlace = async (req, res) => {
    try {
        const list = await Place.find({
            creator: req.params.userId
        })
        res.status(200).json(list);
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}

// user check in place
exports.checkinPlace = async (req, res) => {
    try {
        const newVisit = new UserPlace({
            user: req.user.id,
            place: req.body.placeId
        });
        const savedUserPlace = await newVisit.save();
        res.status(201).json(savedUserPlace);
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}

//get place that user check in
exports.placeVisited = async (req, res) => {
    try {
        const placeVisited = await UserPlace.find({
            user: req.params.userId
        }).populate('place')
        res.status(200).json(placeVisited);
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}