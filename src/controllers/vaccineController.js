const { Vaccine, UserVaccine, VaccineLot } = require("../models");
const vaccine = require("../models/vaccine");

exports.create = async (req, res) => {
    try {
        const newVaccine = new Vaccine(req.body);
        const savedVaccine = await newVaccine.save();
        savedVaccine._doc.quantity = 0;
        savedVaccine._doc.vaccinated = 0;
        savedVaccine._doc.vaccineLots = [];
        res.status(201).json(savedVaccine);
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}

exports.getAll = async (req, res) => {
    try {
        const list = await Vaccine.find().sort('-createdAt');
        for (const vaccine of list) {
            const vaccineLots = await VaccineLot.find({ vaccine: vaccine._id });
            vaccine._doc.quantity = vaccineLots.reduce((total, item) => total + Number(item.quantity), 0);

            vaccine._doc.vaccinated = vaccineLots.reduce((total, item) => total + Number(item.vaccinated), 0);

            vaccine._doc.vaccineLots = vaccineLots;
        }

        res.status(200).json(list)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}

exports.getOne = async (req, res) => {
    try {
        const vaccine = await Vaccine.findById(req.params.id);
        const vaccineLots = await VaccineLot.find({ vaccine: vaccine._id });
        vaccine._doc.quantity = vaccineLots.reduce((total, item) => total + Number(item.quantity), 0);

        vaccine._doc.vaccinated = vaccineLots.reduce((total, item) => total + Number(item.vaccinated), 0);

        vaccine._doc.vaccineLots = vaccineLots;
        res.status(200).json(vaccine)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}

exports.update = async (req, res) => {
    try {
        const vaccine = await Vaccine.findByIdAndUpdate(
            req.params.id, {
            $set: req.body
        })
        res.status(200).json(vaccine)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}

exports.delete = async (req, res) => {
    try {
        await UserVaccine.deleteMany({ vaccine: req.params.id });
        await VaccineLot.deleteMany({ vaccine: req.params.id })
        const vaccine = await Vaccine.findByIdAndDelete(req.params.id)
        res.status(200).json(vaccine)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}