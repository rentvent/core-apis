(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/json/stringify");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("aws-sdk");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getpropertyById = undefined;

var _stringify = __webpack_require__(0);

var _stringify2 = _interopRequireDefault(_stringify);

var _getIterator2 = __webpack_require__(3);

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _trunc = __webpack_require__(4);

var _trunc2 = _interopRequireDefault(_trunc);

var _regenerator = __webpack_require__(5);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(6);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var getpropertyById = exports.getpropertyById = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(event, context, callback) {
        var params;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        params = {
                            TableName: 'rv_property',
                            KeyConditionExpression: "P_ID = :p_id",
                            ExpressionAttributeValues: {
                                ":p_id": event.pathParameters.p_id
                            }
                        };
                        _context.prev = 1;

                        console.log("p_result");
                        // first step get property by ID from daynmo 
                        _context.next = 5;
                        return dynamoDbLib.call("query", params);

                    case 5:
                        p_result = _context.sent;


                        console.log(p_result.Count);

                        if (!(p_result.Count < 1)) {
                            _context.next = 10;
                            break;
                        }

                        callback(null, (0, _responseLib.success)("Not Found"));
                        return _context.abrupt("return");

                    case 10:
                        _context.next = 12;
                        return getPropertyReview(event.pathParameters.p_id);

                    case 12:
                        _context.next = 14;
                        return getlandlord(event.pathParameters.p_id);

                    case 14:
                        _context.next = 16;
                        return getcomplaints(p_result.Items[0].P_Address_Line1);

                    case 16:
                        _context.next = 18;
                        return getRental(event.pathParameters.p_id);

                    case 18:

                        callback(null, (0, _responseLib.success)(p_result));
                        _context.next = 24;
                        break;

                    case 21:
                        _context.prev = 21;
                        _context.t0 = _context["catch"](1);

                        callback(null, (0, _responseLib.failure)(_context.t0));

                    case 24:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, this, [[1, 21]]);
    }));

    return function getpropertyById(_x, _x2, _x3) {
        return _ref.apply(this, arguments);
    };
}();

