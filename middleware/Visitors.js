var express = require('express');
var app = express();
const _ = require('lodash');
const VisitorDocument = require('../models/VisitStatisctic');
var useragent = require('express-useragent');

app.use(useragent.express());

async function setNewVisitor(req, res, next) {

    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var year = dateObj.getUTCFullYear();

    let visitorDocumentByYear = await VisitorDocument.findOne({year: year});
    if (visitorDocumentByYear) {
        let visitorDocumentByMonth = await VisitorDocument.findOne({year: year, month: month});
        if (!visitorDocumentByMonth) {
            let newVisitorDocument = await new VisitorDocument({year: year, month: month});
            if (!newVisitorDocument) {
                res.status(500).send('internal server error :(');
            } else {
                await newVisitorDocument.save();
            }
        }


    } else {

        let visitorDocumentNewYear = await new VisitorDocument({year: year, month: month});
        if (!visitorDocumentNewYear) {
            res.status(500).send('internal server error :(');
        } else {
            await visitorDocumentNewYear.save();
        }

    }


    let visitorDocumentCurrentDate = await VisitorDocument.findOne({year: year, month: month});

    var source = req.headers['user-agent'],
        ua = useragent.parse(source);
    console.log(ua);
//----------------------------------------------------Browser Check-----------------------------------------------------------
    if (ua.isChrome) {
        visitorDocumentCurrentDate.browsers.chrome++;

    } else if (ua.isFirefox) {
        visitorDocumentCurrentDate.browsers.Firefox++;
    } else if (ua.isSafari) {
        visitorDocumentCurrentDate.browsers.Safari++;
    } else if (ua.isIE) {
        visitorDocumentCurrentDate.browsers.IE++;
    } else if (ua.isEdge) {
        visitorDocumentCurrentDate.browsers.Edge++;
    }
//----------------------------------------------------OS Check-----------------------------------------------------------

    if (ua.isWindows) {
        visitorDocumentCurrentDate.OS.Windows++;
    } else if (ua.isLinux) {
        visitorDocumentCurrentDate.OS.Linux++;
    } else if (ua.isLinux64) {
        visitorDocumentCurrentDate.OS.Linux64++;
    } else if (ua.isMac) {
        visitorDocumentCurrentDate.OS.Mac++;
    } else if (ua.isChromeOS) {
        visitorDocumentCurrentDate.OS.ChromeOS++;
    } else if (ua.isBada) {
        visitorDocumentCurrentDate.OS.Bada++;
    } else if (ua.isAndroid) {
        visitorDocumentCurrentDate.OS.Android++;
    } else if (ua.isBlackberry) {
        visitorDocumentCurrentDate.OS.Blackberry++;
    }

//----------------------------------------------------Platform Check-----------------------------------------------------------


    if (ua.isDesktop) {
        visitorDocumentCurrentDate.platform.Desktop++;
    } else if (ua.isMobile) {
        visitorDocumentCurrentDate.platform.Mobile++;
    }
    if (ua.isTablet) {
        visitorDocumentCurrentDate.platform.Tablet++;
    }

    visitorDocumentCurrentDate.visitNumber++;
    await visitorDocumentCurrentDate.save();
    next();


}

module.exports = setNewVisitor;