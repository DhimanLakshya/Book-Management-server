exports.errorhandle = (error, res) => {

    if (error.name == "ValidationError" || error.name == "ReferenceError" || error.name == 'CastError') {
        return res.status(400).send({ status: false, msg: error.message })
    }


    if (error.code == 11000) {
        return res.status(400).send({
            status: false,
            msg: `Duplicate key Provided at ${Object.keys(error.keyValue)} ${Object.values(error.keyValue)}`
        });
    }
    return res.status(500).send({ status: false, msg: error.message });
}


