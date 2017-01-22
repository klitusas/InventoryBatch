function onReady(callback) {
    var intervalID = window.setInterval(checkReady, 1000);
    function checkReady() {
        if (document.getElementsByTagName('body')[0] !== undefined) {
            window.clearInterval(intervalID);
            callback.call(this);
        }
    }
}

function show(id, value) {
    document.getElementById(id).style.display = value ? 'block' : 'none';
}

onReady(function () {
    show('page', true);
    show('loading', false);
});

window.addEventListener('load', function() {
    FastClick.attach(document.body);
    console.log('Fastclick attached');
}, false);

$(document).ready(function() {
    $('.menu-link').bigSlide();
});

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

var machineId = getParameterByName('device');
console.log(machineId);

window.addEventListener('load', function() {
    FastClick.attach(document.body);
}, false);

angular.module('myApp',['ngRoute', 'ngAnimate', 'ngTouch', 'zingchart-angularjs', 'ngDialog'])
.controller('ImagesCtrl', ImagesCtrl)
.controller('StatsCtrl', StatsCtrl)
.config(['$routeProvider',
    function($routeProvider) {

        $routeProvider
            .when('/inventory', {
                templateUrl: 'partials/inventory.html',
                title: "Inventory",
                icon: 'glyphicon glyphicon-shopping-cart',
            })
            .when('/stats', {
                templateUrl: 'partials/stats.html',
                controller: 'StatsCtrl',
                title: "Charts",
                icon: 'glyphicon glyphicon-stats',
            })
            .otherwise({
                redirectTo: '/inventory'
            });
    }
])
.config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('LoadingInterceptor');
}])
.config(['ngDialogProvider', function(ngDialogProvider) {
    ngDialogProvider.setDefaults({
        className: 'ngdialog-theme-default',
        plain: false,
        showClose: true,
        closeByDocument: true,
        closeByEscape: true,
        appendTo: false,
        preCloseCallback: function() {
            console.log('default pre-close callback');
        }
    });
}])
.factory('productsProduction', function($http, settings, API_PATH) {

    var loadAllProducts = {
        async: function() {
            var promise = $http(settings).then(function(response) {
                var promises = $http.get(API_PATH + "merchant/products", {
                    withCredentials: true,
                    config: {
                        //'Cookie': 'merchantSessionId=b950042c-a38c-48a8-8a6a-c28b17ed3b13'
                    }
                }).then(function(response) {
                    return response.data;

                });
                return promises;
            });
            return promise;
        }
    };

    return loadAllProducts;

})
.factory('machineProducts', function($http, settings, API_PATH) {

    //var machineId = 'bd950eaa-fee9-486d-b3ac-d5366db71fea';
    var loadMachineProducts = {
        async: function() {
            var promise = $http(settings).then(function(response) {
                var promises = $http.get(API_PATH + "merchant/pos/" + machineId + "/products", {
                    withCredentials: true,
                    config: {
                        //'Cookie': 'merchantSessionId=b950042c-a38c-48a8-8a6a-c28b17ed3b13'
                    }
                }).then(function(response) {

                    return response.data;
                });
                return promises;
            });
            return promise;
        }
    };
    return loadMachineProducts;
})
.service('LoadingInterceptor', ['$q', '$rootScope', '$log',
    function($q, $rootScope, $log) {
        'use strict';

        var xhrCreations = 0;
        var xhrResolutions = 0;

        function isLoading() {
            return xhrResolutions < xhrCreations;
        }

        function updateStatus() {
            $rootScope.loading = isLoading();
        }

        return {
            request: function(config) {
                xhrCreations++;
                updateStatus();
                return config;
            },
            requestError: function(rejection) {
                xhrResolutions++;
                updateStatus();
                $log.error('Request error:', rejection);
                return $q.reject(rejection);
            },
            response: function(response) {
                xhrResolutions++;
                updateStatus();
                return response;
            },
            responseError: function(rejection) {
                xhrResolutions++;
                updateStatus();
                $log.error('Response error:', rejection);
                return $q.reject(rejection);
            }
        };
    }
])
.constant('settings', {

        "withCredentials": true,
        "async": true,
        "crossDomain": true,
        "url": "https://api.bubblmee.com/merchant/login",
        "method": "POST",
        "data": "{\"email\":\"dev@bubblygroup.com\",\"password\":\"XxXpFTHz\"}"
    })
