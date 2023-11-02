//toplam.js

import { MongoClient } from 'mongodb';

async function getTotalValues(targetSayaçKodu) {
    const url = "mongodb+srv://okances:Hayal1991@cluster0.uwggqpl.mongodb.net/excelDB";
    const dbName = "excel2DB";
    const collectionName = "csv2DB";

    const client = new MongoClient(url, { useUnifiedTopology: true });



    try {
        await client.connect();
        const database = client.db(dbName);
        const collection = database.collection(collectionName);

        // Retrieve documents with the specified "Sayaç Etso Kodu"
        const data = await collection.find({ "Sayaç Etso Kodu": targetSayaçKodu }).toArray();
        //console.log(data);
        // Initialize variables to store total values
        let totalÜretim = 0;
        let totalTüketim = 0;
        let totalÇekisEndüktif = 0;
        let totalÇekisKapasitif = 0;
        let totalVerisEndüktif = 0;
        let totalVerisKapasitif = 0;

        // Iterate through the documents and calculate totals
        data.forEach(item => {
            totalÜretim += parseFloat(item["Üretim Miktari (MWh)"].replace(',', '.')) || 0;
            totalTüketim += parseFloat(item["Tüketim Miktari (MWh)"].replace(',', '.')) || 0;
            totalÇekisEndüktif += parseFloat(item["Çekis Endüktif (MWh)"].replace(',', '.')) || 0;
            totalÇekisKapasitif += parseFloat(item["Çekis Kapasitif (MWh)"].replace(',', '.')) || 0;
            totalVerisEndüktif += parseFloat(item["Veris Endüktif (MWh)"].replace(',', '.')) || 0;
            totalVerisKapasitif += parseFloat(item["Veris Kapasitif (MWh)"].replace(',', '.')) || 0;
        });
        const endüktifOran = ((totalÇekisEndüktif / totalTüketim) * 100).toFixed(2);
        const kapasitifOran = ((totalVerisKapasitif / totalTüketim) * 100).toFixed(2);

        console.log("Toplam Üretim Miktari: " + (totalÜretim.toFixed(2)) + " MWh");
        console.log("Toplam Tüketim Miktari: " + (totalTüketim.toFixed(2)) + " MWh");
        console.log("Toplam Çekis Endüktif: " + (totalÇekisEndüktif.toFixed(2)) + " MWh");
        console.log("Toplam Çekis Kapasitif: " + (totalÇekisKapasitif.toFixed(2)) + " MWh");
        console.log("Toplam Veris Endüktif: " + (totalVerisEndüktif.toFixed(2)) + " MWh");
        console.log("Toplam Veris Kapasitif: " + (totalVerisKapasitif.toFixed(2)) + " MWh");
        console.log("Endüktif Oran: " + "% " + ((totalÇekisEndüktif / totalTüketim) * 100).toFixed(2));
        console.log("Kapasitif Oran: " + "% " + ((totalVerisKapasitif / totalTüketim) * 100).toFixed(2));

        return {
            totalÜretim,
            totalTüketim,
            totalÇekisEndüktif,
            totalÇekisKapasitif,
            totalVerisEndüktif,
            totalVerisKapasitif,
            endüktifOran,
            kapasitifOran
        };
    } catch (err) {
        console.error("Hata oluştu: ", err);
    } finally {
        client.close();
    }
}

export default getTotalValues;


