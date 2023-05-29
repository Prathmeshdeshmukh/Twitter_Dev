const Hashtag = require('../models/hashtag');

class HashtagRepository {
    async create(data) {
        try {
            const tags = await Hashtag.create(data);
            return tags;
        } catch (error) {
            console.log(error);
        }
    }

    async bulkCreate(data){
        try {
            const tags = await Hashtag.insertMany(data)
            return tags;
        } catch (error) {
            console.log(error)        
        }
    }

    async get(id) {
        try {
            const tags = await Hashtag.findById(id);
            return tags;
        } catch (error) {
            console.log(error);
        }
    }
    async destroy(id) {
        try {
            const response = await Hashtag.findByIdAndRemove(id);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async findByName(titleList){
        try {
            const tags = await Hashtag.find({
                title : titleList
            }).select('title -_id')
            return tags;
        } catch (error) {
            console.log(error)
            
        }
    }
}

module.exports = HashtagRepository;