"use strict";

const path = require("path");
const fs = require("fs").promises;
const storageConfig = require("./storageConfig.json");
const storageFile = path.join(__dirname, storageConfig.storageFile);
const { CODES, MESSAGES } = require(path.join(
  __dirname,
  storageConfig.errorCodes
));

//Wrapper function
function createDataStorage() {
  //Private API

  async function readStorage() {
    try {
      const data = await fs.readFile(storageFile, "utf-8");
      return JSON.parse(data);
    } catch (err) {
      return [];
    }
  }

  async function writeStorage(data) {
    try {
      await fs.writeFile(storageFile, JSON.stringify(data, null, 4), {
        encoding: "utf-8",
        flag: "w",
      });
      return MESSAGES.WRITE_OK();
    } catch (err) {
      return MESSAGES.WRITE_ERROR(err.message);
    }
  }

  async function getFromStorage(id) {
    return (await readStorage()).find((moped) => moped.mopedId == id) || null;
  }

  async function addToStorage(newMoped) {
    const storage = await readStorage();
    const isInStore = storage.find(
      (moped) => moped.mopedId == newMoped.mopedId
    );
    if (isInStore) {
      return false;
    } else {
      storage.push({
        mopedId: +newMoped.mopedId,
        name: newMoped.name,
        modelYear: +newMoped.modelYear,
        topspeed: +newMoped.topspeed,
        itemsInStock: +newMoped.itemsInStock,
      });
      await writeStorage(storage);
      return true;
    }
  }

  async function removeFromStorage(id) {
    let storage = await readStorage();
    const mopedIndex = storage.findIndex((moped) => moped.mopedId == id);
    if (mopedIndex < 0) {
      return false;
    } else {
      storage.splice(mopedIndex, 1);
      await writeStorage(storage);
      return true;
    }
  }

  async function updateStorage(moped) {
    let storage = await readStorage();
    const oldMoped = storage.find((oldMop) => oldMop.mopedId == moped.mopedId);
    if (oldMoped) {
      Object.assign(oldMoped, {
        mopedId: +moped.mopedId,
        name: moped.name,
        modelYear: +moped.modelYear,
        topspeed: +moped.topspeed,
        itemsInStock: +moped.itemsInStock,
      });
      await writeStorage(storage);
      return true;
    } else {
      return false;
    }
  }

  class Datastorage {
    get CODES() {
      return CODES;
    }

    getAll() {
      return readStorage();
    }

    get(id) {
      return new Promise(async (resolve, reject) => {
        if (!id) {
          reject(MESSAGES.NOT_FOUND("<empty id>"));
        } else {
          const result = await getFromStorage(id);
          if (result) {
            resolve(result);
          } else {
            reject(MESSAGES.NOT_FOUND(id));
          }
        }
      });
    }

    insert(moped) {
      return new Promise(async (resolve, reject) => {
        if (!(moped && moped.mopedId && moped.name)) {
          reject(MESSAGES.NOT_INSERTED());
        } else {
          if (await addToStorage(moped)) {
            resolve(MESSAGES.INSERT_OK(moped.mopedId));
          } else {
            reject(MESSAGES.ALREADY_IN_USE(moped.mopedId));
          }
        }
      });
    }

    remove(mopedId) {
      return new Promise(async (resolve, reject) => {
        if (!mopedId) {
          reject(MESSAGES.NOT_FOUND("<empty>"));
        } else {
          if (await removeFromStorage(mopedId)) {
            resolve(MESSAGES.REMOVE_OK(mopedId));
          } else {
            reject(MESSAGES.NOT_REMOVED());
          }
        }
      });
    }

    update(moped) {
      return new Promise(async (resolve, reject) => {
        if (!(moped && moped.mopedId && moped.name)) {
          reject(MESSAGES.NOT_UPDATED());
        } else {
          if (await updateStorage(moped)) {
            resolve(MESSAGES.UPDATE_OK(moped.mopedId));
          } else {
            reject(MESSAGES.NOT_UPDATED());
          }
        }
      });
    }
  }
  return new Datastorage();
}

module.exports = { createDataStorage };
