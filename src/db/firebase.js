import { collection, doc, getDoc, setDoc } from "firebase/firestore"
import { MAP_DATA_STORAGE, firestore, firestoreStorage } from "./firebase.config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { getStore } from "../store";
import { updateMapStore } from "../store/Map/Map.action";

export const saveMapData = async (data) => {
  await setDoc(
    doc(collection(firestore, MAP_DATA_STORAGE), MAP_DATA_STORAGE),
    data,
  );

  getStore().dispatch(updateMapStore({ isLoading: false }));
};

export const getMapData = async () => {
  const docRef = doc(firestore, MAP_DATA_STORAGE, MAP_DATA_STORAGE);
  const docData = await getDoc(docRef);

  if (docData.exists()) {
    const {
      mapSize: {
        mapValue: {
          fields: {
            x: mapSizeX,
            y: mapSizeY,
          },
        },
      },
      spaceBetweenMapCells,
      map: {
        mapValue: {
          fields: map,
        },
      },
    } = docData._document.data.value.mapValue.fields;

    const mapArray = [];
    Object.keys(map).forEach((i) => {
      const { arrayValue: { values } } = map[i];

      const mapLineArray = [];
      values.forEach(async ({ mapValue: { fields } }) => {
        const {
          data: {
            stringValue: data,
          },
          type: {
            stringValue: type,
          },
          imageName: {
            stringValue: imageName = '',
          } = {},
        } = fields;

        mapLineArray.push({ data: data, type: type, imageName: imageName });
      });

      mapArray.push(mapLineArray);
    });

    return {
      mapSize: {
        x: mapSizeX[Object.keys(mapSizeX)[0]],
        y: mapSizeY[Object.keys(mapSizeY)[0]],
      },
      spaceBetweenMapCells: spaceBetweenMapCells[Object.keys(spaceBetweenMapCells)[0]],
      map: mapArray,
    };
  } else {
    return null;
  }
};

export const saveImage = async (image) => {
  const { name } = image;

  const images = ref(firestoreStorage, name);
  uploadBytes(images, image);
};

export const getImage = async (imageName) => {
  const images = ref(firestoreStorage, imageName);

  return await getDownloadURL(images).catch(async () => {
    return await getImage(imageName);
  });
}