var getPropertyReview = function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(p_id) {
        var propertyparams, Review, p_approval, p_rating, v_approval, reviewList, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, item, Tenant, TenantParams, reviewResponse;

        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        console.log("getPropertyReview begin !!!!");
                        propertyparams = {
                            TableName: 'Property_Reviews',
                            FilterExpression: "P_ID = :p_id",
                            ExpressionAttributeValues: {
                                ":p_id": p_id
                            }
                        };
                        _context2.prev = 2;
                        _context2.next = 5;
                        return dynamoDbLib.call("scan", propertyparams);

                    case 5:
                        Review = _context2.sent;

                        console.log("Review data ", Review);
                        p_approval = 0;
                        p_rating = 0;

                        if (!(Review.Count > 0)) {
                            _context2.next = 50;
                            break;
                        }

                        console.log("We have reviews for this property good news :D ");
                        reviewList = [];
                        _iteratorNormalCompletion = true;
                        _didIteratorError = false;
                        _iteratorError = undefined;
                        _context2.prev = 15;
                        _iterator = (0, _getIterator3.default)(Review.Items);

                    case 17:
                        if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                            _context2.next = 33;
                            break;
                        }

                        item = _step.value;

                        if (!(item.PR_T_ID != null)) {
                            _context2.next = 25;
                            break;
                        }

                        TenantParams = {
                            TableName: 'Tenant',
                            FilterExpression: "T_ID = :t_id",
                            ExpressionAttributeValues: {
                                ":t_id": item.PR_T_ID
                            }
                        };
                        _context2.next = 23;
                        return dynamoDbLib.call("scan", TenantParams);

                    case 23:
                        Tenant = _context2.sent;

                        console.log("Tenent Data ", Tenant);

                    case 25:
                        reviewResponse = {
                            "T_City": '', //Tenant != null ? Tenant.Items[0].T_City : ' ',
                            "T_State": '', //Tenant != null ? Tenant.Items[0].T_State : ' ',
                            "PR_Types": item.PR_Types,
                            "PR_Created_Date": item.PR_Created_Date,
                            "PR_Condition": item.PR_Condition,
                            "PR_Approval": item.PR_Approval,
                            "PR_Rating": item.PR_Rating

                            //compute step
                        };
                        v_approval = item.PR_Approval == 'yes' ? 1 : 0;
                        //Sum of value
                        p_rating = p_rating + item.PR_Rating;
                        p_approval = p_approval + v_approval;
                        // console.log(item);
                        reviewList.push(reviewResponse);

                    case 30:
                        _iteratorNormalCompletion = true;
                        _context2.next = 17;
                        break;

                    case 33:
                        _context2.next = 39;
                        break;

                    case 35:
                        _context2.prev = 35;
                        _context2.t0 = _context2["catch"](15);
                        _didIteratorError = true;
                        _iteratorError = _context2.t0;

                    case 39:
                        _context2.prev = 39;
                        _context2.prev = 40;

                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }

                    case 42:
                        _context2.prev = 42;

                        if (!_didIteratorError) {
                            _context2.next = 45;
                            break;
                        }

                        throw _iteratorError;

                    case 45:
                        return _context2.finish(42);

                    case 46:
                        return _context2.finish(39);

                    case 47:
                        p_result.Items[0].P_Reviews = reviewList;
                        p_result.Items[0].P_Approval_Rate = p_approval + '/' + Review.Count;
                        p_result.Items[0].P_Avg_Rating = isNaN(p_rating / Review.Count) ? 0 : (0, _trunc2.default)(p_rating / Review.Count);

                    case 50:
                        console.log("getPropertyReview ended successfully !!!!");
                        _context2.next = 56;
                        break;

                    case 53:
                        _context2.prev = 53;
                        _context2.t1 = _context2["catch"](2);
                        return _context2.abrupt("return", _context2.t1);

                    case 56:
                    case "end":
                        return _context2.stop();
                }
            }
        }, _callee2, this, [[2, 53], [15, 35, 39, 47], [40,, 42, 46]]);
    }));

    return function getPropertyReview(_x4) {
        return _ref2.apply(this, arguments);
    };
}();

