
// @ts-ignore

export type BusDetails =  {
    timeToStation: number,
    lineName: string,
    destinationName: string
}

export type StopPoint = {
    id: string,
    commonName: string,
    distance: number,

}

type GeoCoords = {
    latitude: number
    longitude: number
}

async function queryArrivals( stopCode: string): Promise<BusDetails[] | undefined> {
    let query = `https://api.tfl.gov.uk/StopPoint/${stopCode}/Arrivals?app_key=83944ee14a534d978a5012be9e3e4f8b`

    try {
        const response = await fetch(query);
        return await response.json();
    } catch (error: any) {
        console.error(error)
    }
}



function getNextNBusDetails(response: BusDetails[], n: number): BusDetails[] {
    let sortedBuses = response.sort(
        function (a: BusDetails, b: BusDetails): number {
            return Math.sign(a.timeToStation - b.timeToStation)
        }
    )
    return sortedBuses.slice(0,n);
}

async function getPostcodeLocation(postCode: string) : Promise<GeoCoords | undefined>{
    let query = `https://api.postcodes.io/postcodes/${postCode}`
    try {
        const response = await fetch(query);
        const responseJson = await response.json();
        return {latitude: responseJson.result.latitude, longitude: responseJson.result.longitude}
    } catch (error: any) {
        console.error(error)
    }

    return undefined

}

async function getNearestNStopPoints(geocoords: GeoCoords, count: number): Promise<StopPoint[] | undefined> {
    let query = `https://api.tfl.gov.uk/StopPoint/?app_key=83944ee14a534d978a5012be9e3e4f8b&lat=${geocoords.latitude}&lon=${geocoords.longitude}&stopTypes=NaptanPublicBusCoachTram`
    try {
        const response = await fetch(query);
        const responseJson = await response.json();

        let sortedStops = responseJson.stopPoints.sort(
            function(a:StopPoint,b:StopPoint) {return a.distance - b.distance}
        );

        return sortedStops.slice(0,count)

    } catch (error: any) {
        console.error(error)
    }
}

export async function getNearestNStopPointsToPostCode(postCode: string, n: number): Promise<StopPoint[] | undefined> {

    let geocoords = await getPostcodeLocation(postCode);
    if (geocoords === undefined) return undefined;

    return await getNearestNStopPoints(geocoords,n);

}

export async function getStopPointNextNArrivals(stopPoint: StopPoint, n: number): Promise<BusDetails[]> {

    let arrivals = await queryArrivals(stopPoint.id);
    if (arrivals === undefined) throw new Error(`Undefined arrivals at ${stopPoint.id}`);

    return getNextNBusDetails(arrivals, n)
}