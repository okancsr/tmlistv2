

import { MongoClient } from "mongodb";
import express from "express";
import ejs from "ejs";



const app = express();
const port = 8080;

app.set("view engine", "ejs"); // EJS şablon motorunu kullan

app.use('/public', express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


const url = "mongodb+srv://okances:Hayal1991@cluster0.uwggqpl.mongodb.net/excelDB";
const dbName = "excelDB";
const collectionName = "csvDB";
const pageSize = 50;



let pageCount; // pageCount değişkenini tanımlayın

app.get("/", async (req, res) => {
    const client = new MongoClient(url, { useUnifiedTopology: true });

    try {
        await client.connect();
        const database = client.db(dbName);
        const collection = database.collection(collectionName);

        const page = parseInt(req.query.page) || 1; // Sayfa numarasını sorgu parametresinden al

        const skip = (page - 1) * pageSize;
        const data = await collection.find().skip(skip).limit(pageSize).toArray();

        pageCount = Math.ceil(await collection.countDocuments() / pageSize); // pageCount'i burada tanımlayın

        res.render("index.ejs", { data, pageCount, page }); // EJS şablonunu kullanarak HTML sayfasını render et
    } catch (err) {
        console.error("Hata oluştu: ", err);
        res.status(500).send("Sunucu hatası");
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


app.listen(port, () => {
    console.log(`Sunucu ${port} portunda çalışıyor...`);
});
