const Bootcamp = require('../models/Bootcamp')
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/asyncHandler')

//@desc      Get all bootcamps
//@route     Get api/v1/bootcamps
//@access    Public
exports.getBootcamps = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.find();
    console.log(process.env.GEOCODER_PROVIDER)
    res.status(200).json({ success: true, count: bootcamp.length, data: bootcamp })
})

//@desc      Get a bootcamp
//@route     Get api/v1/bootcamps/:id
//@access    Public
exports.getBootcamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.findById(req.params.id)
    if (!bootcamp) {
        return next(
            new ErrorResponse(`Cannot find Bootcamp with the id: ${req.params.id}`, 404)
        )
    }
    res.status(200).json({
        success: true,
        data: bootcamp
    })


})

//@desc      Create Bootcamp
//@route     Post api/v1/bootcamps
//@access    Private
exports.createBootcamp = asyncHandler(async (req, res, next) => {
        const bootcamp = await Bootcamp.create(req.body);
        res.status(201).json({
            success: true,
            data: bootcamp

        })
})

//@desc      Update Bootcamp
//@route     Put api/v1/bootcamps/:id
//@access    Private
exports.updateBootcamp = asyncHandler(async (req, res, next) => {
    
        const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!bootcamp) {
            return next(
                new ErrorResponse(`Cannot Find Bootcamp with the id: ${req.params.id}`, 404)
            )
        }
        res.status(201).json({
            success: true,
            data: bootcamp
        })
    
})

//@desc      Delete Bootcamp
//@route     Delete api/v1/bootcamps/:id
//@access    Private
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

    if (!bootcamp) {
        return next(
            new ErrorResponse(`Cannot find Bootcamp with the id: ${req.params.id}`, 404)
        )
    }
    res.status(204).send({ success: true, data: null })
})