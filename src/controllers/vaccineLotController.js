const { VaccineLot, UserVaccine } = require("../models");

exports.create = async (req, res) => {
    try {
        const newVaccineLot = new VaccineLot({
            vaccine: req.body.vaccineId,
            name: req.body.name,
            quantity: req.body.quantity,
            vaccinated: 0
        })
        const savedVaccineLot = await newVaccineLot.save();
        res.status(201).json(savedVaccineLot);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

exports.getAll = async (req, res) => {
    try {
        const list = await VaccineLot.find().populate('vaccine').sort('-createdAt');
        res.status(200).json(list);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

exports.getOne = async (req, res) => {
    try {
        const vaccineLot = await VaccineLot.findById(req.params.id).populate('vaccine')
        res.status(200).json(vaccineLot);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

exports.update = async (req, res) => {
    try {
        const vaccineLot = await VaccineLot.findByIdAndUpdate(req.params.id, { $set: req.body})
        res.status(200).json(vaccineLot);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

exports.delete = async (req, res) => {
    try {
        await UserVaccine.deleteMany({vaccineLot: req.params.id});
        const vaccineLot = await VaccineLot.findByIdAndDelete(req.params.id);
        res.status(200).json(vaccineLot);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}