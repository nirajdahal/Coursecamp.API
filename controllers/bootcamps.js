const Bootcamp = require('../models/Bootcamp')
const ErrorResponse = require('../utils/errorResponse');

//@desc      Get all bootcamps
//@route     Get api/v1/bootcamps
//@access    Public
exports.getBootcamps = async (req, res, next) => {

    const bootcamp = await Bootcamp.find();
    res.status(200).json({ success: true, count: bootcamp.length, data: bootcamp })
}

//@desc      Get a bootcamp
//@route     Get api/v1/bootcamps/:id
//@access    Public
exports.getBootcamp = async (req, res, next) => {

    try {
        const bootcamp = await Bootcamp.findById(req.params.id)

        if (!bootcamp) {
            return next(
                // new ErrorResponse("Bootcamp Not Found", 400)
                error
            )
        }
        res.status(200).json({
            success: true,
            data: bootcamp
        })
    } catch (error) {
        next(error)
    }

}

//@desc      Create Bootcamp
//@route     Post api/v1/bootcamps
//@access    Private
exports.createBootcamp = async (req, res, next) => {
    try {


        console.log(req.body)

        const bootcamp = await Bootcamp.create(req.body);

        res.status(201).json({
            success: true,
            data: bootcamp

        })
    }
    catch (error) {
            next(error);
    }
}

//@desc      Update Bootcamp
//@route     Put api/v1/bootcamps/:id
//@access    Private
exports.updateBootcamp = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!bootcamp) {
            return res.status(400).json({
                success: false
            })
        }
        res.status(201).json({
            success: true,
            data: bootcamp
        })
    }
    catch (error) {
        next(error);
    }

}

//@desc      Delete Bootcamp
//@route     Delete api/v1/bootcamps/:id
//@access    Private
exports.deleteBootcamp = async (req, res, next) => {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

    if (!bootcamp) {
        return res.status(400).json({
            success: false
        })
    }
    res.status(204).send({ success: true, data: null })
}