var getlandlord = function () {
    var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(p_id) {
        var csd, params, listOfObject, P_Landlords, data, i, obj, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, v_landlord, p_land, l_params, landlordReviews;

        return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        console.log("getlandlord begin!!!! ");
                        console.log(p_id);
                        csd = new _awsSdk2.default.CloudSearchDomain({
                            endpoint: 'doc-landlord-hbh2pd23kqbxmavfajjklhhume.us-east-1.cloudsearch.amazonaws.com',
                            apiVersion: '2013-01-01'
                        });
                        params = {
                            query: p_id,
                            queryOptions: "{'fields':['l_properties']}"
                        };
                        listOfObject = [];
                        P_Landlords = [];
                        _context3.prev = 6;
                        _context3.next = 9;
                        return csd.search(params).promise();

                    case 9:
                        data = _context3.sent;

                        console.log(data);
                        i = 0;


                        while (i < data.hits.hit.length) {
                            obj = JSON.parse((0, _stringify2.default)(data.hits.hit[i].fields).replace(/[\[\]']+/g, ''));

                            listOfObject.push(obj);
                            i++;
                        }
                        console.log(listOfObject);

                        _iteratorNormalCompletion2 = true;
                        _didIteratorError2 = false;
                        _iteratorError2 = undefined;
                        _context3.prev = 17;
                        _iterator2 = (0, _getIterator3.default)(listOfObject);

                    case 19:
                        if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                            _context3.next = 41;
                            break;
                        }

                        v_landlord = _step2.value;
                        l_params = {
                            TableName: 'Landlord',
                            KeyConditionExpression: "L_ID = :l_id",
                            ExpressionAttributeValues: {
                                ":l_id": v_landlord.l_id
                            }
                        };

                        console.log(v_landlord.l_id);
                        //get landlord data
                        _context3.next = 25;
                        return dynamoDbLib.call("query", l_params);

                    case 25:
                        l_result = _context3.sent;

                        console.log("First Step ", l_result);

                        console.log("second Step get Landlord Review");
                        _context3.next = 30;
                        return getlandlordReviews(v_landlord.l_id);

                    case 30:
                        landlordReviews = _context3.sent;


                        p_land = l_result.Items[0];
                        p_land.Landlord_Reviews = landlordReviews != undefined ? landlordReviews.Landlord_Reviews : [];
                        p_land.L_Response_Rate = landlordReviews != undefined ? landlordReviews.L_Response_Rate : 0;
                        p_land.L_Avg_Rating = landlordReviews != undefined ? landlordReviews.L_Avg_Rating : 0;
                        p_land.L_Approval_Rate = landlordReviews != undefined ? landlordReviews.L_Approval_Rate : 0;
                        p_land.LR_Repair_Requests = landlordReviews != undefined ? landlordReviews.LR_Repair_Requests : 0;

                        P_Landlords.push(p_land);

                    case 38:
                        _iteratorNormalCompletion2 = true;
                        _context3.next = 19;
                        break;

                    case 41:
                        _context3.next = 47;
                        break;

                    case 43:
                        _context3.prev = 43;
                        _context3.t0 = _context3["catch"](17);
                        _didIteratorError2 = true;
                        _iteratorError2 = _context3.t0;

                    case 47:
                        _context3.prev = 47;
                        _context3.prev = 48;

                        if (!_iteratorNormalCompletion2 && _iterator2.return) {
                            _iterator2.return();
                        }

                    case 50:
                        _context3.prev = 50;

                        if (!_didIteratorError2) {
                            _context3.next = 53;
                            break;
                        }

                        throw _iteratorError2;

                    case 53:
                        return _context3.finish(50);

                    case 54:
                        return _context3.finish(47);

                    case 55:
                        p_result.Items[0].P_Landlords = P_Landlords;
                        console.log("getlandlord ended successfully!!!! ");

                        _context3.next = 63;
                        break;

                    case 59:
                        _context3.prev = 59;
                        _context3.t1 = _context3["catch"](6);

                        console.log(_context3.t1, _context3.t1.stack); // an error occurred
                        return _context3.abrupt("return", _context3.t1);

                    case 63:
                    case "end":
                        return _context3.stop();
                }
            }
        }, _callee3, this, [[6, 59], [17, 43, 47, 55], [48,, 50, 54]]);
    }));

    return function getlandlord(_x5) {
        return _ref3.apply(this, arguments);
    };
}();