.constant('API_PATH', 'https://api.bubblmee.com/')
.run(function($rootScope, $route) {
    $rootScope.$on("$routeChangeSuccess", function(currentRoute, previousRoute) {
        //Change page title, based on Route information
        $rootScope.title = $route.current.title;
        $rootScope.icon = $route.current.icon;

    });
})
.directive("scroll", function($window) {

    return function(scope, element, attrs) {
        angular.element('#scrolling').bind("scroll", function() {
            if (pageYOffset >= 0) {
                scope.amount = 100;
            } else {}
            scope.$apply();
        });
    };
});

function StatsCtrl ($scope, $http, settings, API_PATH) {

    //var machineId = '0f315b4a-c7b0-4bcc-b6bf-72fd046feb50';

    var date = new Date();
    var month = [];
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";
    $scope.date = month[date.getMonth()];

    $scope.myJson = {
        globals: {
            shadow: false,
            "font-family": 'montserratlight',
            fontWeight: "50"
        },
        type: "pie",
        backgroundColor: "#fff",
        "legend": {
            "border-width": 0,
            "padding": "-5px",
            "layout": "x3",
            "x": "1%",
            "y": "62%",
        },
        tooltip: {
            text: "%t,  %v purchases"
        },
        "plotarea": {
            "margin-top": "1%",
            "margin-bottom": "40%",
            "margin-right": "15%",
        },
        plot: {
            refAngle: "-90",
            borderWidth: "0px",
            "animation": {
                "effect": "2",
                "method": "3",
                "sequence": "ANIMATION_BY_PLOT",
                "speed": "2000"
            },
            valueBox: {
                placement: "out",
                text: "%npv %,( %v purchases )",
                fontSize: "15px",
                textAlpha: 1,
            }
        },

        series: []
    };
    $scope.myJsons = {
        type: "line",
        title: {
            "font-family": 'montserratlight',
            "margin-left": "2%",
            "color": "#34495e",
            fontSize: 16,
            text: "Peak sales of the week",
            textAlign: 'left',
        },
        crosshairX: {
            lineColor: "#b6b6b6",
            trigger: "move",
            lineStyle: 'dashed',
            marker: {
                visible: true,
                size: 4
            },
            scaleLabel: {
                bold: true,
                backgroundColor: "#fff",
                fontColor: "#474747",
                fontSize: "16px",
                callout: false,
                paddingTop: 2,
            },
            plotLabel: {
                backgroundColor: "white",
                borderColor: "#bababa",
                borderRadius: "5px",
                bold: true,
                fontSize: "12px",
                fontColor: "#2f2f2f",
                textAlign: 'right',
                padding: '10px',
                shadow: true,
                shadowAlpha: 0.2,
                shadowBlur: 5,
                shadowDistance: 4,
                shadowColor: "#a1a1a1",

            }
        },
        plot: {
            "animation": {
                "delay": 100,
                "effect": "ANIMATION_FADE_IN",
                "speed": "400"
            },
            tooltip: {
                visible: false
            },
            aspect: 'spline',
            marker: {
                backgroundColor: "white",
                borderWidth: "2px",
            },
            hoverMarker: {
                backgroundColor: 'none',
                size: 10
            }
        },
        scaleX: {
            lineColor: "#E3E8E9",
            fontColor: "#879CAB",
            guide: {
                visible: true,
                lineWidth: "1px",
                lineColor: "#E3E8E9",
                lineStyle: "solid"
            },
            tick: {
                visible: false
            },
            labels: [],
            "font-family": 'montserratlight',
        },
        scaleY: {
            lineColor: "#E3E8E9",
            fontColor: "#879CAB",
            guide: {
                visible: true,
                lineWidth: "1px",
                lineColor: "#E3E8E9",
                lineStyle: "solid"
            },
            tick: {
                visible: false
            }
        },
        series: [{
            values: [],
            "font-family": 'montserratlight',
            text: "Total items sold",
            lineColor: "#00ACF2",
            marker: {
                borderColor: "#00ACF2"
            }
        }]
    };
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getTime();
    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getTime();

    $http(settings).then(function(response) {
        $http.get(API_PATH + 'merchant/pos/' + machineId + '/orderReport?from=' + firstDay + '&to=' + lastDay, {
            withCredentials: true,
        }).then(function(response) {

            var eproducts = [];
            var price = [];
            var steps = response.data.orders;
            var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            console.log(steps);
            /* Creating pie chart*/

            //creating a sorted array for total sales and total income
            for (var i = 0; i < steps.length; i++) {
                /*  if (steps[i].status == "PAYMENT_COMPLETED") {
                      price.push({
                          priceComb: steps[i].total,
                          timestamp: days[(new Date(steps[i].timestamp)).getDay()]
                      });
                  }*/
                for (var b = 0; b < steps[i].products.length; b++) {
                    if (steps[i].paymentType == "INVOICE") {
                        price.push({
                            priceComb: steps[i].total,
                            timestamp: days[(new Date(steps[i].timestamp)).getDay()],
                            itemValues: steps[i].products[b].quantity
                        });
                    }
                }

                //creating an array for pie chart
                for (var j = 0; j < steps[i].products.length; j++) {
                    /* if (steps[i].status == "PAYMENT_COMPLETED") {
                         eproducts.push({
                             values: steps[i].products[j].quantity,
                             text: steps[i].products[j].name,
                         });
                     }*/
                    if (steps[i].paymentType == "INVOICE") {
                        eproducts.push({
                            values: steps[i].products[j].quantity,
                            text: steps[i].products[j].name,
                        });

                    }
                }
            }
            console.log(price);

            //Creating grouped array for pie
            var query = Enumerable.From(eproducts)
                .GroupBy(
                    "$.text",
                    null,
                    "{ text: $, values: [$$.Sum('$.values')]}")
                .ToArray();



            //push the ready data to the pie chart
            for (var i = 0; i < query.length; i++) {
                $scope.myJson.series.push({
                    values: query[i].values,
                    text: query[i].text
                });
            }

            //overview info
            $scope.totalSold = Enumerable.From(eproducts).Sum('$.values');
            $scope.totalIncome = Enumerable.From(price).Sum('$.priceComb');


            /* Creating "Peak sales of the week" chart*/


            //creating grouped array with timestamp and sales per week day
            var query1 = Enumerable.From(price)
                .GroupBy(
                    "$.timestamp",
                    null,
                    "{ timestamp: $, timeItemValues: $$.Sum('$.itemValues')}")
                .ToArray();

            var selected = days;
            console.log(price);

            //pushing all weeks days values to the array, the array will contain duplicates which 
            //will be removed. 
            for (var i = 0; i < query1.length; i++) {
                selected.push(query1[i].timestamp);
            }

            //function for removing values which repeats. Now we have a clean array with only days which do not 
            //have any sales
            function removeDuplicates(arr) {
                var counts = arr.reduce(function(counts, item) {
                    counts[item] = (counts[item] || 0) + 1;
                    return counts;
                }, {});
                return Object.keys(counts).reduce(function(arr, item) {
                    if (counts[item] === 1) {
                        arr.push(item);
                    }
                    return arr;
                }, []);
            }

            var newArr = removeDuplicates(selected);

            //pushing values of non-sales days into array to keep consistency of the days on x axis.
            for (var i = 0; i < newArr.length; i++) {
                query1.push({
                    timestamp: newArr[i],
                    timeItemValues: 0
                });
            }

            //creating comparator for the way days should be order in x-axis
            var order = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            var sorted = _.sortBy(query1, function(obj) {
                return _.indexOf(order, obj.timestamp);
            });


            //Pushing sorted array into the 'Peak sales if the week' chart.
            for (var i = 0; i < sorted.length; i++) {
                $scope.myJsons.scaleX.labels.push(sorted[i].timestamp);
                $scope.myJsons.series[0].values.push(sorted[i].timeItemValues);
            }
        });
    });
};

