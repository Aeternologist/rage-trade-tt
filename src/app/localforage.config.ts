import localforage from 'localforage';

localforage.config({
    driver: localforage.INDEXEDDB,
    name: `${process.env.NEXT_PUBLIC_APP_NAME}`,
    storeName: `${process.env.NEXT_PUBLIC_APP_NAME} Data`,
    description: `Store ${process.env.NEXT_PUBLIC_APP_NAME} Data`,
    version: Number(process.env.NEXT_PUBLIC_LOCALFORAGE_STORE_VERSION),
});

export default localforage;