var getlandlordReviews = function () {
    var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(l_id) {
        var L_Avg_Rating, L_Approval_Rate, LR_Repair_Requests, L_Response_Rate, L_Recommended_Rate, L_ReviewsParams, Review, l_recommended, l_approval, ReviewResponseList, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, item, Tenant, TenantParams, ReviewResponse, v_reponse;

        return _regenerator2.default.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:

                        console.log("getlandlordReviews begin !!!");
                        L_Avg_Rating = 0;
                        L_Approval_Rate = 0;
                        LR_Repair_Requests = 0;
                        L_Response_Rate = 0;
                        L_Recommended_Rate = 0;
                        L_ReviewsParams = {
                            TableName: 'Landlord_Reviews',
                            FilterExpression: "LP_L_ID = :l_ID",
                            ExpressionAttributeValues: {
                                ":l_ID": l_id
                            }
                        };
                        _context4.prev = 7;
                        _context4.next = 10;
                        return dynamoDbLib.call("scan", L_ReviewsParams);

                    case 10:
                        Review = _context4.sent;
                        l_recommended = 0, l_approval = 0;
                        ReviewResponseList = [];

                        //Compute AVG

                        if (!(Review.Count > 0)) {
                            _context4.next = 71;
                            break;
                        }

                        console.log("compute step");

                        _iteratorNormalCompletion3 = true;
                        _didIteratorError3 = false;
                        _iteratorError3 = undefined;
                        _context4.prev = 18;
                        _iterator3 = (0, _getIterator3.default)(Review.Items);

                    case 20:
                        if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
                            _context4.next = 48;
                            break;
                        }

                        item = _step3.value;


                        console.log("compute step2 ", item);
                        //het the value of each reviw
                        l_recommended = item.LR_Recommend;
                        l_approval = item.LR_Approval;

                        //Convert the value of YES OR NO
                        l_recommended = l_recommended == 'yes' ? 1 : 0;
                        l_approval = l_approval == 'yes' ? 1 : 0;
                        console.log("compute step3 ", l_recommended);
                        //YES oR NO
                        L_Approval_Rate = L_Approval_Rate + l_approval;
                        L_Recommended_Rate = L_Recommended_Rate + l_recommended;
                        console.log("compute step4 ", L_Approval_Rate);
                        //Computation
                        L_Response_Rate = L_Response_Rate + item.LR_Responsiveness;
                        L_Avg_Rating = L_Avg_Rating + item.LR_Rating;
                        LR_Repair_Requests = LR_Repair_Requests + item.LR_Repair_Requests;
                        console.log("compute step5 ", L_Avg_Rating);

                        // in order to get the city and state

                        console.log(item.LR_T_ID);

                        if (!(item.LR_T_ID != null)) {
                            _context4.next = 42;
                            break;
                        }

                        TenantParams = {
                            TableName: 'Tenant',
                            KeyConditionExpression: "T_ID = :t_id",
                            ExpressionAttributeValues: {
                                ":t_id": item.LR_T_ID
                            }
                        };
                        _context4.next = 40;
                        return dynamoDbLib.call("query", TenantParams);

                    case 40:
                        Tenant = _context4.sent;

                        console.log("Tenent Data ", Tenant);

                    case 42:
                        //prepare review Response
                        //console.log(item);
                        ReviewResponse = {
                            'LR_Title': item.LR_Title != null ? item.LR_Title : '',
                            'LR_Types': item.LR_Types != null ? item.LR_Types : '',
                            'LR_Created_Date': item.LR_Created_On != null ? item.LR_Created_On : '',
                            'LR_Rating': item.LR_Rating != null ? item.LR_Created_On : '',
                            'LR_Responsiveness': item.LR_Responsiveness,
                            'LR_Repair_Requests': item.LR_Repair_Requests,
                            'LR_Approval': item.LR_Approval,
                            'T_City': Tenant.Count > 0 ? Tenant.Items[0].T_City : ' ',
                            'T_State': Tenant.Count > 0 ? Tenant.Items[0].T_State : ' '
                        };


                        console.log(ReviewResponse);
                        ReviewResponseList = ReviewResponseList.concat(ReviewResponse);

                    case 45:
                        _iteratorNormalCompletion3 = true;
                        _context4.next = 20;
                        break;

                    case 48:
                        _context4.next = 54;
                        break;

                    case 50:
                        _context4.prev = 50;
                        _context4.t0 = _context4["catch"](18);
                        _didIteratorError3 = true;
                        _iteratorError3 = _context4.t0;

                    case 54:
                        _context4.prev = 54;
                        _context4.prev = 55;

                        if (!_iteratorNormalCompletion3 && _iterator3.return) {
                            _iterator3.return();
                        }

                    case 57:
                        _context4.prev = 57;

                        if (!_didIteratorError3) {
                            _context4.next = 60;
                            break;
                        }

                        throw _iteratorError3;

                    case 60:
                        return _context4.finish(57);

                    case 61:
                        return _context4.finish(54);

                    case 62:
                        console.log("done loop");

                        v_reponse = new Object();


                        v_reponse.Landlord_Reviews = ReviewResponseList.length > 0 ? ReviewResponseList : [];
                        console.log(v_reponse.Landlord_Reviews);
                        v_reponse.L_Response_Rate = isNaN(L_Response_Rate / Review.Count) ? 0 : L_Response_Rate / Review.Count;
                        v_reponse.L_Avg_Rating = isNaN(L_Avg_Rating / Review.Count) ? 0 : L_Avg_Rating / Review.Count;
                        v_reponse.L_Approval_Rate = isNaN(l_approval / Review.Count) ? 0 : l_approval / Review.Count;
                        v_reponse.LR_Repair_Requests = isNaN(LR_Repair_Requests / Review.Count) ? 0 : LR_Repair_Requests / Review.Count;
                        // set the avg variable
                        console.log(v_reponse);

                    case 71:
                        console.log("getlandlordReviews ended successfully !!!");
                        return _context4.abrupt("return", v_reponse);

                    case 75:
                        _context4.prev = 75;
                        _context4.t1 = _context4["catch"](7);

                        console.log(_context4.t1);
                        return _context4.abrupt("return", _context4.t1);

                    case 79:
                    case "end":
                        return _context4.stop();
                }
            }
        }, _callee4, this, [[7, 75], [18, 50, 54, 62], [55,, 57, 61]]);
    }));

    return function getlandlordReviews(_x6) {
        return _ref4.apply(this, arguments);
    };
}();

