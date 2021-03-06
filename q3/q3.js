var Helper = require("../helper/helper");

var origin = {
    x: 0,
    y: 0
}

var path1 = "R995,D933,L284,U580,R453,U355,L352,U363,L506,D130,R300,D112,L751,U245,R174,U901,L586,D70,L348,U307,R596,D401,R311,D328,L612,D214,L161,U488,L813,U298,L299,D807,L791,D813,R946,U958,R258,D972,L72,U698,L170,D131,L552,D14,L760,U812,L203,D92,R483,U698,R800,U345,L947,D206,L991,D447,R832,D52,L134,D946,R108,D477,L818,D101,R784,U409,R23,U359,R981,D458,R786,U445,R874,U244,R381,U206,R86,U279,L787,U683,R52,U740,R210,U162,L748,U747,R283,D964,R782,D386,R205,D898,R774,U421,R908,D280,L567,D667,L302,D795,L822,D908,L160,U279,L58,D914,R828,U621,R338,U982,R471,U724,L509,U444,R377,D473,R307,U331,L529,U855,L474,U725,L905,U409,L881,U702,R162,D717,R498,U458,R119,U744,R2,D82,R337,D988,L235,U831,L373,D122,L310,D107,R685,U864,L356,U213,R246,U373,L809,U593,R582,U488,R847,U792,L182,U219,L232,D695,R183,U164,L730,D660,L581,D931,R36,D291,R614,U408,R928,D93,L685,D879,R37,D113,L563,D340,L212,D907,L557,D522,L610,D927,R11,U556,R571,U668,L834,U603,L407,U966,R245,D408,R822,U163,L265,D230,L144,D786,R479,U208,L781,D787,L146,U476,R561,U70,R879,U562,R805,D897,L44,U709,L773,U747,L806,U140,R953,D628,L752,D666,R916,D351,R175,D504,R232,U463,R415,U492,L252,D30,L574,U100,L333,U313,R403,D68,L976,D702,L205,D992,L552,U55,R216,U548,L894,U764,L919,U475,R656,U712,L754,U638,R33,U709,R643,U299,R151,U762,R767,D542,R581,D752,L701,D589,L312,U189,R922,D915,R975,U26,R244,U48,L971,U755,R889,D726,R126,U978,L275,D435,L732,D982,L654,D704,L98,U153,L983,U770,L429,U530,L545,D44,L36,U456,R442,D58,L321,U473,R657,U307,R314";
var path2 = "L999,U880,L754,D995,R105,U651,R762,U451,R612,U424,L216,D210,L946,U57,R685,U185,R234,D768,L927,U592,R545,U770,R456,D118,R22,U371,L721,D937,R144,U173,R337,D17,L948,U720,R617,D588,L57,U258,L979,U232,L473,D451,L829,D85,L985,D333,L492,D749,L972,U188,R214,D108,R247,U379,L218,D490,R451,U582,R674,D881,R725,U404,L916,U137,R745,D969,L206,D480,R634,U672,R897,D184,L768,D766,L529,U317,L909,D74,R529,D31,R483,D906,R961,D535,L937,D751,L564,U478,L439,U556,R385,D590,L518,D991,L232,D358,L962,U242,R856,U66,L847,U146,R196,U515,L892,U18,L535,U343,R430,U77,L967,U956,L64,D510,L29,D305,L954,U186,R624,D693,R354,D243,L145,D622,R456,U904,L233,D940,L82,D83,L726,D993,L338,D793,R340,D823,R147,D595,R296,D388,L106,D362,R114,U808,L496,U614,L809,U911,R480,D29,L802,U900,R920,U952,R237,D383,L480,U362,L761,U949,L920,D82,L511,U365,R657,U465,L256,U124,L810,U43,L668,U146,L847,D245,R937,D778,L995,D316,R423,U515,L626,D788,R453,U98,R886,U821,R749,D365,R915,U980,R322,D114,L556,D921,L551,D397,R232,D485,L842,D455,R940,U913,L196,D239,L221,D200,R438,U71,L979,U527,L86,U959,R768,D557,R553,D709,L838,U191,L916,D703,L687,U34,R463,D809,L3,U335,L231,D212,L674,U177,L51,D557,L939,U390,L28,U53,L653,D182,R329,D449,L563,D476,R258,D299,L142,U847,L38,U322,R294,U320,R314,D257,R622,U59,R501,D677,L880,U589,R599,D245,L851,U369,R262,D63,R722,D253,L546,U578,R909,U678,L63,U256,L237,U798,R465,D420,R797,D452,R548,U875,R523,D527,L467,U49,R726,D840,R882,U97,L398,D621,R38,U952,R196,D597,R627,D721,L441,D710,L18,D679,R218";
var path1InPoints = turnPathToCoordinatePoints(path1, origin);
var path2InPoints = turnPathToCoordinatePoints(path2, origin);
var intersectionsPoints1 = findAllIntersectionPointsOfPaths(path1InPoints, path2InPoints);
var intersectionsPoints2 = findAllIntersectionPointsOfPaths(path2InPoints, path1InPoints);
var map = convertPointsArrayToMap(intersectionsPoints1);
findStepsToIntersections(intersectionsPoints1, path1InPoints, map, true);
findStepsToIntersections(intersectionsPoints2, path2InPoints, map, false);

