import { MongoClient } from 'mongodb';
import fs from 'fs';
import csv from 'csv-parser';

const databaseURL = 'mongodb+srv://okances:Hayal1991@cluster0.uwggqpl.mongodb.net/excelDB';
const dbName = 'excel2DB'; // Veritabanı adı
const collectionName = 'csv2DB'; // Koleksiyon adı

async function createDatabaseAndCollection() {
    const client = new MongoClient(databaseURL);

    try {
        await client.connect();
        console.log('MongoDB bağlantısı başarılı.');

        const db = client.db(dbName);
        await db.createCollection(collectionName);// bu satır silinebilir

        console.log(`Veritabanı "${dbName}" ve koleksiyon "${collectionName}" oluşturuldu.`);
    } catch (err) {
        console.error('MongoDB bağlantı hatası:', err);
    } finally {
        client.close();
    }
}

async function importCSV() {
    const client = new MongoClient(databaseURL);

    try {
        await client.connect();
        console.log('MongoDB bağlantısı başarılı.');

        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        const results = [];

        fs.createReadStream('sayfa2.csv')
            .pipe(csv())
            .on('data', (row) => {
                results.push(row);
            })
            .on('end', async () => {
                try {
                    const result = await collection.insertMany(results);
                    console.log(`CSV verileri başarıyla koleksiyona aktarıldı. Eklenen belge sayısı: ${result.insertedCount}`);
                } catch (err) {
                    console.error('Veri eklenirken hata oluştu:', err);
                } finally {
                    client.close();
                }
            });
    } catch (err) {
        console.error('MongoDB bağlantı hatası:', err);
    }
}

createDatabaseAndCollection()
    .then(() => {
        importCSV();
    });


