class ApiFeatures{
    constructor(query,queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }

    filter(){
        let queryString = JSON.stringify(this.queryStr)
        queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`)
        let queryObj = JSON.parse(queryString)

        this.query = this.query.find(queryObj);

        return this;
    }
    
    sort(){
        if(this.queryStr.sort){
            const sortId = this.queryStr.sort.split(',').join(' ');
            this.query = this.query.sort("-publishedYear");
        }
        else{
            this.query = this.query.sort("-storedAt")
        }

        return this;
    }

    projection(){
        if(this.queryStr.fields){
            const fields = this.queryStr.fields.split(',').join(' ');
            this.query = this.query.select(fields);
        }
        else{
            this.query = this.query.select('-__v')
        }

        return this;
    }

    paginate(){
        const page = this.queryStr.page * 1 || 1
        const limit = this.queryStr.limit * 1 || 10
        const skip = (page-1)*limit
        this.query = this.query.skip(skip).limit(limit);

    //     // if(req.query.page){
    //     //     const count = await Book.countDocuments();
    //     //     if(skip>=count){
    //     //         throw new Error("This Page is Not Found!! ")
    //     //     }
    //     // }

        return this;
    }
}

module.exports = ApiFeatures;