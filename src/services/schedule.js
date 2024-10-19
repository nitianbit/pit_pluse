// let currentDriver = 0;

import moment, { duration } from "moment";

// class Schedule {
//     constructor(name, startDriveTime, endDriveTime, drivingDuration) {
//         this.name = name;
//         this.startDriveTime = startDriveTime;
//         this.endDriveTime = endDriveTime;
//         this.drivingDuration = drivingDuration;
//     }
// }

// function timeToMinutes(time) {
//     let [hours, minutes] = time.split(':').map(Number); // Use ':' to split hours and minutes
//     return hours * 60 + minutes;
// }

// function minutesToTime(minutes) {
//     let hours = Math.floor(minutes / 60);
//     let mins = minutes % 60;
//     return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`; // Pad with leading 0
// }

// function getDuration(startTime, endTime) {
//     let startMinutes = timeToMinutes(startTime);
//     let endMinutes = timeToMinutes(endTime);

//     // If endTime is earlier than startTime, assume it wraps over to the next day
//     if (endMinutes < startMinutes) {
//         endMinutes += 24 * 60; // Add 24 hours' worth of minutes to endTime
//     }

//     return endMinutes - startMinutes;
// }

// function getNumberOfDrivers(startTime, endTime, fuelTime) {
//     let totalStintDuration = getDuration(startTime, endTime);
//     let fuelTimeInMinutes = fuelTime; // You can pass fuelTime directly as minutes 
//     return Math.ceil(totalStintDuration / fuelTimeInMinutes);
// }

// export const getSchedule=(startTime, endTime, fuelTime, totalDrivers)=> {//23:00,22:59,81,5
//     let numberOfDrivers = getNumberOfDrivers(startTime, endTime, fuelTime);//18 //total driver shift required
//     let stintSchedule = [];
//     let totalDuration = getDuration(startTime, endTime);//1440 //total trip duration
//     let drivingDuration = totalDuration / numberOfDrivers;//80 //driving duration per driver

//     let startMinutes = timeToMinutes(startTime);//23*60=1380 //start time to mins

//     for (let i = 0; i < numberOfDrivers; i++) {
//         let driverOfStint = currentDriver % totalDrivers;

//         let endMinutes = startMinutes + drivingDuration;

//         stintSchedule.push(new Schedule(
//             driverOfStint,
//             minutesToTime(startMinutes),
//             minutesToTime(endMinutes),
//             drivingDuration // Convert duration to hours
//         ));

//         startMinutes = endMinutes; // Update start time for the next stint
//         currentDriver++;
//     }

//     // Print the schedule
//     stintSchedule.forEach(current => {
//         console.log(`${current.name}, ${current.startDriveTime}, ${current.endDriveTime}, ${current.drivingDuration} minutes`);
//     });
// }

// // Example Usage
// // getSchedule("10:00", "14:00", 92, 3);  // startTime, endTime, fuelTime in minute, TotalDrivers




class Schedule {
    constructor(name, startDriveTime, endDriveTime, drivingDuration) {
        this.name = name;
        this.startDriveTime = startDriveTime;
        this.endDriveTime = endDriveTime;
        this.drivingDuration = drivingDuration;
    }
}

class ScheduleService {
    constructor() {
        this.currentDriver = 0; // Move currentDriver into the class
        this.driverDurationList = [];
        this.data={};
    }

    // Helper function to convert time (HH:MM) to total minutes
    timeToMinutes(time) {
        const [hours, minutes] = time.split(':').map(Number);
        return hours * 60 + minutes;
    }

    // Helper function to convert total minutes to time (HH:MM)
    minutesToTime(minutes) {
        let hours = Math.floor(minutes / 60);  // Wrap hours around 24
        // const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`; // Pad with leading zeros
    }

    // Helper function to calculate the duration in minutes between two times
    getDuration(startTime, endTime) {
        let startMinutes = this.timeToMinutes(startTime);
        let endMinutes = this.timeToMinutes(endTime);

        // If the end time is earlier than the start time, assume the shift crosses midnight
        if (endMinutes < startMinutes) {
            endMinutes += 24 * 60; // Add 24 hours' worth of minutes
        }

        return endMinutes - startMinutes;
    }

    // Helper function to calculate the number of driver shifts needed
    getNumberOfDrivers(startTime, endTime, fuelTime) {
        const totalStintDuration = this.getDuration(startTime, endTime);
        return Math.ceil(totalStintDuration / fuelTime); // fuelTime is in minutes
    }