var res = findMinStepsInMap(map);
console.log(res);

function findMinStepsInMap(map){
    var min = Number.MAX_VALUE;
    map.forEach((value, key, map) => {
        min = Math.min(value.stepsToIntersection, min);
    });
    return min;
}

function findStepsToIntersections(intersectionPoints, lines, intersectionsMap, isFirst){
    var line;
    var lineIntersectingPoint;
    var currentSteps = 0;
    var stepsToIntersection = 0;
    var mapKey;
    var point, linePointObj;
    var intersectionPointsLinesArray = [];
    var pointIndex = 0;

    for (var i in intersectionPoints){
        point = intersectionPoints[i];
        lineIntersectingPoint = getLineIntersectWithPoint(point, lines);
        intersectionPointsLinesArray.push({
            intersectionPoint: point,
            line: lineIntersectingPoint
        });

    }


    for (var i in lines) {
        line = lines[i];
        
        if (pointIndex<intersectionPointsLinesArray.length){
            linePointObj = intersectionPointsLinesArray[pointIndex];
            while (sameLine(linePointObj.line, line)){
                
                stepsToIntersection = currentSteps + getDistanceFromCornerToIntersectionPoint(linePointObj.intersectionPoint, linePointObj.line);
                mapKey = getMapKey(linePointObj.intersectionPoint);
                if (isFirst)
                    intersectionsMap.get(mapKey).stepsToIntersection = stepsToIntersection;
                else
                    intersectionsMap.get(mapKey).stepsToIntersection += stepsToIntersection;

                pointIndex++;
                if (pointIndex<intersectionPointsLinesArray.length){
                    linePointObj = intersectionPointsLinesArray[pointIndex];
                } else {
                    break;
                }
            }

            currentSteps += getLineLength(line);
        } else {
            break;
        }
        
    }
}

function sameLine(line1, line2){

    if (line1.from.x==line2.from.x &&
        line1.from.y==line2.from.y &&
        line1.to.x==line2.to.x &&
        line1.to.y==line2.to.y) {

            return true;
        }
        

    return false;
}

function getLineLength(line){
    if (line.isVertical) {
        return Math.abs(line.from.y - line.to.y);
    }
    return Math.abs(line.from.x - line.to.x);
}

// assume there is an intersection
function getDistanceFromCornerToIntersectionPoint(point, line){
    if (line.isVertical) {
        return Math.abs(point.y - line.from.y);
    }
    return Math.abs(point.x - line.from.x);
}

// the input point MUST BE an intersection point
function getLineIntersectWithPoint(point, lines){
    var line;
    var pointOnLine;
    for (var i in lines) {
        line = lines[i];
        pointOnLine = doesPointLieOnLine(point, line);
        if (pointOnLine) {
            return line;
        }   
    }
    return null
}

function doesPointLieOnLine(point, line){
    if (line.isVertical) {
        if (line.from.x==point.x) {
            return doCheckingPointInBetween(line.from.y, line.to.y, point.y);
        }
    } else {
        if (line.from.y==point.y) {
            return doCheckingPointInBetween(line.from.x, line.to.x, point.x);
        }
    }
    return false;
}

