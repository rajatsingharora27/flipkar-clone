const Category = require('../models/category');
const slugify = require('slugify');


function createCategories(categories,parentId=null){
    const categoryList=[];

    let category;
    if(parentId==null){
        //means the element in the document is the main category
        category= categories.filter(cat=>cat.parentId==undefined);
        //resturn the list of the parent category
    }
    else{
        //wheen parent id is not undefied then it will get the list of
        // all the categoy having which has same parent id
        category=categories.filter(cat=>cat.parentId==parentId);
    }

    //we have list that is category
    for(let cate of category){
        categoryList.push({
            _id:cate._id,
            name:cate.name,
            slug:cate.slug,
            parentId:cate.parentId,
            children:createCategories(categories,cate._id)
        })
    }
    return categoryList

}




exports.createCategory = (req, res) => {

    const categoryObj = {
        name: req.body.name,
        slug: slugify(req.body.name)
    }
    if (req.body.parentId) {
        categoryObj.parentId = req.body.parentId;
    }

    const cat = new Category(categoryObj);

    cat.save((err, categoryData) => {
        if (err) {
            return res.status(400).json(err);
        }
        else {
            return res.status(200).json(categoryData);
        }
    })
};



exports.getCategory = async (req, res) => {


    Category.find({}).exec((err, allCategory) => {
        console.log(allCategory)
        if (err) return res.status(400).json(err);
        if (allCategory) {
            const categoryList = createCategories(allCategory);
            return res.status(200).json({ categoryList });
        }
    });
}