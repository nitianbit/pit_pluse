import AsyncStorage from '@react-native-async-storage/async-storage';


class Storage {

    get = (key) => {
        return new Promise(async (resolve, reject) => {
            try {
                const value = await AsyncStorage.getItem(key);
                if (!value) return resolve(null);
                return resolve(JSON.parse(value).value)

            } catch (error) {
                reject(error);
            }
        });
    }


    //store everything in this format JSON.stringify({key:value})
    saveKey = (key, value) => {
        return new Promise(async (resolve, reject) => {
            try {
                //storing every value as {key:value}
                const jsonValue = JSON.stringify({ value: value });
                await AsyncStorage.setItem(key, jsonValue);
                return resolve("success")

            } catch (error) {
                reject(error);
            }
        });
    }

    removeKey = (key) => {
        return new Promise(async (resolve, reject) => {
            try {
                await AsyncStorage.removeItem(key);
                return resolve("success")

            } catch (error) {
                reject(error);
            }
        });
    }

    clearAll = () => {
        return new Promise(async (resolve, reject) => {
            try {
                await AsyncStorage.clear();
                return resolve("success")

            } catch (error) {
                reject(error);
            }
        });
    }
}

const storageService = new Storage();
Object.freeze(storageService);

export default storageService