var getcomplaints = function () {
    var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(p_address) {
        var csd, params, listOfObject, data, i, obj, p_complaints, _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, comp;

        return _regenerator2.default.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:

                        console.log("getcomplaintsObj begin!!!! ");
                        console.log(p_address);
                        csd = new _awsSdk2.default.CloudSearchDomain({
                            endpoint: 'search-complaints-fpo6pfj3dowxfbboyfllktyb4q.us-east-1.cloudsearch.amazonaws.com',
                            apiVersion: '2013-01-01'
                        });
                        params = {
                            query: p_address,
                            queryOptions: "{'fields':['c_address_line1']}"
                        };
                        listOfObject = [];
                        _context5.prev = 5;
                        _context5.next = 8;
                        return csd.search(params).promise();

                    case 8:
                        data = _context5.sent;

                        console.log(data);
                        i = 0;


                        while (i < data.hits.hit.length) {
                            obj = JSON.parse((0, _stringify2.default)(data.hits.hit[i].fields).replace(/[\[\]']+/g, ''));

                            listOfObject.push(obj);
                            i++;
                        }
                        console.log(listOfObject);

                        p_complaints = [];
                        _iteratorNormalCompletion4 = true;
                        _didIteratorError4 = false;
                        _iteratorError4 = undefined;
                        _context5.prev = 17;

                        for (_iterator4 = (0, _getIterator3.default)(listOfObject); !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                            comp = _step4.value;

                            console.log(comp.c_id);
                            p_complaints.push(comp.c_id);
                        }

                        _context5.next = 25;
                        break;

                    case 21:
                        _context5.prev = 21;
                        _context5.t0 = _context5["catch"](17);
                        _didIteratorError4 = true;
                        _iteratorError4 = _context5.t0;

                    case 25:
                        _context5.prev = 25;
                        _context5.prev = 26;

                        if (!_iteratorNormalCompletion4 && _iterator4.return) {
                            _iterator4.return();
                        }

                    case 28:
                        _context5.prev = 28;

                        if (!_didIteratorError4) {
                            _context5.next = 31;
                            break;
                        }

                        throw _iteratorError4;

                    case 31:
                        return _context5.finish(28);

                    case 32:
                        return _context5.finish(25);

                    case 33:
                        p_result.Items[0].P_Complaints = p_complaints;

                        console.log("getcomplaintsObj ended successfully!!!! ");
                        _context5.next = 41;
                        break;

                    case 37:
                        _context5.prev = 37;
                        _context5.t1 = _context5["catch"](5);

                        console.log(_context5.t1, _context5.t1.stack); // an error occurred
                        return _context5.abrupt("return", _context5.t1);

                    case 41:
                    case "end":
                        return _context5.stop();
                }
            }
        }, _callee5, this, [[5, 37], [17, 21, 25, 33], [26,, 28, 32]]);
    }));

    return function getcomplaints(_x7) {
        return _ref5.apply(this, arguments);
    };
}();

