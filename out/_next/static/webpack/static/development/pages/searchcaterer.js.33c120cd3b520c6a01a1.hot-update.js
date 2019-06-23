webpackHotUpdate("static\\development\\pages\\searchcaterer.js",{

/***/ "./pages/searchcaterer/index.js":
/*!**************************************!*\
  !*** ./pages/searchcaterer/index.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/defineProperty */ "./node_modules/@babel/runtime-corejs2/helpers/esm/defineProperty.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/json/stringify */ "./node_modules/@babel/runtime-corejs2/core-js/json/stringify.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs2/regenerator */ "./node_modules/@babel/runtime-corejs2/regenerator/index.js");
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_corejs2_core_js_array_is_array__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/array/is-array */ "./node_modules/@babel/runtime-corejs2/core-js/array/is-array.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_array_is_array__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_array_is_array__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/asyncToGenerator */ "./node_modules/@babel/runtime-corejs2/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs2/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/getPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/createClass */ "./node_modules/@babel/runtime-corejs2/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/inherits */ "./node_modules/@babel/runtime-corejs2/helpers/esm/inherits.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! reactstrap */ "./node_modules/reactstrap/es/index.js");
/* harmony import */ var _components_NavBar__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../components/NavBar */ "./components/NavBar.js");
/* harmony import */ var _components_Footer__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../components/Footer */ "./components/Footer.js");
/* harmony import */ var _components_Layout__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../components/Layout */ "./components/Layout.js");
/* harmony import */ var _components_AutoCompleteAddress__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../components/AutoCompleteAddress */ "./components/AutoCompleteAddress.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var react_star_rating_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! react-star-rating-component */ "./node_modules/react-star-rating-component/index.js");
/* harmony import */ var react_star_rating_component__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(react_star_rating_component__WEBPACK_IMPORTED_MODULE_18__);
/* harmony import */ var react_date_range__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! react-date-range */ "./node_modules/react-date-range/dist/index.js");
/* harmony import */ var react_date_range__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(react_date_range__WEBPACK_IMPORTED_MODULE_19__);
/* harmony import */ var react_content_loader__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! react-content-loader */ "./node_modules/react-content-loader/dist/react-content-loader.es.js");
/* harmony import */ var react_dotdotdot__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! react-dotdotdot */ "./node_modules/react-dotdotdot/src/index.js");
/* harmony import */ var react_dotdotdot__WEBPACK_IMPORTED_MODULE_21___default = /*#__PURE__*/__webpack_require__.n(react_dotdotdot__WEBPACK_IMPORTED_MODULE_21__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_22___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_22__);
/* harmony import */ var _apis__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ../../apis */ "./apis/index.js");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! next/router */ "./node_modules/next/dist/client/router.js");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_24___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_24__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ../../utils */ "./utils/index.js");
/* harmony import */ var next_seo__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! next-seo */ "./node_modules/next-seo/dist/index.js");
/* harmony import */ var next_seo__WEBPACK_IMPORTED_MODULE_26___default = /*#__PURE__*/__webpack_require__.n(next_seo__WEBPACK_IMPORTED_MODULE_26__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ../../config */ "./config/index.js");










var _jsxFileName = "D:\\FoodieBee\\FoodieBeeWeb\\pages\\searchcaterer\\index.js";
















 //import fetch from 'isomorphic-unfetch'

 //import 'react-date-range/dist/styles.css'; // main style file
//import 'react-date-range/dist/theme/default.css'; // theme css file