    // Main function to generate the schedule
    getSchedule(startTime, endTime, fuelTime, totalDrivers,driverDurationList=[]) {
 
        const numberOfDrivers = this.getNumberOfDrivers(startTime, endTime, fuelTime); // Total driver shifts required
        const stintSchedule = [];
        const totalDuration = this.getDuration(startTime, endTime); // Total trip duration
        const drivingDuration = totalDuration / numberOfDrivers; // Driving duration per driver

        let startMinutes = this.timeToMinutes(startTime); // Start time in minutes

        for (let i = 0; i < numberOfDrivers; i++) {
            const driverOfStint = this.currentDriver % totalDrivers; // Assign drivers in a round-robin fashion

            const endMinutes = startMinutes + drivingDuration;

            stintSchedule.push(new Schedule(
                driverOfStint,
                this.minutesToTime(startMinutes),
                this.minutesToTime(endMinutes),
                drivingDuration // Driving duration in minutes
            ));

            startMinutes = endMinutes; // Update start time for the next shift
            this.currentDriver++; // Increment driver for the next shift
            driverDurationList[driverOfStint] += drivingDuration;//update current driver duration
        }

        // Optionally, log the schedule
        // stintSchedule.forEach((current) => {
        //     console.log(`${current.name}, ${current.startDriveTime}, ${current.endDriveTime}, ${current.drivingDuration.toFixed(2)} minutes`);
        // });

        return stintSchedule;
    }

    // Optionally, a function to reset currentDriver if needed
    resetDriverCounter() {
        this.currentDriver = 0;
    }

    formatTimestamptoHHMM = (timestamp) => {
        return moment.unix(timestamp).format('HH:mm');
    }

    getStats = (data) => {
        let stops = data?.stops?.map(stop => ({ ...stop,start:moment(stop.start).format('HH:mm') }));

        const startTime=moment(data.date).unix();
        const endTime=startTime+(data.duration*60*60)??0;

        stops.unshift({ start:moment.unix(startTime).format('HH:mm') , duration: 0, type: 'src' });
        stops.push({ start: moment.unix(endTime).format('HH:mm'), duration: 0, type: 'dst' });

        const res = [];
        let driverDurationList = Array(data.drivers.length).fill(0);

        for (let i = 0; i < stops.length - 1; i++) {
            let startTime = stops[i].start; //here start time will be in format hh:mm
            const duration = duration??0;//stop duration how much time to stop there before starting next stint (in mins)
            
            startTime = this.timeToMinutes(startTime) + duration;
            let endTime = this.timeToMinutes(stops[i+1].start);

            res.push(
                this.getSchedule(
                    this.minutesToTime(startTime),
                    this.minutesToTime(endTime), 
                    data.fuelDuration,
                    data.drivers.length, 
                    driverDurationList
                )
            )
            //TODO push the service stop
        }
        //TODO  TOTAL STINTS WILL BE res.flat().LENGTH - NO OF STOPS (excluding start and stop) 
        //TODO AVG STINT DURATION = SUM OF total duration of all stints(driverDurationList) / total number of stints
        const totalStints= res.flat().length - (data.stops?.length ?? 0);
        const totalDuration = driverDurationList.reduce((a, b) => a + b, 0);
        const avgStintDuration = driverDurationList.reduce((a, b) => a + b, 0) / totalStints;
        // const avgStintDuration = driverDurationList.reduce((a, b) => a + b, 0) / driverDurationList.length;
        
        this.data = {
            schedule: res.flat(),
            driverDurationList,
            totalStints,
            totalDuration,
            avgStintDuration
        }

        return this.data;
        // return res.flat();
    }

    getCurrentDriverAndTimeLeft() {
        const currentTime=moment().unix();
        const currentMinutes = this.timeToMinutes(moment.unix(currentTime).format('HH:mm')); // Current time in minutes

        const schedule = this.data.schedule; // The complete schedule
    
        if(!this.data.schedule){
            return {
                currentDriver: null,
                timeLeft: 0 
            };
        }
        //TODO create schedule if not found
        if(!this.data.schedule){
            return {
                currentDriver: null,
                timeLeft: 0 
            };
        }

        for (let stint of schedule) {
            const startMinutes = this.timeToMinutes(stint.startDriveTime);
            const endMinutes = this.timeToMinutes(stint.endDriveTime);

            // If the current time is within this driver's stint
            if (currentMinutes >= startMinutes && currentMinutes < endMinutes) {
                const timeLeft = endMinutes - currentMinutes; // Time left for the driver
                return {
                    currentDriver: stint.name,
                    timeLeft: timeLeft 
                };
            }
        }

        return {
            currentDriver: null,
            timeLeft: 0 
        };
    }

