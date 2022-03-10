
//@desc      Get all bootcamps
//@route     Get api/v1/bootcamps
//@access    Public
exports.getBootcamps = (req, res, next) => {
    res.status(200).send({success:true})
}

//@desc      Get a bootcamp
//@route     Get api/v1/bootcamps/:id
//@access    Public
exports.getBootcamp = (req, res, next) => {
    res.status(200).send({success:true, data:[{
        id : req.params.id
    }]})
}

//@desc      Create Bootcamp
//@route     Post api/v1/bootcamps
//@access    Private
exports.createBootcamp = (req, res, next) => {
    res.status(201).send({success:true, data:[{
        id : req.params.id
    }]})
}

//@desc      Update Bootcamp
//@route     Put api/v1/bootcamps/:id
//@access    Private
exports.updateBootcamp = (req, res, next) => {
    res.status(204).send({success:true, data:[{
        id : req.params.id
    }]})
}

//@desc      Delete Bootcamp
//@route     Delete api/v1/bootcamps/:id
//@access    Private
exports.deleteBootcamp = (req, res, next) => {
    res.status(204).send({success:true, data:null})
}