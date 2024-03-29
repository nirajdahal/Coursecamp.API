const Bootcamp = require('../models/Bootcamp')
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/asyncHandler');
const geocoder = require('../utils/geocoder');

//@desc      Get all bootcamps
//@route     Get api/v1/bootcamps
//@access    Public
exports.getBootcamps = asyncHandler(async (req, res, next) => {

    let query;
    //Copy req.query
    const reqQuery = { ...req.query };
    console.log(req.query);

    const removeFields = ['select', 'sort', 'page', 'limit', 'search'];

    //Loopover remove fields and delete from req query

    removeFields.forEach(param => delete reqQuery[param]);

    //Create query string
    let queryStr = JSON.stringify(reqQuery);

    //Modified qyery string
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`)
    console.log(queryStr)
    




    //search
    if (req.query.search) {
        let parsedQuery = JSON.parse(queryStr);
         parsed.$or = [
            { name: { $regex: req.query.search, $options: 'i' } },
            { description: { $regex: req.query.search, $options: 'i' } }
        ]
        //Finding resource
        query = Bootcamp.find(parsedQuery);
    }
    else {
        //Finding resource
        query = Bootcamp.find(JSON.parse(queryStr));
    }


    //Select fields
    if (req.query.select) {
        const fields = req.query.select.split(',').join(' ');

        query = query.select(fields);
    }
    //Sort 
    if (req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ');

        query = query.sort(sortBy);
    }
    else {
        query = quer.sort('-createdAt');
    }


    //Pagination

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit, 10) || 25;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Bootcamp.countDocuments();
    query = query.skip(startIndex).limit(limit);

    //Executing query
    const bootcamp = await query;

    const pagination = {}
    if (endIndex < total) {
        pagination.next = {
            page: page + 1,
            limit: limit
        }
    }

    if (startIndex > 0) {
        pagination.prev = {
            page: page - 1,
            limit: limit
        }
    }


    res.status(200).json({ success: true, count: bootcamp.length, pagination, data: bootcamp })
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


//@desc      Get a bootcamp
//@route     Get api/v1/bootcamps/radius/:zipcode/:distance
//@access    Public
exports.getBootcampInRaius = asyncHandler(async (req, res, next) => {

    const { zipcode, distance } = req.params;

    //Get lat long from geocoder
    const loc = await geocoder.geocode(zipcode);
    const lat = loc[0].latitude;
    const lng = loc[0].longitude;

    //Calculate radius using radians
    //divide distance by radius of earth
    //Earth radius = 3963 mi, 6378 km
    const radius = distance / 6378;

    const bootcamps = await Bootcamp.find({
        location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } }
    })


    res.status(200).json({
        success: true,
        count: bootcamps.length,
        data: bootcamps
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