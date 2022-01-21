AlameinLine = ["Flinders Street", "Richmond","East Richmond", "Burnley", "Hawthorn", "Glenferrie"]

GlenWaverly = ["Flagstaff", "Melbourne Central", "Parliament", "Richmond", "Kooyong", "Tooronga"]

Sandringham = ["Southern Cross", "Richmond", "South Yarra", "Prahran", "Windsor"]

var Melbtrains = [AlameinLine, GlenWaverly, Sandringham]

function runMultipleTrains (origin, destination){
    var originArray = ""
    var originIndex = ""
    var destinationArray = ""
    var destinationIndex = ""
    Melbtrains.forEach(function(array){
        if (array.includes(origin)){
            originArray = array
            originIndex = array.indexOf(origin)
        }
    }) 
    Melbtrains.forEach(function(array){
        if (array.includes(destination)){
            destinationArray = array
            destinationIndex = array.indexOf(destination)
        }
    })
    if (origin == "Richmond"){
        originArray = destinationArray
        originIndex = originArray.indexOf("Richmond")
    } else if (destination == "Richmond"){
        destinationArray = originArray
        destinationIndex = destinationArray.indexOf("Richmond")
    }
    generateRoute(originIndex, originArray, destinationIndex, destinationArray)
}

function generateRoute(originIndex, originArray,  destinationIndex, destinationArray) {
    if (originArray.toString() == destinationArray.toString()){
        directRoute(originIndex, destinationIndex, originArray)
    }else {
        generateHalfRoute(originIndex, originArray)
        var originRoute = halfRoute
        generateHalfRoute(destinationIndex, destinationArray)
        var destinationRoute = halfRoute
        var stopsCoutner = originRoute.length + destinationRoute.length
        if (originIndex < originArray.indexOf("Richmond")){
            var originString = drawStringForward(originRoute, originArray)
        } else { 
            var originString = drawStringReverse(originRoute, originArray)
        } if (destinationIndex > destinationArray.indexOf("Richmond")){
            var destinationString = drawStringForward(destinationRoute, destinationArray)
        } else {
            var destinationString = drawStringReverse(destinationRoute, destinationArray)
        }
        var spacedRoutes = routesSpacing(originString, destinationString)
        spacedOriginString = spacedRoutes[0]
        spacedDestinationString = spacedRoutes[1]
        var mergedRoute = mergeRoutes(spacedOriginString, spacedDestinationString, originArray, destinationArray)
        drawTransferTicket(originArray[originIndex], destinationArray[destinationIndex], mergedRoute, stopsCoutner)
    }
}


function directRoute(originIndex, destinationIndex, originArray){
    route = []
    var origin = originArray[originIndex]
    var destination = originArray[destinationIndex]
    if (originIndex < destinationIndex) {
        while (originIndex <= destinationIndex) {
            route.push(originArray[originIndex])
            originIndex++
        }
    } else {
        while (originIndex >= destinationIndex){
            route.push(originArray[destinationIndex])
            destinationIndex++
        }
    }
    drawDirectTicket(origin, destination, route, originArray)
}

function generateHalfRoute(Index, Array){
    indexRichmond = Array.indexOf("Richmond")
    halfRoute = []
    if (Index < indexRichmond){
        while (Index < indexRichmond) {
            halfRoute.push(Array[Index]);
            Index++;
        }
        halfRoute.push("Richmond")
    }else {
        while (Index > indexRichmond) {
            halfRoute.push(Array[indexRichmond])
            indexRichmond++;
        } 
        halfRoute.push(Array[Index])
    }
    return halfRoute
}


function drawDirectTicket(origin, destination, route, originArray){
    console.log(route)
    if (originArray.indexOf(origin) < originArray.indexOf(destination)){
    console.log( `
Origin: ${origin}
Destination: ${destination}

${route.join(" --->")}

${route.length} stops total`
)
    } else {
    console.log( 
`Origin: ${origin}
Destination: ${destination}

${route.join(" <--- ")}

${route.length} stops total`
)
    }
}

function drawStringForward(route, array){
    var routeString = ""
    routeString += route.join(" ---> ")
    return routeString;
}

function drawStringReverse(route){
    var routeString = ""
    routeString = route.join(" <--- ")
    return routeString
}

function routesSpacing(originString, destinationString) {
    if (originString.indexOf("Richmond") > destinationString.indexOf("Richmond")){
        while (destinationString.indexOf("Richmond") < originString.indexOf("Richmond")) {
            destinationString = " " + destinationString
        }
    } else {
        while (originString.indexOf("Richmond") < destinationString.indexOf("Richmond")) {
            originString = " " + originString
        }
    }
    var spacedRoutes = [originString, destinationString]
    return spacedRoutes
}

function mergeRoutes(spacedOriginString, spacedDestinationString, originArray, destinationArray) {
    var originArrayIndex = Melbtrains.indexOf(originArray)
    var destinationArrayIndex = Melbtrains.indexOf(destinationArray)
    var mergerlength = Math.abs(originArrayIndex - destinationArrayIndex)
    if (originArrayIndex < destinationArrayIndex){
        var upperRoute = spacedOriginString
        var lowerRoute = spacedDestinationString
    } else {
        var upperRoute = spacedDestinationString
        var lowerRoute = spacedOriginString
    }
    var insertBarsHere = upperRoute.indexOf("Richmond") + 3
    upperRoute += "\n"
    for (i = 0; i < insertBarsHere; i++) {
        upperRoute += " "
    }
    upperRoute += "||\n"
    if (mergerlength == 2){
        for (i = 0; i < insertBarsHere - 3; i++) {
            upperRoute += " "
        }
        upperRoute += "Richmond\n"
        for (i = 0; i < insertBarsHere; i++) {
            upperRoute += " "
        }
        upperRoute += "||\n"
    }
    upperRoute += lowerRoute
    return upperRoute
}

function drawTransferTicket(origin, destination, mergedRoute, stopsCoutner) {
    console.log(
        `
Origin: ${origin}
Destination: ${destination}

${mergedRoute}

${stopsCoutner} stops in total!
        `
    )
}