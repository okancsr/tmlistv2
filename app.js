import { MongoClient } from "mongodb";
import express from "express";
import ejs from "ejs";
import getTotalValues from './toplam.js'; // Dosya yolu doğru olmalı. Bu fonksiyon,
// CSV verilerinden toplam değerleri hesaplar ve bir dizi olarak döndürür.




const app = express();
const port = 8080;

app.set("view engine", "ejs"); // EJS şablon motorunu kullan

app.use('/public', express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


const url = "mongodb+srv://okances:Hayal1991@cluster0.uwggqpl.mongodb.net/excelDB";
const dbName = "excel2DB";
const collectionName = "csv2DB";
const pageSize = 50;

let pageCount;

app.get("/", async (req, res) => {
    const client = new MongoClient(url, { useUnifiedTopology: true });

    try {
        await client.connect();
        const database = client.db(dbName);
        const collection = database.collection(collectionName);


        const page = parseInt(req.query.page) || 1; // Sayfa numarasını sorgu parametresinden al

        const skip = (page - 1) * pageSize;
        const data = await collection.find().skip(skip).limit(pageSize).toArray();

        // pageCount değişkenini const ile başlatın ve değerini hesaplayın
        pageCount = Math.ceil(await collection.countDocuments() / pageSize);

        // res.render fonksiyonuna pageCount değişkenini bir parametre olarak ekleyin
        res.render("index.ejs", { data, pageCount, page });
    } catch (err) {
        console.error("Hata oluştu: ", err);
        res.status(500).send("Sunucu hatası");
    } finally {
        client.close();
    }
});

const traetso1 = "40Z000007706314S";
const trbetso1 = "40Z000007706315Q";

app.get('/yantoplam', async (req, res) => {
    const client = new MongoClient(url, { useUnifiedTopology: true });
    const traetso1 = "40Z000007706314S";
    const trbetso1 = "40Z000007706315Q";

    try {
        await client.connect();
        const database = client.db(dbName);
        const collection = database.collection(collectionName);

        // Belirli "Sayaç Etso Kodu" ile eşleşen tüm belgeleri al
        const dataTraetso1 = await collection.find({ "Sayaç Etso Kodu": traetso1 }).toArray();
        const dataTrbetso1 = await collection.find({ "Sayaç Etso Kodu": trbetso1 }).toArray();

        // Şimdi her iki sorgu sonucunu birleştirin
        const combinedData = dataTraetso1.concat(dataTrbetso1);

        var gruplar = {};
        combinedData.forEach(function (values) {
            var tarih = values.Tarih;
            if (!gruplar[tarih]) {
                gruplar[tarih] = {
                    Tarih: tarih,
                    ÜretimMiktari: 0, // Üretim miktarı için toplam değeri burada saklayın
                    TüketimMiktari: 0, // Tüketim miktarı için toplam değeri burada saklayın
                    // Diğer verileri buraya ekleyin
                };
            }
            gruplar[tarih].ÜretimMiktari += parseFloat(values["Üretim Miktari (MWh)"].replace(",", ".")) || 0;
            gruplar[tarih].TüketimMiktari += parseFloat(values["Tüketim Miktari (MWh)"].replace(",", ".")) || 0;
            // Diğer verileri de burada toplayın
        });

        var gruplarArray = [];
        for (var tarih in gruplar) {
            gruplarArray.push(gruplar[tarih]);
        }

        res.render('kay1', { gruplar: gruplarArray });

    } catch (err) {
        console.error("Hata oluştu: ", err);
    } finally {
        client.close();
    }
});


app.post("/changePage", (req, res) => {
    const pageNumber = parseInt(req.body.pageNumber);
    if (pageNumber >= 1 && pageNumber <= pageCount) {
        // Sayfa numarasını güncelle ve yeniden yönlendir
        res.redirect(`/?page=${pageNumber}`);
    } else {
        // Geçersiz sayfa numarası
        res.status(400).send("Geçersiz sayfa numarası");
    }
});


app.get("/toplam", async (req, res) => {
    const targetSayaçKodu = "40Z000007706314S"; // Hesaplamak istediğiniz sayaç kodu

    try {
        const totalValues = await getTotalValues(targetSayaçKodu);
        console.log("totalValues:" + totalValues);
        res.status(200).json(totalValues);
    } catch (err) {
        console.error("Hata oluştu: ", err);
        res.status(500).json({ error: "Toplam değerler hesaplanırken hata oluştu." });
    }
});


app.listen(port, () => {
    console.log(`Sunucu ${port} portunda çalışıyor...`);
});