    getDriversAndTimeLeft() {
        const currentTime = moment().unix(); // Current time as a timestamp
        const currentMinutes = this.timeToMinutes(moment.unix(currentTime).format('HH:mm')); // Current time in minutes
    
        const schedule = this.data.schedule; // The complete schedule
        if (!schedule || schedule.length === 0) {
            return {
                drivers: {},
                currentDriver: null,
                timeLeft: 0
            };
        }
    
        let drivers = {}; // Initialize an object for driver details
    
        // Set up drivers with total driving duration and initialize remaining time
        this.data.driverDurationList.forEach((totalDrivingDuration, index) => {
            drivers[index] = {
                totalDrivingDuration: totalDrivingDuration.toFixed(2),
                remainingTime: 0 // Initialize remaining time
            };
        });
    
        let currentDriver = null;
        let timeLeft = 0;
    
        // Iterate through each stint and calculate remaining time
        for (let stint of schedule) {
            const startMinutes = this.timeToMinutes(stint.startDriveTime);
            const endMinutes = this.timeToMinutes(stint.endDriveTime);
            const driver = stint.name;
    
            if (currentMinutes < endMinutes) {
                // Calculate the remaining time in this stint
                const remainingInStint = endMinutes - Math.max(currentMinutes, startMinutes);
    
                // Add remaining time for this driver
                drivers[driver].remainingTime += remainingInStint;
    
                // If the current time is within this driver's stint, set them as the current driver
                if (currentMinutes >= startMinutes && currentMinutes < endMinutes) {
                    currentDriver = driver;
                    timeLeft = remainingInStint;
                }
            }
        }
    
        return {
            drivers,       // Object containing driver durations including remaining time across all stints
            currentDriver, // Active driver
            timeLeft       // Time left for the current driver in this stint
        };
    }

    // getRemainingRaceAndFuelTime() {
    //     const currentTime = moment().unix(); // Current time as a timestamp
    //     const currentMinutes = this.timeToMinutes(moment.unix(currentTime).format('HH:mm')); // Current time in minutes

    //     const schedule = this.data.schedule; // The complete schedule
    //     if (!schedule || schedule.length === 0) {
    //         return {
    //             remainingRaceTime: 0,
    //             remainingFuelTime: 0
    //         };
    //     }

    //     let remainingRaceTime = 0;
    //     let remainingFuelTime = 0;

    //     // Calculate total race time
    //     const raceStart = this.timeToMinutes(schedule[0].startDriveTime);
    //     const raceEnd = this.timeToMinutes(schedule[schedule.length - 1].endDriveTime);
    //     const totalRaceTime = raceEnd - raceStart;

    //     // Remaining race time is the difference between current time and race end time
    //     if (currentMinutes < raceEnd) {
    //         remainingRaceTime = raceEnd - currentMinutes;
    //     }

    //     // Find remaining time for the next fuel stop by checking the schedule
    //     for (let stint of schedule) {
    //         const startMinutes = this.timeToMinutes(stint.startDriveTime);
    //         const endMinutes = this.timeToMinutes(stint.endDriveTime);

    //         // If current time is within a stint, find the remaining time in this stint
    //         if (currentMinutes >= startMinutes && currentMinutes < endMinutes) {
    //             remainingFuelTime = endMinutes - currentMinutes;
    //             break;
    //         }
    //     }

    //     return {
    //         remainingRaceTime,
    //         remainingFuelTime
    //     };
    // }

    getRemainingRaceAndFuelTime() {
        const currentTime = moment().unix(); // Current time as a timestamp
        const currentMinutes = this.timeToMinutes(moment.unix(currentTime).format('HH:mm')); // Current time in minutes
    
        const schedule = this.data.schedule; // The complete schedule
        if (!schedule || schedule.length === 0) {
            return {
                remainingRaceTime: 0,
                remainingFuelTime: 0,
                currentStintDuration: 0 // Initialize current stint duration
            };
        }
    
        let remainingRaceTime = 0;
        let remainingFuelTime = 0;
        let currentStintDuration = 0; // Initialize current stint duration
    
        // Calculate total race time
        const raceStart = this.timeToMinutes(schedule[0].startDriveTime);
        const raceEnd = this.timeToMinutes(schedule[schedule.length - 1].endDriveTime);
        const totalRaceTime = raceEnd - raceStart;
    
        // Remaining race time is the difference between current time and race end time
        if (currentMinutes < raceEnd) {
            remainingRaceTime = raceEnd - currentMinutes;
        }
    
        // Find remaining time for the next fuel stop and current stint duration by checking the schedule
        for (let stint of schedule) {
            const startMinutes = this.timeToMinutes(stint.startDriveTime);
            const endMinutes = this.timeToMinutes(stint.endDriveTime);
    
            // If current time is within a stint, find the remaining time in this stint
            if (currentMinutes >= startMinutes && currentMinutes < endMinutes) {
                remainingFuelTime = endMinutes - currentMinutes; // Remaining fuel time
                currentStintDuration = endMinutes - startMinutes; // Calculate total duration of the current stint
                break;
            }
        }
    
        return {
            remainingRaceTime,
            remainingFuelTime,
            currentStintDuration // Return current stint duration
        };
    }
    

      
    

}

const scheduleService = new ScheduleService();
export default scheduleService;
