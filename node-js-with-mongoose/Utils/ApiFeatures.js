class ApiFeatures{
    constructor(query, queryStr){
        this.query = query
        this.queryStr = queryStr
    }
    filter(){
            //ADVANCE FILTERING (greater than/ less than/ greater than equal to/ less than equal to)

            const queryCopy = {...this.queryStr};

            // Removing fields from the query
            const removeFields = ['sort', 'fields', 'q', 'limit', 'page'];
            removeFields.forEach(el => delete queryCopy[el]);
    
            // Advance filter using: lt, lte, gt, gte
            let queryStr = JSON.stringify(queryCopy);
            queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`)
    
            this.query = this.query.find(JSON.parse(queryStr));
            return this;
    }
        
    sort(){
        this.queryStr.sort
        ? this.query.sort(this.queryStr.sort.split(',').join(' '))
        : this.query.sort('-name')

        return this;
    }
        
    limitFields(){
        this.queryStr.fields
        ? this.query.select(this.queryStr.fields.split(',').join(' '))
        : this.query.select('-__v')
        return this;
    }
    paginate(){
        const page = this.queryStr.page * 1|| 1
        const limit = this.queryStr.limit * 1|| 5
        const skip = (page - 1) * limit
        this.query = this.query.skip(skip).limit(limit)

        //if (this.queryStr.page) {
        //promise awaiting data and assigning to 'moviesCount
        //const moviesCount = await Movie.countDocuments()
        //if (skip >= moviesCount)
       //    throw new Error(' Page not found!')
        //}
        return this
    }
}

module.exports = ApiFeatures