function ImagesCtrl (productsProduction, machineProducts, $scope, $rootScope, ngDialog, $http, $filter, $element, $location, $timeout, API_PATH, settings) {

    //var machineId = 'bd950eaa-fee9-486d-b3ac-d5366db71fea';
    $scope.saveMessage = false;
    $scope.hiddenDiv = false;
    $scope.idSelected = null;
    $scope.steps = [];
    $scope.amount = 8;
    $scope.products = [];
    $scope.changeFlag = false;

    $scope.isActive = function(viewLocation) {
        return viewLocation === $location.path();
    };

    $scope.openConfirmWithPreCloseCallbackInlinedWithNestedConfirm = function() {
        ngDialog.openConfirm({
                template: 'dialogWithNestedConfirmDialogId',
                className: 'ngdialog-theme-default',
                preCloseCallback: function(value) {},
                scope: $scope
            })
            .then(function(value) {
                console.log('resolved:' + value);
                // Perform the save here
            }, function(value) {
                console.log('rejected:' + value);

            });
    };

    $scope.confirmDelete = function(a) {
        ngDialog.openConfirm({
                template: 'dialogConfirmDialog',
                className: 'ngdialog-theme-defaults',
                preCloseCallback: function(value) {},
                scope: $scope
            })
            .then(function(value) {
                console.log('resolved:' + value);
                $scope.removeItem(a);
                $scope.zeroItems();
            }, function(value) {
                console.log('rejected:' + value);

            });
    };

    $scope.confirmSave = function(a) {
        ngDialog.openConfirm({
                template: 'dialogConfirmChange',
                className: 'ngdialog-theme-defaults-save',
                preCloseCallback: function(value) {},
                scope: $scope
            })
            .then(function(value) {
                console.log('resolved:' + value);
                $scope.save();
                $scope.changeFlag = false;
                console.log('flag false');
            }, function(value) {
                console.log('rejected:' + value);

            });
    };


    $rootScope.$on('ngDialog.opened', function(e, $dialog) {
        console.log('ngDialog opened: ' + $dialog.attr('id'));
    });

    $rootScope.$on('ngDialog.closed', function(e, $dialog) {
        console.log('ngDialog closed: ' + $dialog.attr('id'));
    });

    $rootScope.$on('ngDialog.closing', function(e, $dialog) {
        console.log('ngDialog closing: ' + $dialog.attr('id'));
    });

    $rootScope.$on('ngDialog.templateLoading', function(e, template) {
        console.log('ngDialog template is loading: ' + template);
    });

    $rootScope.$on('ngDialog.templateLoaded', function(e, template) {
        console.log('ngDialog template loaded: ' + template);
    });


    productsProduction.async().then(function(data) {
        $scope.Allproducts = data;

    });
    machineProducts.async().then(function(data) {
        $scope.products = data;
        $scope.zeroItems();
    });

    //showing active menu item
    $scope.getClass = function(path) {
        return ($location.path().substr(0, path.length) === path) ? 'active' : '';
    };

    //setting the selected id in order to highlight the tile when Edit button is pressed
    $scope.setSelected = function(idSelected) {
        $scope.idSelected = idSelected;
    };

    $scope.x = {
        inventoryNumber: 0,
        /*    prices: ''*/
    };


    //saving new values locally
    $scope.confirm = function(index) {

        id = Number(index);
        if (angular.isUndefined($scope.x.inventoryNumber[id])) {
            return console.log("The inventory is undefined");
        } else if ($scope.x.inventoryNumber[id] === null) {
            $scope.products[id].inventory = 0;
            return console.log("Empty field");

        } else {
            $scope.products[id].inventory = $scope.x.inventoryNumber[id];
            $scope.changeFlag = true;
            console.log('flag true');

        }

    };


    $scope.zeroItems = function() {
        $scope.counter = 0;
        $scope.counterTotal = 0;
        angular.forEach($scope.products, function(value, key) {
            $scope.counterTotal++;
            if (value.inventory == "0") {
                $scope.counter++;
            }

        });
    };


    //cancelling input
    $scope.cancel = function(index) {


        id = Number(index);
        $scope.x.inventoryNumber[id] = $scope.products[id].inventory;
        $scope.x.prices[id] = $scope.products[id].price;
    };

    //saving input
    $scope.save = function() {
        $http({
            url: API_PATH + 'merchant/pos/' + machineId + '/products',
            method: "POST",
            withCredentials: true,
            data: {
                products: $scope.products
            }
        }).success(
            function() {
                console.log($scope.products);
                $scope.saveMessage = true;
                $timeout(function() {
                    $scope.saveMessage = false;
                }, 1500);
            }).error(function() {
            console.log('bad')
        });
    };

    //reseting the ipad 
    $scope.exit = function() {

        $http({
            url: API_PATH + 'merchant/pos/' + machineId + '/reset',
            method: "POST",
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        }).success(
            function() {
                console.log("Success");
            }).error(function() {
            console.log("Unexpected error");
        });
    };

    //getting step flows in order to clean the cache and products to be redownloaded
    $scope.stepsGet = function() {

        $http(settings).then(function(response) {
            $http.get(API_PATH + 'merchant/pos/' + machineId + '/flowSteps', {
                withCredentials: true,
            }).then(function(response) {
                $scope.steps = response.data;
            });
        });
    };

    //posting step flows in order to clean the cache and products to be redownloaded
    $scope.stepPost = function() {
        $http({
            url: API_PATH + 'merchant/pos/' + machineId + '/flowSteps',
            method: "POST",
            withCredentials: true,
            data: {
                flowSteps: $scope.steps
            }

        }).success(
            function() {}).error(function() {});
    };

    $scope.stepsGet();

    //removing item from the machine list
    $scope.removeItem = function(item) {

        var text = "";
        $scope.products.splice($scope.products.indexOf(item), 1);
        $scope.changeFlag = true;
    };

    //inserting new item to the list
    $scope.insertItem = function(item) {

        if (!item) {
            return;
        }
        if ($scope.products.indexOf(item) == -1 && $scope.containsObject(item, $scope.products) === false) {
            $scope.products.unshift(item);
            $scope.changeFlag = true;
            console.log('save flag true')

        } else {
            item.errorMessage = true;
        }
    };

    $scope.check = function(item) {

        if (!item) {
            return;
        }
        if ($scope.products.indexOf(item) == -1 && $scope.containsObject(item, $scope.products) === false) {
            item.errorMessage = false;

        } else {
            item.errorMessage = true;
            console.log('Item added');
        }
    };

    $scope.check();

    //checking if the array of the machine contains the name of the new product
    $scope.containsObject = function(obj, list) {

        var i;
        for (i = 0; i < list.length; i++) {
            if (angular.equals(list[i].name, obj.name)) {
                return true;
            }
        }
        return false;
    };

    //toggling
    $scope.showDiv = function() {
        $scope.hiddenDiv = !$scope.hiddenDiv;
    };
};
