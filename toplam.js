// import { MongoClient } from 'mongodb';

// async function getTotalValues(targetSayaçKodu) {
//     const url = "mongodb+srv://okances:Hayal1991@cluster0.uwggqpl.mongodb.net/excelDB";
//     const dbName = "excelDB";
//     const collectionName = "csvDB";

//     const client = new MongoClient(url, { useUnifiedTopology: true });

//     try {
//         await client.connect();
//         const database = client.db(dbName);
//         const collection = database.collection(collectionName);

//         const data = await collection.find({ "Sayaç Etso Kodu": targetSayaçKodu }).toArray();

//         let totalÜretim = 0;
//         let totalTüketim = 0;
//         let totalÇekisEndüktif = 0;
//         let totalÇekisKapasitif = 0;
//         let totalVerisEndüktif = 0;
//         let totalVerisKapasitif = 0;

//         data.forEach(item => {
//             totalÜretim += item["Üretim Miktari (MWh)"] || 0;
//             totalTüketim += item["Tüketim Miktari (MWh)"] || 0;
//             totalÇekisEndüktif += item["Çekis Endüktif (MWh)"] || 0;
//             totalÇekisKapasitif += item["Çekis Kapasitif (MWh)"] || 0;
//             totalVerisEndüktif += item["Veris Endüktif (MWh)"] || 0;
//             totalVerisKapasitif += item["Veris Kapasitif (MWh)"] || 0;
//         });

//         console.log("Toplam Üretim Miktari: " + totalÜretim + " MWh");
//         console.log("Toplam Tüketim Miktari: " + totalTüketim + " MWh");
//         console.log("Toplam Çekis Endüktif: " + totalÇekisEndüktif + " MWh");
//         console.log("Toplam Çekis Kapasitif: " + totalÇekisKapasitif + " MWh");
//         console.log("Toplam Veris Endüktif: " + totalVerisEndüktif + " MWh");
//         console.log("Toplam Veris Kapasitif: " + totalVerisKapasitif + " MWh");

//         console.log(
//             "Toplam Üretim Miktari: " + totalÜretim + " MWh, " +
//             "Toplam Tüketim Miktari: " + totalTüketim + " MWh, " +
//             "Toplam Çekis Endüktif: " + totalÇekisEndüktif + " MWh, " +
//             "Toplam Çekis Kapasitif: " + totalÇekisKapasitif + " MWh, " +
//             "Toplam Veris Endüktif: " + totalVerisEndüktif + " MWh, " +
//             "Toplam Veris Kapasitif: " + totalVerisKapasitif + " MWh"
//         );


//         return {
//             totalÜretim,
//             totalTüketim,
//             totalÇekisEndüktif,
//             totalÇekisKapasitif,
//             totalVerisEndüktif,
//             totalVerisKapasitif
//         };
//     } catch (err) {
//         console.error("Hata oluştu: ", err);
//     } finally {
//         client.close();
//     }
// }

// export default getTotalValues;

// import { MongoClient } from 'mongodb';

// async function getTotalValues(targetSayaçKodu) {
//     const url = "mongodb+srv://okances:Hayal1991@cluster0.uwggqpl.mongodb.net/excelDB";
//     const dbName = "excelDB";
//     const collectionName = "csvDB";

//     const client = new MongoClient(url, { useUnifiedTopology: true });

//     try {
//         await client.connect();
//         const database = client.db(dbName);
//         const collection = database.collection(collectionName);

//         const data = await collection.find({ "Sayaç Etso Kodu": targetSayaçKodu }).toArray();

//         let totalÜretim = 0;
//         let totalTüketim = 0;
//         let totalÇekisEndüktif = 0;
//         let totalÇekisKapasitif = 0;
//         let totalVerisEndüktif = 0;
//         let totalVerisKapasitif = 0;

//         data.forEach(item => {
//             totalÜretim += parseFloat(item["Üretim Miktari (MWh)"]) || 0;
//             totalTüketim += parseFloat(item["Tüketim Miktari (MWh)"]) || 0;
//             totalÇekisEndüktif += parseFloat(item["Çekis Endüktif (MWh)"]) || 0;
//             totalÇekisKapasitif += parseFloat(item["Çekis Kapasitif (MWh)"]) || 0;
//             totalVerisEndüktif += parseFloat(item["Veris Endüktif (MWh)"]) || 0;
//             totalVerisKapasitif += parseFloat(item["Veris Kapasitif (MWh)"]) || 0;
//         });
//         console.log(data);

//         console.log("Toplam Üretim Miktari: " + totalÜretim + " MWh");
//         console.log("Toplam Tüketim Miktari: " + totalTüketim + " MWh");
//         console.log("Toplam Çekis Endüktif: " + totalÇekisEndüktif + " MWh");
//         console.log("Toplam Çekis Kapasitif: " + totalÇekisKapasitif + " MWh");
//         console.log("Toplam Veris Endüktif: " + totalVerisEndüktif + " MWh");
//         console.log("Toplam Veris Kapasitif: " + totalVerisKapasitif + " MWh");

//         return {
//             totalÜretim,
//             totalTüketim,
//             totalÇekisEndüktif,
//             totalÇekisKapasitif,
//             totalVerisEndüktif,
//             totalVerisKapasitif
//         };
//     } catch (err) {
//         console.error("Hata oluştu: ", err);
//     } finally {
//         client.close();
//     }
// }

// export default getTotalValues;


import { MongoClient } from 'mongodb';

async function getTotalValues(targetSayaçKodu) {
    const url = "mongodb+srv://okances:Hayal1991@cluster0.uwggqpl.mongodb.net/excelDB";
    const dbName = "excelDB";
    const collectionName = "csvDB";

    const client = new MongoClient(url, { useUnifiedTopology: true });

    try {
        await client.connect();
        const database = client.db(dbName);
        const collection = database.collection(collectionName);

        // Belirli "Sayaç Etso Kodu" ile eşleşen tüm belgeleri al
        const data = await collection.find({ "Sayaç Etso Kodu": targetSayaçKodu }).toArray();

        // "Üretim Miktari (MWh)" alanlarını içeren bir dizi oluştur
        const üretimData = data.map(item => {
            // Öğelerdeki virgülleri kaldırarak sayıya dönüştür
            return parseFloat(item["Üretim Miktari (MWh)"].replace(',', '.')) || 0;
        });

        // Dizi içindeki verileri topla
        const totalÜretim = üretimData.reduce((acc, currentValue) => acc + currentValue, 0);

        console.log("Toplam Üretim Miktari: " + totalÜretim + " MWh");

        return totalÜretim;
    } catch (err) {
        console.error("Hata oluştu: ", err);
    } finally {
        client.close();
    }
}

export default getTotalValues;

