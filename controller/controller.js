const model = require('../models/model');


//post categories: http://localhost:8080/api/categories
async function createCategories(req, res) {
    const Create = new model.Categories({
        type: "Expense",
        color: '#c90c7b',
    })

    await Create.save(function (err) {
        if (!err) {
            return res.json(Create)
        }
        return res.status(400).json({ message: `Error while creating Categories ${err}` });
    })
};


//get categories: http://localhost:8080/api/categories
async function getCategories(req, res) {
    let data = await model.Categories.find({})

    let filter = await data.map(v => Object.assign({}, { type: v.type, color: v.color }));
    return res.json(filter);
}


//  post: http://localhost:8080/api/transaction
async function createTransaction(req, res) {
    if (!req.body) return res.status(400).json("Post HTTP Data not Provided");
    let { name, type, amount } = req.body;

    const create = await new model.Transaction(
        {
            name,
            type,
            amount,
            date: new Date()
        }
    );

    create.save(function (err) {
        if (!err) return res.json(create);
        return res.status(400).json({ message: `Error while creating transaction ${err}` });
    });

}


//  get: http://localhost:8080/api/transaction
async function getTransaction(req, res) {
    let data = await model.Transaction.find({});
    return res.json(data);
}


//  delete: http://localhost:8080/api/transaction
async function deleteTransaction(req, res) {
    if (!req.body) return res.status(400).json({ message: "Request body not Found" });
    await model.Transaction.deleteOne(req.body, function (err) {
        if (!err) res.json("Record Deleted...!");
    }).clone().catch(function (err) { res.json(`Error while deleting Transaction Record ${err}`) });
}


//  get: http://localhost:8080/api/labels
async function getLabels(req, res) {

    model.Transaction.aggregate([
        {
            $lookup: {
                from: "categories",
                localField: 'type',
                foreignField: "type",
                as: "categoriesInfo"
            }
        },
        {
            $unwind: "$categoriesInfo"
        }
    ]).then(result => {
        let data = result.map(v => Object.assign({}, { _id: v._id, name: v.name, type: v.type, amount: v.amount, color: v.categoriesInfo['color'] }));
        res.json(data);
    }).catch(error => {
        res.status(400).json("Lookup Collection Error");
    })

}



module.exports = {
    createCategories,
    getCategories,
    createTransaction,
    getTransaction,
    deleteTransaction,
    getLabels,

}