var SearchCaterer =
/*#__PURE__*/
function (_Component) {
  Object(_babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_9__["default"])(SearchCaterer, _Component);

  Object(_babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_8__["default"])(SearchCaterer, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      this.setState({
        caterer: this.props.data,
        loading: false,
        empty: this.props.data.length > 0 ? false : true,
        location: this.props.location,
        selectedCuisine: this.props.selectedCuisine,
        selectedPrice: this.props.selectedPrice,
        occasion: this.props.occasion,
        locationquerystring: this.props.locationquerystring,
        longitudequerystring: this.props.longitudequerystring,
        latitudequerystring: this.props.latitudequerystring,
        cuisinequerystring: this.props.cuisinequerystring,
        occasionquerystring: this.props.occasionquerystring,
        price_ltequerystring: this.props.price_ltequerystring,
        price_gtquerystring: this.props.price_gtquerystring,
        datequerystring: this.props.datequerystring,
        timequerystring: this.props.timequerystring,
        catererName_querystring: this.props.catererName_querystring,
        selectedTime: this.props.selectedTime !== "" ? this.reformatInput(this.props.selectedTime) : "",
        selectedDate: this.props.selectedDate,
        searchName: this.props.searchName
      });
    }
  }], [{
    key: "getInitialProps",
    value: function () {
      var _getInitialProps = Object(_babel_runtime_corejs2_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_4__["default"])(
      /*#__PURE__*/
      _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.mark(function _callee(_ref) {
        var _ref$query, occasion, location, cuisine, price_lte, price_gt, date, time, longitude, latitude, catererName, url, locationquerystring, longitudequerystring, latitudequerystring, cuisinequerystring, occasionquerystring, price_ltequerystring, price_gtquerystring, datequerystring, timequerystring, catererName_querystring, selectedPrice, selectedDate, selectedTime, searchName, priceAry, occasionAry, priceindex, i, fixedstr, x, res, data;

        return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _ref$query = _ref.query, occasion = _ref$query.occasion, location = _ref$query.location, cuisine = _ref$query.cuisine, price_lte = _ref$query.price_lte, price_gt = _ref$query.price_gt, date = _ref$query.date, time = _ref$query.time, longitude = _ref$query.longitude, latitude = _ref$query.latitude, catererName = _ref$query.catererName;
                url = _apis__WEBPACK_IMPORTED_MODULE_23__["default"].GETcaterer;
                locationquerystring = "";
                longitudequerystring = "";
                latitudequerystring = "";
                cuisinequerystring = "";
                occasionquerystring = "";
                price_ltequerystring = "";
                price_gtquerystring = "";
                datequerystring = "";
                timequerystring = "";
                catererName_querystring = "";
                selectedPrice = "All";
                selectedDate = "";
                selectedTime = "";
                searchName = "";
                priceAry = ["All", "50 (or less)", "100 (or less)", "200 (or less)", "300 (or less)", "500 (or less)", "More than 500"];
                occasionAry = [{
                  name: "Breakfast",
                  value: false
                }, {
                  name: "Brunch",
                  value: false
                }, {
                  name: "Buffet",
                  value: false
                }, {
                  name: "Christmas Party",
                  value: false
                }, {
                  name: "Dinner",
                  value: false
                }, {
                  name: "Event",
                  value: false
                }, {
                  name: "Finger Food",
                  value: false
                }, {
                  name: "Lunch",
                  value: false
                }, {
                  name: "Meeting",
                  value: false
                }, {
                  name: "Office Daily",
                  value: false
                }, {
                  name: "Wedding",
                  value: false
                }, {
                  name: "Snacks",
                  value: false
                }];

                if (typeof location !== 'undefined') {
                  locationquerystring = "?location=" + location;
                  url = url + locationquerystring;
                }

                if (typeof longitude !== 'undefined') {
                  longitudequerystring = "&longitude=" + longitude;
                  url = url + longitudequerystring;
                }

                if (typeof latitude !== 'undefined') {
                  latitudequerystring = "&latitude=" + latitude;
                  url = url + latitudequerystring;
                }

                if (typeof cuisine !== 'undefined') {
                  cuisinequerystring = "&cuisine=" + cuisine;
                  url = url + cuisinequerystring;
                }

                if (typeof price_lte !== 'undefined') {
                  price_ltequerystring = "&price_lte=" + price_lte;
                  url = url + price_ltequerystring;
                  priceindex = priceAry.findIndex(function (x) {
                    return x.includes(price_lte);
                  });
                  selectedPrice = priceAry[priceindex];
                }

                if (typeof price_gt !== 'undefined') {
                  price_gtquerystring = "&price_gt=" + price_gt;
                  url = url + price_gtquerystring;
                  priceindex = priceAry.findIndex(function (x) {
                    return x.includes(price_lte);
                  });
                  selectedPrice = priceAry[priceindex];
                }

                if (typeof date !== 'undefined') {
                  datequerystring = "&date=" + date;
                  url = url + datequerystring;
                  selectedDate = date;
                }

                if (typeof time !== 'undefined') {
                  timequerystring = "&time=" + time;
                  url = url + timequerystring;
                  selectedTime = time;
                }

                if (typeof catererName !== 'undefined') {
                  catererName_querystring = "&catererName=" + catererName;
                  url = url + catererName_querystring;
                  searchName = catererName;
                }

                if (typeof occasion !== 'undefined') {
                  if (_babel_runtime_corejs2_core_js_array_is_array__WEBPACK_IMPORTED_MODULE_3___default()(occasion)) {
                    for (i = 0; i < occasion.length; i++) {
                      fixedstr = "&occasion=";
                      occasionquerystring = occasionquerystring + fixedstr + occasion[i];

                      for (x = 0; x < occasionAry.length; x++) {
                        if (occasionAry[x].name === occasion[i]) {
                          occasionAry[x].value = true;
                        }
                      }
                    }

                    url = url + occasionquerystring;
                  } else {
                    for (i = 0; i < occasionAry.length; i++) {
                      if (occasionAry[i].name === occasion) {
                        occasionAry[i].value = true;
                      }
                    }

                    occasionquerystring = "&occasion=" + occasion;
                    url = url + occasionquerystring;
                  }
                } // console.log(url)


                _context.next = 30;
                return axios__WEBPACK_IMPORTED_MODULE_22___default.a.get(url);

              case 30:
                res = _context.sent;
                _context.next = 33;
                return res.data;

              case 33:
                data = _context.sent;
                console.log("Show data fetched. Count: ".concat(data.length));
                return _context.abrupt("return", {
                  locationquerystring: locationquerystring,
                  longitudequerystring: longitudequerystring,
                  latitudequerystring: latitudequerystring,
                  cuisinequerystring: cuisinequerystring,
                  occasionquerystring: occasionquerystring,
                  price_ltequerystring: price_ltequerystring,
                  price_gtquerystring: price_gtquerystring,
                  datequerystring: datequerystring,
                  timequerystring: timequerystring,
                  catererName_querystring: catererName_querystring,
                  data: data,
                  location: location,
                  selectedCuisine: typeof cuisine !== 'undefined' ? cuisine : "All Cuisines",
                  selectedPrice: selectedPrice,
                  occasion: occasionAry,
                  selectedTime: selectedTime,
                  selectedDate: selectedDate,
                  searchName: searchName
                });

              case 36:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function getInitialProps(_x) {
        return _getInitialProps.apply(this, arguments);
      }

      return getInitialProps;
    }()
  }]);

  function SearchCaterer(props) {
    var _this;

    Object(_babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_5__["default"])(this, SearchCaterer);

    _this = Object(_babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_6__["default"])(this, Object(_babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7__["default"])(SearchCaterer).call(this, props));

    _this.reformatInput = function (time) {
      if (time.length > 3) {
        time = time.slice(0, 2) + ":" + time.slice(2, 4);
      } else {
        time = "0" + time.slice(0, 1) + ":" + time.slice(1, 3);
      }

      return time;
    };

    _this.getDataFromDb = function (url) {
      axios__WEBPACK_IMPORTED_MODULE_22___default.a.get(url).then(function (response) {
        var data = response.data; // console.log(data)

        _this.setState({
          caterer: data,
          loading: false,
          empty: data.length > 0 ? false : true
        });
      }).catch(function (err) {
        // console.log(err)
        _this.setState({
          loading: false,
          empty: true
        });
      });
    };

    _this.findOccasionIndex = function () {
      var selectedOccasion = _this.state.selectedOccasion;

      var occasion = _this.state.occasion.slice();

      if (_babel_runtime_corejs2_core_js_array_is_array__WEBPACK_IMPORTED_MODULE_3___default()(selectedOccasion)) {
        for (var x = 0; x < selectedOccasion.length; x++) {
          for (var i = 0; i < occasion.length; i++) {
            if (occasion[i].name === selectedOccasion[x]) {
              occasion[i].value = true;
            }
          }
        }
      } else {
        for (var i = 0; i < occasion.length; i++) {
          if (occasion[i].name === selectedOccasion) {
            occasion[i].value = true;
          }
        }
      }

      _this.setState({
        occasion: occasion
      });
    };

    _this.toggleDropDown = function () {
      _this.setState({
        dropDownDate: !_this.state.dropDownDate,
        dateEmptyPopoverOpen: false,
        mobile_dateEmptyPopoverOpen: false
      });
    };

    _this.toggleDropDownAddress = function () {
      _this.setState({
        dropDownAddress: !_this.state.dropDownAddress
      });
    };

    _this.searchBarToggle = function () {
      _this.setState({
        isSearchBarOpen: !_this.state.isSearchBarOpen
      });
    };

    _this.saveAddress = function () {
      var address = _this.state.address;

      if (address !== null && address != "") {
        var city = address.address_components[1].long_name;
        var formatted_address = address.formatted_address;
        var url = _this.state.baseurl;
        var locationquerystring = "?location=" + formatted_address;
        var longitudequerystring = "&longitude=" + address.geometry.location.lng();
        var latitudequerystring = "&latitude=" + address.geometry.location.lat();
        var cuisinequerystring = _this.state.cuisinequerystring;
        var occasionquerystring = _this.state.occasionquerystring;
        var price_ltequerystring = _this.state.price_ltequerystring;
        var price_gtquerystring = _this.state.price_gtquerystring;
        var datequerystring = _this.state.datequerystring;
        var timequerystring = _this.state.timequerystring;
        var catererName_querystring = _this.state.catererName_querystring;
        url = url + locationquerystring + longitudequerystring + latitudequerystring + cuisinequerystring + occasionquerystring + price_ltequerystring + price_gtquerystring + datequerystring + timequerystring + catererName_querystring;
        var fullapiurl = _apis__WEBPACK_IMPORTED_MODULE_23__["default"].GETcaterer + locationquerystring + longitudequerystring + latitudequerystring + cuisinequerystring + occasionquerystring + price_gtquerystring + price_ltequerystring + datequerystring + timequerystring + catererName_querystring;

        _this.setState({
          dropDownAddress: !_this.state.dropDownAddress,
          loading: true,
          location: formatted_address,
          locationquerystring: locationquerystring,
          longitudequerystring: longitudequerystring,
          latitudequerystring: latitudequerystring,
          cuisinequerystring: cuisinequerystring,
          occasionquerystring: occasionquerystring,
          price_ltequerystring: price_ltequerystring,
          price_gtquerystring: price_gtquerystring,
          datequerystring: datequerystring,
          timequerystring: timequerystring,
          catererName_querystring: catererName_querystring,
          fullapiurl: fullapiurl
        }, function () {
          var selectedAddress = {
            formatted_address: formatted_address,
            longitude: address.geometry.location.lng(),
            latitude: address.geometry.location.lat()
          };
          sessionStorage.setItem('selectedAddress', _babel_runtime_corejs2_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_1___default()(selectedAddress));
          next_router__WEBPACK_IMPORTED_MODULE_24___default.a.replace(url, url, {
            shallow: true
          });

          _this.getDataFromDb(fullapiurl);
        });
      }
    };

    _this.navItemClicked = function (selectedCuisine) {
      _this.setState({
        selectedCuisine: selectedCuisine,
        cuisineDropDownOpen: false
      }, function () {
        _this.handleUrlChange('cuisine');
      });
    };

    _this.catererClicked = function (_id) {
      if (_this.state.selectedDate !== "" && _this.state.selectedTime !== "") {
        next_router__WEBPACK_IMPORTED_MODULE_24___default.a.push("/catererdetail/".concat(_id), "/catererdetail/".concat(_id));
      } else {
        if (_this.state.selectedDate === "") {
          if (_this.state.isMobile) {
            _this.setState({
              mobile_dateEmptyPopoverOpen: true,
              isSearchBarOpen: true
            });
          } else {
            _this.setState({
              dateEmptyPopoverOpen: true
            });
          }
        } else if (_this.state.selectedTime === "") {
          if (_this.state.isMobile) {
            _this.setState({
              mobile_timeEmptyPopoverOpen: true,
              isSearchBarOpen: true
            });
          } else {
            _this.setState({
              timeEmptyPopoverOpen: true
            });
          }
        }

        _this.refObj.current.scrollIntoView({
          behavior: 'smooth'
        });
      }
    };

    _this.handlePriceChange = function (event) {
      _this.setState({
        selectedPrice: event.target.value
      }, function () {
        _this.handleUrlChange('pricerange');
      });
    };

    _this.handleCuisineChange = function (event) {
      _this.setState({
        selectedCuisine: event.target.value
      }, function () {
        _this.handleUrlChange('cuisine');
      });
    };

    _this.handleCheckBoxChange = function (index, statename, event) {
      var newArray = _this.state[statename];

      if (newArray[index].value) {
        newArray[index].value = false;
      } else {
        newArray[index].value = true;
      }

      _this.setState(Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])({}, statename, newArray), function () {
        if (statename === "occasion") {
          _this.handleUrlChange('occasion');
        }
      });
    };

    _this.searchNameClicked = function () {
      var url = _this.state.baseurl;
      var searchName = _this.state.searchName;
      var locationquerystring = _this.state.locationquerystring;
      var longitudequerystring = _this.state.longitudequerystring;
      var latitudequerystring = _this.state.latitudequerystring;
      var cuisinequerystring = _this.state.cuisinequerystring;
      var occasionquerystring = _this.state.occasionquerystring;
      var price_ltequerystring = _this.state.price_ltequerystring;
      var price_gtquerystring = _this.state.price_gtquerystring;
      var datequerystring = _this.state.datequerystring;
      var timequerystring = _this.state.timequerystring;
      var catererName_querystring = _this.state.catererName_querystring;

      if (searchName === "") {
        catererName_querystring = "";
      } else {
        catererName_querystring = "&catererName=" + searchName;
      }

      url = url + locationquerystring + longitudequerystring + latitudequerystring + cuisinequerystring + occasionquerystring + price_gtquerystring + price_ltequerystring + datequerystring + timequerystring + catererName_querystring;
      var fullapiurl = _apis__WEBPACK_IMPORTED_MODULE_23__["default"].GETcaterer + locationquerystring + longitudequerystring + latitudequerystring + cuisinequerystring + occasionquerystring + price_gtquerystring + price_ltequerystring + datequerystring + timequerystring + catererName_querystring;

      _this.setState({
        loading: true,
        locationquerystring: locationquerystring,
        longitudequerystring: longitudequerystring,
        latitudequerystring: latitudequerystring,
        cuisinequerystring: cuisinequerystring,
        occasionquerystring: occasionquerystring,
        price_ltequerystring: price_ltequerystring,
        price_gtquerystring: price_gtquerystring,
        datequerystring: datequerystring,
        timequerystring: timequerystring,
        catererName_querystring: catererName_querystring,
        fullapiurl: fullapiurl
      }, function () {
        _this.getDataFromDb(fullapiurl);

        next_router__WEBPACK_IMPORTED_MODULE_24___default.a.replace(url, url, {
          shallow: true
        });
      });
    };

    _this.handleTimeSearch = function (selectedTime) {
      var url = _this.state.baseurl;
      var searchName = _this.state.searchName;
      var locationquerystring = _this.state.locationquerystring;
      var longitudequerystring = _this.state.longitudequerystring;
      var latitudequerystring = _this.state.latitudequerystring;
      var cuisinequerystring = _this.state.cuisinequerystring;
      var occasionquerystring = _this.state.occasionquerystring;
      var price_ltequerystring = _this.state.price_ltequerystring;
      var price_gtquerystring = _this.state.price_gtquerystring;
      var datequerystring = _this.state.datequerystring;
      var timequerystring = _this.state.timequerystring;
      var catererName_querystring = _this.state.catererName_querystring;
      timequerystring = "&time=" + selectedTime;

      if (searchName === "") {
        catererName_querystring = "";
      }

      url = url + locationquerystring + longitudequerystring + latitudequerystring + cuisinequerystring + occasionquerystring + price_gtquerystring + price_ltequerystring + datequerystring + timequerystring + catererName_querystring;
      var fullapiurl = _apis__WEBPACK_IMPORTED_MODULE_23__["default"].GETcaterer + locationquerystring + longitudequerystring + latitudequerystring + cuisinequerystring + occasionquerystring + price_gtquerystring + price_ltequerystring + datequerystring + timequerystring + catererName_querystring;

      _this.setState({
        loading: true,
        locationquerystring: locationquerystring,
        longitudequerystring: longitudequerystring,
        latitudequerystring: latitudequerystring,
        cuisinequerystring: cuisinequerystring,
        occasionquerystring: occasionquerystring,
        price_ltequerystring: price_ltequerystring,
        price_gtquerystring: price_gtquerystring,
        datequerystring: datequerystring,
        timequerystring: timequerystring,
        catererName_querystring: catererName_querystring,
        fullapiurl: fullapiurl
      }, function () {
        _this.getDataFromDb(fullapiurl);

        next_router__WEBPACK_IMPORTED_MODULE_24___default.a.replace(url, url, {
          shallow: true
        });
      });
    };

    _this.handleDateSearch = function (selectedDate) {
      var url = _this.state.baseurl;
      var searchName = _this.state.searchName;
      var locationquerystring = _this.state.locationquerystring;
      var longitudequerystring = _this.state.longitudequerystring;
      var latitudequerystring = _this.state.latitudequerystring;
      var cuisinequerystring = _this.state.cuisinequerystring;
      var occasionquerystring = _this.state.occasionquerystring;
      var price_ltequerystring = _this.state.price_ltequerystring;
      var price_gtquerystring = _this.state.price_gtquerystring;
      var datequerystring = _this.state.datequerystring;
      var timequerystring = _this.state.timequerystring;
      var catererName_querystring = _this.state.catererName_querystring;
      datequerystring = "&date=" + selectedDate;

      if (searchName === "") {
        catererName_querystring = "";
      }

      url = url + locationquerystring + longitudequerystring + latitudequerystring + cuisinequerystring + occasionquerystring + price_gtquerystring + price_ltequerystring + datequerystring + timequerystring + catererName_querystring;
      var fullapiurl = _apis__WEBPACK_IMPORTED_MODULE_23__["default"].GETcaterer + locationquerystring + longitudequerystring + latitudequerystring + cuisinequerystring + occasionquerystring + price_gtquerystring + price_ltequerystring + datequerystring + timequerystring + catererName_querystring;

      _this.setState({
        loading: true,
        locationquerystring: locationquerystring,
        longitudequerystring: longitudequerystring,
        latitudequerystring: latitudequerystring,
        cuisinequerystring: cuisinequerystring,
        occasionquerystring: occasionquerystring,
        price_ltequerystring: price_ltequerystring,
        price_gtquerystring: price_gtquerystring,
        datequerystring: datequerystring,
        timequerystring: timequerystring,
        catererName_querystring: catererName_querystring,
        fullapiurl: fullapiurl
      }, function () {
        next_router__WEBPACK_IMPORTED_MODULE_24___default.a.push(url, url, {
          shallow: true
        });

        _this.getDataFromDb(fullapiurl);
      });
    };

    _this.handleUrlChange = function (queryname) {
      var url = _this.state.baseurl;
      var locationquerystring = _this.state.locationquerystring;
      var longitudequerystring = _this.state.longitudequerystring;
      var latitudequerystring = _this.state.latitudequerystring;
      var cuisinequerystring = _this.state.cuisinequerystring;
      var occasionquerystring = _this.state.occasionquerystring;
      var price_ltequerystring = _this.state.price_ltequerystring;
      var price_gtquerystring = _this.state.price_gtquerystring;
      var datequerystring = _this.state.datequerystring;
      var timequerystring = _this.state.timequerystring;
      var catererName_querystring = _this.state.catererName_querystring;
      var selectedArray;

      if (queryname === 'occasion') {
        occasionquerystring = "";
        selectedArray = _this.state.occasion;

        for (var i = 0; i < selectedArray.length; i++) {
          if (selectedArray[i].value == true) {
            var fixedstr = "&occasion=";
            occasionquerystring = occasionquerystring + fixedstr + selectedArray[i].name;
          }
        }
      }

      if (queryname === 'cuisine') {
        cuisinequerystring = "";

        if (_this.state.selectedCuisine !== "All Cuisines") {
          cuisinequerystring = "&cuisine=" + _this.state.selectedCuisine;
        }
      }

      if (queryname === 'pricerange') {
        var selectedPrice = _this.state.selectedPrice;

        if (selectedPrice !== "All") {
          if (selectedPrice === "More than 500") {
            price_gtquerystring = "";
            var pricenumber = selectedPrice.split("than ")[1];
            price_gtquerystring = "&price_gt=" + pricenumber;
            price_ltequerystring = "";
          } else {
            var pricenumber = selectedPrice.split(" (")[0];
            price_ltequerystring = "&price_lte=" + pricenumber;
            price_gtquerystring = "";
          }
        } else {
          price_gtquerystring = "";
          price_ltequerystring = "";
        }
      }

      url = url + locationquerystring + longitudequerystring + latitudequerystring + cuisinequerystring + occasionquerystring + price_gtquerystring + price_ltequerystring + datequerystring + timequerystring + catererName_querystring;
      var fullapiurl = _apis__WEBPACK_IMPORTED_MODULE_23__["default"].GETcaterer + locationquerystring + longitudequerystring + latitudequerystring + cuisinequerystring + occasionquerystring + price_gtquerystring + price_ltequerystring + datequerystring + timequerystring + catererName_querystring;

      _this.setState({
        loading: true,
        locationquerystring: locationquerystring,
        longitudequerystring: longitudequerystring,
        latitudequerystring: latitudequerystring,
        cuisinequerystring: cuisinequerystring,
        occasionquerystring: occasionquerystring,
        price_ltequerystring: price_ltequerystring,
        price_gtquerystring: price_gtquerystring,
        datequerystring: datequerystring,
        timequerystring: timequerystring,
        catererName_querystring: catererName_querystring,
        fullapiurl: fullapiurl
      }, function () {
        next_router__WEBPACK_IMPORTED_MODULE_24___default.a.replace(url, url, {
          shallow: true
        });

        _this.getDataFromDb(fullapiurl);
      });
    };

    _this.toggleCuisineDropDown = function () {
      _this.setState({
        cuisineDropDownOpen: !_this.state.cuisineDropDownOpen
      });
    };

    _this.toggleFilterModal = function () {
      _this.setState({
        filterModalOpen: !_this.state.filterModalOpen
      });
    };

    _this.removeFilterItem = function (index) {
      var newfilterArray = _this.state.filterArray;
      newfilterArray.splice(index, 1);

      _this.setState({
        filterArray: newfilterArray
      });
    };

    _this.saveFilter = function () {
      var _this$state = _this.state,
          dietary = _this$state.dietary,
          occasion = _this$state.occasion,
          selectedCuisine = _this$state.selectedCuisine,
          selectedPrice = _this$state.selectedPrice,
          filterArray = _this$state.filterArray;
      var newfilterArray = [];

      for (var i = 0; i < dietary.length; i++) {
        if (dietary[i].value == true) {
          newfilterArray.push(dietary[i].name);
        }
      }

      for (var i = 0; i < occasion.length; i++) {
        if (occasion[i].value == true) {
          newfilterArray.push(occasion[i].name);
        }
      }

      if (selectedCuisine != 'All Cuisines') {
        newfilterArray.push(selectedCuisine);
      }

      if (selectedPrice != 'All') {
        newfilterArray.push(selectedPrice);
      }

      _this.setState({
        filterArray: newfilterArray
      }, function () {
        _this.toggleFilterModal();
      });
    };

    _this.refObj = react__WEBPACK_IMPORTED_MODULE_10___default.a.createRef();
    _this.state = {
      baseurl: "/searchcaterer",
      fullapiurl: "",
      locationquerystring: "",
      longitudequerystring: "",
      latitudequerystring: "",
      occasionquerystring: "",
      price_ltequerystring: "",
      price_gtquerystring: "",
      datequerystring: "",
      timequerystring: "",
      catererName_querystring: "",
      location: "",
      selectedOccasion: null,
      isMobile: false,
      loading: true,
      empty: false,
      address: "",
      price: ["All", "50 (or less)", "100 (or less)", "200 (or less)", "300 (or less)", "500 (or less)", "More than 500"],
      dietary: [{
        name: "Spicy",
        value: false
      }, {
        name: "Hot",
        value: false
      }, {
        name: "Gluten Free",
        value: false
      }, {
        name: "Halal",
        value: false
      }, {
        name: "Healthy",
        value: false
      }, {
        name: "Vegetarian",
        value: false
      }],
      occasion: [{
        name: "Breakfast",
        value: false
      }, {
        name: "Brunch",
        value: false
      }, {
        name: "Buffet",
        value: false
      }, {
        name: "Christmas Party",
        value: false
      }, {
        name: "Dinner",
        value: false
      }, {
        name: "Event",
        value: false
      }, {
        name: "Finger Food",
        value: false
      }, {
        name: "Lunch",
        value: false
      }, {
        name: "Meeting",
        value: false
      }, {
        name: "Office Daily",
        value: false
      }, {
        name: "Wedding",
        value: false
      }, {
        name: "Snacks",
        value: false
      }],
      caterer: [],
      cuisine: ["All Cuisines", "Sandwich", "Irish", "Asian", "American", "Burgers", "Caribbean", "Chinese", "Dessert", "Drinks", "English", "French", "Greek", "Halal", "Indian", "Italian", "Japanese", "Mexican", "Middle Eastern", "Pizza", "Salad", "Thai", "Vegetarian Friendly"],
      filterArray: [],
      selectedCuisine: null,
      selectedPrice: null,
      selectedTime: "",
      selectedDate: "",
      searchName: "",
      maxDate: null,
      cuisineDropDownOpen: false,
      dropDownAddress: false,
      dropDownDate: false,
      isSearchBarOpen: false,
      filterModalOpen: false,
      timeEmptyPopoverOpen: false,
      dateEmptyPopoverOpen: false,
      mobile_timeEmptyPopoverOpen: false,
      mobile_dateEmptyPopoverOpen: false
    };
    _this.time = Object(_utils__WEBPACK_IMPORTED_MODULE_25__["timeRanges"])();
    return _this;
  }

  Object(_babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_8__["default"])(SearchCaterer, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      //  this.getDataFromDb();
      console.log("mount did mount");
      var currentDate = moment__WEBPACK_IMPORTED_MODULE_17___default()().toDate();
      this.setState({
        maxDate: currentDate
      });

      if (window.innerWidth < 900) {
        this.setState({
          isMobile: true
        });
      }

      window.addEventListener("resize", function () {
        _this2.setState({
          isMobile: window.innerWidth < 900
        });
      }, false);
      /* Router.events.on("routeChangeComplete", () => {
         this.setState({
           loading: false,
           caterer: this.props.data,
           empty: this.props.data.length > 0 ? false : true,
           location: this.props.location,
           locationquerystring: this.props.locationquerystring,
           longitudequerystring: this.props.longitudequerystring,
           latitudequerystring: this.props.latitudequerystring,
           occasionquerystring: this.props.occasionquerystring,
           cuisinequerystring: this.props.cuisinequerystring,
           price_ltequerystring: this.props.price_ltequerystring,
           price_gtquerystring: this.props.price_gtquerystring,
           datequerystring: this.props.datequerystring,
           timequerystring: this.props.timequerystring,
           catererName_querystring: this.props.catererName_querystring,
         });
       });*/
    }
  }, {
    key: "signIn",
    value: function signIn(e) {
      e.preventDefault();
      var url = this.state.baseurl;
      var locationquerystring = this.state.locationquerystring;
      var longitudequerystring = this.state.longitudequerystring;
      var latitudequerystring = this.state.latitudequerystring;
      var cuisinequerystring = this.state.cuisinequerystring;
      var occasionquerystring = this.state.occasionquerystring;
      var price_ltequerystring = this.state.price_ltequerystring;
      var price_gtquerystring = this.state.price_gtquerystring;
      var datequerystring = this.state.datequerystring;
      var timequerystring = this.state.timequerystring;
      var catererName_querystring = this.state.catererName_querystring;
      url = url + locationquerystring + longitudequerystring + latitudequerystring + cuisinequerystring + occasionquerystring + price_gtquerystring + price_ltequerystring + datequerystring + timequerystring + catererName_querystring;
      next_router__WEBPACK_IMPORTED_MODULE_24___default.a.push({
        pathname: '/login',
        query: {
          'returnurl': url
        }
      });
    }
  }, {
    key: "showPlaceDetails",
    value: function showPlaceDetails(address) {
      this.setState({
        address: address
      });
    }
  }, {
    key: "handleTimeChange",
    value: function handleTimeChange(e) {
      var _this3 = this;

      this.setState({
        selectedTime: e.target.value,
        timeEmptyPopoverOpen: false,
        mobile_timeEmptyPopoverOpen: false
      }, function () {
        var selectedTime = Number(_this3.state.selectedTime.replace(":", ""));

        _this3.handleTimeSearch(selectedTime);

        sessionStorage.setItem('selectedTime', _this3.state.selectedTime);
      });
    }
  }, {
    key: "handleSearchNameChange",
    value: function handleSearchNameChange(e) {
      this.setState({
        searchName: e.target.value
      });
    }
  }, {
    key: "handleDateChange",
    value: function handleDateChange(date) {
      var _this4 = this;

      this.setState({
        selectedDate: moment__WEBPACK_IMPORTED_MODULE_17___default()(date).format("dddd, DD/MM/YY")
      }, function () {
        _this4.toggleDropDown();

        _this4.handleDateSearch(_this4.state.selectedDate);

        sessionStorage.setItem('selectedDate', _this4.state.selectedDate);
      });
    }
  }, {
    key: "renderNavItem",
    value: function renderNavItem(cuisine) {
      var _this5 = this;

      return react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["NavItem"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 985
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["NavLink"], {
        onClick: function onClick() {
          return _this5.navItemClicked(cuisine);
        },
        style: {
          paddingRight: 20,
          paddingLeft: cuisine === "All Cuisines" ? 0 : 20,
          fontWeight: "600",
          color: this.state.selectedCuisine === cuisine ? "#20a8d8" : "black",
          fontSize: 15
        },
        href: "#",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 986
        },
        __self: this
      }, " ", cuisine), react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("div", {
        style: {
          height: 2,
          width: "100%",
          backgroundColor: this.state.selectedCuisine === cuisine ? "#20a8d8" : "transparent"
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1000
        },
        __self: this
      }));
    }
  }, {
    key: "renderMoreCuisine",
    value: function renderMoreCuisine(startindex, lastindex) {
      var _this6 = this;

      var itemsarray = [];
      var cuisine = this.state.cuisine;

      var _loop = function _loop(i) {
        itemsarray.push(react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("td", {
          key: i,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 1019
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["Button"], {
          onClick: function onClick() {
            return _this6.navItemClicked(cuisine[i]);
          },
          block: true,
          color: "ghost-link",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 1020
          },
          __self: this
        }, cuisine[i])));
      };

      for (var i = startindex; i < lastindex; i++) {
        _loop(i);
      }

      return react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("tr", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1031
        },
        __self: this
      }, itemsarray);
    }
  }, {
    key: "renderCuisine",
    value: function renderCuisine() {
      var itemsarray = [];
      var cuisine = this.state.cuisine;

      for (var i = 0; i < cuisine.length; i++) {
        var _React$createElement;

        itemsarray.push(react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["Col"], {
          key: i,
          xs: this.state.filterModalOpen ? "6" : "12",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 1041
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["FormGroup"], {
          style: {
            paddingLeft: 0,
            marginTop: 10
          },
          check: true,
          className: "radio",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 1042
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("div", {
          className: "pretty p-default p-round",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 1043
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("input", (_React$createElement = {
          type: "radio",
          name: "radio1",
          checked: this.state.selectedCuisine === cuisine[i],
          onChange: this.handleCuisineChange,
          value: cuisine[i]
        }, Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(_React$createElement, "name", cuisine[i]), Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(_React$createElement, "style", {
          padding: 0,
          marginRight: 10
        }), Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(_React$createElement, "__source", {
          fileName: _jsxFileName,
          lineNumber: 1044
        }), Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(_React$createElement, "__self", this), _React$createElement)), react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("div", {
          className: "state p-success-o",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 1052
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("label", {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 1053
          },
          __self: this
        }))), react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["Label"], {
          check: true,
          className: "form-check-label",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 1057
          },
          __self: this
        }, cuisine[i]))));
      }

      return react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["Row"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1066
        },
        __self: this
      }, itemsarray);
    }
  }, {
    key: "renderPrice",
    value: function renderPrice() {
      var itemsarray = [];
      var price = this.state.price;

      for (var i = 0; i < price.length; i++) {
        var _React$createElement2;

        itemsarray.push(react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["Col"], {
          key: i,
          xs: this.state.filterModalOpen ? "6" : "12",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 1079
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["FormGroup"], {
          style: {
            paddingLeft: 0,
            marginTop: 10
          },
          check: true,
          className: "radio",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 1080
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("div", {
          className: "pretty p-default p-round",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 1082
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("input", (_React$createElement2 = {
          type: "radio",
          name: "radio2",
          checked: this.state.selectedPrice === price[i],
          onChange: this.handlePriceChange,
          value: price[i]
        }, Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(_React$createElement2, "name", price[i]), Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(_React$createElement2, "style", {
          padding: 0,
          marginRight: 10
        }), Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(_React$createElement2, "__source", {
          fileName: _jsxFileName,
          lineNumber: 1083
        }), Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(_React$createElement2, "__self", this), _React$createElement2)), react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("div", {
          className: "state p-success-o",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 1091
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("label", {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 1092
          },
          __self: this
        }))), react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["Label"], {
          check: true,
          className: "form-check-label",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 1096
          },
          __self: this
        }, price[i]))));
      }

      return react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["Row"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1105
        },
        __self: this
      }, itemsarray);
    }
  }, {
    key: "renderDietary",
    value: function renderDietary() {
      var _this7 = this;

      var itemsarray = [];
      var dietary = this.state.dietary;

      var _loop2 = function _loop2(i) {
        itemsarray.push(react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["Col"], {
          key: i,
          xs: _this7.state.filterModalOpen ? "6" : "12",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 1118
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["FormGroup"], {
          style: {
            paddingLeft: 0,
            marginTop: 10
          },
          check: true,
          className: "checkbox",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 1119
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("div", {
          className: "pretty p-svg p-curve",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 1120
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("input", {
          type: "checkbox",
          checked: dietary[i].value,
          onChange: function onChange(e) {
            return _this7.handleCheckBoxChange(i, 'dietary', e);
          },
          value: dietary[i].name,
          style: {
            padding: 0,
            marginRight: 10
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 1121
          },
          __self: this
        }), react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("div", {
          className: "state p-success",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 1127
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("svg", {
          className: "svg svg-icon",
          viewBox: "0 0 20 20",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 1128
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("path", {
          d: "M7.629,14.566c0.125,0.125,0.291,0.188,0.456,0.188c0.164,0,0.329-0.062,0.456-0.188l8.219-8.221c0.252-0.252,0.252-0.659,0-0.911c-0.252-0.252-0.659-0.252-0.911,0l-7.764,7.763L4.152,9.267c-0.252-0.251-0.66-0.251-0.911,0c-0.252,0.252-0.252,0.66,0,0.911L7.629,14.566z",
          style: {
            stroke: 'white',
            fill: 'white'
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 1129
          },
          __self: this
        })), react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("label", {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 1131
          },
          __self: this
        }))), react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["Label"], {
          check: true,
          className: "form-check-label",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 1135
          },
          __self: this
        }, dietary[i].name))));
      };

      for (var i = 0; i < dietary.length; i++) {
        _loop2(i);
      }

      return react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["Row"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1144
        },
        __self: this
      }, itemsarray);
    }
  }, {
    key: "renderOccasion",
    value: function renderOccasion() {
      var _this8 = this;

      var itemsarray = [];
      var occasion = this.state.occasion;

      var _loop3 = function _loop3(i) {
        itemsarray.push(react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["Col"], {
          key: i,
          xs: _this8.state.filterModalOpen ? "6" : "12",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 1157
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["FormGroup"], {
          style: {
            paddingLeft: 0,
            marginTop: 10
          },
          check: true,
          className: "checkbox",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 1158
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("div", {
          className: "pretty p-svg p-curve",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 1159
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("input", {
          type: "checkbox",
          checked: occasion[i].value,
          onChange: function onChange(e) {
            return _this8.handleCheckBoxChange(i, 'occasion', e);
          },
          value: occasion[i].name,
          style: {
            padding: 0,
            marginRight: 10
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 1160
          },
          __self: this
        }), react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("div", {
          className: "state p-success",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 1166
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("svg", {
          className: "svg svg-icon",
          viewBox: "0 0 20 20",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 1167
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("path", {
          d: "M7.629,14.566c0.125,0.125,0.291,0.188,0.456,0.188c0.164,0,0.329-0.062,0.456-0.188l8.219-8.221c0.252-0.252,0.252-0.659,0-0.911c-0.252-0.252-0.659-0.252-0.911,0l-7.764,7.763L4.152,9.267c-0.252-0.251-0.66-0.251-0.911,0c-0.252,0.252-0.252,0.66,0,0.911L7.629,14.566z",
          style: {
            stroke: 'white',
            fill: 'white'
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 1168
          },
          __self: this
        })), react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("label", {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 1170
          },
          __self: this
        }))), react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["Label"], {
          check: true,
          className: "form-check-label",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 1174
          },
          __self: this
        }, occasion[i].name))));
      };

      for (var i = 0; i < occasion.length; i++) {
        _loop3(i);
      }

      return react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["Row"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1183
        },
        __self: this
      }, itemsarray);
    }
  }, {
    key: "renderFilterModal",
    value: function renderFilterModal() {
      var _this9 = this;

      return react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["Modal"], {
        isOpen: this.state.filterModalOpen,
        toggle: function toggle() {
          return _this9.toggleFilterModal();
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1191
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["ModalHeader"], {
        toggle: function toggle() {
          return _this9.toggleFilterModal();
        },
        style: {
          backgroundColor: 'rgba(211,211,211,0.5)',
          paddingLeft: 30,
          paddingBottom: 0,
          paddingTop: 10
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1192
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["Label"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1193
        },
        __self: this
      }, "Select Filter")), react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["ModalBody"], {
        style: {
          marginBottom: 20
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1195
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["Col"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1196
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("h6", {
        style: {
          fontWeight: "700",
          color: "black",
          fontSize: 15,
          marginBottom: 10,
          marginTop: 0
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1197
        },
        __self: this
      }, "CUISINE"), this.renderCuisine(), react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("h6", {
        style: {
          fontWeight: "700",
          color: "black",
          fontSize: 15,
          marginBottom: 10,
          marginTop: 30
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1209
        },
        __self: this
      }, "OCCASION"), this.renderOccasion(), react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("h6", {
        style: {
          fontWeight: "700",
          color: "black",
          fontSize: 15,
          marginBottom: 10,
          marginTop: 30
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1222
        },
        __self: this
      }, "PRICE"), this.renderPrice())), react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["ModalFooter"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1236
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["Button"], {
        onClick: function onClick() {
          return _this9.saveFilter();
        },
        style: {
          fontSize: 17
        },
        color: "primary",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1237
        },
        __self: this
      }, "Save Filter")));
    }
  }, {
    key: "renderEmptyItems",
    value: function renderEmptyItems() {
      return react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["Row"], {
        style: {
          paddingLeft: 20,
          paddingRight: 20,
          marginTop: 50
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1245
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["Col"], {
        style: {
          textAlign: "center"
        },
        xs: "12",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1246
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("img", {
        style: {
          objectFit: "cover",
          width: 70,
          height: 70,
          opacity: 0.6
        },
        alt: "",
        src: "https://cdn0.iconfinder.com/data/icons/huge-black-icons/512/Find.png",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1247
        },
        __self: this
      })), react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["Col"], {
        style: {
          textAlign: "center"
        },
        xs: "12",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1260
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("p", {
        style: {
          fontSize: 18,
          letterSpacing: 2,
          marginTop: 30
        },
        className: "big",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1261
        },
        __self: this
      }, "NO CATERER IS AVAILABLE FOR THIS SEARCH.")), react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["Col"], {
        style: {
          textAlign: "center"
        },
        xs: "12",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1268
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("p", {
        style: {
          fontSize: 15,
          opacity: 0.8,
          marginTop: 10,
          paddingLeft: 20,
          paddingRight: 20
        },
        className: "big",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1269
        },
        __self: this
      }, "We recommend you to make special request to our team by contacting us at foodiebeeie@gmail.com. We will make response to you as soon as possible.")));
    }
  }, {
    key: "renderLoadingItems",
    value: function renderLoadingItems() {
      var itemsarray = [];

      for (var i = 0; i < 6; i++) {
        itemsarray.push(react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["Col"], {
          key: i,
          xs: "12",
          sm: "6",
          md: "4",
          lg: "4",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 1286
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(react_content_loader__WEBPACK_IMPORTED_MODULE_20__["default"], {
          height: "400",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 1287
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("rect", {
          x: "0",
          y: "0",
          rx: "6",
          ry: "6",
          width: "100%",
          height: "200",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 1288
          },
          __self: this
        }), react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("rect", {
          x: "0",
          y: "240",
          rx: "4",
          ry: "4",
          width: "300",
          height: "13",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 1289
          },
          __self: this
        }), react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("rect", {
          x: "0",
          y: "260",
          rx: "3",
          ry: "3",
          width: "250",
          height: "10",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 1290
          },
          __self: this
        }), react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("rect", {
          x: "0",
          y: "280",
          rx: "2",
          ry: "2",
          width: "100%",
          height: "20",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 1291
          },
          __self: this
        }))));
      }

      return react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["Row"], {
        style: {
          marginTop: 10
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1298
        },
        __self: this
      }, itemsarray);
    }
  }, {
    key: "renderFilterItems",
    value: function renderFilterItems() {
      var _this10 = this;

      var itemsarray = [];
      var filterArray = this.state.filterArray;

      var _loop4 = function _loop4(i) {
        itemsarray.push(react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("span", {
          key: i,
          style: {
            borderWidth: 1.5,
            color: "black",
            borderRadius: 15,
            backgroundColor: "rgba(211,211,211, 0.5)",
            padding: 10,
            textAlign: "center",
            marginLeft: 10,
            marginRight: 10,
            marginBottom: 10
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 1315
          },
          __self: this
        }, filterArray[i], react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("i", {
          onClick: function onClick() {
            return _this10.removeFilterItem(i);
          },
          style: {
            cursor: 'pointer',
            paddingLeft: 10
          },
          className: "fa fa-close",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 1330
          },
          __self: this
        })));
      };

      for (var i = 0; i < filterArray.length; i++) {
        _loop4(i);
      }

      return react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["Row"], {
        className: "justify-content-center",
        style: {
          marginTop: 10,
          padding: 0
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1336
        },
        __self: this
      }, itemsarray);
    }
  }, {
    key: "renderItems",
    value: function renderItems() {
      var _this11 = this;

      var itemsarray = [];
      var caterer = this.state.caterer;

      var _loop5 = function _loop5(i) {
        itemsarray.push(react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["Col"], {
          key: i,
          xs: "12",
          sm: "6",
          md: "4",
          lg: "4",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 1355
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["Card"], {
          style: {
            cursor: "pointer",
            backgroudColor: "rgba(220,220,220, 0.5)",
            borderWidth: 0,
            borderColor: "white",
            boxShadow: "none"
          },
          onClick: function onClick() {
            return _this11.catererClicked(caterer[i]._id);
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 1356
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["CardBody"], {
          style: {
            padding: 0
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 1366
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("img", {
          style: {
            objectFit: "cover",
            width: "100%",
            height: 150,
            display: "inline"
          },
          src: typeof caterer[i].coversrc !== 'undefined' ? caterer[i].coversrc : "https://stmed.net/sites/default/files/food-wallpapers-28249-101905.jpg",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 1367
          },
          __self: this
        }), react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("b", {
          style: {
            marginTop: 10,
            height: 30,
            display: "inline-block",
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
            paddingLeft: 0,
            maxWidth: 300,
            width: "100%",
            textAlign: "start",
            fontSize: 17
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 1377
          },
          __self: this
        }, caterer[i].catererName), react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["Row"], {
          style: {
            paddingLeft: 15,
            paddingRight: 0,
            marginBottom: 5
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 1395
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(react_star_rating_component__WEBPACK_IMPORTED_MODULE_18___default.a, {
          name: "rate1",
          emptyStarColor: "#D3D3D3",
          starCount: 5,
          editing: false,
          value: caterer[i].rating,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 1398
          },
          __self: this
        }), typeof caterer[i].rating === 'undefined' || caterer[i].rating === 0 ? null : react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("b", {
          style: {
            marginLeft: 5,
            color: "darkorange"
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 1406
          },
          __self: this
        }, caterer[i].rating), typeof caterer[i].numofreview === 'undefined' || caterer[i].numofreview === 0 ? react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["Label"], {
          style: {
            fontWeight: '500',
            marginLeft: 5,
            color: "darkorange"
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 1410
          },
          __self: this
        }, "No Ratings Yet") : react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["Label"], {
          style: {
            fontWeight: '500',
            marginLeft: 5,
            color: "darkorange"
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 1414
          },
          __self: this
        }, "(", caterer[i].numofreview, ")")), react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["Table"], {
          style: {
            margin: 0
          },
          borderless: true,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 1419
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("tbody", {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 1420
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("tr", {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 1421
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("td", {
          style: {
            padding: 0,
            width: "40%",
            textAlign: "start"
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 1422
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("img", {
          style: {
            objectFit: "cover",
            width: 20,
            height: 20,
            display: "inline",
            marginRight: 5
          },
          alt: "",
          src: "https://cdn0.iconfinder.com/data/icons/webshop-essentials/100/shopping-cart-512.png",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 1425
          },
          __self: this
        }), react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("b", {
          style: {
            color: "#20a8d8"
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 1438
          },
          __self: this
        }, "\u20AC", Number(caterer[i].minimumspend).toFixed(2))), react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("td", {
          style: {
            padding: 0,
            width: "60%",
            textAlign: "start"
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 1442
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("img", {
          style: {
            objectFit: "cover",
            width: 23,
            height: 23,
            display: "inline",
            marginRight: 5
          },
          alt: "",
          src: "https://cdn0.iconfinder.com/data/icons/e-commerce-mini-icons/32/Commerce_Mini_Icons-19-512.png",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 1445
          },
          __self: this
        }), react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("b", {
          style: {
            color: "green"
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 1458
          },
          __self: this
        }, "\u20AC", Number(caterer[i].deliveryfee).toFixed(2)))))), react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(react_dotdotdot__WEBPACK_IMPORTED_MODULE_21___default.a, {
          clamp: 2,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 1466
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("p", {
          style: {
            overflow: "hidden",
            textAlign: "start",
            marginTop: 10,
            opacity: 0.8
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 1467
          },
          __self: this
        }, caterer[i].catererDescrip))))));
      };

      for (var i = 0; i < caterer.length; i++) {
        _loop5(i);
      }

      return react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["Row"], {
        style: {
          marginTop: 10
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1486
        },
        __self: this
      }, itemsarray);
    }
  }, {
    key: "renderTopSearchBar",
    value: function renderTopSearchBar() {
      var _this12 = this;

      return react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1498
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["Container"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1499
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["Row"], {
        style: {
          paddingTop: 20,
          paddingBottom: 10
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1500
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["Col"], {
        xs: "8",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1501
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["FormGroup"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1502
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("h6", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1503
        },
        __self: this
      }, "Delivered To"), react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["UncontrolledDropdown"], {
        isOpen: this.state.dropDownAddress,
        toggle: function toggle() {
          return _this12.toggleDropDownAddress();
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1504
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["DropdownToggle"], {
        style: {
          height: 40,
          width: '100%',
          color: "rgba(0,0,0, 0.5)",
          borderColor: "rgba(211,211,211, 0.5)",
          backgroundColor: "white"
        },
        caret: true,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1505
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["Label"], {
        style: {
          padding: 0,
          margin: 0,
          cursor: "pointer",
          overflow: "hidden",
          fontSize: 15,
          marginRight: 5,
          textAlign: 'start',
          color: this.state.location === "" ? 'gray' : 'black',
          width: '90%'
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1516
        },
        __self: this
      }, this.state.location)), react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["DropdownMenu"], {
        style: {
          width: '100%'
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1521
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["Row"], {
        style: {
          width: '100%'
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1522
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["Col"], {
        style: {
          paddingRight: 0
        },
        xs: "10",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1523
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(_components_AutoCompleteAddress__WEBPACK_IMPORTED_MODULE_16__["default"], {
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        borderColor: "rgba(211,211,211, 0.5)",
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5,
        fontSize: 15,
        color: "black",
        height: 40,
        onPlaceChanged: this.showPlaceDetails.bind(this),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1524
        },
        __self: this
      })), react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["Col"], {
        xs: "2",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1539
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["Button"], {
        onClick: function onClick() {
          return _this12.saveAddress();
        },
        style: {
          height: '100%'
        },
        className: "bg-primary",
        color: "primary",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1540
        },
        __self: this
      }, "Save"))))))), react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["Col"], {
        xs: "4",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1547
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["Button"], {
        outline: true,
        onClick: function onClick() {
          return _this12.searchBarToggle();
        },
        block: true,
        style: {
          marginTop: 25,
          height: '50%',
          fontWeight: '700'
        },
        color: "primary",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1548
        },
        __self: this
      }, " ", this.state.isSearchBarOpen ? "HIDE" : "SHOW"))), react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["Collapse"], {
        isOpen: this.state.isSearchBarOpen,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1552
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["Row"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1553
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["Col"], {
        xs: "6",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1554
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["FormGroup"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1555
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("h6", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1556
        },
        __self: this
      }, "When"), react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["UncontrolledDropdown"], {
        id: "Popover2",
        isOpen: this.state.dropDownDate,
        toggle: function toggle() {
          return _this12.toggleDropDown();
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1557
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["DropdownToggle"], {
        style: {
          height: 40,
          width: '100%',
          color: "rgba(0,0,0, 0.5)",
          borderColor: "rgba(211,211,211, 0.5)",
          backgroundColor: "white"
        },
        caret: true,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1558
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["Label"], {
        style: {
          padding: 0,
          margin: 0,
          cursor: "pointer",
          overflow: "hidden",
          fontSize: 15,
          marginRight: 5,
          textAlign: 'start',
          color: this.state.selectedDate === "" ? 'gray' : 'black',
          width: '90%'
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1569
        },
        __self: this
      }, this.state.selectedDate === "" ? 'Select Date' : this.state.selectedDate)), react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["DropdownMenu"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1574
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1575
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(react_date_range__WEBPACK_IMPORTED_MODULE_19__["Calendar"], {
        onChange: this.handleDateChange.bind(this),
        minDate: this.state.maxDate,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1576
        },
        __self: this
      })))), react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["Popover"], {
        placement: "bottom",
        isOpen: this.state.mobile_dateEmptyPopoverOpen,
        target: "Popover2",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1584
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["PopoverHeader"], {
        style: {
          color: 'red'
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1585
        },
        __self: this
      }, "Select Date"), react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["PopoverBody"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1586
        },
        __self: this
      }, "Please select date of catering event")))), react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["Col"], {
        xs: "6",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1591
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["FormGroup"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1592
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("h6", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1593
        },
        __self: this
      }, "Time"), react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["Input"], {
        id: "Popover1",
        value: this.state.selectedTime,
        onChange: function onChange(e) {
          return _this12.handleTimeChange(e);
        },
        style: {
          cursor: 'pointer',
          color: this.state.selectedTime === "" ? 'gray' : 'black',
          fontSize: 15,
          height: 40,
          backgroudColor: 'white'
        },
        type: "select",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1594
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("option", {
        value: "",
        disabled: true,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1595
        },
        __self: this
      }, "Select Time"), this.time.map(function (time) {
        return react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("option", {
          style: {
            color: 'black'
          },
          key: time,
          value: time,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 1597
          },
          __self: this
        }, time);
      }))), react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["Popover"], {
        placement: "bottom",
        isOpen: this.state.mobile_timeEmptyPopoverOpen,
        target: "Popover1",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1601
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["PopoverHeader"], {
        style: {
          color: 'red'
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1602
        },
        __self: this
      }, "Select Time"), react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["PopoverBody"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1603
        },
        __self: this
      }, "Please select the arrival time of caterings")))))), react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("div", {
        style: {
          height: 1,
          backgroundColor: 'gray',
          opacity: 0.3
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1609
        },
        __self: this
      }));
    }
  }, {
    key: "render",
    value: function render() {
      var _this13 = this;

      var cuisinelength = this.state.cuisine.length;
      var slicedCuisine = this.state.cuisine.slice(4, cuisinelength);
      return react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(_components_Layout__WEBPACK_IMPORTED_MODULE_15__["default"], {
        title: this.state.location === "" || typeof this.state.location === "undefined" ? 'Caterers Nearby' : this.state.location + " Caterers Nearby",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1621
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(next_seo__WEBPACK_IMPORTED_MODULE_26___default.a, {
        config: {
          title: this.state.location === "" || typeof this.state.location === "undefined" ? 'Caterers Nearby' : this.state.location + " Caterers Nearby"
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1622
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("div", {
        ref: this.refObj,
        style: {
          backgroundColor: 'white'
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1628
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(_components_NavBar__WEBPACK_IMPORTED_MODULE_13__["default"], {
        signIn: function signIn(e) {
          return _this13.signIn(e);
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1629
        },
        __self: this
      }), this.state.isMobile ? this.renderTopSearchBar() : null, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("div", {
        className: "app align-items-center",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1633
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["Container"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1635
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["Row"], {
        style: {
          marginTop: 20,
          marginBottom: 50
        },
        className: "justify-content-center",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1636
        },
        __self: this
      }, !this.state.isMobile ? react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["Col"], {
        xs: "12",
        md: "12",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1638
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["Card"], {
        style: {
          backgroundColor: 'rgba(211,211,211,0.1)',
          boxShadow: '1px 1px 1px #9E9E9E'
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1639
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["CardBody"], {
        style: {
          paddingTop: 15,
          paddingBottom: 0
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1640
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["Row"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1641
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["Col"], {
        xs: "12",
        md: "5",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1642
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["FormGroup"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1643
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("h6", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1644
        },
        __self: this
      }, "Delivered To"), react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["UncontrolledDropdown"], {
        isOpen: this.state.dropDownAddress,
        toggle: function toggle() {
          return _this13.toggleDropDownAddress();
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1645
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["DropdownToggle"], {
        style: {
          height: 40,
          width: '100%',
          color: "rgba(0,0,0, 0.5)",
          borderColor: "rgba(211,211,211, 0.5)",
          backgroundColor: "white"
        },
        caret: true,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1646
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["Label"], {
        style: {
          padding: 0,
          margin: 0,
          cursor: "pointer",
          overflow: "hidden",
          fontSize: 15,
          marginRight: 5,
          textAlign: 'start',
          color: this.state.location === "" ? 'gray' : 'black',
          width: '90%'
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1657
        },
        __self: this
      }, this.state.location)), react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["DropdownMenu"], {
        style: {
          width: '100%'
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1662
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["Row"], {
        style: {
          width: '100%'
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1663
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["Col"], {
        style: {
          paddingRight: 0
        },
        xs: "10",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1664
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(_components_AutoCompleteAddress__WEBPACK_IMPORTED_MODULE_16__["default"], {
        borderRadius: 5,
        borderColor: "rgba(211,211,211, 0.5)",
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5,
        fontSize: 15,
        color: "black",
        height: 40,
        onPlaceChanged: this.showPlaceDetails.bind(this),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1665
        },
        __self: this
      })), react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["Col"], {
        xs: "2",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1677
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["Button"], {
        onClick: function onClick() {
          return _this13.saveAddress();
        },
        style: {
          height: '100%'
        },
        className: "bg-primary",
        color: "primary",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1678
        },
        __self: this
      }, "Save"))))))), react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["Col"], {
        xs: "6",
        md: "4",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1686
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["FormGroup"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1687
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("h6", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1688
        },
        __self: this
      }, "When"), react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["UncontrolledDropdown"], {
        id: "Popover2",
        isOpen: this.state.dropDownDate,
        toggle: function toggle() {
          return _this13.toggleDropDown();
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1689
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["DropdownToggle"], {
        style: {
          height: 40,
          width: '100%',
          color: "rgba(0,0,0, 0.5)",
          borderColor: "rgba(211,211,211, 0.5)",
          backgroundColor: "white"
        },
        caret: true,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1690
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["Label"], {
        style: {
          padding: 0,
          margin: 0,
          cursor: "pointer",
          overflow: "hidden",
          fontSize: 15,
          marginRight: 5,
          textAlign: 'start',
          color: this.state.selectedDate === "" ? 'gray' : 'black',
          width: '90%'
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1701
        },
        __self: this
      }, this.state.selectedDate === "" ? 'Select Date' : this.state.selectedDate)), react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["DropdownMenu"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1706
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1707
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(react_date_range__WEBPACK_IMPORTED_MODULE_19__["Calendar"], {
        onChange: this.handleDateChange.bind(this),
        minDate: this.state.maxDate,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1708
        },
        __self: this
      }))))), react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["Popover"], {
        placement: "bottom",
        isOpen: this.state.dateEmptyPopoverOpen,
        target: "Popover2",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1717
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["PopoverHeader"], {
        style: {
          color: 'red'
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1718
        },
        __self: this
      }, "Select Date"), react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["PopoverBody"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1719
        },
        __self: this
      }, "Please select date of catering event"))), react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["Col"], {
        xs: "6",
        md: "3",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1723
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["FormGroup"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1724
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("h6", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1725
        },
        __self: this
      }, "Time"), react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["Input"], {
        id: "Popover1",
        value: this.state.selectedTime,
        onChange: function onChange(e) {
          return _this13.handleTimeChange(e);
        },
        style: {
          cursor: 'pointer',
          color: this.state.selectedTime === "" ? 'gray' : 'black',
          fontSize: 15,
          height: 40,
          backgroudColor: 'white'
        },
        type: "select",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1726
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("option", {
        value: "",
        disabled: true,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1727
        },
        __self: this
      }, "Select Time"), this.time.map(function (time) {
        return react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("option", {
          style: {
            color: 'black'
          },
          key: time,
          value: time,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 1729
          },
          __self: this
        }, time);
      }))), react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["Popover"], {
        placement: "bottom",
        isOpen: this.state.timeEmptyPopoverOpen,
        target: "Popover1",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1734
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["PopoverHeader"], {
        style: {
          color: 'red'
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1735
        },
        __self: this
      }, "Select Time"), react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["PopoverBody"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1736
        },
        __self: this
      }, "Please select the arrival time of caterings"))))))) : null, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["Col"], {
        style: {
          marginTop: 20
        },
        xs: "12",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1748
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("h2", {
        style: {
          textAlign: 'center',
          fonWeight: '700',
          fontSize: 30,
          paddingLeft: 10,
          paddingRight: 10
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1749
        },
        __self: this
      }, "6 Caterers Available")), !this.state.isMobile ? react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["Col"], {
        style: {
          marginTop: 25
        },
        xs: "12",
        md: "4",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1753
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["Form"], {
        action: "",
        method: "post",
        className: "form-horizontal",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1754
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["FormGroup"], {
        row: true,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1755
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["Col"], {
        md: "12",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1756
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["InputGroup"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1757
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["Input"], {
        onChange: function onChange(e) {
          return _this13.handleSearchNameChange(e);
        },
        value: this.state.searchName,
        style: {
          borderWidth: 1.5,
          color: 'black',
          fontSize: 15,
          height: 40,
          borderTopLeftRadius: 15,
          borderBottomLeftRadius: 15
        },
        type: "text",
        id: "input1-group2",
        name: "input1-group2",
        placeholder: "Caterer, Cuisine etc",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1758
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["InputGroupAddon"], {
        addonType: "prepend",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1759
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["Button"], {
        onClick: function onClick() {
          return _this13.searchNameClicked();
        },
        style: {
          borderTopRightRadius: 15,
          borderBottomRightRadius: 15
        },
        type: "button",
        color: "primary",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1760
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("i", {
        className: "fa fa-search",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1760
        },
        __self: this
      })))))))) : null, !this.state.isMobile ? react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["Col"], {
        style: {
          marginTop: 20
        },
        xs: "12",
        md: "8",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1771
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["Nav"], {
        style: {
          paddingLeft: 50
        },
        className: "float-right",
        pills: true,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1772
        },
        __self: this
      }, this.renderNavItem(this.state.cuisine[0]), this.renderNavItem(this.state.cuisine[1]), this.renderNavItem(this.state.cuisine[2]), this.renderNavItem(this.state.cuisine[3]), react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["NavItem"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1778
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["Dropdown"], {
        nav: true,
        isOpen: this.state.cuisineDropDownOpen,
        toggle: function toggle() {
          _this13.toggleCuisineDropDown();
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1779
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["DropdownToggle"], {
        style: {
          fontWeight: "600",
          color: slicedCuisine.includes(this.state.selectedCuisine) || this.state.cuisineDropDownOpen ? "#20a8d8" : "black",
          backgroundColor: "white",
          fontSize: 15
        },
        nav: true,
        caret: true,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1786
        },
        __self: this
      }, slicedCuisine.includes(this.state.selectedCuisine) ? this.state.selectedCuisine : "More"), react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["DropdownMenu"], {
        right: true,
        style: {
          right: 0,
          left: 'auto'
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1798
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["Table"], {
        style: {
          marginRight: 0
        },
        borderless: true,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1799
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("tbody", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1800
        },
        __self: this
      }, this.renderMoreCuisine(4, 10), this.renderMoreCuisine(10, 16), this.renderMoreCuisine(16, 22), this.renderMoreCuisine(22, 28))))), react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("div", {
        style: {
          height: 2,
          width: "100%",
          backgroundColor: slicedCuisine.includes(this.state.selectedCuisine) ? "#20a8d8" : "transparent"
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1809
        },
        __self: this
      })))) : null, this.state.isMobile ? react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["Col"], {
        style: {
          textAlign: "center",
          marginTop: 15
        },
        xs: "12",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1823
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["Row"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1827
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["Col"], {
        xs: "12",
        sm: "8",
        md: "8",
        lg: "8",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1828
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["Form"], {
        action: "",
        method: "post",
        className: "form-horizontal",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1829
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["FormGroup"], {
        row: true,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1830
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["Col"], {
        md: "12",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1831
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["InputGroup"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1832
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["Input"], {
        style: {
          borderWidth: 1.5,
          color: "black",
          fontSize: 15,
          height: 40,
          borderTopLeftRadius: 15,
          borderBottomLeftRadius: 15
        },
        type: "text",
        id: "input1-group2",
        name: "input1-group2",
        placeholder: "Caterer, Cuisine etc",
        onChange: function onChange(e) {
          return _this13.handleSearchNameChange(e);
        },
        value: this.state.searchName,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1833
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["InputGroupAddon"], {
        addonType: "prepend",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1849
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["Button"], {
        style: {
          borderTopRightRadius: 15,
          borderBottomRightRadius: 15
        },
        type: "button",
        color: "primary",
        onClick: function onClick() {
          return _this13.searchNameClicked();
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1850
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("i", {
        className: "fa fa-search",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1859
        },
        __self: this
      })))))))), react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["Col"], {
        xs: "12",
        sm: "4",
        md: "4",
        lg: "4",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1868
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["Button"], {
        onClick: function onClick() {
          return _this13.toggleFilterModal();
        },
        block: true,
        style: {
          paddingTop: 8,
          paddingBottom: 8,
          borderRadius: 5
        },
        color: "primary",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1869
        },
        __self: this
      }, "Add Filters \xA0", react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("i", {
        className: "fa fa-filter",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1871
        },
        __self: this
      }))))) : null, this.state.isMobile ? react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["Col"], {
        style: {
          marginTop: 20
        },
        xs: "12",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1881
        },
        __self: this
      }, this.state.filterArray.length === 0 ? null : this.renderFilterItems()) : null, !this.state.isMobile ? react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["Col"], {
        xs: "0",
        md: "2",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1888
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("h6", {
        style: {
          fontWeight: "700",
          color: "black",
          fontSize: 15,
          marginBottom: 10,
          marginTop: 20
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1889
        },
        __self: this
      }, "OCCASION"), this.renderOccasion(), react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("h6", {
        style: {
          fontWeight: "700",
          color: "black",
          fontSize: 15,
          marginBottom: 10,
          marginTop: 30
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1902
        },
        __self: this
      }, "PRICE"), this.renderPrice()) : null, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["Col"], {
        style: {
          marginTop: 20
        },
        xs: "12",
        md: "10",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1918
        },
        __self: this
      }, this.state.loading ? this.renderLoadingItems() : this.state.empty ? this.renderEmptyItems() : this.renderItems()))), this.renderFilterModal()), react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(_components_Footer__WEBPACK_IMPORTED_MODULE_14__["default"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 1926
        },
        __self: this
      })));
    }
  }]);

  return SearchCaterer;
}(react__WEBPACK_IMPORTED_MODULE_10__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (Object(next_router__WEBPACK_IMPORTED_MODULE_24__["withRouter"])(SearchCaterer));

/***/ })

})
//# sourceMappingURL=searchcaterer.js.33c120cd3b520c6a01a1.hot-update.js.map