var getRental = function () {
    var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(p_id) {
        var P_Rental_Param, Rental, rentals, _iteratorNormalCompletion5, _didIteratorError5, _iteratorError5, _iterator5, _step5, r;

        return _regenerator2.default.wrap(function _callee6$(_context6) {
            while (1) {
                switch (_context6.prev = _context6.next) {
                    case 0:
                        console.log("getRental begin !!!!");
                        P_Rental_Param = {
                            TableName: 'rv_rental',
                            FilterExpression: "R_P_ID = :P_ID",
                            ExpressionAttributeValues: {
                                ":P_ID": p_id
                            }
                        };
                        _context6.prev = 2;
                        _context6.next = 5;
                        return dynamoDbLib.call("scan", P_Rental_Param);

                    case 5:
                        Rental = _context6.sent;
                        rentals = [];

                        if (!(Rental.Count > 0)) {
                            _context6.next = 27;
                            break;
                        }

                        _iteratorNormalCompletion5 = true;
                        _didIteratorError5 = false;
                        _iteratorError5 = undefined;
                        _context6.prev = 11;


                        for (_iterator5 = (0, _getIterator3.default)(Rental.Items); !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                            r = _step5.value;

                            rentals.push({ "R_ID": r.rental_id });
                        }
                        _context6.next = 19;
                        break;

                    case 15:
                        _context6.prev = 15;
                        _context6.t0 = _context6["catch"](11);
                        _didIteratorError5 = true;
                        _iteratorError5 = _context6.t0;

                    case 19:
                        _context6.prev = 19;
                        _context6.prev = 20;

                        if (!_iteratorNormalCompletion5 && _iterator5.return) {
                            _iterator5.return();
                        }

                    case 22:
                        _context6.prev = 22;

                        if (!_didIteratorError5) {
                            _context6.next = 25;
                            break;
                        }

                        throw _iteratorError5;

                    case 25:
                        return _context6.finish(22);

                    case 26:
                        return _context6.finish(19);

                    case 27:
                        p_result.Items[0].P_Rentals = Rental.Count > 0 ? rentals : [];
                        console.log("getRental ended successfully !!!!");
                        _context6.next = 35;
                        break;

                    case 31:
                        _context6.prev = 31;
                        _context6.t1 = _context6["catch"](2);

                        console.log(_context6.t1);
                        return _context6.abrupt("return", _context6.t1);

                    case 35:
                    case "end":
                        return _context6.stop();
                }
            }
        }, _callee6, this, [[2, 31], [11, 15, 19, 27], [20,, 22, 26]]);
    }));

    return function getRental(_x8) {
        return _ref6.apply(this, arguments);
    };
}();

var _dynamodbLib = __webpack_require__(7);

var dynamoDbLib = _interopRequireWildcard(_dynamodbLib);

var _responseLib = __webpack_require__(8);

var _awsSdk = __webpack_require__(1);

var _awsSdk2 = _interopRequireDefault(_awsSdk);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_awsSdk2.default.config.update({ region: "us-east-1" });
var p_result;var l_result;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/get-iterator");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/math/trunc");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/regenerator");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/asyncToGenerator");

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.call = call;

var _awsSdk = __webpack_require__(1);

var _awsSdk2 = _interopRequireDefault(_awsSdk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_awsSdk2.default.config.update({ region: "us-east-1" });

function call(action, params) {
  var dynamoDb = new _awsSdk2.default.DynamoDB.DocumentClient();

  return dynamoDb[action](params).promise();
}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = __webpack_require__(0);

var _stringify2 = _interopRequireDefault(_stringify);

exports.success = success;
exports.failure = failure;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function success(body) {
  return buildResponse(200, body);
}

function failure(body) {
  return buildResponse(500, body);
}

function buildResponse(statusCode, body) {
  return {
    statusCode: statusCode,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true
    },
    body: (0, _stringify2.default)(body)
  };
}

/***/ })
/******/ ])));