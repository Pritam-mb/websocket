import express from "express";
const app = express();

app.get("/api/products", (req, res) => {
    const products = [
        { id: 1, name: "Product 1", price: 100 },
        { id: 2, name: "Product 2", price: 200 },
        { id: 3, name: "Product 3", price: 300 },
    ];
    // localhost:3000/api/products?search=Product

    if(req.query.search){
       const filter= products.filter((e)=>
            e.name.includes(req.query.search))
       res.send(filter)
         return;
    }
    setTimeout(() => {
        res.send(products);
        
    }, 3000); // Simulate a delay of 1 second
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});