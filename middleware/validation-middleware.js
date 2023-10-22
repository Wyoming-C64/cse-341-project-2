const validator = require('../helper/validate');

const saveRosterEntry = (req, res, next) => {
    const date = new Date();
    const validationRule = {
        reportingMark: "required|alpha|between:2,4",
        carNumber: "required|integer|min:1|max:999999", 
        aarCarType: "required|alpha|between:1,3",
        carLength: "integer|min:1",
        carHeight: "integer|min:1",
        color: "alpha_dash",
        ltWeight: "integer|min:1",
        ldLimit: "integer|min:1",
        capacity: "integer|min:1",
        units: "in:kilos,pounds,litres,gallons",
        builtMonth: "required|integer|min:1|max:12",
        builtYear: `required|integer|min:1800|max:${date.getFullYear()}`
    };
    const validationErrors = {
        "required.reportingMark": "REPORTING MARK is required.",
        "alpha.reportingMark" : "REPORTING MARK must be letters A-Z.",
        "between.reportingMark": "REPORTING MARK length must range from 2 to 4 letters.",

        "required.carNumber": "The CAR NUMBER is required.",
        "integer.carNumber": "The CAR NUMBER must consist of digits 0-9.",
        "min.carNumber": "The CAR NUMBER must be greater than zero (0).",
        "max.carNumber": "The CAR NUMBER must contain not more than six (6) digits.",
        
        "required.aarCarType": "You must provide the appropriate AAR CAR CODE.",
        "alpha.aarCarType": "The AAR CAR CODE consists of letters only.",
        "between.aarCarType": "The AAR CAR CODE must be 1 to 3 letters only.",

        "alpha_dash.color": "Please use only letters, numbers, dashes, and underscores for COLOR.",

        "integer.carLength": "The CAR LENGTH must be a number.",
        "min.carLength": "The CAR LENGTH must be greater than zero.",

        "integer.carHeight": "The CAR HEIGHT must be a number.",
        "min.carHeight": "The CAR HEIGHT must be greater than zero.",

        "integer.ltWeight": "The LIGHT WEIGHT value must be a number.",
        "min.ltWeight": "The LIGHT WEIGHT value must be greater than zero.",

        "integer.ldLimit": "The LOAD LIMIT must be a number.",
        "min.ldLimit": "The LOAD LIMIT must be greater than zero.",

        "integer.capacity": "The CAPACITY must be a number.",
        "min.capacity": "The CAPACITY must be greater than zero.",

        "in.units": "UNITS must be one of: kilos, pounds, gallons, litres",

        "required.builtMonth": "The MONTH BUILT is required.",
        "integer.builtMonth": "The MONTH BUILT must be a number 1 through 12.",
        "min.builtMonth": "The MONTH BUILT must be a number 1 through 12.",
        "max.builtMonth": "The MONTH BUILT must be a number 1 through 12.",

        "required.builtYear": "The YEAR BUILT is required.",
        "min.builtYear": "The YEAR BUILT must be a number equal to or greater than 1800.",
        "max.builtYear": `The YEAR BUILT must be a number not more than ${date.getFullYear()}.`,

    }
    try {
        validator(req.body, validationRule, validationErrors, (err, status) => {
            if (!status) {
                console.log(`    422 - ${JSON.stringify(err)}`);
                res.status(422).send({
                    success: false,
                    message: "Invalid or missing data error.",
                    data: err
                });
            } else {
                next();
            }
        });
    } catch (err) {
      console.log(`    500 - ${err.message}.`);
      res.status(500).send('Internal server or database error.');
    }
};


const saveRailroadEntry = (req, res, next) => {
    // $reportingMark: "TEST",
    // $railroadName: "Test Every Single Transportation Company",
    const validationRule = {
        reportingMark: "required|alpha|between:2,4",
        railroadName: "required|string"
    };
    const validationErrors = {
        "required.reportingMark": "REPORTING MARK is required.",
        "alpha.reportingMark" : "REPORTING MARK must be letters A-Z.",
        "between.reportingMark": "REPORTING MARK length must range from 2 to 4 letters.",

        "required.railroadName": "RAILROAD NAME is required.",
        "regex.railroadName": "RAILROAD NAME must be made up of only letters, numbers, spaces, and limited punctuation.",
    }
    validator(req.body, validationRule, validationErrors, (err, status) => {
        if (!status) {
            console.log(`    422 - ${JSON.stringify(err)}`);
            res.status(422).send({
                success: false,
                message: "Invalid or missing data error.",
                data: err
            });
        } else {
            next();
        }
    });
};

module.exports = {
    saveRosterEntry,
    saveRailroadEntry
}