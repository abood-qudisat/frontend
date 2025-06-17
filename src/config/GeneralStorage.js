// store string data
export const storeData = async (key, value) => {
  try {
    localStorage.setItem(key, value);
  } catch (e) {
    console.error(`Error storing key "${key}":`, e);
  }
};

// get string data
export const getStoreData = async (key) => {
  try {
    const value = localStorage.getItem(key);
    return value;
  } catch (e) {
    console.error(`Error retrieving key "${key}":`, e);
    return null;
  }
};

// store JSON object
export const storeJsonData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    localStorage.setItem(key, jsonValue);
  } catch (e) {
    console.error(`Error storing JSON key "${key}":`, e);
  }
};

// get JSON object
export const getStoreJsonData = async (key) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (e) {
    console.error(`Error parsing JSON for key "${key}":`, e);
    return null;
  }
};

// remove data
export const removeStoreData = async (key) => {
  try {
    localStorage.removeItem(key);
    console.log('Removed:', key);
    return true;
  } catch (e) {
    console.error(`Error removing key "${key}":`, e);
    return false;
  }
};