function convertPointsArrayToMap(points){
    var map = new Map();
    var point;
    var key;

    for (var i in points) {
        point = points[i];
        key = getMapKey(point);
        map.set(key, point);
    }
    return map;
}

function getMapKey(point){
    return (point.x.toString() + "-" + point.y.toString());
}

function findClosestPointOfListOfData(data){
    var min = Number.MAX_VALUE;
    var minNumberIndex = 0;
    var point;

    for (var i in data) {
        point = data[i];
        
        if (point.distance<min) {
            min = point.distance;
            minNumberIndex = i;
        }
    }
    return data[minNumberIndex];
}

function getManhattanDistanceOfAListOfPoints(intersectionPoints){
    var m;
    var arr = [];
    for (var i in intersectionPoints) {
        point = intersectionPoints[i];
        m = manhattanDistanceOfPoints(origin, point);
        arr.push({
            point: point,
            distance: m
        });
    }
    return arr;
}

function manhattanDistanceOfPoints(point1, point2){
    return Math.abs(point1.x - point2.x) + Math.abs(point1.y - point2.y);
}

function findAllIntersectionPointsOfPaths(path1, path2) {
    var line1, line2;
    var intersect;
    var arr = [];
    var intersectinPoint;
    
    for (var i in path1) {
        line1 = path1[i];
        for (var k in path2) {
            line2 = path2[k];
            intersect = doTheyIntersect(line1, line2);
            if (intersect) {
                intersectinPoint = findIntersectionPointOfLines(line1, line2);
                arr.push(intersectinPoint);
            }
        }
    }
    return arr;
}

// assume the two given lines have intersection
function findIntersectionPointOfLines(line1, line2){
    var horizontalLine, verticalLine;

    if (line1.isVertical) {
        horizontalLine = line2;
        verticalLine = line1;
    } else {
        horizontalLine = line1;
        verticalLine = line2;
    }

    return {
        x: verticalLine.to.x,
        y: horizontalLine.to.y
    }
}

function doTheyIntersect(line1, line2){
    if (line1.isVertical==line2.isVertical) return false;

    var horizontalLine, verticalLine;

    if (line1.isVertical) {
        horizontalLine = line2;
        verticalLine = line1;
    } else {
        horizontalLine = line1;
        verticalLine = line2;
    }

    var firstPass = doCheckingPointInBetween(horizontalLine.from.x, horizontalLine.to.x, verticalLine.from.x);
    if (!firstPass) return false;

    var secondPass = doCheckingPointInBetween(verticalLine.from.y, verticalLine.to.y, horizontalLine.from.y);
    return secondPass;

}

function doCheckingPointInBetween(point1, point2, checkingPoint){
    var smallerPoint = Math.min(point1, point2);
    var biggerPoint = Math.max(point1, point2);

    if (smallerPoint <= checkingPoint && checkingPoint <= biggerPoint)    return true;
    return false;
}
function turnPathToCoordinatePoints(path, origin){
    var linesInPoints = [];
    var lines = path.toString().split(",");
    var line;
    var currentPoint = origin;
    var newPoint, from, to;

    for (var i in lines) {
        line = lines[i];
        newPoint = turnLineToCoordinatePoints(currentPoint, line);
        from = currentPoint;
        to = newPoint;
        linesInPoints.push({
            from: from,
            to: to,
            isVertical: isVerticalLine(line)
        });
        currentPoint = to;
    }
    return linesInPoints;
}

function isVerticalLine(line){
    var direction = line.charAt(0);
    if (direction=="U" || direction=="D") {
        return true;
    }
    return false;
}

function turnLineToCoordinatePoints(staringPoint, line){
   
    var direction = line.charAt(0);
    var distance = parseInt(line.substring(1));
    var point;
    switch (direction) {
        case "U":
            point = {
                x: staringPoint.x,
                y: staringPoint.y + distance
            }
            break;
        case "D":
            point = {
                x: staringPoint.x,
                y: staringPoint.y - distance
            }
            break;
        case "L":
            point = {
                x: staringPoint.x - distance,
                y: staringPoint.y
            }
            break;
        case "R":
        default:
            point = {
                x: staringPoint.x + distance,
                y: staringPoint.y
            }
            break;
    }
    return point;
    
}