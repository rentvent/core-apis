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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getlandlordInfo = exports.getlandlordByaddress = exports.getlandlordByName = undefined;

var _regenerator = __webpack_require__(1);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _getIterator2 = __webpack_require__(2);

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _asyncToGenerator2 = __webpack_require__(3);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var getlandlordByName = exports.getlandlordByName = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(event, context, callback) {
    var params, result, resultList, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, item, object;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            params = {
              TableName: 'rv_landlord',
              FilterExpression: "contains(L_Full_Name,:Fname)",
              ExpressionAttributeValues: {
                ":Fname": event.pathParameters.Fname.toUpperCase()
              },
              Limit: 1000
            };
            _context.prev = 1;
            _context.next = 4;
            return dynamoDbLib.call("scan", params);

          case 4:
            result = _context.sent;
            resultList = [];
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 9;

            for (_iterator = (0, _getIterator3.default)(result.Items); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              item = _step.value;
              object = {
                L_ID: item.L_ID,
                L_Full_Name: item.L_Full_Name
              };

              resultList.push(object);
            }

            _context.next = 17;
            break;

          case 13:
            _context.prev = 13;
            _context.t0 = _context["catch"](9);
            _didIteratorError = true;
            _iteratorError = _context.t0;

          case 17:
            _context.prev = 17;
            _context.prev = 18;

            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }

          case 20:
            _context.prev = 20;

            if (!_didIteratorError) {
              _context.next = 23;
              break;
            }

            throw _iteratorError;

          case 23:
            return _context.finish(20);

          case 24:
            return _context.finish(17);

          case 25:
            callback(null, (0, _responseLib.success)(resultList));
            _context.next = 31;
            break;

          case 28:
            _context.prev = 28;
            _context.t1 = _context["catch"](1);

            callback(null, (0, _responseLib.failure)(_context.t1));

          case 31:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[1, 28], [9, 13, 17, 25], [18,, 20, 24]]);
  }));

  return function getlandlordByName(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var getlandlordByaddress = exports.getlandlordByaddress = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(event, context, callback) {
    var params, result, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, item, _params;

    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            params = {
              TableName: 'rv_property',
              FilterExpression: "contains(P_Address_Line1,:address)",
              ExpressionAttributeValues: {
                ":address": event.pathParameters.address
              }
            };
            _context2.prev = 1;
            _context2.next = 4;
            return dynamoDbLib.call("scan", params);

          case 4:
            result = _context2.sent;
            _iteratorNormalCompletion2 = true;
            _didIteratorError2 = false;
            _iteratorError2 = undefined;
            _context2.prev = 8;


            for (_iterator2 = (0, _getIterator3.default)(result.Items); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              item = _step2.value;
              _params = {
                TableName: 'rv_landlord',
                FilterExpression: "",
                ExpressionAttributeValues: {
                  ":address": event.pathParameters.address
                }
              };
            }

            _context2.next = 16;
            break;

          case 12:
            _context2.prev = 12;
            _context2.t0 = _context2["catch"](8);
            _didIteratorError2 = true;
            _iteratorError2 = _context2.t0;

          case 16:
            _context2.prev = 16;
            _context2.prev = 17;

            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }

          case 19:
            _context2.prev = 19;

            if (!_didIteratorError2) {
              _context2.next = 22;
              break;
            }

            throw _iteratorError2;

          case 22:
            return _context2.finish(19);

          case 23:
            return _context2.finish(16);

          case 24:
            callback(null, (0, _responseLib.success)(result));
            _context2.next = 30;
            break;

          case 27:
            _context2.prev = 27;
            _context2.t1 = _context2["catch"](1);

            callback(null, (0, _responseLib.failure)(_context2.t1));

          case 30:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this, [[1, 27], [8, 12, 16, 24], [17,, 19, 23]]);
  }));

  return function getlandlordByaddress(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

var getlandlordInfo = exports.getlandlordInfo = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(event, context, callback) {
    var L_Avg_Rating, L_Approval_Rate, L_Repair_Requests, L_Response_Rate, params, L_ReviewsParams, result, Review, l_responsive, l_approval, ReviewResponseList, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, item, TenantParams, Tenant, ReviewResponse, L_Properties, _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, prop, L_PropertiesParams, properties, PropertiesReviewParams, propertiesReview, propResponse;

    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            L_Avg_Rating = 0;
            L_Approval_Rate = 0;
            L_Repair_Requests = 0;
            L_Response_Rate = 0;
            // console.log(event.pathParameters.l_id) ;

            params = {
              TableName: 'rv_landlord',
              KeyConditionExpression: "L_ID = :l_id",
              ExpressionAttributeValues: {
                ":l_id": event.pathParameters.l_id
              }
            };
            L_ReviewsParams = {
              TableName: 'Landlord_Reviews',
              FilterExpression: "LP_L_ID = :l_ID",
              ExpressionAttributeValues: {
                ":l_ID": event.pathParameters.l_id
              }
            };
            _context3.prev = 6;
            _context3.next = 9;
            return dynamoDbLib.call("query", params);

          case 9:
            result = _context3.sent;
            _context3.next = 12;
            return dynamoDbLib.call("scan", L_ReviewsParams);

          case 12:
            Review = _context3.sent;

            console.log("second Step ", Review);
            result.Items[0].Landlord_Reviews = Review.Items;

            ReviewResponseList = [];
            //Compute AVG 

            if (!(Review.Count >= 1)) {
              _context3.next = 57;
              break;
            }

            _iteratorNormalCompletion3 = true;
            _didIteratorError3 = false;
            _iteratorError3 = undefined;
            _context3.prev = 20;
            _iterator3 = (0, _getIterator3.default)(Review.Items);

          case 22:
            if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
              _context3.next = 43;
              break;
            }

            item = _step3.value;


            l_responsive = item.LR_Responsiveness;
            l_approval = item.LR_Responsiveness;

            l_responsive = l_responsive == 'yes' ? 1 : 0;
            l_approval = l_approval == 'yes' ? 1 : 0;

            L_Response_Rate = L_Response_Rate + item.LR_Responsiveness;
            L_Approval_Rate = L_Approval_Rate + item.LR_Approval;

            L_Avg_Rating = L_Avg_Rating + item.LR_Rating;
            L_Repair_Requests = L_Repair_Requests + item.LR_Repair_Requests;

            console.log(item.T_ID);

            if (!(item.T_ID != "undefined")) {
              _context3.next = 40;
              break;
            }

            TenantParams = {
              TableName: 'Tenant',
              FilterExpression: "T_ID = :t_id",
              ExpressionAttributeValues: {
                ":t_id": item.T_ID
              }
            };
            _context3.next = 37;
            return dynamoDbLib.call("scan", TenantParams);

          case 37:
            Tenant = _context3.sent;

            //console.log("Tenent Data ", Tenant);
            // console.log(Tenant.Items[0].T_City);

            ReviewResponse = {
              'LR_Title': item.LR_Title,
              'LR_Types': item.LR_Types,
              'LR_Created_Date': item.LR_Created_Date,
              'LR_Rating': item.LR_Rating,
              'LR_Responsiveness': item.LR_Responsiveness,
              'LR_Repair_Requests': item.LR_Repair_Requests,
              'LR_Approval': item.LR_Approval,
              'T_City': Tenant.Items[0].T_City,
              'T_State': Tenant.Items[0].T_State
            };

            ReviewResponseList = ReviewResponseList.concat(ReviewResponse);

          case 40:
            _iteratorNormalCompletion3 = true;
            _context3.next = 22;
            break;

          case 43:
            _context3.next = 49;
            break;

          case 45:
            _context3.prev = 45;
            _context3.t0 = _context3["catch"](20);
            _didIteratorError3 = true;
            _iteratorError3 = _context3.t0;

          case 49:
            _context3.prev = 49;
            _context3.prev = 50;

            if (!_iteratorNormalCompletion3 && _iterator3.return) {
              _iterator3.return();
            }

          case 52:
            _context3.prev = 52;

            if (!_didIteratorError3) {
              _context3.next = 55;
              break;
            }

            throw _iteratorError3;

          case 55:
            return _context3.finish(52);

          case 56:
            return _context3.finish(49);

          case 57:

            result.Items[0].Landlord_Reviews = ReviewResponseList;
            result.Items[0].L_Response_Rate = l_responsive / Review.Count;
            result.Items[0].L_Avg_Rating = L_Avg_Rating / Review.Count;
            result.Items[0].L_Approval_Rate = l_approval / Review.Count;
            result.Items[0].L_Repair_Requests = L_Repair_Requests / Review.Count;

            L_Properties = [];
            //  console.log(result.Items[0].L_Properties);

            if (!(result.Items[0].L_Properties.length > 0)) {
              _context3.next = 102;
              break;
            }

            _iteratorNormalCompletion4 = true;
            _didIteratorError4 = false;
            _iteratorError4 = undefined;
            _context3.prev = 67;
            _iterator4 = (0, _getIterator3.default)(result.Items[0].L_Properties);

          case 69:
            if (_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done) {
              _context3.next = 88;
              break;
            }

            prop = _step4.value;

            console.log(prop.p_id);
            L_PropertiesParams = {
              TableName: 'rv_property',
              FilterExpression: "P_ID = :p_id",
              ExpressionAttributeValues: {
                ":p_id": prop.p_id.toString()
              }
            };
            _context3.next = 75;
            return dynamoDbLib.call("scan", L_PropertiesParams);

          case 75:
            properties = _context3.sent;


            console.log(properties);

            if (!(properties.Count > 0)) {
              _context3.next = 85;
              break;
            }

            PropertiesReviewParams = {
              TableName: 'Property_Reviews',
              FilterExpression: "P_ID = :p_id",
              ExpressionAttributeValues: {
                ":p_id": prop.p_id.toString()
              }
            };
            _context3.next = 81;
            return dynamoDbLib.call("scan", PropertiesReviewParams);

          case 81:
            propertiesReview = _context3.sent;

            console.log(propertiesReview);
            propResponse = {
              'P_ID': properties.Items[0].P_ID,
              'P_Photos': properties.Items[0].P_Photos,
              'P_Address_Line1': properties.Items[0].P_Address_Line2,
              'P_Address_Line2': properties.Items[0].P_Address_Line2,
              'P_City': properties.Items[0].P_City,
              'P_Zipcode': properties.Items[0].P_Zipcode,
              'P_State': properties.Items[0].P_State,
              'PR_Rating': properties.Items[0].P_Avg_Rating,
              'PR_Count': propertiesReview.Count
            };

            L_Properties = L_Properties.concat(propResponse);

          case 85:
            _iteratorNormalCompletion4 = true;
            _context3.next = 69;
            break;

          case 88:
            _context3.next = 94;
            break;

          case 90:
            _context3.prev = 90;
            _context3.t1 = _context3["catch"](67);
            _didIteratorError4 = true;
            _iteratorError4 = _context3.t1;

          case 94:
            _context3.prev = 94;
            _context3.prev = 95;

            if (!_iteratorNormalCompletion4 && _iterator4.return) {
              _iterator4.return();
            }

          case 97:
            _context3.prev = 97;

            if (!_didIteratorError4) {
              _context3.next = 100;
              break;
            }

            throw _iteratorError4;

          case 100:
            return _context3.finish(97);

          case 101:
            return _context3.finish(94);

          case 102:
            console.log(result.Items);
            result.Items[0].L_Properties = L_Properties;

            callback(null, (0, _responseLib.success)(result));
            _context3.next = 110;
            break;

          case 107:
            _context3.prev = 107;
            _context3.t2 = _context3["catch"](6);

            callback(null, (0, _responseLib.failure)(_context3.t2));

          case 110:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this, [[6, 107], [20, 45, 49, 57], [50,, 52, 56], [67, 90, 94, 102], [95,, 97, 101]]);
  }));

  return function getlandlordInfo(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();

var _dynamodbLib = __webpack_require__(4);

var dynamoDbLib = _interopRequireWildcard(_dynamodbLib);

var _responseLib = __webpack_require__(6);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/regenerator");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/get-iterator");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/asyncToGenerator");

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.call = call;

var _awsSdk = __webpack_require__(5);

var _awsSdk2 = _interopRequireDefault(_awsSdk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_awsSdk2.default.config.update({ region: "us-east-1" });

function call(action, params) {
  var dynamoDb = new _awsSdk2.default.DynamoDB.DocumentClient();

  return dynamoDb[action](params).promise();
}

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("aws-sdk");

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = __webpack_require__(7);

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

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/json/stringify");

/***/ })
/******/ ])));